const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");

async function checkInboxForSubject(subjectToFind = "Testing") {
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
  const token = JSON.parse(fs.readFileSync(TOKEN_PATH));

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);

  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  try {
    const res = await gmail.users.messages.list({
      userId: "me",
      q: `subject:"${subjectToFind}"`,
      maxResults: 5,
    });

    const messages = res.data.messages || [];

    if (messages.length === 0) {
      console.log(`❌ No emails found with subject: "${subjectToFind}"`);
      return { success: false };
    }

    for (const msg of messages) {
      const fullMessage = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
        format: "full",
      });

      const headers = fullMessage.data.payload.headers;
      const subject = headers.find((h) => h.name === "Subject")?.value;
      const from = headers.find((h) => h.name === "From")?.value;

      const bodyData =
        fullMessage.data.payload.parts?.find(
          (p) => p.mimeType === "text/plain"
        )?.body?.data || fullMessage.data.payload.body?.data;

      const decodedBody = bodyData
        ? Buffer.from(bodyData, "base64").toString("utf-8")
        : "(No body found)";

      console.log(`📩 Found email with subject: "${subject}"`);
      console.log("   📝 Body: ", decodedBody.trim());

      return {
        success: true,
        body: decodedBody.trim(),
      };
    }

    return { success: false };
  } catch (error) {
    console.error("❌ Error while checking inbox:", error.message);
    return { success: false };
  }
}

// Standalone usage
if (require.main === module) {
  checkInboxForSubject().then((result) => {
    if (result.success) {
      console.log("\n✅ Body fetched successfully!");
    } else {
      console.log("\n❌ No matching email found.");
    }
  });
}

module.exports = { checkInboxForSubject };
