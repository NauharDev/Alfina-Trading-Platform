// import fetch from "node-fetch";

async function testEmailRoute() {
    const testData = {
        name: "Test User",
        email: "test@example.com",
        subject: "Test Email",
        message: "This is a test message from the API test script.",
    };

    try {
        const response = await fetch("http://localhost:3000/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(testData),
        });

        const result = await response.json();
        console.log("✅ API Response:", result);
    } catch (error) {
        console.error("❌ API Request Failed:", error);
    }
}

// Run the test
testEmailRoute();