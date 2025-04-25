export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const event = req.body;
  
    console.log('Evento recibido de GoTo:', event);
  
    if (event.eventType === 'call.connected') {
      try {
        await fetch(process.env.BITRIX_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            DIALOG_ID: process.env.BITRIX_CHAT_ID,
            MESSAGE: '✅ ¡Llamada atendida por el equipo!'
          })
        });
  
        console.log('Notificación enviada a Bitrix.');
      } catch (error) {
        console.error('Error enviando a Bitrix:', error);
      }
    }
  
    res.status(200).send('OK');
  }
  