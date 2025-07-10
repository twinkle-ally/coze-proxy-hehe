export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { query } = req.body;

  // 从 Vercel 环境变量中读取 key 和 bot_id
  const key = process.env.COZE_KEY;
  const bot_id = process.env.COZE_BOT_ID;

  if (!key || !bot_id || !query) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const response = await fetch("https://api.coze.com/open_api/v2/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      bot_id,
      user: "user1", // 可写死或从 req 中传
      query,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}
