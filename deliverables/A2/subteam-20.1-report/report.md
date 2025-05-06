# Subteam 20.1 - Assignment 2 Report: Sentiment based indicator 

by Guransh Singh, Krisha Kalsi & Gurveen Kaur Sahni

## Part 1 – Planning  

### 1. Identifying the Problem/Improvement  
Alfina is a **no-code trading strategy builder and backtesting platform** where traders with little to no experience can create and test their own strategies before using them in the real-time market. Here, people can use pre-made indicators and define new rules and metrics on which to base their strategies. 

Currently, our historical data lacks an indicator for historical sentiment around stocks. However, sentiment—reflected in social media, news, and public discourse—plays a significant role in shaping investor behavior and market movements. Traditional financial models, based on the Efficient Market Hypothesis (EMH), assume that markets are perfectly efficient and that asset prices fully reflect all available information. However, the Adaptive Market Hypothesis (AMH) challenges this view, arguing that market participants are not always rational. Instead, stock prices can be influenced by factors such as news events, social media trends, political developments, and broader economic conditions.

This shift in understanding suggests that relying solely on financial stock data may be insufficient for accurate market predictions. Without sentiment-based metrics, trading strategies may miss an important dimension of market behavior. Integrating such data could improve our platform’s predictive power and help users make more informed decisions.

### Solution  
We propose adding an **AI-powered sentiment analysis indicator** to Alfina’s **backtesting capabilities**. By analyzing social media, news, and financial reports, this feature will assess market sentiment—helping traders identify bullish or bearish trends based on public perception. For this, we would have to preprocess this data and store it with the historical dataset so that it can be used properly to inform users to refine their strategies. 

Benefits of Sentiment Analysis Integration:
- **Improved Strategy Evaluation:** Traders can incorporate sentiment alongside market prices and technical indicators for a more comprehensive approach.
- **Data-Driven Decision Making:** Traders would be able to base their strategies on mathematical functions, market prices, and market sentiment. 
- **Enhanced Personalization:** Users can apply sentiment analysis based on their preferred asset class and trading style.  

---  

### 2. Criteria, Research, Selection  

#### Selection Criteria  
1. **Historical Sentiment Integration** – The Model must be able to do NLP and analyze the sentiment behind the language.   
3. **Training Time** – The training/tuning time of the model should be less. 
4. **Minimal Latency** – Sentiment data retrieval must be optimized to avoid slowing down backtesting performance.  
5. **Accuracy** – The model should have a reasonable accuracy for the analysis.

## AI Technology Options  

### Model choice

| Option             | Feasibility | Performance | Integration Complexity |
|-------------------|------------|------------|------------------------|
| **FinBERT**       | - Designed for financial applications <br> - Built on BERT architecture <br> - Open-source with pre-trained models available <br> - Explicitly trained on financial text from sources like Yahoo! Finance & RedditFinanceQA <br> - Available in the Hugging Face repo | - High accuracy in finance-related sentiment analysis <br> - Captures financial terminology and market-specific language patterns effectively | Moderate |
| **Twitter RoBERTa** | - Optimized for social media sentiment <br> - Fast and effective for tweet-based analysis | - May not generalize well to financial news | Moderate |  
| **NLTK** | - Lightweight, rule-based sentiment analysis <br> - Fast and easy to integrate | - Making it compatible with financial data would be hard | Simple |  
| **Custom ML Model** | - Requires labeled datasets <br> - Needs constant updates to stay relevant <br> - Training and maintaining it would be expensive and time-consuming | - More deterministic than LLM-based models <br> - Can be fine-tuned on historical trading data but requires significant effort | High (dataset creation + training pipeline required) |
| **BERT**         | - State-of-the-art pre-trained model using Transformers <br> - Captures contextual relationships in sentences <br> - Not inherently designed for finance but used in FSA research with good results <br> - Exceptional general NLP performance (GLUE benchmark, SQuAD, SWAG datasets) | - Strong at general language understanding <br> - May lack financial domain expertise compared to FinBERT | Moderate |
| **RoBERTa**       | - Evolution of BERT architecture <br> - Trained on longer sentences with a larger dataset (160GB) <br> - Augmented training data and batch size improve contextual learning <br> - Used in FSA research with strong performance despite not being finance-specific | - Outperforms BERT in many NLP tasks <br> - Greater exposure to text improves comprehension and adaptability | Moderate to High |
| **Bloomberg-GPT** | - Adaptation of GPT model for financial sentiment analysis <br> - Trained on vast financial news and datasets <br> - Requires API access or licensing | - Outperforms general-purpose NLP models in finance-related tasks <br> - Highly specialized for economic and market sentiment | High (due to licensing and API integration) |



#### DataSets for Training
As making a custom model requires a lot of time and manpower we would prefer to use premade models. They require no training. But we can always try to make them better by using transfer learning; for that we can use the following sources:
1. **Financial PhraseBank**: It is a collection of financial news headlines labelled as positive, negative and neutral. LINK: https://www.researchgate.net/publication/251231364_FinancialPhraseBank-v10
2. FiQA dataset: introduced at the WWW ’18 conference, contains questions and answers from financial reports and is widely used for training and evaluating NLP models in finance. It includes a sentiment scoring system ranging from -1 (negative) to 1 (positive). LINK: https://dl.acm.org/doi/10.1145/3184558.3192301

### Some Data Preprocessing Strategies 
We could implement various preprocessing to improve the accuracy of our sentiment analysis. These could include: 
- Tokenization: Breaking text into individual words or phrases to enable efficient NLP processing.
Lemmatization: Reducing words to their base form to improve consistency in sentiment classification.
- Hashtag & Emoji Processing (for Social Media Data): Mapping hashtags and emojis to sentiment indicators, as they often carry strong emotional signals.

### Bias mitigation Strategies
In the current datasets that we have proposed, the distribution of sentences across three classes (positive, negative, neutral) are imbalanced. These could affect the generalisability of the model we fine-tune using this data. 

We could partially mitigate this by removing duplicate sentence instances, normalizing of the sentences using lemmatization, and comparing sentiment scores across different sources to ensure consistency and avoid favoring certain opinions disproportionately.

### Ethical considerations: 
- Data Anonymization: If using social media or user-generated content, we must anonymize personal information (e.g., usernames, locations) to comply with privacy laws (e.g., GDPR, CCPA).
- Avoid Market Manipulation Risks: Sentiment analysis models should not contribute to misinformation or encourage market movements based on biased or incomplete data. Therfore, we must provide users with terms and conditions and disclaimers as pop-ups to warn them of potential risks. We should also show confidence intervals and uncertainty measures with sentiment scores to indicate reliability.
- Transparency & Explainability: Traders and users should understand how sentiment scores are generated and what factors influence them.


## Part 2 – Impact Analysis  

### 1. Product Improvement with AI Integration  

**Before AI Integration:**  
- **Limited Insight:** Traders rely solely on price-based indicators, which do not capture the nuanced market sentiment.
- **Lack of Emotional Context:** There is no factor to account for emotional and trust-based insights derived from financial news and social media.
- **Inefficient Strategy Formulation:** Traders must manually research sentiment trends, leading to potential inefficiencies and slower decision-making. 

**After AI Integration:**  
- **Data-Driven Insights:** Provides additional sentiment-based metrics that complement traditional price indicators, offering a more comprehensive view of market dynamics.  
- **Automation Efficiency:** Eliminates the need for manual sentiment research by automating sentiment scoring, saving time and streamlining strategy development.


### 2. Testing and Evaluation  
To ensure the effectiveness of the sentiment-based indicator, we will implement the following evaluation methods:

- **Unit Testing:**  
  Develop and run tests for individual components of the sentiment analysis pipeline (e.g., text preprocessing, sentiment classification, and scoring) to verify that each module accurately processes financial news and social media data.
  *Success Metrics:* Each module passes predefined test cases and meets accuracy thresholds.

- **Backtesting Comparison:**  
  Execute trading strategies using historical data with and without the sentiment indicators. Compare key performance metrics (e.g., return on investment, drawdown) to assess the added value of integrating sentiment analysis.
   *Success Metrics:* Statistically significant improvement in trading performance metrics when sentiment analysis is included.

- **A/B Testing:**  
  Conduct real-world trials by splitting users into two groups: one using sentiment-based indicators alongside traditional metrics, and one relying solely on traditional metrics. Monitor performance differences and gather user feedback to validate the impact of sentiment data on decision-making.
  Success Metrics:* Improved user engagement, higher satisfaction scores, and measurable strategy performance enhancements in the test group.

- **Model Validation:**  
  Evaluate the sentiment classification model using labeled financial datasets. Key performance indicators such as precision, recall, and F1-score will be calculated to ensure the model accurately classifies sentiment and reliably supports the trading strategies.
  *Success Metrics:* Achieving predefined thresholds for precision, recall, and F1-score.


### 3. Trade-offs and Considerations

| Factor               | Without AI                            | With AI                                                 |
|----------------------|---------------------------------------|---------------------------------------------------------|
| **Processing Speed** | Fast, as it processes only price data | Slightly slower due to real-time sentiment analysis      |
| **Accuracy**         | Limited to price data only             | Enhanced by combining price data with sentiment insights |
| **Scalability**      | Processes historical prices only       | Requires additional storage and processing for sentiment data <br> Would need to find source that provided up to data information on public sentiment to maintain sustainable functionality|
| **User Experience**  | Manual sentiment research needed       | Automated sentiment insights improve decision-making     |

**Key Considerations:**

- **Increased Latency:**  
  We recognize that integrating real-time sentiment analysis can add delays in data retrieval and processing. Optimizing our NLP pipelines and caching mechanisms will be essential to keep latency minimal during backtesting.

- **Resource Consumption:**  
  We understand that running AI models such as FinBERT or Twitter RoBERTa alongside our existing indicators requires extra computational resources. It is important for us to balance model complexity with inference speed to maintain overall system performance.

- **User Experience Improvements:**  
  We aim to present enhanced sentiment indicators in an intuitive format, possibly through new UI components or dashboards that integrate sentiment scores with traditional metrics. Additionally, we must ensure that the interface provides actionable insights without overwhelming users with too much raw data.

### Additional Challenges

- **Data Quality and Noise:**  
  Social media and news data can be inconsistent or contain misinformation. Filtering out irrelevant or low-quality information is critical for accurate sentiment analysis.








