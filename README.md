# Sistema de Votación - Frontend

Este proyecto es el frontend de un sistema de votación electrónica construido con React y Vite. Permite a los usuarios registrarse, votar por candidatos y ver estadísticas en tiempo real.

## Características

- ✨ Autenticación de usuarios
- 🗳️ Sistema de votación
- 📊 Estadísticas en tiempo real
- 👥 Gestión de candidatos
- 📝 Registro de votantes
- 📱 Diseño responsive

## Tecnologías Utilizadas

- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Recharts (para visualizaciones)

## Requisitos Previos

- Node.js (v14 o superior)
- npm o yarn
- Backend del sistema de votación corriendo en `http://localhost:3000`

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/cjotasM/voting-system-frontend.git
cd voting-system-frontend
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

## Estructura del Proyecto

```
src/
├── api/                  # Servicios de API
│   ├── auth.js          # Servicios de autenticación
│   ├── candidates.js    # Servicios de candidatos
│   ├── voters.js        # Servicios de votantes
│   ├── votes.js         # Servicios de votos
│   └── axios.config.js  # Configuración de Axios
├── components/          # Componentes React
│   ├── auth/           # Componentes de autenticación
│   ├── candidates/     # Componentes de candidatos
│   ├── layout/         # Componentes de layout
│   ├── voters/         # Componentes de votantes
│   └── votes/          # Componentes de votación
├── contexts/           # Contextos de React
│   └── AuthContext.jsx # Contexto de autenticación
├── hooks/              # Hooks personalizados
├── pages/              # Páginas principales
└── App.jsx            # Componente principal
```

## Funcionalidades Principales

### Autenticación
- Registro de usuarios
- Inicio de sesión
- Gestión de tokens JWT

### Gestión de Candidatos
- Lista de candidatos
- Registro de nuevos candidatos
- Eliminación de candidatos

### Sistema de Votación
- Emisión de votos
- Visualización de estadísticas
- Historial de votos

### Panel de Administración
- Gestión de votantes
- Monitoreo de participación
- Estadísticas generales

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Preview de la build
npm run preview

# Linting
npm run lint
```

## Dependencias Principales

```json
{
  "dependencies": {
    "@tanstack/react-query": "^x.x.x",
    "axios": "^x.x.x",
    "react": "^18.x.x",
    "react-router-dom": "^6.x.x",
    "recharts": "^x.x.x",
    "tailwindcss": "^3.x.x"
  }
}
```

## Configuración de Desarrollo

### Tailwind CSS

El proyecto utiliza Tailwind CSS para los estilos. La configuración se encuentra en:
- `tailwind.config.js`
- `postcss.config.js`

### Vite

La configuración de Vite se encuentra en `vite.config.js`.

## Seguridad

- Todas las rutas protegidas requieren autenticación
- Los tokens JWT se almacenan en localStorage
- Las llamadas a la API utilizan interceptores para añadir tokens

## Consideraciones de Producción

1. Configurar variables de entorno adecuadas
2. Asegurar la conexión HTTPS
3. Implementar manejo de errores robusto
4. Configurar CORS apropiadamente
5. Realizar pruebas de carga

## Licencia

Este proyecto está bajo la Licencia MIT.