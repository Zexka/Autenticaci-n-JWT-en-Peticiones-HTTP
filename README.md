
# 🛡️ Práctica de Autenticación con JWT

_Aplicación web simple para practicar el uso de tokens JWT (JSON Web Tokens) en peticiones HTTP._

## 🚀 Funcionalidades Principales
- Generación de tokens JWT con expiración (1 minuto).
- Almacenamiento seguro del token en `localStorage`.
- Peticiones GET y POST protegidas con JWT.
- Mensajes claros para errores (token inválido o expirado).

## 📦 Requisitos
- Navegador web moderno (Chrome, Firefox, etc.).
- Editor de código (VS Code, Sublime Text, etc.).

## 🔧 Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/practica-jwt.git
##🛠️ Generar Token
2. Ve a JWT.io
Usa este payload (actualiza el exp con timestamp actual + 60 segundos):
  ```bash
        {
          "userId": 1,
          "username": "tu_usuario",
          "exp": 1719000000
        }
  ```
📌 Uso: 
▶️ Petición GET
  Click en "Obtener Datos Protegidos"
  Se envía el token en los headers.
📤 Petición POST
  Escribe un mensaje en el campo.
  Click en "Enviar Datos".
  ¡Verás la respuesta del servidor!
🧠 ¿Qué aprendí?
  Implementar expiración real de tokens.
  Almacenamiento seguro en navegador.
  Validación avanzada de tokens JWT.
  Manejo de errores en peticiones HTTP.
