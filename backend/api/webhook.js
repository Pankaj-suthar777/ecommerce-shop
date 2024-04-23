import stripeApi from "../stripe.js";

function webhook(req, res) {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeApi.webhooks.constructEvent(
      req["rawBody"],
      sig,
      "whsec_06bf5fc1324a955d8f99d8fd4a1109598f8f530e76e2b21d641d4cd979c3646a"
    );
  } catch (error) {
    return res.status(400).send(`Webhook error ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("Event data", session);
    return res.status(200).json({ message: "Payment Successfull" });
  }
}

export default webhook;
