import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Controller to send SMS
export const sendSMS = async (req, res) => {
  const { phone, message } = req.body;

  if (!phone || !message) {
    return res.status(400).json({ success: false, error: "Phone and message are required" });
  }

  try {
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: phone.startsWith("+") ? phone : `+91${phone}`, // ensure E.164 format
    });

    res.json({ success: true, sid: result.sid });
  } catch (error) {
    console.error("❌ Failed to send SMS:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
