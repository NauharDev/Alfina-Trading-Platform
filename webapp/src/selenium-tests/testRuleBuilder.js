const { Builder, By, until, Select } = require("selenium-webdriver");
const { loginEmailPasswordUser } = require("./loginEmailPasswordHelper");  // Import the helper function

async function testRuleBuilder() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Open page
    await driver.get("http://localhost:3000/");

    // Wait for page load
    await driver.wait(until.urlContains("localhost"), 5000);
    console.log(`✅ Stage 0/4 - Rule Builder Test: Home Page Load!`);

    // Find try rule builder button
    let tryRuleBuilderButton = await driver.findElement(By.id("tryRuleBuilderButton"));
    await driver.executeScript("arguments[0].scrollIntoView();", tryRuleBuilderButton);
    await driver.sleep(2000);
    await driver.executeScript("arguments[0].click();", tryRuleBuilderButton);

    // Wait for rule builder page
    await driver.wait(until.urlContains("rule-builder"), 5000);
    await driver.sleep(2000);
    console.log(`✅ Stage 1/4 - Rule Builder Test: Rule Builder Page Load!`);

    // Find add rule button
    let addRuleButton = await driver.findElement(By.id("addRuleButton"));
    await driver.sleep(2000);
    await addRuleButton.click();
    console.log(`✅ Stage 2/4 - Rule Builder Test: Add Rule!`);

    // Find left hand side feature selector
    let lhsFeatureSelector = await driver.findElement(By.id("lhsFeature0"));
    await driver.sleep(2000);
    await lhsFeatureSelector.click();  // Opens the dropdown
    console.log(`✅ Stage 3/4 - Rule Builder Test: Select Feature!`);

     // Find back to dashboard button
     let backToDashboardButton = await driver.findElement(By.id("backToDashboardButton"));
     await driver.sleep(2000);
     await backToDashboardButton.click();

     // Wait for dashboard page
    await driver.wait(until.urlContains("dashboard"), 5000);
    await driver.sleep(2000);
    console.log(`✅ Stage 4/4 - Rule Builder Test: Back to Dashboard!`);
    console.log(`✅ Rule Builder Test Complete!`);

  } catch (error) {
    console.error("❌ Rule Builder test failed!", error);
  } finally {
    await driver.quit();
  }
}

testRuleBuilder();  // Run: "node testRuleBuilder.js" in terminal