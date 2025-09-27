const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de segurança
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://wa.me"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// Middleware de compressão
app.use(compression());

// Middleware CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : true,
  credentials: true
}));

// Middleware para parsing de dados
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  etag: true,
  lastModified: true
}));

// Cache headers para assets estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '1y',
  etag: true
}));

app.use('/styles-modern.css', express.static(path.join(__dirname, 'styles-modern.css'), {
  maxAge: '1d',
  etag: true
}));

app.use('/script-modern.js', express.static(path.join(__dirname, 'script-modern.js'), {
  maxAge: '1d',
  etag: true
}));

// Rota principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para offline
app.get('/offline', (req, res) => {
  res.sendFile(path.join(__dirname, 'index-offline.html'));
});

// API route para analytics (opcional)
app.post('/api/contact', (req, res) => {
  const { name, phone, service, message } = req.body;
  
  // Log da tentativa de contato (para analytics)
  console.log('Nova tentativa de contato:', {
    name,
    phone: phone ? phone.replace(/\d(?=\d{4})/g, '*') : 'N/A', // Mascarar telefone
    service,
    message: message ? message.substring(0, 100) : 'N/A',
    timestamp: new Date().toISOString(),
    userAgent: req.get('User-Agent'),
    ip: req.ip
  });
  
  res.json({ 
    success: true, 
    message: 'Contato registrado com sucesso',
    timestamp: new Date().toISOString()
  });
});

// Rota de health check para Railway
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// Rota 404 - redirecionar para home
app.get('*', (req, res) => {
  res.redirect('/');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Erro no servidor:', err);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Site: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/health`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Recebido SIGTERM, encerrando servidor graciosamente...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Recebido SIGINT, encerrando servidor graciosamente...');
  process.exit(0);
});
