import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: Array,
  total: Number,
  paymentIntentId: String,
  paid: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
