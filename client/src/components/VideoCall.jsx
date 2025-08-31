import React, { useEffect, useState, useRef } from "react";
import {
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  useCall,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Loader2, VideoOff, Copy, Check, Users, Plus } from "lucide-react";

const baseUrl = import.meta.env.VITE_BASEURL;

const VideoCall = () => {
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [callEnded, setCallEnded] = useState(false);
  const [currentCallId, setCurrentCallId] = useState(null);
  const [showMeetingOptions, setShowMeetingOptions] = useState(true);
  const [joinCallId, setJoinCallId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const isCleaningUp = useRef(false);

  // Generate a random call ID
  const generateCallId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const initCall = async (callId) => {
    try {
      const res = await axios.post(`${baseUrl}/api/call/token`);
      const { token, apiKey, userId } = res.data;

      const user = {
        id: userId,
        name: `Guest-${userId.slice(0, 5)}`,
        image: `https://getstream.io/random_svg/?id=${userId}&name=${userId}`,
      };

      const videoClient = new StreamVideoClient({ apiKey, user, token });
      const streamCall = videoClient.call("default", callId);

      await streamCall.join({ create: true });

      setClient(videoClient);
      setCall(streamCall);
      setCurrentCallId(callId);
      setShowMeetingOptions(false);
    } catch (err) {
      console.error("Stream init error:", err);
      setIsCreating(false);
      setIsJoining(false);
    }
  };

  const handleCreateMeeting = async () => {
    setIsCreating(true);
    const newCallId = generateCallId();
    await initCall(newCallId);
  };

  const handleJoinMeeting = async () => {
    if (!joinCallId.trim()) return;
    setIsJoining(true);
    await initCall(joinCallId.trim());
  };

  const copyCallId = async () => {
    try {
      await navigator.clipboard.writeText(currentCallId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleEndCall = () => {
    if (!isCleaningUp.current) {
      isCleaningUp.current = true;
      if (call) {
        call.leave().catch(console.error);
      }
      setCallEnded(true);
    }
  };

  const handleBackToOptions = () => {
    if (call) {
      call.leave().catch(console.error);
    }
    setClient(null);
    setCall(null);
    setCurrentCallId(null);
    setShowMeetingOptions(true);
    setCallEnded(false);
    setJoinCallId("");
    setIsCreating(false);
    setIsJoining(false);
    isCleaningUp.current = false;
  };

  useEffect(() => {
    if (!call) return;

    const handleCallEnd = () => {
      handleEndCall();
    };

    call.on("call.ended", handleCallEnd);
    return () => {
      call.off("call.ended", handleCallEnd);
    };
  }, [call]);

  // Meeting options screen
  if (showMeetingOptions) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">Video Call</h1>
            <p className="text-gray-400">Create a new meeting or join an existing one</p>
          </div>

          {/* Create Meeting */}
          <button
            onClick={handleCreateMeeting}
            disabled={isCreating}
            className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 text-white py-4 px-6 rounded-lg font-semibold transition-colors"
          >
            {isCreating ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {isCreating ? "Creating Meeting..." : "Create New Meeting"}
          </button>

          {/* Join Meeting */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter Call ID to join"
              value={joinCallId}
              onChange={(e) => setJoinCallId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500"
              onKeyPress={(e) => e.key === "Enter" && handleJoinMeeting()}
            />
            <button
              onClick={handleJoinMeeting}
              disabled={!joinCallId.trim() || isJoining}
              className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg font-semibold transition-colors"
            >
              {isJoining ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Users className="w-5 h-5" />
              )}
              {isJoining ? "Joining..." : "Join Meeting"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Call ended screen
  if (callEnded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <VideoOff size={64} className="text-red-500 mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold mb-4">Call Ended</h2>
        <button
          onClick={handleBackToOptions}
          className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-lg font-semibold transition-colors"
        >
          Back to Options
        </button>
      </div>
    );
  }

  // Loading screen
  if (!client || !call) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <Loader2 className="animate-spin text-teal-400 w-10 h-10 mb-4" />
        <p className="text-lg">Setting up your call...</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI 
          callId={currentCallId} 
          onCopyCallId={copyCallId} 
          copied={copied}
          onEndCall={handleEndCall}
        />
      </StreamCall>
    </StreamVideo>
  );
};

const CallUI = ({ callId, onCopyCallId, copied, onEndCall }) => {
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();
  const call = useCall();

  // Show call ID banner when in call
  const CallIdBanner = () => (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2">
        <span className="text-sm">Call ID: <span className="font-mono">{callId}</span></span>
        <button
          onClick={onCopyCallId}
          className="text-teal-400 hover:text-teal-300 transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
    </div>
  );

  if (callingState !== "joined") {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <Loader2 className="animate-spin text-teal-400 w-10 h-10 mb-4" />
        <p className="text-lg">Joining call...</p>
      </div>
    );
  }

  // If only one participant, show waiting screen with call ID
  if (participants.length <= 1) {
    return (
      <div className="relative flex flex-col items-center justify-center h-screen bg-black text-white">
        <CallIdBanner />
        <Loader2 className="animate-spin text-teal-400 w-10 h-10 mb-4" />
        <p className="text-lg mb-2">Waiting for others to join...</p>
        <p className="text-gray-400 text-center max-w-md">
          Share your Call ID with others so they can join the meeting
        </p>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <CallIdBanner />
      <StreamTheme>
        <SpeakerLayout participantsBarPosition="bottom" />
        <CallControls
          onLeave={() => {
            call.endCall().catch(console.error);
            onEndCall();
          }}
        />
      </StreamTheme>
    </div>
  );
};

export default VideoCall;