const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Kapiz Contact <onboarding@resend.dev>",
      to: "jlplaza2003@gmail.com",
      subject: `New message from ${name}`,
      reply_to: email,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
