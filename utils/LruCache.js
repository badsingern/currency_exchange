export class LRUCache {
    constructor(size) {
        this.lruCache = new Map();
        this.size = size;
    }

    get(key) {
        if (!this.lruCache.has(key)) {
            return false;
        }

        const val = this.lruCache.get(key);

        this.lruCache.delete(key);
        this.lruCache.set(key, val);

        return val;
    }

    set(key, value) {
        if (this.lruCache.size === this.size) {
            const oldestCacheValue = this.lruCache.keys().next().value;
            this.lruCache.delete(oldestCacheValue);
        }

        this.lruCache.set(key, value);
    }
}
