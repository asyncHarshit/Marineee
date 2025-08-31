import { StreamClient } from "@stream-io/node-sdk";
import { v4 as uuidv4 } from "uuid";

const apiKey = 'c5b85vp9vkt7'
const apiSecret = 'zfzt9dfmzkwtpanm6f5r234xw8h9hgfrm4b9r8ppn3ttv782k78aa9wmsnmdcbtt'
export const tokenProvider = async (req, res) => {
  try {
    if (!apiKey || !apiSecret) {
      throw new Error("Stream API credentials are missing");
    }

    const userId = uuidv4();
    const client = new StreamClient(apiKey, apiSecret);

    const token = client.generateUserToken({ user_id: userId });

    res.status(200).json({
      success: true,
      token,
      apiKey,
      userId,
    });
  } catch (err) {
    console.error("Stream token error:", err);
    res.status(500).json({ message: "Failed to generate token" });
  }
};
