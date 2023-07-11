const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy'); // for OTP generation and verification

const app = express();
app.use(bodyParser.json());

// Mock data for questions and answers
const questions = [
  { id: 1, question: 'How to declare a variable in JavaScript?', answer: 'Use the "var" keyword.' },
  { id: 2, question: 'What is the capital of France?', answer: 'Paris.' },
  // Add more questions and answers as needed
];

// User data
let user = {
  phoneNumber: '',
  otpSecret: '',
};

// Generate and send OTP to the user
app.post('/api/otp', (req, res) => {
  const { phoneNumber } = req.body;
  const secret = speakeasy.generateSecret();
  user = {
    phoneNumber,
    otpSecret: secret.base32,
  };
  // Implement OTP sending logic here (e.g., via email or SMS)
  res.json({ success: true });
});

// Verify OTP
app.post('/api/otp/verify', (req, res) => {
  const { otp } = req.body;
  const verified = speakeasy.totp.verify({
    secret: user.otpSecret,
    encoding: 'base32',
    token: otp,
  });
  res.json({ verified });
});

// Endpoint to handle user question submission
app.post('/api/questions', (req, res) => {
  const { question } = req.body;
  const answer = getAnswerFromChatbot(question); // Implement your chatbot logic here
  res.json({ answer });
});

// Helper function to get answer from chatbot
function getAnswerFromChatbot(question) {
  // Implement your chatbot logic here
  // This is a sample implementation that returns a random answer from the available questions and answers
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex].answer;
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
