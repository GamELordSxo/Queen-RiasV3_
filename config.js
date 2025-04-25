const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEV2TWdYeXNSV2ZEeGxqYzRQa0pTQWRFbitHcHgyV1FoYkRGN2pCMFZrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzVuVVRyMS9VbWhTY1RWSkRhM0R1ZTFJSmxVbVN3WGNzSGVPUDRlUngyST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTkRoVW1UbXdWdFl6cGp4ZVRoZnBvbGhvSWI3SDkvNFlYblVrSkhodlZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyWmVVNVl0VEg4MitIMkxYR2U5WVZLMkRORjA0Tk9sNFdIZGhEcnVBL2k4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhBcllvUVlaNStzLyttLzYwTldhRldmNzdHQ3JHY2ZQRFZtRTE5OUpyMWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR5R2FWR0Y5endsSC8xY2lETUJXMXc2WkttOXVicXRUdTFtOXRrSThMa0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUJGaDdmRzJRZEs2eUZDREgydVREbHErRlZsQzQzaUtlOTRnN2w1RWsybz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGM1ckZqVWVHZTFkalZiS3RpVzNqdncyUzhwdlpHYTM1WkkxYkN3MGxHWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNXbzhPdTBEcVN1SC9pOTZtbFd5bGFaaUoybWtjbE84THhwL3JsMDhhQlZlQ2pxWnFNcW1sR2ZCRk9kTy9PYmR6bHJ0b0wyVTJjTk40NEhhT1I0WGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjUsImFkdlNlY3JldEtleSI6IjlFQysvaENKalkxZEF5YktUWW1iaWFkZkt4S1NVNXJid1NXTEY2WllNVVk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkMxRTZDNjg1IiwibWUiOnsiaWQiOiIyMzQ4MDcyNjA4OTc2Ojg5QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFudGhvbnkiLCJsaWQiOiI3MzYxOTA5NTA2MTMwOjg5QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlhuK05jQ0VJSGFyOEFHR0FnZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiK0pkRkowblM1WkhwZXdPaHc3dGYxekJlaE9OTVBRYzYrMUhwZ2IzRUxtOD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZThMMU5laWtrMXdHdi9RaVp2aDFCVGk3TURORFQvZmFHSjUzYTZzVVZaOERwclVmSTJpdVRNbjV2bTJrQnE5RWNtUm5mN1RtZHdpZHRBVkdSVXBuRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IkdRb1RFaWZwdm9FU0FwOVNsMm9XU2tYc0dCL05zVHhyK3hMRU5HbC9va0w4U0gvSVlyaWtwS3JRT3lRbUt0Vkl3WjVDaTBTRUhxc2lmOVozcWRMTmpRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODA3MjYwODk3Njo4OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmaVhSU2RKMHVXUjZYc0RvY083WDljd1hvVGpURDBIT3Z0UjZZRzl4QzV2In19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU2MTIwNDcsImxhc3RQcm9wSGFzaCI6Im5tM0JiIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFMbHgifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
