import {LRUCache} from "../utils/LruCache.js";

describe('LRU cache', () => {
    let cache;

    beforeEach(() => {
        cache = new LRUCache(2);
    });

    it('makes entries retrievable', () => {
        cache.set(1, 100);
        expect(cache.get(1)).toBe(100);
    });

    it('returns false if value not found', async () => {
        expect(cache.get(1)).toBe(false);
    });

    it('removes latest LRU entry if cache is fulfilled', function () {
        cache.set(1, 100);
        cache.set(2, 200);
        cache.get(1);
        cache.set(3, 300);

        expect(cache.get(1)).toBe(100);
        expect(cache.get(2)).toBe(false);
        expect(cache.get(3)).toBe(300);
    });

    it('LRUCache holds specified number of entries', async () => {
        cache.set(1, 100);
        cache.set(2, 200);
        cache.set(3, 300);

        expect(cache.get(1)).toBe(false);
        expect(cache.get(2)).toBe(200);
        expect(cache.get(3)).toBe(300);
    });
});
