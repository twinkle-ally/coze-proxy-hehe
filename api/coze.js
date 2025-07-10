export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key, bot_id, query } = req.body;

  if (!key || !bot_id || !query) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch("https://api.coze.com/open_api/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${key}`
      },
      body: JSON.stringify({
        bot_id,
        user: "user-001",
        query
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
}
