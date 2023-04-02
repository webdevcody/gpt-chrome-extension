const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();

const express = require("express");
const app = express();

app.use(express.json());

app.post("/text-completion", async (req, res) => {
  const prompt = req.body.prompt;

  console.log("Prompt:", prompt);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: `please summarize the following blog post article: ${prompt}`,
        max_tokens: 1000,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_KEY}`,
        },
      }
    );

    const completion = response.data.choices[0].text;
    res.json({ completion });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching completion." });
  }
});

app.listen(8080);
