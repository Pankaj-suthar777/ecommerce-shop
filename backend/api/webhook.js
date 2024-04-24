import Order from "../Models/orderModel.js";
import stripeApi from "../stripe.js";

async function webhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeApi.webhooks.constructEvent(
      req["rawBody"],
      sig,
      "we_1P8jSNGr7paNn0fxVtkkbP5j"
    );
  } catch (error) {
    return res.status(400).send(`Webhook error ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Event data", session);
    const orderId = event.data.object.metadata.orderId;

    await Order.findByIdAndUpdate(orderId, {
      isPaid: true,
      paidAt: Date.now(),
    });

    return res.status(200).json({ message: "Payment Successfull" });
  }
}

export default webhook;
