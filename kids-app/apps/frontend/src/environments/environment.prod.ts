// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
const BASE_URL = window.env?.BASE_URL || 'http://localhost:3000/api';
export const environment = {
    production: true,
    MAIN: {
      URL: `${BASE_URL}`,
    },
    EVENT: {
      URL: `${BASE_URL}/event`,
    },
    USER:{
      URL: `${BASE_URL}/user`,
    },
    FEEDBACK:{
      URL: `${BASE_URL}/feedback`
    }
};