import stripe from 'stripe';
import Subscription from '../models/Subscription.js';

const stripeSecretKey = 'sk_test_51NCJyUSEV4yMd4uhk1n1VkVh5UGlp2kQSrnRfrJqqOnGZNPaszKmQuvO7lH6cvnxrOKWDyPPFPybzsHzrNLUR7KY00bDh1gbej';
const stripeInstance = stripe(stripeSecretKey);

export const createSubscription = async (req, res) => {
  const { paymentMethodId, planId, customerId } = req.body;

  try {
    await stripeInstance.paymentMethods.attach(paymentMethodId, { customer: customerId });
    await stripeInstance.customers.update(customerId, { invoice_settings: { default_payment_method: paymentMethodId } });

    const subscription = await stripeInstance.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }],
      expand: ['latest_invoice.payment_intent'],
    });

    // Store the subscription in the database
    const savedSubscription = await Subscription.create({
      paymentMethodId,
      planId,
      customerId,
    });

    res.json({ subscription: savedSubscription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a subscription. Please try again.' });
  }
};

export const getSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the subscription. Please try again.' });
  }
};

export const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { paymentMethodId, planId, customerId } = req.body;

  try {
    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { paymentMethodId, planId, customerId },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    res.json({ subscription });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the subscription. Please try again.' });
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findByIdAndDelete(id);

    if (!subscription) {
      return res.status(404).json({ error: 'Subscription not found.' });
    }

    res.json({ message: 'Subscription deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the subscription. Please try again.' });
  }
};
