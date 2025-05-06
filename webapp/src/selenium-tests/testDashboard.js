const { Builder, By, until } = require("selenium-webdriver");
const { loginEmailPasswordUser } = require("./loginEmailPasswordHelper");  // Import the helper function

async function testDashboard() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Use the helper function to log in
    await loginEmailPasswordUser(driver, "test@gmail.com", "password");

    // Wait for dashboard
    await driver.wait(until.urlContains("dashboard"), 5000);
    await driver.sleep(2000);
    console.log(`✅ Stage 0/4 - Dashboard Test: Login!`);

    // Find add trading rule button
    let addTradingRuleButton = await driver.findElement(By.id("addTradingRuleButton"));
    await driver.sleep(2000);
    await addTradingRuleButton.click();

    // Wait for model page
    await driver.wait(until.urlContains("model"), 5000);
    await driver.sleep(2000);
    console.log(`✅ Stage 1/4 - Dashboard Test: Add Trading Rule!`);

    // Find add signal button
    let addSignalButton = await driver.findElement(By.id("addSignalButton"));
    await driver.sleep(2000);
    await addSignalButton.click();
    console.log(`✅ Stage 2/4 - Dashboard Test: Add Signal!`);

    // Find submit model button
    let submitModelButton = await driver.findElement(By.id("submitModelButton"));
    await driver.sleep(2000);
    await submitModelButton.click();
    console.log(`✅ Stage 3/4 - Dashboard Test: Submit Model!`);

     // Find back to dashboard button
     let backToDashboardButton = await driver.findElement(By.id("backToDashboardButton"));
     await driver.sleep(2000);
     await backToDashboardButton.click();

     // Wait for dashboard page
    await driver.wait(until.urlContains("dashboard"), 5000);
    await driver.sleep(2000);
    console.log(`✅ Stage 4/4 - Dashboard Test: Back to Dashboard!`);
    console.log(`✅ Dashboard Test Complete!`);

  } catch (error) {
    console.error("❌ Dashboard test failed!", error);
  } finally {
    await driver.quit();
  }
}

testDashboard();  // Run: "node testDashboard.js" in terminal