export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const accessToken = process.env.GOTO_ACCESS_TOKEN;
    const environment = process.env.CALL_ENVIRONMENT || 'test';
  
    const dialString =
      environment === 'prod'
        ? process.env.TARGET_PHONE_NUMBER_PROD
        : process.env.TARGET_PHONE_NUMBER_TEST;
  
    const lineId = process.env.GOTO_FROM_LINEID; // Aquí ahora es un LINE ID, no un número
  
    try {
      const callResponse = await fetch('https://api.goto.com/voice/v1/calls', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dialString: dialString,
          from: {
            lineId: lineId
          }
        })
      });
  
      const result = await callResponse.json();
  
      if (!callResponse.ok) {
        console.error('Error completo de GoTo:', JSON.stringify(result, null, 2));
        return res.status(500).json({ error: 'Error en llamada', details: result });
      }
  
      return res.status(200).json({ message: 'Llamada enviada correctamente', result });
    } catch (error) {
      console.error('Error general en servidor:', error);
      return res.status(500).json({ error: 'Error interno', message: error.message });
    }
  }
  