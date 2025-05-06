# Subteam 20.3 - Assignment 2 Report: Intelligent Assistant for Alfina Dashboard

by Jakub Gierus and Raunak Madan

## Part 1 – Planning

### 1. Identifying the Problem/Improvement

Users of Alfina may struggle to effectively navigate dashboard information and interpret their portfolio performance. New users particularly face a steep learning curve in understanding trading terminology and dashboard metrics.

**Solution:**
Implement an AI-powered assistant within the dashboard that provides:
- Contextual help for dashboard elements
- Portfolio insights and summary explanations
- Terminology clarification for trading concepts
- Personalized dashboard navigation assistance

### 2. Criteria, Research, Selection

**Selection Criteria:**
- Must integrate seamlessly within the dashboard UI
- Should understand financial terminology
- Needs to reference dashboard-specific elements
- Must operate with minimal latency
- Should be scalable as the platform grows

**AI Technology Options:**

| Option | Pros | Cons | Integration Complexity |
|--------|------|------|------------------------|
| GPT-4 / DeepSeek API | Strong comprehension of financial concepts, highly customizable | Higher cost, potential latency issues | Medium |
| Custom fine-tuned LLM | Optimized for specific trading terminology | Requires training data, higher development effort | High |
| Retrieval-Augmented Generation (RAG) | Allows referencing specific platform documentation | Requires maintaining knowledge base | Medium |

**Selected Approach:** Implement a Retrieval-Augmented Generation (RAG) system using an open-source LLM like Llama 3 or Mistral.

**Justification:**
- **Feasibility:** RAG allows us to ground responses in our specific platform documentation without extensive model training
- **Performance:** Open-source LLMs with RAG provide good performance while allowing local deployment options for reduced latency
- **Tech Stack Integration:** Can be implemented via API endpoints that our existing frontend can consume
- **Cost-Effectiveness:** More economical than continuous API calls to proprietary models

**Data Requirements:**
- Documentation of dashboard elements and metrics
- Glossary of trading terminology used in our platform
- Sample user queries for testing and evaluation

**Ethical Considerations:**
- Transparency about AI-generated content
- Clear limitations on financial advice (disclaimer for educational purposes only)
- Privacy considerations regarding user queries and portfolio data

## Part 2 – Impact Analysis

### Current vs. AI-Enhanced User Experience

**Current Dashboard Experience:**
- Users must independently interpret dashboard metrics
- Learning platform-specific terminology requires external research
- No contextual help for complex visualizations
- Navigation relies on self-exploration

**With AI Assistant Integration:**
- On-demand explanations of any dashboard element
- Personalized insights based on user's actual portfolio data
- Interactive guidance for new platform features
- Reduced cognitive load through natural language interaction

### Testing Methodology

**Quantitative Metrics:**
- Time-to-task completion for common dashboard operations
- Reduction in support ticket volume for dashboard-related questions
- User retention rates before and after implementation
- Usage frequency of the AI assistant feature

**Qualitative Assessment:**
- A/B testing with user cohorts (with and without AI assistant)
- User satisfaction surveys focused on dashboard comprehension
- Think-aloud user testing sessions to identify friction points
- Heat mapping of dashboard interaction patterns

### Trade-offs Analysis

**Advantages:**
- Enhanced user onboarding and retention
- Reduced support burden for common questions
- Increased user confidence in platform understanding
- Potential for deeper feature engagement

**Challenges:**
- Initial development and integration effort
- Potential for slight increase in page load time
- Ongoing maintenance of knowledge base
- Need to carefully manage user expectations regarding capabilities

**Resource Implications:**
- Frontend development time for assistant UI
- Backend processing requirements for NLP
- Knowledge base creation and maintenance
- Regular evaluation and refinement based on usage patterns

This AI enhancement aligns directly with our project goals by making the trading platform more accessible to users across experience levels while adding significant value to the dashboard experience.
