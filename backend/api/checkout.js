import stripeApi from "../stripe.js";

async function createCheckoutSession(req, res) {
  const domainUrl = "https://proshipshop.onrender.com";

  const { line_items, customer_email, orderId } = req.body;
  console.log(line_items);
  // check req body has line items and email
  if (!line_items || !customer_email) {
    return res
      .status(400)
      .json({ error: "missing required session parameters" });
  }

  let session;

  try {
    session = await stripeApi.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      customer_email,
      success_url: `${domainUrl}?success=true`,
      cancel_url: `${domainUrl}/success=false`,
      metadata: {
        orderId: orderId,
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "an error occurred" });
  }
}

export default createCheckoutSession;
