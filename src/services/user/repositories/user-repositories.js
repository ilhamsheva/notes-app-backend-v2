import { nanoid } from "nanoid";
import { Pool } from "pg";
import bcrypt from "bcrypt";

class UserRepository {
    constructor() {
        this.pool = new Pool();
    }

    // create user
    async createUser({username, fullname, password}) {
        const id = nanoid(16);
        const hashPassword = await bcrypt.hash(password, 10);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO "user" (id, username, fullname, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, username, fullname, hashPassword, createdAt, updatedAt]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    // verify user if exist
    async verifyUser(username) {
        const query = {
            text: 'SELECT username FROM "user" WHERE username = $1',
            values: [username]
        };

        const result = await this.pool.query(query);
        return result.rows.length > 0;
    }

    // get all users
    async getAllUsers() {
        const query = {
            text: 'SELECT id, username, fullname, password FROM "user"'
        };

        const result = await this.pool.query(query);
        return result.rows;
    }

    // get all user by id
    async getUserById(id) {
        const query = {
            text: 'SELECT id, username, fullname, password FROM "user" WHERE id = $1',
            values: [id]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    // updated 
    async updateUserById({id, username, fullname, password}) {
        const hashPassword = await bcrypt.hash(password, 10);
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE "user" SET username = $1, fullname = $2, password = $3, updated_at = $4 WHERE id = $5 RETURNING id, username, fullname',
            values: [username, fullname, hashPassword, updatedAt, id]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async deleteUserById(id) {
        const query = {
            text: 'DELETE FROM "user" WHERE id = $1 RETURNING id',
            values: [id]
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }
}

export default UserRepository;