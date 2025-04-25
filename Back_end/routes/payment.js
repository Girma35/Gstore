const express = require("express");
const router = express.Router();
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const CLIENT_DOMAIN = process.env.CLIENT_DOMAIN || "http://localhost:3000";

router.post("/", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: "Invalid products data" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description || undefined,
          images: product.images || undefined
        },
        unit_amount: Math.round(product.price * 100), // Ensure amount is in cents
      },
      quantity: product.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${process.env.CLIENT_DOMAIN || 'http://localhost:3000'}/cancel`,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA']
      }
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { session_id } = req.query;
    
    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['payment_intent']
    });
    
    res.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total / 100 // Convert back to dollars
    });
  } catch (error) {
    console.error("Error retrieving session status:", error);
    res.status(500).json({ error: "Failed to retrieve session status" });
  }
});

module.exports = router;