const { Builder, until } = require("selenium-webdriver");
const { loginEmailPasswordUser } = require("./loginEmailPasswordHelper");  // Import the helper function

async function testEmailPasswordLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Use the helper function to log in
    await loginEmailPasswordUser(driver, "test@gmail.com", "password");

    // Wait for dashboard
    await driver.wait(until.urlContains("dashboard"), 5000);
    await driver.sleep(2000);

    // Log success message to console
    console.log(`✅ Email/Password login test successful!`);

  } catch (error) {
    console.error("❌ Email/Password login test failed!", error);
  } finally {
    await driver.quit();
  }
}

testEmailPasswordLogin();  // Run: "node testEmailPasswordLogin.js" in terminal