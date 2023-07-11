import mongoose from "mongoose";
const SubscriptionSchema = new mongoose.Schema({
    planId: { type: String, required: true },
    customerId: { type: String, required: true },
    subscriptionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  export default mongoose.model('Subscription', SubscriptionSchema);