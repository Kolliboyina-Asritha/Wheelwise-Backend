const Order = require('../model/order');
const Products = require('../model/products');
const createOrder = async (req, res) => {
  try {
    const userEmail = req.user || req.body.buyer.email; // use JWT if available
    const { buyer, items: cartItems, shippingMethod, totalAmount } = req.body;
     if (!buyer || !cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Missing buyer or items" });
    }

    const enrichedItems = [];

    for (const item of cartItems) {
      const product = await Products.findById(item.productId);
      if (!product) continue;

      enrichedItems.push({
        productId: product._id, // must be ObjectId
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: item.quantity
      });
    }

    if (!enrichedItems.length) {
      return res.status(400).json({ message: 'No valid products to place order.' });
    }

    const newOrder = new Order({
      userEmail,
      buyer,
      items: enrichedItems,
      shippingMethod,
      totalAmount
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Order failed." });
  }
};
const updateOrderStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const update = { status };
    if (status === 'delivered') {
      update.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    res.json(order);
  } catch (err) {
    console.error('Failed to update order status:', err);
    res.status(500).json({ message: 'Error updating order' });
  }
};
const getUserOrders = async (req, res) => {
  try {
    const userEmail = req.user || req.body.email; // from JWT or body
    const orders = await Order.find({ userEmail }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Failed to fetch user orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
};


// ✅ Export both
module.exports = {
  createOrder,
  updateOrderStatus,
  getUserOrders
};

