import AuthenticationError from '../../../exceptions/auth-error.js';
import {NotFoundError} from '../../../exceptions/index.js';
import TokenManager from '../../../security/token-manager.js';
import response from '../../../utils/response.js';
import UserRepository from '../../user/repositories/user-repositories.js';
import authRepositories from '../repositories/auth-repositories.js';

const userRepositories = new UserRepository();

export const login = async (req, res, next) => {
    const { username, password } = req.validated;

    const userId = await userRepositories.verifyUserCredential(username, password);

    const accessToken = TokenManager.generateAccessToken({
        id: userId,
        username: username
    });

    const refreshToken = TokenManager.generateRefreshToken({
        id: userId,
        username: username
    });

    await authRepositories.addRefreshToken(refreshToken);

    return response(res, 201, 'Authentication berhasil ditambahkan', {
        accessToken,
        refreshToken
    });
}

export const refreshToken = async (req, res, next) => {
    const {refreshToken} = req.validated;

    const result = await authRepositories.verifyRefreshToken(refreshToken);

    if (!result) {
        return next(new AuthenticationError("Refresh token tidak valid"));
    }

    const {id} = TokenManager.verifyRefreshToken(refreshToken);
    const accessToken = TokenManager.generateAccessToken({ id });

    return response(res, 200, 'Access token berhasil diperbarui', {accessToken});
}

export const logout = async (req, res, next) => {
    const {refreshToken} = req.validated;

    const result = await authRepositories.verifyRefreshToken(refreshToken);

    if (!result) {
        return next(new AuthenticationError("Refresh token tidak valid"));
    }

    await authRepositories.deleteRefreshToken(refreshToken);

    return response(res, 200, 'Refresh token berhasil dihapus');
}