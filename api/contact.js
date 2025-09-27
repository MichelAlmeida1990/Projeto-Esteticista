export default function handler(req, res) {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, phone, service, message } = req.body;

    // Validar dados básicos
    if (!name || !phone || !service) {
      return res.status(400).json({
        error: 'Dados obrigatórios: nome, telefone e serviço'
      });
    }

    // Log da tentativa de contato (para analytics)
    console.log('Nova tentativa de contato:', {
      name,
      phone: phone ? phone.replace(/\d(?=\d{4})/g, '*') : 'N/A', // Mascarar telefone
      service,
      message: message ? message.substring(0, 100) : 'N/A',
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'],
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      platform: 'Vercel'
    });

    res.status(200).json({
      success: true,
      message: 'Contato registrado com sucesso',
      timestamp: new Date().toISOString(),
      whatsappMessage: `Olá! Gostaria de agendar: ${service} - ${name}`
    });

  } catch (error) {
    console.error('Erro ao processar contato:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      timestamp: new Date().toISOString()
    });
  }
}
