import React, { useState } from 'react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './Subscription.css';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51NCJyUSEV4yMd4uhdIvt78aoSEGKi0K0X3f8qf26UEwkSoiK7ROYYFoQZjTJCDAiyEb73bOMeaJjTR56X2HAe9zA00lHL63Oga');

const Subscription = () => {
  const [planId, setPlanId] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [subscription, setSubscription] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCardOptions, setShowCardOptions] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubscribe = async () => {
    if (planId && customerId && stripe && elements) {
      try {
        const cardElement = elements.getElement(CardElement);

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });

        if (stripeError) {
          setErrorMessage(stripeError.message);
          return;
        }

        const response = await fetch('/api/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: planId,
            customerId,
            paymentMethodId: paymentMethod.id,
          }),
        });

        const { subscription, error: serverError } = await response.json();

        if (serverError) {
          setErrorMessage(serverError.message);
          return;
        }

        setSubscription(subscription);
        setErrorMessage('');
      } catch (error) {
        setErrorMessage('Failed to create a subscription. Please try again.');
      }
    } else {
      setErrorMessage('Please select a plan and provide a customer ID.');
    }
  };

  const toggleCardOptions = () => {
    setShowCardOptions(!showCardOptions);
  };

  return (
    <div className="subscription-container">
      <LeftSidebar />
      <div className="subscription-content">
        <h1>Subscription</h1>
        <div className="output-group">
          <div className="input-group">
            <label htmlFor="plan-id">Plan:</label>
            <select id="plan-id" value={planId} onChange={(e) => setPlanId(e.target.value)}>
              <option value="">Select a plan</option>
              <option value="free">Free Plan</option>
              <option value="silver">Silver Plan</option>
              <option value="gold">Gold Plan</option>
            </select>
          </div>
          <div className="input-group">
            <label htmlFor="customer-id">Customer ID:</label>
            <input
              type="text"
              id="customer-id"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
            />
          </div>
          <div className="payment-options">
            <button className="payment-option" onClick={toggleCardOptions}>
              Payment Options
            </button>
            {showCardOptions && (
              <div className="card-options">
                <CardElement />
              </div>
            )}
          </div>
          <button className="subscribe-btn" onClick={handleSubscribe}>
            Subscribe
          </button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {subscription && (
            <div className="subscription-details">
              <p>Subscription created:</p>
              <p>Plan: {subscription.plan.name}</p>
              <p>Price: {subscription.plan.price}</p>
              <p>Questions Remaining: {subscription.questionsRemaining}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SubscriptionWithStripe = () => (
  <Elements stripe={stripePromise}>
    <Subscription />
  </Elements>
);

export default SubscriptionWithStripe;
