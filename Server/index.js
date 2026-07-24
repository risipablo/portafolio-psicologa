const { Resend } = require('resend');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

console.log('DIAGNOSTICO RAILWAY:');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'NO DEFINIDO');
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'DEFINIDA' : 'NO DEFINIDA');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT:', process.env.PORT || '3001');

if (!process.env.RESEND_API_KEY) {
    console.error('ERROR: RESEND_API_KEY no esta definida en Railway');
}

if (!process.env.EMAIL_USER) {
    console.error('ERROR: EMAIL_USER no esta definido en Railway');
}

const resend = process.env.RESEND_API_KEY 
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

// CORS configuration - UN SOLO MIDDLEWARE
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:3000',
            'https://sabrina-ramos-psicologa.vercel.app',
            'https://sabrinaramospsicologa.com',
            'https://www.sabrinaramospsicologa.com',
            'https://portafolio-psicologa-production.up.railway.app'
        ];
        
        // Permitir peticiones sin origen (Postman, etc.)
        if (!origin) {
            return callback(null, true);
        }
        
        // Permitir cualquier subdominio de vercel.app
        if (origin.match(/\.vercel\.app$/)) {
            return callback(null, true);
        }
        
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('ORIGEN BLOQUEADO POR CORS:', origin);
            callback(new Error('Origen no permitido por CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ 
        status: 'ok', 
        message: 'Servidor funcionando en Railway',
        env: {
            hasApiKey: !!process.env.RESEND_API_KEY,
            emailUser: process.env.EMAIL_USER || 'NO DEFINIDO'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString(),
        hasApiKey: !!process.env.RESEND_API_KEY
    });
});

app.get('/test-api-key', (req, res) => {
    const hasKey = !!process.env.RESEND_API_KEY;
    res.json({
        success: hasKey,
        message: hasKey ? 'API Key configurada correctamente' : 'API Key NO configurada',
        apiKeyLength: process.env.RESEND_API_KEY?.length || 0,
        emailUser: process.env.EMAIL_USER || 'NO DEFINIDO',
        apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8) + '...'
    });
});

app.post('/send-email', async (req, res) => {
    console.log('PETICION RECIBIDA EN /send-email');
    console.log('BODY:', JSON.stringify(req.body, null, 2));
    console.log('ORIGIN:', req.headers.origin);
    
    try {
        if (!resend) {
            console.error('ERROR CRITICO: Resend no inicializado');
            return res.status(500).json({ 
                error: 'Servicio de email no disponible',
                details: 'API Key no configurada en Railway'
            });
        }

        const { name, lastname, email, message, cellphone } = req.body;

        if (!name || !lastname || !email || !message || !cellphone) {
            console.log('VALIDACION FALLIDA: Faltan campos requeridos');
            return res.status(400).json({ 
                error: 'Todos los campos son requeridos: name, lastname, email, message, cellphone' 
            });
        }

        console.log('INTENTANDO ENVIAR EMAIL CON RESEND');
        console.log('FROM: Portfolio Contact <onboarding@resend.dev>');
        console.log('TO:', process.env.EMAIL_USER);
        console.log('REPLY_TO:', email);

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nuevo contacto: ${name} ${lastname}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; text-align: center;">
                        <h2>Nuevo mensaje de contacto</h2>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa;">
                        <h3 style="color: #333;">Informacion del contacto</h3>
                        <table style="width: 100%; background: white; padding: 15px; border-radius: 5px;">
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Nombre:</td>
                                <td style="padding: 8px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Apellido:</td>
                                <td style="padding: 8px;">${lastname}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Email:</td>
                                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Celular:</td>
                                <td style="padding: 8px;">${cellphone || 'No proporcionado'}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px; font-weight: bold;">Fecha:</td>
                                <td style="padding: 8px;">${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="padding: 20px;">
                        <h3 style="color: #333;">Mensaje</h3>
                        <div style="background: white; padding: 15px; border-left: 4px solid #667eea; border-radius: 3px;">
                            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; padding: 20px; background: #f1f3f4; font-size: 12px; color: #666;">
                        <p>Este mensaje fue enviado desde el formulario de contacto de tu portafolio web.</p>
                        <p style="margin-top: 10px;">
                            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">Responder a ${name}</a>
                        </p>
                    </div>
                </div>
            `
        });

        if (error) {
            console.error('ERROR DE RESEND:', JSON.stringify(error, null, 2));
            
            if (error.statusCode === 422) {
                return res.status(400).json({ 
                    error: 'Error de validacion: Verifica el dominio',
                    details: error.message 
                });
            }
            if (error.statusCode === 403) {
                return res.status(403).json({ 
                    error: 'Error de autenticacion: API Key invalida',
                    details: error.message 
                });
            }
            
            return res.status(400).json({ 
                error: 'Error al enviar el correo',
                details: error.message 
            });
        }

        console.log('EMAIL ENVIADO EXITOSAMENTE');
        console.log('RESPUESTA DE RESEND:', JSON.stringify(data, null, 2));
        
        res.status(200).json({ 
            message: 'Correo enviado con exito',
            messageId: data.id 
        });

    } catch (error) {
        console.error('ERROR EN /send-email:', error);
        console.error('STACK TRACE:', error.stack);
        res.status(500).json({ 
            error: 'Error al enviar el correo',
            details: error.message 
        });
    }
});

const PORT = 8080;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log('Servidor corriendo en Railway en el puerto ' + PORT);
    console.log('Emails se enviaran a: ' + (process.env.EMAIL_USER || 'NO DEFINIDO'));
    console.log('Desde: onboarding@resend.dev');
    console.log('Test API Key: https://portafolio-psicologa-production.up.railway.app/test-api-key');
    console.log('✅ RUTAS REGISTRADAS:');
    console.log('  - GET /');
    console.log('  - GET /health');
    console.log('  - GET /test-api-key');
    console.log('  - POST /send-email');
});

server.on('error', (err) => {
    console.error('ERROR EN EL SERVIDOR:', err);
});

process.on('SIGTERM', () => {
    console.log('Recibido SIGTERM, cerrando servidor graceful...');
    server.close(() => {
        console.log('Servidor cerrado correctamente');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('Recibido SIGINT, cerrando servidor...');
    server.close(() => {
        console.log('Servidor cerrado correctamente');
        process.exit(0);
    });
});