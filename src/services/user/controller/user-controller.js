import UserRepository from "../repositories/user-repositories.js";
import {InvariantError} from "../../../exceptions/index.js";
import response from "../../../utils/response.js";

const userRepository = new UserRepository();

const addUserHandler = async (req, res, next) => {
    const { username, password, fullname } = req.validated;

    const isUsernameExist = await userRepository.verifyUser(username);
    if (isUsernameExist) {
        return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan.'));
    }

    const newUser = await userRepository.createUser({ username, password, fullname });

    if (!newUser) {
        return next(new InvariantError('User gagal ditambahkan'));
    }

    return response(res, 201, "User berhasil ditambahkan", {userId: newUser.id});
}

const getAllUserHandler = async (req, res, next) => {
    const users = await userRepository.getAllUsers();

    if (!users) {
        return next(new InvariantError('Gagal mengambil daftar pengguna'));
    }

    return response(res, 200, "Daftar pengguna berhasil diambil", users);
}

const getUserByIdHandler = async (req, res, next) => {
    const { id } = req.params;
    const user = await userRepository.getUserById(id);

    if (!user) {
        return next(new InvariantError('User tidak ditemukan'));
    }

    return response(res, 200, "User berhasil diambil", user);
}

const updateUserByIdHandler = async (req, res, next) => {
    const { id } = req.params;

    const { username, fullname } = req.validated;

    const updatedUser = await userRepository.updateUserById( { id, username, fullname, password } );

    if (!updatedUser) {
        return next(new InvariantError('Gagal memperbarui pengguna'));
    }

    return response(res, 200, "Pengguna berhasil diperbarui", {userId: updatedUser.id});
}

const deleteUserByIdHandler = async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await userRepository.deleteUserById(id);

    if (!deletedUser) {
        return next(new InvariantError('Gagal menghapus pengguna'));
    }

    return response(res, 200, "Pengguna berhasil dihapus", {userId: deletedUser.id});
}

export {
    addUserHandler,
    getAllUserHandler,
    getUserByIdHandler,
    updateUserByIdHandler,
    deleteUserByIdHandler
};