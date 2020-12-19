import {LRUCache} from "../utils/LruCache.js";

let cache;

beforeEach(() => {
    cache = new LRUCache(2);
});

test('LRUCache makes entries retrievable', () => {
    cache.set(1, 2);
    expect(cache.get(1)).toBe(2);
});
