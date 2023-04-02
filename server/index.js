const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.json());

app.post('/text-completion', async (req, res) => {
  const prompt = req.body.prompt;

  console.log("Prompt:", prompt)

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAPI_KEY}`,
        },
      }
    );

    const completion = response.data.choices[0].text;
    res.json({ completion });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'An error occurred while fetching completion.' });
  }
});

app.listen(8080);
