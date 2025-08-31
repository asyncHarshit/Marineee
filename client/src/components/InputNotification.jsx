import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Bell, Send, X } from "lucide-react";


const baseUrl = "http://localhost:5000";

export function EmergencyNotification() {
  const [showForm, setShowForm] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSendNotification = async () => {
    if (!phone.trim() || !message.trim()) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${baseUrl}/api/sms/send-sms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone.startsWith("+91") ? phone : `+91${phone}`, // default India
          message,
        }),
      });

      if (res.ok) {
        setStatus("success");
        console.log("✅ SMS sent successfully");
      } else {
        setStatus("error");
        console.error("❌ Failed to send SMS");
      }
    } catch (err) {
      setStatus("error");
      console.error("❌ Error sending SMS:", err);
    } finally {
      setLoading(false);
      setPhone("");
      setMessage("");
      setTimeout(() => setStatus(null), 3000);
      setShowForm(false);
    }
  };

  return (
    <div className="w-full">
      {/* Main Button */}
      <Button
        className="w-full bg-blue-900 hover:bg-blue-800 text-white justify-start"
        onClick={() => setShowForm(true)}
      >
        <Bell className="w-4 h-4 mr-2" />
        Emergency Alert
      </Button>

      {/* Form Modal (centered) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Card className="w-full max-w-md p-4 shadow-lg bg-white">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Send Emergency Alert</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowForm(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <CardContent className="space-y-3 mt-3">
              {/* Phone Number Input */}
              <div>
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number (e.g. 9876543210)"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <Label>Message</Label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter notification message"
                  className="w-full border rounded-md p-2 h-24"
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              {status === "success" && (
                <span className="text-green-600 text-sm">✅ SMS Sent</span>
              )}
              {status === "error" && (
                <span className="text-red-600 text-sm">❌ Failed</span>
              )}

              <Button
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSendNotification}
              >
                {loading ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4 mr-2" /> Send
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
