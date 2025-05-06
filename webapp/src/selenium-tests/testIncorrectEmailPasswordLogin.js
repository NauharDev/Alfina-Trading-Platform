const { Builder, until } = require("selenium-webdriver");
const { loginEmailPasswordUser } = require("./loginEmailPasswordHelper");  // Import the helper function

async function testIncorrectEmailPasswordLogin() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Use the helper function to log in
    await loginEmailPasswordUser(driver, "test@gmail.com", "passwordWrong");

    // Wait for dashboard
    await driver.wait(until.urlContains("dashboard"), 5000);
    await driver.sleep(2000);

    // Log error message to console
    console.error("❌ Incorrect-Email/Password login test failed!");

  } catch (error) {
    console.log(`✅ Incorrect-Email/Password login test successful!`);
  } finally {
    await driver.quit();
  }
}

testIncorrectEmailPasswordLogin();  // Run: "node testIncorrectEmailPasswordLogin.js" in terminal