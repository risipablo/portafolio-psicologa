const { Resend } = require('resend');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();


console.log('🔍 DIAGNÓSTICO RAILWAY:');
console.log('📧 EMAIL_USER:', process.env.EMAIL_USER || 'NO DEFINIDO');
console.log('🔑 RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Definida' : '❌ NO DEFINIDA');
console.log('🌍 NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('🚀 PORT:', process.env.PORT || '3001');


if (!process.env.RESEND_API_KEY) {
    console.error('❌ ERROR: RESEND_API_KEY no está definida en Railway');
    console.error('💡 Agrega la variable en el panel de Railway > Variables');
}

if (!process.env.EMAIL_USER) {
    console.error('❌ ERROR: EMAIL_USER no está definido en Railway');
    console.error('💡 Agrega la variable en el panel de Railway > Variables');
}

// Inicializar Resend
const resend = process.env.RESEND_API_KEY 
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

// ===== CORS CORREGIDO =====
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:3000',
        'https://sabrina-ramos-psicologa.vercel.app',
        'https://sabrinaramospsicologa.com',
        'https://portafolio-psicologa-production.up.railway.app' // ← TU BACKEND EN RAILWAY
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

// ===== RUTAS =====
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

// Ruta de prueba
app.get('/test-api-key', (req, res) => {
    const hasKey = !!process.env.RESEND_API_KEY;
    res.json({
        success: hasKey,
        message: hasKey ? '✅ API Key configurada correctamente' : '❌ API Key NO configurada',
        apiKeyLength: process.env.RESEND_API_KEY?.length || 0,
        emailUser: process.env.EMAIL_USER || 'NO DEFINIDO',
        apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 8) + '...'
    });
});

// ===== ENDPOINT PRINCIPAL =====
app.post('/send-email', async (req, res) => {
    console.log('📨 Petición recibida en /send-email');
    console.log('📦 Body:', req.body);
    console.log('🌐 Origin:', req.headers.origin);
    
    try {
        // Verificar que Resend esté inicializado
        if (!resend) {
            console.error('❌ Resend no inicializado');
            return res.status(500).json({ 
                error: 'Servicio de email no disponible',
                details: 'API Key no configurada en Railway'
            });
        }

        const { name, lastname, email, message, cellphone } = req.body;

        // Validar campos requeridos
        if (!name || !lastname || !email || !message || !cellphone) {
            console.log('❌ Faltan campos requeridos');
            return res.status(400).json({ 
                error: 'Todos los campos son requeridos: name, lastname, email, message, cellphone' 
            });
        }

        console.log('📧 Enviando email con Resend...');

        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <contacto@sabrinaramospsicologa.com>',
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nuevo contacto: ${name} ${lastname}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; color: white; text-align: center;">
                        <h2>Nuevo mensaje de contacto</h2>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa;">
                        <h3 style="color: #333;">📋 Información del contacto</h3>
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
                                <td style="padding: 8px; font-weight: bold;">📅 Fecha:</td>
                                <td style="padding: 8px;">${new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' })}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="padding: 20px;">
                        <h3 style="color: #333;">💬 Mensaje</h3>
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
            console.error('❌ Error de Resend:', JSON.stringify(error, null, 2));
            
            if (error.statusCode === 422) {
                return res.status(400).json({ 
                    error: 'Error de validación: Verifica el dominio',
                    details: error.message 
                });
            }
            if (error.statusCode === 403) {
                return res.status(403).json({ 
                    error: 'Error de autenticación: API Key inválida',
                    details: error.message 
                });
            }
            
            return res.status(400).json({ 
                error: 'Error al enviar el correo',
                details: error.message 
            });
        }

        console.log('✅ Email enviado exitosamente:', data);
        
        res.status(200).json({ 
            message: 'Correo enviado con éxito',
            messageId: data.id 
        });

    } catch (error) {
        console.error('❌ Error en /send-email:', error);
        res.status(500).json({ 
            error: 'Error al enviar el correo',
            details: error.message 
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en Railway en el puerto ${PORT}`);
    console.log(`📧 Emails se enviarán a: ${process.env.EMAIL_USER || 'NO DEFINIDO'}`);
    console.log(`📤 Desde: contacto@sabrinaramospsicologa.com`);
    console.log(`🔗 Test API Key: https://portafolio-psicologa-production.up.railway.app/test-api-key`);
});