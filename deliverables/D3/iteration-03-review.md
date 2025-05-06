# Team 20 - Stack Overlords

 > _Note:_ This document is meant to be written during (or shortly after) your review meeting, which should happen fairly close to the due date.      
 >      
 > _Suggestion:_ Have your review meeting a day or two before the due date. This way you will have some time to go over (and edit) this document, and all team members should have a chance to make their contribution.


## Iteration XX - Review & Retrospect

 * When: March 9, 2025
 * Where: Online (Zoom)

## Process - Reflection


#### Q1. What worked well

* **Regular communication schedule**: Our team established a consistent communication rhythm with weekly stand-up meetings, a Discord channel with the partner and a Whatsapp group. This ensured everyone was aware of progress and blockers in real-time, which prevented work from stalling and reduced integration issues later.

* **Task management with clear ownership**: Assigning specific components to team members based on their strengths and interests increased accountability and efficiency. Each person knew exactly what they were responsible for and could make decisions within their domain without constant approval from the entire team.

* **Pair programming sessions**: For particularly complex features, we implemented pair programming sessions where two team members would work together. This improved code quality and knowledge sharing across the team, especially for the authentication system and data visualization components. An example includes inconsistent authorization issues, where the team collaborated with pair-coding and solved the problem quickly.


#### Q2. What did not work well

* **Inconsistent development environments**: Team members had different local development setups, which led to "works on my machine" issues and wasted time. Several bugs that appeared in testing weren't reproducible on all machines, making them difficult to track down and fix. This was especially prevalent when team members where on different git commits, due to neglecting to pull from main, at the same time so when collaborating, team members were sometimes very far ahead or behind each other.
  
* **Limited and delayed access to credentials:** The partner and only certain team members had direct access to API keys, Firebase keys/ database credentials. This created bottlenecks where we frequently had to wait hours or sometimes days to receive necessary credentials, significantly slowing development progress and testing cycles.

* **Uneven workload distribution**: Some team members ended up with significantly more work than others due to poor initial task sizing and estimation. This created bottlenecks where progress on certain critical features was dependent on already overloaded team members. Our time estimations were off, and near the end of the deliverable due date, there were unneccessary crunch times. 

#### Q3(a). Planned changes

1. **Merge Freeze 24 Hours Before Demo**  
   - **Reason**: Prevents last-minute conflicts and ensures we have time to test a stable build.  
   - **Plan**: All PRs must be merged at least one day before the demo, with exceptions only for critical bug fixes.

2. **Cross-Training Sessions**  
   - **Reason**: Address the uneven task distribution by having members learn each other’s areas.  
   - **Plan**: Pair a front-end specialist with a back-end specialist for at least one feature per iteration.

3. **Weekend Coverage Rotation**  
   - **Reason**: Ensure at least one person is on-call for urgent issues or questions.  
   - **Plan**: Create a simple schedule so everyone knows who’s available each weekend.


#### Q3(b). Integration & Next Steps
We merged the authentication (Sub Team 1), trading rule builder (Sub Team 2), and model dashboard/landing pages (Sub Team 3) into a single Next.js monorepo, unifying environment variables and data structures. This assignment clarified cross-team dependencies and streamlined the user flow from login to rule creation and portfolio monitoring. It also underscored the need for more robust error handling and improved state management going forward.



## Product - Review

#### Q4. How was your product demo?
- **Preparation**:  
  1. We rehearsed the demo flow twice, each focussing on one specific functionality.  
  2. Each team member had a clear section to present, ensuring smooth handoffs.

- **Demo Content**:  
  1. Showed how to login/signup, create a new trading rule, configure signals, and view real-time notifications.  
  2. Demonstrated the contact form submission and verified it sends user-typed info to our email endpoint.  
  3. Highlighted the interactive dashboard with hover tooltips and Alfina Academy links.

- **Partner Acceptance & Feedback**:  
  The partner appreciated the overall workflow, especially how the UI clearly guides users through rule creation. 

- **Learnings**:  
  1. Final rehearsal caught a small UI glitch in the rule builder, which we fixed just in time.  
  2. Realized the importance of thoroughly testing new features in staging before demo day.  
  3. Understood that ongoing feedback from the partner helps us refine the user experience continuously.
