import { allowedOrigin } from "./allowedOrigin.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Corrected 'Credential' to 'credentials'
    optionsSuccessStatus: 200 // Corrected 'optionsSuccesStatus' to 'optionsSuccessStatus'
}

export default corsOptions;
