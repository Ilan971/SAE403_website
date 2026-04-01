var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var saeRouter = require('./routes/sae');
var documentsRouter = require('./routes/documents');
var annoncesRouter = require('./routes/annonces');
var dashboardsRouter = require('./routes/dashboards');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: function (origin, callback) {
    // Si pas d'origine (ex: requêtes serveur à serveur), on autorise
    if (!origin) return callback(null, true);
    
    const configuredOrigin = process.env.FRONTEND_URL || 'http://localhost:4200';
    
    // On autorise si c'est l'URL configurée, le localhost, ou N'IMPORTE QUEL lien Vercel
    if (origin === configuredOrigin || 
        origin.startsWith('http://localhost') || 
        origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }
    
    // Sinon on bloque
    return callback(new Error('Bloqué par CORS'), false);
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/ping', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Je suis réveillé !' });
});

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api', authRouter); // Maps to /api/login
app.use('/api/sae', saeRouter);
app.use('/api/documents', documentsRouter);
app.use('/api/annonces', annoncesRouter);
app.use('/api/dashboard', dashboardsRouter);

module.exports = app;
