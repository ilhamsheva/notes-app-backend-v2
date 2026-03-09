import { createClient } from "redis";

class CacheService {
    constructor() {
        this._client = createClient({
            socket: {
                host: process.env.REDIS_HOST,
            },
        });

        this._client.on('error', (error) => {
            console.error(error);
        });

        this._client.connect();
    }

    // Set Cache
    async set(key, value, expiration = 4000) {
        await this._client.set(key, value, {
            EX: expiration,
        });
    }

    // Get Cache
    async get(key) {
        const result = await this._client.get(key);
        if (result === null) throw new Error("Cache tidak ditemukan");
        
        return result;
    }

    // Delete Cache
    delete(key) {
        return this._client.del(key);
    }
}

export default CacheService;