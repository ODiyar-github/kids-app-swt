// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: any;
const BASE_URL = window.env?.BASE_URL || 'http://localhost:3000';
export const environment = {
    production: false,
    EVENT: {
      URL: `${BASE_URL}/events`,
    },
    ORGANISATION: {
      URL: `${BASE_URL}/organisations`,
    }
};