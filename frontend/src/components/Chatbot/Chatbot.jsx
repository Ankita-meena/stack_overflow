import React, { useState } from 'react';
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import './Chatbot.css';

const Chatbot = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOTP] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [otpVerified, setOTPVerified] = useState(false);

  const handleAuthenticate = () => {
    if (phoneNumber.trim() === '') {
      setErrorMessage('Phone number is required.');
    } else {
      setErrorMessage('');
      // Perform additional validation if needed
      setAuthenticated(true);
    }
  };

  const handleVerifyOTP = () => {
    if (otp.trim() === '') {
      setErrorMessage('OTP is required.');
    } else {
      setErrorMessage('');
      // Perform OTP verification logic (you can simulate it here)
      setOTPVerified(true);
    }
  };

  const handleChat = () => {
    if (question.trim() === '') {
      setErrorMessage('Question is required.');
    } else {
      setErrorMessage('');
      // Simulate chatbot response
      setAnswer('This is a sample answer from the chatbot.');
    }
  };

  return (
    <div className="chatbot-container">
      <LeftSidebar />
      <h1>Chatbot</h1>
      {!authenticated && (
        <>
          <div className="input-group">
            <label htmlFor="phone-number">Phone Number:</label>
            <input
              type="text"
              id="phone-number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button className="authenticate-btn" onClick={handleAuthenticate}>
            Authenticate
          </button>
        </>
      )}
      {authenticated && !otpVerified && (
        <>
          <div className="input-group">
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
            />
          </div>
          <button className="verify-otp-btn" onClick={handleVerifyOTP}>
            Verify OTP
          </button>
        </>
      )}
      {authenticated && otpVerified && (
        <>
          <div className="input-group">
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <button className="chat-btn" onClick={handleChat}>
            Chat
          </button>
        </>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {answer && <p className="answer">Answer: {answer}</p>}
    </div>
  );
};

export default Chatbot;
