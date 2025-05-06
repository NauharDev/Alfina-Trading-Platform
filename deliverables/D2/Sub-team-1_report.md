# Authentication, Login & Deployment

## Team Members  
- **Guransh** – OAuth setup, project setup, login page, vercel deployment and session handling
- **Krisha** – Email authentication, login & signup page, firestore database setup, vercel deployment
- **Gurveen** – Google and Github Authentication, UI Flow & Error Handling, Sign-Up and Login-In page integration with OAuth, Session Management, Testing.  

## Features Built  
- ✅ Implemented sign-in and a connected login with email/password, **Google** and **GitHub**.  
- ✅ Ensured a smooth authentication flow and a user-friendly login experience.  
- ✅ Managed session handling for persistent login for OAuth using next-auth and cookies.  
- ✅ Deployed the interactive webapp using vercel 
- ✅ Implemented appropriate redirection to dashboard for successful authentication and error handling for invalid inputs. 
- ✅ Configured firestore database to track signups and authenticate logins for existing users. 

## What Worked Well?  
- 🎉 Successfully integrated third-party authentication providers (**Google & GitHub**).  
- 🎉 Implemented functional username-password linked to a Google Cloud firestore database and integrated with the firebase SDK. 
- 🎉 We were able implement session cookies to persist for OAuth Login
- 🎉 The authentication flow is seamless, improving user experience.
- 🎉 We implemented a visually appealing UI for the login/signup pages that aligns with design choices used elsewhere in our webapp. 
- 🎉 Despite initial hurdles and a lack of clarity from our partner about deployment options, we were able to successfully deploy all working features of our website on vercel. 

## Challenges & What Didn’t Work Well?  
- ❌ Handling failed login attempts was tricky, especially with provider-specific quirks (e.g., **OAuth token expiration issues**).  
- ❌ Debugging authentication issues took longer than expected due to **limited documentation** on provider-specific errors.  
- ❌ Managing **session persistence** across different devices required additional effort. We are currently using different libraries for OAuth and email-password auth in order to work within the resources provided by our partner (e.g Google Cloud services). This makes it tricky to link the two and ensure compatible session persistence. We will need to look into implementing a more robust cookie session management system across the whole website which we plan on implementing for the next deliverable as our webapp scales. 
- ❌ The setup for Google Cloud was a bit tricky and it took time to get access from the partner.
- ❌ The email id password is not making a session like it's expected to make.
- ❌ Enounctered multiple build and dependency errors, which we navigated by customising vercel's build commands (e.g. for system-agnostic "sharp" dependency installation), and leveraging its array of dashboard features


## Improvements for Future Deliverables  
- 📌 Implement a **comprehensive error-handling system** to catch provider-specific login failures and show cutomized error messages.  
- 📌 Create **documentation** on common authentication issues to speed up debugging.  
- 📌 While email-password authentication updates the database appropriately, we need to implement cookies to enable user-login persistence while accessing other website pages.
