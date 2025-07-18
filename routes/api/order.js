const express = require('express');
const router = express.Router();
const { createOrder, updateOrderStatus,getUserOrders } = require('../../logcontroller/orderController');
const verifyJWT = require('../../middleware/verifyJWT');
const Order = require('../../model/order');

const verifyRoles = require('../../middleware/verifyroles');
const ROLES_LIST = require('../../config/role_list');
router.post('/', verifyJWT, createOrder);

// ✅ Add this PATCH route
router.patch('/:id/status', verifyJWT, updateOrderStatus);
router.get('/my-orders', verifyJWT, getUserOrders);
router.put('/:id/status', verifyJWT, verifyRoles(ROLES_LIST.Seller), async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const update = { status };
    if (status === 'delivered') {
      update.deliveredAt = new Date();
    }

    const order = await Order.findByIdAndUpdate(id, update, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (err) {
    console.error('Failed to update order status:', err);
    res.status(500).json({ message: 'Error updating order' });
  }
});

module.exports = router;
