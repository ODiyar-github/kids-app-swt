// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
const BASE_URL = window.env?.BASE_URL || 'http://localhost:3000';
export const environment = {
    production: true,
    EVENT: {
      URL: `${BASE_URL}/events`,
    },
    LOGIN: {
      URL: `${BASE_URL}/login`,
    },
    USER:{
      URL: `${BASE_URL}/user`,
    }
};