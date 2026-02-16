import { nanoid } from "nanoid";
import { Pool } from "pg";

class NoteRepositories {
    constructor() {
        this.pool = new Pool();
    }

    // Create Note Query
    async createNote({title, body, tags}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: "INSERT INTO notes(id, title, body, tags, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, title, body, tags, created_at, updated_at",
            values: [id, title, body, tags, createdAt, updatedAt],
        };

        // Menjalankan query
        const result = await this.pool.query(query);

        return result.rows[0];
    }

    // Get All notes query
    async getAllNotes() {
        const query = {
            text: "SELECT * FROM notes",
        };

        const result = await this.pool.query(query);
        return result.rows;
    }

    // Get Notes by Id query
    async getNoteById(id) {
        const query = {
            text: "SELECT * FROM notes WHERE id = $1",
            values: [id],
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    // Edit Note By Id query
    async editNoteById({id, title, body, tags}) {
        const updatedAt = new Date().toISOString();

        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id',
            values: [title, body, tags, updatedAt, id],
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    // Delete Note By id
    async deleteNoteById(id) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this.pool.query(query);
        return result.rows[0].id;
    }
}

export default new NoteRepositories();