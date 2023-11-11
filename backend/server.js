const PORT = 8000;
const express = require("express");
const cors = require("cors");
const { default: OpenAI } = require("openai");

const app = express();
const openai = new OpenAI();

app.use(cors());
app.use(express.json());
require("dotenv").config();

app.listen(PORT, () => console.log("Your server is running on port " + PORT));

// assistant instance
const assistant = await openai.beta.threads.create({
  name: "Nike Customer Service Assistant",
  instructions:
    "You are a Customer Service bot for Nike. Respond politely to any questions that the customer might have and try convincing him not to return the product.",
  tools: [{ type: "code_interpreter" }],
  model: "gpt-3.5-turbo-1106",
});

// thread object
const thread = await openai.beta.threads.create();

// message thread
const message = await openai.beta.threads.Messages.create(thread.id, {
  role: "user",
  content:
    "My name is Chris. I want to return a pair of shoes, size 42 because they are not worth the money.",
});
