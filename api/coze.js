export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  const COZE_KEY = process.env.COZE_KEY;
  const BOT_ID = process.env.COZE_BOT_ID;

  try {
    const response = await fetch("https://api.coze.com/open_api/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${COZE_KEY}`,
      },
      body: JSON.stringify({
        bot_id: BOT_ID,
        user: "user-001",
        query,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
