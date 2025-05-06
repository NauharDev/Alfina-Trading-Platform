const { Builder } = require("selenium-webdriver");
const { fillContactForm } = require("./fillContactFormHelper.js");
const { checkInboxForSubject } = require("./checkInbox.js");

(async function testContactForm() {
  let driver = await new Builder().forBrowser("chrome").build();
  const subject = "Just a test";
  const message = "Testing 1, 2, 3 ...";

  try {
    console.log("🚀 Submitting contact form...");
    await fillContactForm(
      driver,
      "Jane",
      "Jane@example.com",
      subject,
      message
    );

    console.log("⏳ Waiting for email to arrive...");
    await new Promise((res) => setTimeout(res, 5000)); // Wait 5 seconds

    console.log("📬 Checking Gmail inbox...");
    const result = await checkInboxForSubject(subject);

    if (!result.success) {
      throw new Error(`❌ Email with subject "${subject}" not found in Gmail inbox.`);
    }
    console.log("✅ Contact form test passed — email received and content displayed.");


  } catch (error) {
    console.error("💥 Contact form test failed:", error.message);
  } finally {
    await driver.quit();
  }
})();

