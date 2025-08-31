// src/utils/spamCheck.js
let userMessageCache = {};

export function isSpamMessage(userId, message) {
  if (!userMessageCache[userId]) {
    userMessageCache[userId] = [];
  }

  const lastMessages = userMessageCache[userId];
  // Check against the content of the post, ignoring whitespace
  const isDuplicate = lastMessages.includes(message.trim());

  // Keep only the last 5 messages in the cache
  if (lastMessages.length >= 3) {
    lastMessages.shift();
  }
  lastMessages.push(message.trim());

  return isDuplicate;
}
