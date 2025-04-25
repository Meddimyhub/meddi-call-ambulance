export default async function handler(req, res) {
  const accessToken = process.env.GOTO_ACCESS_TOKEN;

  try {
    const response = await fetch('https://api.goto.com/voice-admin/v1/extensions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error obteniendo extensiones:', data);
      return res.status(500).json({ error: 'No se pudo obtener las extensiones', details: data });
    }

    return res.status(200).json({ extensions: data });
  } catch (error) {
    console.error('Error general:', error);
    return res.status(500).json({ error: 'Fallo general', message: error.message });
  }
}
