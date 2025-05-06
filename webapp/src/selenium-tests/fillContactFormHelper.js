const { Builder, By, until } = require("selenium-webdriver");

// Helper function to fill out and submit the contact form
async function fillContactForm(driver, name, email, subject, message) {
  // 1. Navigate to the Contact page
  await driver.get("http://localhost:3000/contact");
  await driver.sleep(2000); // Wait for page to load

  // 2. Locate form fields
  let nameInput = await driver.findElement(By.id("name"));
  let emailInput = await driver.findElement(By.id("email"));
  let subjectInput = await driver.findElement(By.id("subject"));
  let messageTextarea = await driver.findElement(By.id("message"));
  let sendButton = await driver.findElement(By.css("button[type='submit']"));

  // 3. Enter form data
  await nameInput.sendKeys(name);
  await emailInput.sendKeys(email);
  await subjectInput.sendKeys(subject);
  await messageTextarea.sendKeys(message);

  // 4. Submit the form
  await driver.sleep(1000); // Short pause before clicking
  await sendButton.click();

  // 5. Wait for success alert or message
  try {
    await driver.wait(until.alertIsPresent(), 5000); // 5-second timeout
    let alert = await driver.switchTo().alert();
    console.log("Alert text:", await alert.getText());
    await alert.accept();
  } catch (error) {
    console.warn("No alert appeared or took too long:", error);
  }
}

module.exports = { fillContactForm };


