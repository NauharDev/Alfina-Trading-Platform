# Trading Rule Builder  

## Team Members  
- **Nauhar** – Trading Rule Builder Frontend 
- **Shahbaz** – UI/UX & Frontend Integration

## Features Built  
- ✅ Implemented the frontend of the no-code trading rule builder, allowing users to create trading rules using a intuitive dropdown interface 
- ✅ Implemented the Universe, Signal, Holding Period and Exit Condition sub pages.  
- ✅ Built a boolean operation builder, allowing users to build boolean operations using dropdown menus which will be used to represent signals and holding periods.
- ✅ Shahbaz’s work on UI/UX & frontend integration is accessible at this link: https://project-20-alfina-technologies.vercel.app/stockrulebuilder.
- ✅ Developed the arithmetic logic for the stock rule builder, enabling users to create and validate arithmetic expressions within trading rules.
- ✅ Implemented rule-saving functionality, allowing users to persist their created trading rules.
- ✅ Ensured trading rules are accessible and can be retrieved from Stock Rule Builder.

  
## What Worked Well?  
- 🎉 The dropdown UI is very intuitive and it was easy to style the components using Tailwind CSS.  
- 🎉 Previous meetings with Kevin and the team ensured that I had a solid understanding of the desired design, enabling me to build quickly.  
- 🎉 Next.js offered an intuitive and organized folder structure, allowing me to create a separate sub-folder for the rule builder pages and components.
- 🎉 The arithmetic logic builder integrates well with the no-code trading rule builder, ensuring flexibility for users.

## Challenges & What Didn’t Work Well?  
- ❌ Challenge: Figuring out how to make the dropdown selections persist across sub-pages (e.g. when a user fills in a dropdown menu on the "Universe" tab and goes to the "Holding Period" tab and then back to the "Universe" tab, their selections should still be there) I overcame this issue by using a state variable in page.tsx that keeps track of the dropdown menu selections for each individual conditional operation component.
- ❌ Validating Complex Arithmetic Expressions – Implementing logic that allows users to create valid arithmetic expressions while preventing errors required careful handling of input constraints.
- ❌ Ensuring Saved Rules Persist & Are Accessible – Managing rule persistence and retrieval in the UI required debugging to ensure a smooth user experience.  

## Improvements for Future Deliverables  
- 📌 Integrate the trading rule builder with the arithmetic expression builder (built by Shahbaz) so that the user can be redirected to that page when they click on "Modular Payload System"
- 📌 Implement more unit tests for the trading rule builder page and the sub-components used by this page.
- 📌 Add on-click logic to the "finish" button to allow the user to save their trading rules and be redirected back to their main dashboard.
- 📌 Improve UI feedback for rule saving, ensuring users receive confirmation when a rule is successfully saved.
- 📌 Refine Arithmetic Display Logic – Some display inconsistencies exist in how arithmetic expressions are rendered, requiring improvements for better clarity and usability.


