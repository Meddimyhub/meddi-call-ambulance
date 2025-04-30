export default async function handler(req, res) {
    const message = req.body?.data?.PARAMS?.MESSAGE;
    const from = req.body?.data?.PARAMS?.FROM_USER_ID;
  
    if (message && message.includes("Ambulancia")) {
      // Llamada a tu webhook
      await fetch("https://meddi-call-ambulance.vercel.app/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ triggeredBy: "bitrix-bot", from })
      });
  
      return res.status(200).json({ result: "Llamada enviada" });
    }
  
    return res.status(200).json({ result: "Mensaje ignorado" });
  }
  