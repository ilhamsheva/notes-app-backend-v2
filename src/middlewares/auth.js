import response from "../utils/response.js";
import TokenManager from "../security/token-manager.js";

const authenticationToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response(res, 401, 'Unauthorized', null);
    }
    
    try {
        const token = authHeader.split('Bearer ')[1];
        const user = TokenManager.verifyAccessToken(token);
        console.log("DECODED USER:", user);
        req.user = user;
        return next();
    } catch (e) {
        return response(res, 401, e.message, null);
    }
};

export default authenticationToken;