================================================================
        LINGUAFLOW - AI AGENT ANALYSIS PROMPTS
================================================================


1. LEARNING VELOCITY ANALYSIS
------------------------------
Analyze the user's weekly fluency score progression (W1–W6 data). 
Calculate their learning velocity (points gained per week), identify 
acceleration or plateau phases, and predict when they'll reach the 
next fluency milestone (e.g., 90/100). Flag if momentum is slowing.


2. CONSISTENCY & HABIT SCORE
------------------------------
Based on daily practice minutes (Mon–Sun), calculate a Consistency 
Score (0–100). Penalize missed days, reward streaks. Identify their 
most and least active days and suggest an optimal daily schedule 
based on their historical performance peaks.


3. SKILL BALANCE REPORT
------------------------------
Using time-spent percentages (Grammar 35%, Vocabulary 25%, Speaking 
20%, Listening 20%), identify over-practiced and under-practiced 
skills relative to the user's fluency bottlenecks. Recommend a 
rebalanced weekly plan as a specific percentage split.


4. WORD RETENTION HEALTH
------------------------------
The user has learned 1,240 words. Estimate likely retention rate 
using spaced repetition decay curves. Identify how many words are 
at risk of being forgotten this week and recommend a review session 
duration to maintain >85% retention.


5. PRONUNCIATION TREND ALERT
------------------------------
Pronunciation Issues dropped by 2 vs last week. Analyze whether this 
is linked to specific practice types (speaking vs listening). Identify 
which phoneme clusters historically cause issues and generate a 
targeted 5-minute daily drill recommendation.


6. WEEKLY PERFORMANCE ANOMALY DETECTOR
------------------------------
Compare this week's stats (lessons, minutes, fluency delta) against 
the user's personal 4-week average. Flag any anomalies (unusually 
high or low sessions). Suggest whether an anomaly is a burnout risk 
or a breakthrough moment worth reinforcing.


7. MICRO-GOAL GENERATOR
------------------------------
Based on current fluency (85/100), words learned (1,240), and 
listening accuracy (92%), generate 3 specific, achievable micro-goals 
for this week. Each goal must include: the target metric, the exact 
activity, and the estimated time investment in minutes.


8. COMPARATIVE BENCHMARKING
------------------------------
Compare the user's stats against typical learner benchmarks at 
similar fluency levels (85/100). Highlight where they're ahead 
(e.g., listening accuracy), where they're on par, and where they 
lag behind peers. Frame this encouragingly with actionable gaps.


================================================================
        BONUS: DYNAMIC INSIGHT PROMPT (COMBINES ALL DATA)
================================================================

You are a language coach AI. Given this learner's full weekly snapshot:
- Fluency: 85/100 (+6 pts)
- Practice: 340 mins (+12%)
- Words Learned: 1,240 (+45)
- Listening Accuracy: 92% (+3%)
- Pronunciation Issues: 3 (-2)
- Skill split: Grammar 35%, Vocabulary 25%, Speaking 20%, Listening 20%
- Daily minutes: [Mon–Sun array]

Generate a 4-part coaching report:
1. WINS this week (celebrate specific numbers)
2. RISK SIGNALS (anything that could stall progress)
3. THIS WEEK'S PRIORITY (one focused action)
4. LONG-TERM OUTLOOK (3-week projection if trend continues)

Keep tone motivating, data-backed, and under 150 words total.


================================================================