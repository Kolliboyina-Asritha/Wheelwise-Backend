// ✅ Razorpay Setup & Order Route for Express Backend
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const crypto = require('crypto');

// Replace with your test keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

// Route to create order
router.post('/create-order', async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: 'order_rcptid_' + Date.now(),
      payment_capture: 1 // auto capture
    });
    res.json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ message: 'Order creation failed' });
  }
});

// OPTIONAL: Verify payment signature (if you implement webhook security)
router.post('/verify-signature', (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.json({ valid: true });
  } else {
    res.status(400).json({ valid: false });
  }
});

module.exports = router;
