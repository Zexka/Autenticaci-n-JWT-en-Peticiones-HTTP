// 1. Almacenamiento en localStorage
let JWT_TOKEN = localStorage.getItem('jwtToken');

if (!JWT_TOKEN) {
    // Generar token con expiración de 1 minuto (usar JWT.io)
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXN1YXJpb19wcnVlYmEiLCJleHAiOjE3Mzg1NDA4ODJ9.ECHpnZOH4O694LY-ZNGdEx4EHmaq9_5q0A0YCMn5bKw';
    localStorage.setItem('jwtToken', token);
    JWT_TOKEN = token;
}

function validateToken(token) {
    try {
        // Verificar estructura básica del JWT
        if (!token || typeof token !== 'string' || token.split('.').length !== 3) {
            throw new Error('invalid');
        }

        const [header, payload, signature] = token.split('.');

        // Decodificar payload con manejo de base64 seguro
        const decodedPayload = JSON.parse(
            decodeURIComponent(
                atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
                    .split('')
                    .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            )
        );

        if (decodedPayload.exp < Date.now() / 1000) {
            throw new Error('expired');
        }

        return true;
    } catch (error) {
        console.error('Error en validación:', error);
        throw error; // Propaga el error original
    }
}

// 3. GET con manejo de errores
async function fetchDataWithJWT() {
    try {
        validateToken(JWT_TOKEN);
    } catch (error) {
        alert(error.message === 'expired'
            ? '⚠️ Sesión expirada. Vuelve a iniciar sesión'
            : '🔐 Error de autenticación');
        return;
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: { Authorization: `Bearer ${JWT_TOKEN}` }
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        handleError('GET', error);
    }
}

// 4. POST mejorado
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        validateToken(JWT_TOKEN);
        const postData = {
            title: document.getElementById('data').value,
            body: 'Contenido de prueba',
            userId: 1
        };

        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

        const data = await response.json();
        displayResponse(data);
    } catch (error) {
        handleError('POST', error);
    }
});

// Helpers
function displayResponse(data) {
    document.getElementById('response').innerHTML =
        `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}

function handleError(operation, error) {
    console.error(`Error ${operation}:`, error);
    document.getElementById('response').innerHTML =
        `<div class="error">🛑 ${error.message}</div>`;
}