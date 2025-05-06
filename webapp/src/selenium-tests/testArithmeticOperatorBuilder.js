const { Builder, By, until, Select } = require("selenium-webdriver");

async function testArithmeticOperatorBuilder() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
        await driver.get("http://localhost:3000/stockrulebuilder");

        // Wait for page load
        await driver.wait(until.urlContains("localhost"), 5000);
        console.log(`✅ Stage 0/4 - Arithmetic Operator Test: Home Page Load!`);

        // Find try rule builder button
        let openingPriceButton = await driver.findElement(By.id("open"));
        await driver.executeScript("arguments[0].scrollIntoView();", openingPriceButton);
        await driver.sleep(2000);
        await driver.executeScript("arguments[0].click();", openingPriceButton);
        console.log(`✅ Stage 1/4 - Arithmetic Operator Test: OpeningPrice Button clicked!`);

        // find the addition operator button
        let additionButton = await driver.findElement(By.id("add"));
        await driver.sleep(2000);
        await additionButton.click();
        console.log(`✅ Stage 2/4 - Arithmetic Operator Test: Addition Button clicked!`);

        // find the closing price button
        let closingPriceButton = await driver.findElement(By.id("close"));
        await driver.sleep(2000);
        await closingPriceButton.click();
        console.log(`✅ Stage 3/4 - Arithmetic Operator Test: Closing Price Button clicked!`);

        // find the clear button
        let clearButton = await driver.findElement(By.id("clear"));
        await driver.sleep(2000);
        await clearButton.click();
        console.log(`✅ Stage 4/4 - Arithmetic Operator Test: Clear Button clicked!`);
        console.log(`Arithmetic Operator Test Complete!`);

    } catch (error) {
        console.error("❌ Rule Builder test failed!", error);
    } finally {
        await driver.quit();
    }
}