// ============================================
// BACKEND CONFIGURATION
// Change BACKEND_IP to your backend server IP
// ============================================
//const BACKEND_URL_PROD = 'http://lnuais-backend-env.eba-4mp5tntm.eu-north-1.elasticbeanstalk.com';
const BACKEND_URL_PROD = 'https://dgzvl0b4x5nn2.cloudfront.net';

const BACKEND_PORT_LOCAL = '3000';

const CONFIG = {
    // Helper to get the backend URL
    getApiBaseUrl: function () {
        // If we are clearly on the production domain (e.g. Amplify or Custom Domain), use Prod Backend
        if (window.location.hostname.includes('amplifyapp.com') || window.location.hostname.includes('workers.dev') || window.location.hostname.includes('lnuais.com')) {
            return ''; // Use relative path so requests are proxied by Amplify Rewrites to CloudFront
        }
        // Otherwise (localhost, 127.0.0.1, or local IP), default to Local Backend
        return `http://localhost:${BACKEND_PORT_LOCAL}`;
    }
};
