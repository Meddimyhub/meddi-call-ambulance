// Archivo: api/webhook.js

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const accessToken = process.env.GOTO_ACCESS_TOKEN;
  
    // Control si quieres usar pruebas o producción
    const environment = process.env.CALL_ENVIRONMENT || 'test'; // puede ser 'test' o 'prod'
  
    const phoneNumberToCall =
      environment === 'prod'
        ? process.env.TARGET_PHONE_NUMBER_PROD
        : process.env.TARGET_PHONE_NUMBER_TEST;
  
    try {
      const callResponse = await fetch('https://api.goto.com/voice/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: phoneNumberToCall,
          from: phoneNumberToCall, // opcionalmente puedes cambiar el 'from' después
          autoAnswer: false
        })
      });
  
      const result = await callResponse.json();
  
      if (callResponse.ok) {
        return res.status(200).json({ message: 'Llamada enviada', result });
      } else {
        return res.status(500).json({ error: 'Error en llamada', result });
      }
    } catch (err) {
      console.error('ERROR:', err);
      return res.status(500).json({ error: 'Error interno', details: err.message });
    }
  }
  