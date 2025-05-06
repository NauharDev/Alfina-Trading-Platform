const fs = require("fs");
const path = require("path");
const readline = require("readline");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];
const CREDENTIALS_PATH = path.join(__dirname, "credentials.json");
const TOKEN_PATH = path.join(__dirname, "token.json");

fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return console.error("❌ Error loading credentials.json:", err);
  authorize(JSON.parse(content));
});

function authorize(credentials) {
  const { client_secret, client_id } = credentials.installed;

  // Use out-of-band (manual copy-paste) redirect URI
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    "urn:ietf:wg:oauth:2.0:oob"
  );

  // Check for previously saved token
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client);
    oAuth2Client.setCredentials(JSON.parse(token));
    console.log("✅ Token already exists — you're ready to use the Gmail API!");
  });
}

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("🔐 Open this URL in your browser:\n\n" + authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("\nPaste the authorization code here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("❌ Error retrieving token:", err);
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      console.log("✅ Access token saved to token.json");
    });
  });
}
