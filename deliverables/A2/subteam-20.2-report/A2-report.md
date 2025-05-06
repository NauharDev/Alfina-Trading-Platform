# Subteam 20.2 - Assignment 2 Report: AI-Powered Rule Builder Assistant

by Nauhar Kapur and Shahbaz Nanda

## Part 1 – Planning

### 1. Identifying the Problem/Improvement
Alfina Technologies' flagship product is a no-code trading strategy builder to allow traders with little to no coding experience to build and test
their trading strategies. Their target users are retail traders and small to medium institutional investors who are well attuned to the theoretical 
fundamentals of trading. Upon entering the Alfina rule builder platform, users can immediately start building strategies of varying complexities, 
but there is a lack of guidance from the platform itself during the rule building process. This self-directed approach presents itself as a barrier
for new traders who want to use the application. By implementing a feature that assists beginner investors in developing trading strategies, Alfina 
Technologies can position itself as the only no-code trading strategy builder on the market that is designed for investors of all skill levels.

**Solution:**
Implement an AI-powered rule builder assistant that generates personalized trading rules based on the user's risk profile, trading style (day trading, swing
trading, long-term investing, etc.), and preferred asset class. This feature will enhance the Alfina Trading Platform in the following ways: 
- Personalization: Users will have a more personalized experience as the assistant will provide tailored suggestions based on the user's information.
- Efficiency: Users who are new to investing will not have to spend hours teaching themselves the ins and outs of trading- the assistant will provide reasoning behind its output and why specific conditions are ideal for the user
- Improved Decision-Making: The assistant will have a deep understanding of algorithmic trading and financial markets, and it will apply this knowledge when generating recommendations to help the user build a profitable strategy.

### 2. Criteria, Research, Selection

**Selection Criteria:**
- The assistant should have context of the user's risk profile, preferred asset class and trading style
- Should provide explanations behind the output using language that is appropriate for the user
- Must operate with minimal latency
- Should be able to scale and handle increased traffic (min. 100 requests per minute if using an API)

**AI Technology Options:**

| Option | Pros | Cons | Integration Complexity |
|--------|------|------|------------------------|
| GPT-4 API | - Can fine tune using dataset of high performing strategies from Alfina Users <br> - Explains why the generated rule works <br> - Rule generation without a dataset| - More expensive than an in-house solution <br> - Can be implemented only after Alfina has acquired a diverse group of frequent users | Simple (API call) |
| Custom-Made ML Model (XGBoost) | - More Deterministic than an LLM <br> - Cheaper to maintain and scale (no third-party API) | - Requires data gathering and dataset creation <br> - Does not explain why the strategy is suitable for the user | Medium (additional backend endpoints required) |

**Selected Approach:** Fine tune an LLM (GPT-4 or Deepseek V3) on a dataset of previous successful teading strategies built on the Alfina Treading Platform to enable the LLM to generate personalized and high-performing trading strategies based on the user's profile.

**Justification:**
- **Feasibility:** Fine tuning requires a smaller dataset in comparison to training a model from scratch. We will already have the data, only pre-processing is required. Training an ML model from scratch would likely require manual dataset creation as our use case is very niche (predicting successful trading rules from user trading profile info), which is very time consuming.
- **Accuracy:** Fine tuning the LLM with historical trading data and providing relevant context (user's trading profile info) minimizes the chance for erroneous output or hallucinations, as the LLM will have domain-specific knowledge.
- **Tech Stack Integration:** Can be integrated into the frontend with API endpoints
- **Explainability and User Experience:** The LLM can provide trading rule suggestions and provide explanations behind its decisions, which will help new traders learn about the different rule parameters and feel confident in the AI's output.
- **Scalability:** OpenAI API allows up to 1000 requests per minute to gpt-4.5-preview with their Tier 1 option, and they can scale up to 10000 RPM with Tier 5.

**Data Requirements:**
- Access to the user's trading profile information (e.g. risk profile, preferred asset class, trading style, etc.)
- Previous trading strategies made on the Alfina platform, the trading profile of the user who made the strategy, and a measure of the strategy's profitability to date.

**Implementation Strategies:**
- Store user profile information and trading strategy information in an SQL database, hosted on the cloud (e.g. Amazon RDS) for maximum security and scalability
- Read database information into Pandas dataframe and perform pre-processing (e.g. filter to keep the most successful strategies)
- Host the fine-tuned model on the cloud to maximize scalability and make it accessible through an API

**Data Privacy and Ethical Considerations:**
- We must not pass any PII to the LLM and only provide the model with data that is directly relevant for generating the trading strategy recommendation. We must maintain transparency and clearly state the data being sent to the LLM in the privacy policy.
- Data will not be passed to the AI unless the user specifically opts into the service AND interacts with the AI to trigger the generation of a recommendation.

## Part 2 – Impact Analysis

### Current vs. AI-Enhanced User Experience
Currently, there is no form of intelligent assistance for users of the Alfina Trading Platform. Consequently, the platform is only accessible to seasoned traders who are 
have professional experience or have undergone rigorous education in the field of quantitiative finance. However, there are many individuals who want to learn how to trade but 
are unable to start due to the large barrier to entry. Alfina Technologies would be missing out on a large group of users without the inclusion of a beginner-friendly 
strategy builder, and this feature addresses the problem by providing new traders with personalized strategy recommendations and explanations on why the strategy works. Therefore,
this feature not only provides beginners with insight, but it teaches them the fundamentals of strategy development, allowing them to break into the world of quantitative finance through 
Alfina's platform.

### Testing Methodology

**Simulation Testing (Backtesting):**
- Test the generated strategy on historical data from the preferred asset class of the user
- Analyze short, medium and long term profitability with respect to the user's profile (e.g. are the changes in profit very rapid/volatile? Is this strategy better in the short-term or long-term?

**Cross-validation with Expert Traders:**
- Present the generated strategy to ex-quant traders/quant researchers from the Alfina team to get an expert perspective on how well the strategy matches the user's trading profile
- Perform the same analysis with traders from outside the Alfina organization to get an unbiased perspective

**A/B Testing with users:**
- Gather a small group of interested users (e.g. students from Rotman Commerce or other business schools/programs) and split them into 2 sub-groups
- One sub-group receives the fine-tuned LLM and another group receives a generic LLM to converse with and ask for trading strategies
- Gather and analyze feedback regarding their experience interacting with the AI, their ability to understand the AI's explanations, and the AI's ability to provide a personalized strategy

### Trade-offs Analysis

**Advantages:**
- More personalized user experience
- Broadens Alfina Technologies' target audience and helps increase market dominance
- Insight and recommendations backed by data help users feel more confident when building strategies
- Feasible to build: data is available, data gathering and dataset creation not required, less data required (can start building sooner)

**Challenges:**
- Potential latency concerns with higher number of requests per minute: OpenAI offers ways to mitigate latency increases (e.g. streaming, chunking)
- Initial data pre-processing may take some time and will require lots of attention to ensure valuable data is kept and PII is filtered out and removed from the final dataset
- Converting dataset into a format that is accepted by fine tuning libraries (e.g. transformers.Trainer works well with JSONL)

**Resource Implications:**
- Frontend development work to make API endpoints accessible to frontend.
- Hosting the fine-tuned model (preferably on the cloud to maximize scalability) and making it accessible through an API will require some backend development work
- Data pre-processing work will require individuals who are familiar with SQL and data science libraries like Pandas and Numpy.
