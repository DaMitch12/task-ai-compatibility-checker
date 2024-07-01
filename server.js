const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.post('/check-task', async (req, res) => {
  const { task } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Evaluate the following task for AI compatibility on a scale of 1-10. Provide a detailed explanation for the rating and categorize it as "AI-compatible", "Partially compatible", or "Human-centric". Task: "${task}"`,
      max_tokens: 150,
    });

    const result = completion.data.choices[0].text.trim();
    const [score, category] = result.split('\n');

    res.json({ score: score.match(/\d+/)[0], category: category.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Error processing the task' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
