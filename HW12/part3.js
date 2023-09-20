class CustomHashTable {
    constructor(size) {
        this.size = size;
        this.buckets = new Array(this.size).fill(null);
    }

    hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.size;
    }

    insert(key, value) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            this.buckets[index] = [{ key, value }];
        } else {
            this.buckets[index].push({ key, value });
        }
    }

    get(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            return undefined;
        }

        for (const pair of this.buckets[index]) {
            if (pair.key === key) {
                return pair.value;
            }
        }

        return undefined;
    }

    delete(key) {
        const index = this.hash(key);
        if (!this.buckets[index]) {
            return;
        }

        const updatedBucket = this.buckets[index].filter(
            (pair) => pair.key !== key
        );

        if (updatedBucket.length === 0) {
            this.buckets[index] = null;
        } else {
            this.buckets[index] = updatedBucket;
        }
    }
}
