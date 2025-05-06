# Team Report  

## Implementation Phase Overview  
At the start of the **Implementation Phase**, the team established a strong technical foundation to ensure smooth development. This included:  

- 🚀 Setting up **authentication systems** with Google and GitHub login.  
- 🚀 Designing a **modular architecture** for user-defined trading rules.  
- 🚀 Establishing a **real-time data update system** for portfolio visualization.  
- 🚀 Developing a **clean and intuitive UI framework** for core pages like the **Model Dashboard, Landing Page, and About Us section**.  

From the beginning, the team focused on **scalability, usability, and real-time performance**, ensuring that each sub-team's contributions would integrate seamlessly into the larger system.  

## Project Planning
### Plan Summary
### System Model
<img src="https://github.com/user-attachments/assets/416a048e-317c-46cc-9b26-bb96122b5f29" width=1000/>


### Division of Work
**Authentication & Login** (*Guransh, Krisha & Gurveen*)  
**Trading Rule Builder** (*Nauhar & Shahbaz*)  
**Model Dashboard, About Us & Landing Page** (*Ron & Jakub*)  

### Tech Stack

Here is a summary of the technologies that we are using for this project, as well as our reason for choosing each technology: 
- **Next.js:** A React framework that supports both server-side rendering and client-side rendering, making it easy to develop interactive and high-performing applications. Next.js has an intuitive App router system that enables developers to define new routes simply by adding sub-folders within the App folder. With out-of-the-box features like Tailwind CSS integration and TypeScript support, Next.js is the ideal pick for us and will allow us to build a scalanble and maintainable frontend system.
- **TypeScript:** TypeScript is a statically-typed version of JavaScript that enforces data type constraints during development. TypeScript's type safety checks help catch bugs before runtime, saving developers a lot of time (and a lot of console.log() statements). These factors made TypeScript seem like the ideal language to use when building scalable frontend systems, which is why the team adoped this language.
- **React.js:** The team decided to choose React.js primarily because we all have experience using it for previous projects. On top of this, React.js is one of the most tried and tested JavaScript libraries for frontend development, and it is commonly used in industry. Its component-based architecture allows developers to package chunks of HTML into functions that can be neatly reused as components across the application, ensuring consistency and organization across the codebase. The virtual DOM also improves performance by minimizing changes to the real DOM.
- **OAuth:** We chose to use OAuth to enable login from third-party accounts like Google and Github. Logging in using third-party providers improves the user experience as users do not have to go through the entire account creation process. Addtionally, this method of login also improves security as users do not need to manage a separate password to use our app- they can simply use one of their existing accounts.
- **Firebase Cloud Firestore:** We chose to use Cloud Firestore to store user account credentials when users log into our application directly with email and password (i.e. not through a third party). Cloud Firestore was the optimal choice because they provide automatic hashing of passwords and provides APIs for advanceed authentication workflows, upholding user security while being flexible enough to adapt to a variety of authentication techniques.
- **Tailwind CSS:** The team decided to use Tailwind CSS since we find value in the enhanced development experience that it offers. Instead of having to create separate CSS files for our HTML, we can add styling directly to specific HTML components in the same file that they are being created, making the codebase easier to understand and more compact.
- **Google Cloud Provider:** We are using Google Cloud Provider as it provides an API endpoint to verify the authenticity of Google accounts. We leverage this service when users sign in using Google, and this verification adds another layer of security to our authentication workflow.

## Sub-Team Contributions & Overall Progress  

### **Authentication & Login** (*Guransh, Krisha & Gurveen*)  
✅ Implemented **Google and GitHub authentication** for seamless user access.  
✅ Ensured **session persistence** and robust **error handling** for login failures.  

### **Trading Rule Builder** (*Nauhar & Shahbaz*)  
✅ Developed a **no-code trading rule builder**, allowing users to define signals via dropdowns.  
✅ Built a **real-time validation system** to prevent conflicting or invalid rules.  

### **Model Dashboard, About Us & Landing Page + Selenium Testing** (*Ron & Jakub*)  
✅ Created a **dashboard** for real-time **visualization of portfolio states and trading rules**.  
✅ Designed and deployed the **About Us and Landing Page** to establish a professional user-facing presence.  

## Roadmap Progress  
Compared to the original **Planning Phase** roadmap, the team has made significant progress:  

- ✅ **Core authentication** and session management were successfully implemented.  
- ✅ The **trading rule builder** was fully developed with real-time validation.  
- ✅ The **dashboard and key UI components** were built with a focus on usability.  

While foundational features have been implemented, further optimizations—such as **improving real-time updates** and **refining validation mechanisms**—are planned for upcoming iterations.  

## Major Technical & Organizational Challenges  

### 🔹 **Handling Authentication Edge Cases**  
**Challenge:** Debugging OAuth **token expiration** and **session management inconsistencies**.  
**Solution:** Improved **error handling** and plans to introduce **automated tests** for session persistence.  

### 🔹 **Ensuring Rule Validation & Dropdown Functionality**  
**Challenge:** Managing **edge cases in trading rules**, such as conflicting conditions.  
**Solution:** **Early-stage user testing** and **refactoring the code** for better modularity.  

### 🔹 **Real-Time Data Handling in the Model Dashboard**  
**Challenge:** **UI inconsistencies** due to frequent **state updates**.  
**Solution:** Optimizing **state management** and refining **data structures** for better performance.  

### 🔹 **Balancing Feature-Rich UI with Simplicity**  
**Challenge:** Designing **intuitive interfaces** while maintaining **functionality**.  
**Solution:** **Iterative feedback cycles** and **usability testing** to refine UI components.  

## Next Steps & Focus Areas  

📌 **Enhance error handling and testing** – Introduce **automated tests** for authentication and trading rule validation.  
📌 **Optimize real-time updates** – Improve **state management** in the dashboard for a smoother user experience.  
📌 **Refine UI/UX consistency** – Further simplify **complex features** while maintaining usability.  
📌 **Strengthen documentation** – Create **internal guides** to streamline debugging and future development.  

With a solid foundation in place, the team is well-positioned to **refine and expand** the system in the next phase. 🚀  



# Alfina Trading Platform - Detailed MVP User Stories

This document provides a detailed breakdown of Minimum Viable Product (MVP) user stories, their implementation steps, technical details, and testing scenarios for the Alfina Trading Platform.

---

## 1. Browsing Predictors and Transformations

### User Story
As a beginner trader, I want to browse a library of predefined predictors and transformations, so I can visualize different trading strategies and choose one that fits my needs without coding.

### Detailed Description
This feature allows users to explore a library of pre-built predictors and transformations to develop trading strategies. Predictors include designed algorithms or data-processing steps (like moving averages, volatility, etc.) that can be used to form strategies. 

### User Flow
1. User logs in and navigates to the "Predictor Library" section from the sidebar.
2. Users can see a list of predefined predictors.
3. Users use the search bar and filters (e.g., "momentum," "volatility") to narrow down results.
4. User clicks on a specific predictor to see detailed performance metrics and visualizations.
5. Users can save or discard the selected predictor based on their analysis.

### Technical Details

- **Frontend**:
  - React with state management (Redux or Context API).
  - Charting library (e.g., Chart.js or D3.js) for visualizations.
  
- **Backend**:
  - FastAPI to handle API calls for predictors and performance data.
  - Database queries to pull data from MongoDB.

- **Database**:
  - MongoDB to store predictor details and associated metrics.

### Testing Scenarios
- Verify the predictor search and filter functionalities.
- Test the accuracy of performance metrics and graphs displayed for each predictor.
- Test edge cases (e.g., no results for specific filters).
- Test that visualizations load without errors.

---

## 2. Building and Modifying Trading Strategies

### User Story
As a trader, I want to build and customize trading strategies by combining predictors and transformations, so I can create strategies that align with my trading preferences without needing to code.

### Detailed Description
This feature enables users to create trading strategies by combining multiple predictors, transformations, and rules. It should include an intuitive drag-and-drop interface or an easy form-based approach to add and modify strategy components.

### User Flow
1. User navigates to the “Strategy Builder” section from the dashboard.
2. User is presented with a drag-and-drop interface to select predictors, indicators, and other strategy components.
3. User customizes each component (e.g., adjusts risk tolerance or timeframes).
4. User reviews the strategy, edits parameters if needed, and clicks “Save” to store it for future testing or implementation.
5. User can also modify an existing strategy by selecting it from a list and making necessary adjustments.

### Technical Details

- **Frontend**:
  - React with drag-and-drop functionality for building strategies (using libraries like react-dnd).
  - State management (Redux or Context API) for holding the strategy data.

- **Backend**:
  - FastAPI for handling API calls related to strategy saving, editing, and retrieving.
  - Database to store and manage user-created strategies.

- **Database**:
  - MongoDB or PostgreSQL to store strategy details and components.

### Testing Scenarios
- Test creating a new strategy with various predictors and transformations.
- Verify the accuracy of saving and modifying strategies.
- Test the strategy’s validity when incompatible parameters are chosen.
- Test loading and modifying saved strategies.

---

## 3. Creating Trading Signals

### User Story
As a trader, I want to create custom trading signals by adjusting parameters like span and lookback period, so I can tailor signals based on my research.

### Detailed Description
This feature allows users to create custom trading signals based on predefined factors like moving averages, volatility, etc. The user should be able to define parameters and build a signal without needing to know how to code.

### User Flow
1. User navigates to the “Signal Builder” section from the dashboard.
2. User selects an indicator (e.g., moving average) and adjusts the parameters (e.g., 50-day period).
3. User can immediately see the performance graph updating based on the chosen parameters.
4. User saves the signal if satisfied and can reuse it in strategies or backtests.

### Technical Details

- **Frontend**:
  - React with dynamic form inputs for parameter selection.
  - Use Chart.js or D3.js for real-time visualizations.
  
- **Backend**:
  - FastAPI to handle signal creation and performance data retrieval.
  - Perform signal calculations on the backend for better performance.

- **Database**:
  - MongoDB to store user-generated signals.

### Testing Scenarios
- Test the process of creating a new signal with different parameters.
- Verify that signal graphs update dynamically with parameter changes.
- Test saving and retrieving created signals.
- Test error handling for invalid signal configurations.

---

## 4. Testing Models with Historical Data

### User Story
As a trader, I want to test my trading models with historical data to evaluate their performance (e.g., profit, risk, drawdowns) before using them in live trading.

### Detailed Description
This feature allows users to backtest their trading strategies or signals using historical market data. The user can define the testing period and evaluate metrics such as profit, loss, risk, and drawdowns. Users should be able to browse, filter, and view performance data.

### User Flow
1. User navigates to the “Backtest” section.
2. User selects a strategy or signal for backtesting.
3. User specifies the historical data period (e.g., past 6 months).
4. User runs the backtest and views the performance metrics.
5. User can adjust strategy parameters based on feedback and re-test.

### Technical Details

- **Frontend**:
  - React for displaying performance metrics and backtest results.
  - Chart.js or D3.js for displaying backtest performance visualizations.

- **Backend**:
  - FastAPI to handle backtesting logic and return results.
  - Historical data processing via Pandas or similar libraries for accurate calculations.

- **Database**:
  - PostgreSQL or MongoDB to store backtest results.

### Testing Scenarios
- Test the process of running a backtest with valid data.
- Verify performance metrics (profit, loss, Sharpe ratio, etc.).
- Test invalid scenarios (e.g., insufficient data or model misconfiguration).
- Verify visual feedback is accurate and up-to-date.

---

## 5. Customizing Trading Universe

### User Story
As a trader, I want to select specific assets for my strategies, so I can create a custom asset pool that matches my investment goals.

### Detailed Description
This feature allows users to select specific assets or instruments (stocks, commodities, currencies, etc.) that align with their investment goals. It enables users to create custom asset pools for their strategies.

### User Flow
1. User navigates to the “Asset Pool” section.
2. User searches and selects assets based on predefined criteria.
3. User saves the selection as a custom asset pool for future strategies.

### Technical Details

- **Frontend**:
  - React with dynamic form controls for asset selection.
  - State management for saving and updating asset pools.

- **Backend**:
  - FastAPI for handling asset data retrieval and pool creation.

- **Database**:
  - PostgreSQL or MongoDB for storing asset pool configurations.
