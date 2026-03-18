# 🚪 Rate My Music - API Gateway (El Cuello)

Bienvenido a la documentación de **RateMyMusicGateway**. Este es el repositorio central de enrutamiento y orquestación del proyecto.

## 🚀 ¿Qué hace este servicio?

Este servicio actúa como **API Gateway** y **Proxy Inverso**. Sus responsabilidades principales son:
- Ser el único punto de entrada público para el Frontend ([RateMyMusicPage](https://github.com/Jhomel-Dev/RateMyMusicPage)).
- Enrutar el tráfico dinámicamente hacia el microservicio correspondiente (Auth o Media) usando `express-http-proxy`.
- Implementar **Rate Limiting** para prevenir abusos o ataques de denegación de servicio (DDoS).
- Manejar los CORS centralizados.
- Actuar como barrera de seguridad, donde puede interceptar peticiones e inyectar validaciones.

Adicionalmente, este repositorio **contiene el archivo `docker-compose.yml` maestro que orquesta todo el ecosistema local**.

**Stack Tecnológico:** Node.js, Express, `express-http-proxy`, `express-rate-limit`.

## 📁 Estructura del Proyecto

El código fuente se encuentra en la carpeta `src/`:

- `src/config/`: Archivos de variables de entorno y mapeo de URLs destino (hacia donde apunten los microservicios).
- `src/middlewares/`: Funciones interceptoras (ej. Rate Limiters y configuración de CORS).
- `src/routes/`: Configuración del proxy inverso, definiendo qué prefijos de URL (`/api/auth/*` o `/api/media/*`) redirigen a dónde.
- `src/index.js`: Instancia principal de Express donde se acoplan los middlewares y rutas.
- `src/serve.js`: Archivo de arranque del servidor.
- `docker-compose.yml`: (En la raíz). Archivo mágico que levanta **todos** los servicios (Backend, Base de Datos SQL, MongoDB) de forma empaquetada.

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (Para correrlo individualmente).
- [Docker y Docker Compose](https://www.docker.com/) (Altamente recomendado para correr todo el ecosistema de golpe).

## 🏃‍♂️ Cómo levantar el proyecto

### Opción A: Orquestación Total con Docker (Recomendado ⭐)

Dado que este repo tiene el orquestador principal, puedes levantar todos los backends y bases de datos a la vez con un solo comando.
Asegúrate de clonar los repos de Auth y Media junto a esta carpeta y luego ejecuta:
```bash
docker-compose up --build
```

### Opción B: Ejecución Local en Node.js

Si decides levantar las piezas una a una manualmente:
1. Instala dependencias: `pnpm install`
2. Configura tu `.env` (guíate del `.env.example`).
3. Ejecuta el Gateway:
   ```bash
   pnpm run dev
   ```

---

## 🏗️ Topología del Ecosistema

1. 👤 **La Cabeza:** [RateMyMusicPage](https://github.com/Jhomel-Dev/RateMyMusicPage) - Frontend UI.
2. 🚪 **El Cuello:** [RateMyMusicGateway](https://github.com/Jhomel-Dev/RateMyMusicGateway) (👉 **Estás aquí**)
3. 🦶 **Los Pies (Backend):**
   * 🔐 **RateMyMusicAuth:** Usuarios y seguridad.
   * ☁️ **RateMyMusicMedia:** Multimedia y base de datos de música.
