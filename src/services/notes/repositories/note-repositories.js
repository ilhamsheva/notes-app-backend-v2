import { nanoid } from "nanoid";
import { Pool } from "pg";
import CacheService from "../../../cache/redis-service.js";

class NoteRepositories {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  // Create Note Query
  async createNote({ title, body, tags, owner }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: "INSERT INTO notes(id, title, body, tags, created_at, updated_at, owner) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id, title, body, tags, created_at, updated_at, owner",
      values: [id, title, body, tags, createdAt, updatedAt, owner],
    };

    // Menjalankan query
    const result = await this.pool.query(query);

    // Save to cache
    await this.cacheService.delete(`notes:${owner}`);

    return result.rows[0];
  }

  // Get All notes query
  async getAllNotes(owner) {
    const cacheKey = `notes:${owner}`;

    try {
      const notes = await this.cacheService.get(cacheKey);
      return JSON.parse(notes);
    } catch (error) {
      const query = {
        text: "SELECT * FROM notes WHERE owner = $1",
        values: [owner],
      };

      const result = await this.pool.query(query);

      // Save to cache
      await this.cacheService.set(cacheKey, JSON.stringify(result.rows));

      return result.rows;
    }
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
  async editNoteById({ id, title, body, tags }) {
    const updatedAt = new Date().toISOString();

    const query = {
      text: "UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4 WHERE id = $5 RETURNING id",
      values: [title, body, tags, updatedAt, id],
    };

    const result = await this.pool.query(query);

    const owner = result.rows[0].owner;
    if (!result.rows[0]) {
      await this.cacheService.delete(`notes:${owner}`);
    }

    return result.rows[0];
  }

  // Delete Note By id
  async deleteNoteById(id) {
    const query = {
      text: "DELETE FROM notes WHERE id = $1 RETURNING id",
      values: [id],
    };

    const result = await this.pool.query(query);

    const owner = result.rows[0].owner;

    if (result.rows[0]) {
      await this.cacheService.delete(`notes:${owner}`);
    }

    return result.rows[0].id;
  }

  async verifyNoteOwner(id, owner) {
    const query = {
      text: "SELECT * FROM notes WHERE id = $1",
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rows.length) {
      return null;
    }

    const note = result.rows[0];

    if (note.owner !== owner) {
      return null;
    }

    return result.rows[0];
  }
}

export default new NoteRepositories();
