const { env } = process;

const FRONTEND_PORT = Number( env.FRONTEND_PORT) || 8080;

export const PORT = Number( env.BACKEND_PORT) || 8001;

export const ORIGIN = `http://localhost:${FRONTEND_PORT}`;

export const BASE_API_SCHEMA =  `/${env.BASE_API_SCHEMA || "api/v1/"}`;