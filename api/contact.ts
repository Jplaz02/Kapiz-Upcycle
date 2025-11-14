import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Kapiz Contact <onboarding@resend.dev>",
      to: "jlplaza2003@gmail.com",
      subject: `New message from ${name}`,
      replyTo: email,
      text: message,
    });

    res.status(200).json({ success: true });
  } catch (err: unknown) {
    console.error("Resend error:", err);

    const errorMessage =
      err instanceof Error ? err.message : "Failed to send email";

    res.status(500).json({ error: errorMessage });
  }
}
