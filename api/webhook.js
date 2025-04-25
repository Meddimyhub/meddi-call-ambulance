export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const accessToken = process.env.GOTO_ACCESS_TOKEN;
    const environment = process.env.CALL_ENVIRONMENT || 'test';
  
    const toNumber =
      environment === 'prod'
        ? process.env.TARGET_PHONE_NUMBER_PROD
        : process.env.TARGET_PHONE_NUMBER_TEST;
  
    const fromNumber = process.env.GOTO_FROM_NUMBER; // El número de cabecera registrado
  
    try {
      const callResponse = await fetch('https://api.goto.com/voice-admin/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: toNumber,    // Número de destino (tu cel)
          from: fromNumber, // Número cabecera registrado
          autoAnswer: false
        })
      });
  
      const result = await callResponse.json();
  
      if (callResponse.ok) {
        return res.status(200).json({ message: 'Llamada enviada correctamente', result });
      } else {
        console.error('Error en llamada:', result);
        return res.status(500).json({ error: 'Error en llamada', details: result });
      }
    } catch (error) {
      console.error('Error general:', error);
      return res.status(500).json({ error: 'Fallo general en el servidor', message: error.message });
    }
  }
  