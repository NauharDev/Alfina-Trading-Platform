const { Builder, By, until } = require("selenium-webdriver");

// Helper function to log in a user
async function loginEmailPasswordUser(driver, email, password) {
  await driver.get("http://localhost:3000/");
  await driver.sleep(2000); // Wait for page load

  // Click the login button in the header
  let headerLoginButton = await driver.findElement(By.id("headerLoginButton"));
  await headerLoginButton.click();

  // Wait for login page to load
  await driver.wait(until.urlContains("login"), 5000);
  await driver.sleep(2000);

  // Enter credentials
  let emailInput = await driver.findElement(By.id("email"));
  let passwordInput = await driver.findElement(By.id("password"));
  let emailLoginButton = await driver.findElement(By.id("loginButton"));

  await emailInput.sendKeys(email);
  await passwordInput.sendKeys(password);

  // Click login
  await driver.sleep(2000);
  await emailLoginButton.click();
}

module.exports = { loginEmailPasswordUser };