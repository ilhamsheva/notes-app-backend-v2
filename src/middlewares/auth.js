import response from "../utils/response.js";
import TokenManager from "../security/token-manager.js";

const authenticationToken = async (req, res, next) => {
    const token = req.header.authorization;
    if (token && token.indexOf('Bearer ') !== -1) {
        try {
            const user = await TokenManager.verify(token.split('Bearer ')[1], process.env.ACCESS_TOKEN);
            req.user = user;
            next();
        } catch (e) {
            return response(res, 401, e.message, null);
        }
    }

     return response(res, 401, 'Unauthorized', null);
};

export default authenticationToken;