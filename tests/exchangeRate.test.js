import {LRUCache} from "../utils/LruCache.js";

let cache;

beforeEach(() => {
    cache = new LRUCache(2);
});

test('quote', () => {
    cache.set(1, 100);
    expect(cache.get(1)).toBe(100);
});
