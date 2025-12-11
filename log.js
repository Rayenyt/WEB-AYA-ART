export default async function handler(req, res) {

  const BOT_TOKEN = "8537689517:AAFW3zgyD-K_Kgyza41hEox-ISTbcedFXjQ";   // ← ضع التوكن هنا
  const CHAT_ID = "6648990053";   // ← ضع ID هنا

  const ip = req.headers["x-forwarded-for"] || "Unknown IP";
  const agent = req.headers["user-agent"] || "Unknown Device";

  let body = {};
  try {
    body = JSON.parse(req.body || "{}");
  } catch {}

  const { screen, language, page, timezone } = body;

  const msg = `
🌐 New Visitor
• IP: ${ip}
• Device: ${agent}
• Screen: ${screen}
• Language: ${language}
• Page: ${page}
• Timezone: ${timezone}
  `;

  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ chat_id: CHAT_ID, text: msg })
  });

  res.status(200).json({ ok: true });
}