import React, { useState, useEffect } from "react";
import axios from "axios";
import Vapi from "@vapi-ai/web";
import * as pdfjsLib from "pdfjs-dist";
import PDFWorker from "pdfjs-dist/build/pdf.worker.mjs?worker";

pdfjsLib.GlobalWorkerOptions.workerPort = new PDFWorker();


import mammoth from "mammoth";
import {
  Mic,
  MicOff,
  PhoneOff,
  Bot,
  User,
  Upload,
  Send,
  MessageSquare,
  FileText,
  X,
  Loader,
} from "lucide-react";


const VoiceTextAI = ({ apiKey, assistantId, geminiApiKey }) => {
  // Voice state
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);

  // UI state
  const [activeTab, setActiveTab] = useState("voice"); // 'voice' or 'text'

  // Text AI state
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [textMessages, setTextMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Voice setup
  useEffect(() => {
    if (!apiKey) return;

    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      setIsConnected(true);
    });

    vapiInstance.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        setTranscript((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });

    return () => {
      vapiInstance.stop();
    };
  }, [apiKey]);

  const startCall = () => {
    vapi?.start(assistantId);
  };

  const endCall = () => {
    vapi?.stop();
  };

  // ---- File Upload Handling ----
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      let content = "";

      if (file.type === "application/pdf") {
        content = await readPDF(file);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword" ||
        file.name.endsWith(".doc") ||
        file.name.endsWith(".docx")
      ) {
        content = await readDOC(file);
      } else {
        content = await readFileContent(file);
      }

      setFileContent(content);
    } catch (error) {
      console.error("Error reading file:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // For TXT, CSV, JSON
  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          let content = e.target.result;

          if (file.type === "application/json") {
            content = JSON.stringify(JSON.parse(content), null, 2);
          }

          resolve(content);
        } catch (error) {
          reject(new Error(`Error processing file: ${error.message}`));
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  };

  // For PDF
const readPDF = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it) => it.str).join(" ") + "\n";
  }
  return text;
};

  // For DOC/DOCX
  const readDOC = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    return value || "Unable to extract text from this document.";
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFileContent("");
  };

  // ---- Gemini API integration (dummy for now) ----
  const sendToGemini = async (message) => {
    try {
        const response = await axios.post("http://localhost:5000/api/gemini/get", {
          query: fileContent + "and my question is" + message + `You are a Natural Disaster Analyst. 
                - When given text, summarize the key disaster-related insights (location, severity, affected people, risks).  
                - When given a PDF or document, extract the most relevant disaster information (causes, damages, warnings, safety measures).  
                - Be concise and factual, avoid unnecessary details.  
                - Respond in simple, human-friendly language.  
                `
        });
        
        return response.data.data;
    } catch (error) {
      console.error("Error sending to Gemini:", error);
      throw new Error("Failed to connect to Gemini API");
    }

    // console.log("File content for AI:", fileContent);
    // TODO: Connect to Gemini API
    return `Gemini response to: "${message}" (stubbed)`;
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", text: userInput };
    setTextMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsProcessing(true);

    try {
      const aiResponse = await sendToGemini(userInput);
      const aiMessage = { role: "assistant", text: aiResponse };
      setTextMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending to Gemini:", error);
      const errorMessage = {
        role: "assistant",
        text: "Sorry, there was an error processing your request.",
      };
      setTextMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header with tabs */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'voice'
                ? 'bg-white text-emerald-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            Voice Chat
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'text'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Text Chat
          </button>
        </div>
      </div>

      {/* Voice Tab */}
      {activeTab === 'voice' && (
        <>
          {!isConnected ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="relative group">
                  <button
                    onClick={startCall}
                    className="relative overflow-hidden bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3"
                  >
                    <div className="relative">
                      <Mic className="w-6 h-6 animate-pulse" />
                      <div className="absolute -inset-2 bg-white/20 rounded-full animate-ping opacity-75"></div>
                    </div>
                    <span className="text-lg">Start Voice Chat</span>
                    <div className="flex items-center gap-1 ml-2">
                      <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-4 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-1 h-5 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                    </div>
                  </button>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                </div>
                <p className="mt-6 text-gray-600 text-sm max-w-sm">
                  Click to start a voice conversation with our AI assistant
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Voice Messages area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6 min-h-0">
                {transcript.length === 0 ? (
                  <div className="flex items-center justify-center h-full min-h-[200px]">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center">
                        {isSpeaking ? (
                          <MicOff className="w-8 h-8 text-emerald-600" />
                        ) : (
                          <Mic className="w-8 h-8 text-emerald-600 animate-pulse" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">
                        Your voice conversation will appear here...
                      </p>
                    </div>
                  </div>
                ) : (
                  transcript.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[85%] ${
                          msg.role === 'user'
                            ? 'flex-row-reverse space-x-reverse'
                            : 'flex-row'
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                              : 'bg-gradient-to-br from-emerald-500 to-emerald-700'
                          }`}
                        >
                          {msg.role === 'user' ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Voice Bottom controls */}
              <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
                <div className="flex items-center justify-between max-w-4xl mx-auto min-h-[60px]">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className="relative flex items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          isSpeaking
                            ? 'bg-red-500 shadow-lg shadow-red-500/50'
                            : 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                        } transition-all duration-300 animate-pulse`}
                      ></div>
                      {isSpeaking && (
                        <div className="flex items-end gap-1 ml-4">
                          <div className="w-1 h-3 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-1 h-4 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-1 h-5 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          <div className="w-1 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-medium text-sm ${isSpeaking ? 'text-red-600' : 'text-emerald-600'} transition-colors duration-300`}>
                        {isSpeaking ? 'AI Speaking' : 'Listening'}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {isSpeaking ? 'Please wait...' : 'Speak now'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isSpeaking 
                          ? 'bg-red-100 border-2 border-red-300' 
                          : 'bg-emerald-100 border-2 border-emerald-300'
                      } transition-all duration-300`}>
                        {isSpeaking ? (
                          <MicOff className="w-6 h-6 text-red-600" />
                        ) : (
                          <Mic className="w-6 h-6 text-emerald-600 animate-pulse" />
                        )}
                      </div>
                      {!isSpeaking && (
                        <div className="absolute inset-0 bg-emerald-500/30 rounded-full animate-ping"></div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end min-w-[200px]">
                    <button
                      onClick={endCall}
                      className="group relative bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl"
                    >
                      <PhoneOff className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-medium">End Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}

      {/* Text Tab */}
      {activeTab === 'text' && (
        <>
          {/* File upload area */}
          <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors duration-200">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">Upload a file</span>
                    <span className="text-gray-600"> to get AI assistance</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept=".txt,.pdf,.doc,.docx"
                  />
                  <p className="text-xs text-gray-500 mt-2">Supports: TXT, PDF, DOC, DOCX</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-800">{uploadedFile.name}</span>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Text Messages area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {textMessages.length === 0 ? (
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    {uploadedFile 
                      ? "Ask questions about your uploaded file..."
                      : "Upload a file and start chatting with AI..."
                    }
                  </p>
                </div>
              </div>
            ) : (
              textMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[85%] ${
                      msg.role === 'user'
                        ? 'flex-row-reverse space-x-reverse'
                        : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700'
                          : 'bg-gradient-to-br from-gray-600 to-gray-700'
                      }`}
                    >
                      {msg.role === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-800 shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Text Input area */}
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <div className="flex gap-2 max-w-4xl mx-auto">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={uploadedFile ? "Ask about your file..." : "Upload a file first to start chatting..."}
                className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                rows={2}
                disabled={!uploadedFile || isProcessing}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || !uploadedFile || isProcessing}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                {isProcessing ? (
                  <Loader className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceTextAI;