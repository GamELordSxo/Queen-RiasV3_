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
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0o2aXlXUEo5azVUSHJMeExockI2aGVZdWFCb2Q1QXF6NWp5SjhIMlgzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajJjQk1TRXJWeDJ0SXQxVDRPUk5yMDVqbm9BRlJnQ2dwS09KWHpEQlJYWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQ2ZDQUtnV1BscE5iajhOeldQWWFiZFU2Z0krUjQranlIMVU4LzZLUTBJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYzVVbHgwYjFLL2djQXZMa3N1Nkl5RytGYUZ5R1RzWnl1T1ZvQUd2cUZNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitCbUlvTWlOSmNEWW8vQmhCTEhFTGFsS0lhZHQ1Y3JPQUticTFodzhzVWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikl6NGo5M3pMWWZTaGZCbjFpa1NYRHdvRGRCVjZ2VGJCVFluWE96RjRPVXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU9BZmo2WVZWWmNXb2F2Q3VqOUs1aGNlclJMek1iZmhkNWVTNzdvU1AxVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMjJEdTBvaDExQ1A4aDNQc2trVWF5NGxkS3pQbzMxM25NdDhxTzVhTElXST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRYazdndlNlUTROWEVYNHRnaDBxMVhybkk2cnB2T3ZnTmJOb1lqM2FGSUtINi9pSVFOTzRFWTJnUkJOM1MvUmE3b2pDbXpwdXR1MXBBTHkwUjJSM2pRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJXTzhTN2E3bk80ZmdYSXMySlUzRFFrV0QvZ1VuK29vYUJHcEIxNDZHanNzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJZVEVHMThMTiIsIm1lIjp7ImlkIjoiMjM0ODA3MjYwODk3Njo4M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJBbnRob255IiwibGlkIjoiNzM2MTkwOTUwNjEzMDo4M0BsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0pYbitOY0NFS1QxbE1BR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IitKZEZKMG5TNVpIcGV3T2h3N3RmMXpCZWhPTk1QUWM2KzFIcGdiM0VMbTg9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlJqdVIyNnBwVXZJT1cvbDd0aUpMNGRPUWhlTEVCcFlsZEdIUHcvZTZUYldVZEgrazdvbDlpcjRodjR3M3hENnh2M3BjTExDeUFXVmgxbVZSdjRMQkFnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJUZ3BJVEQrQnRHSk5nMzI1aVIyMnRxY1lRRXYyemVOcU5JTFNzRng2SVk3ZXRVRjNEcktJd2NFdWhvUTcxcHlBVGtDcW51ek1pcnJHZTBqSzlUb0FnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgwNzI2MDg5NzY6ODNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZmlYUlNkSjB1V1I2WHNEb2NPN1g5Y3dYb1RqVEQwSE92dFI2WUc5eEM1diJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ1MTczMTY5LCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTGx4In0=",
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
