/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { assertNotSame } from '../util/assert';
/**
 * A type representing the live collection to be reconciled with any new (incoming) collection. This
 * is an adapter class that makes it possible to work with different internal data structures,
 * regardless of the actual values of the incoming collection.
 */
export class LiveCollection {
    destroy(item) {
        // noop by default
    }
    updateValue(index, value) {
        // noop by default
    }
    // operations below could be implemented on top of the operations defined so far, but having
    // them explicitly allow clear expression of intent and potentially more performant
    // implementations
    swap(index1, index2) {
        const startIdx = Math.min(index1, index2);
        const endIdx = Math.max(index1, index2);
        const endItem = this.detach(endIdx);
        if (endIdx - startIdx > 1) {
            const startItem = this.detach(startIdx);
            this.attach(startIdx, endItem);
            this.attach(endIdx, startItem);
        }
        else {
            this.attach(startIdx, endItem);
        }
    }
    move(prevIndex, newIdx) {
        this.attach(newIdx, this.detach(prevIndex));
    }
}
function valuesMatching(liveIdx, liveValue, newIdx, newValue, trackBy) {
    if (liveIdx === newIdx && Object.is(liveValue, newValue)) {
        // matching and no value identity to update
        return 1;
    }
    else if (Object.is(trackBy(liveIdx, liveValue), trackBy(newIdx, newValue))) {
        // matching but requires value identity update
        return -1;
    }
    return 0;
}
/**
 * The live collection reconciliation algorithm that perform various in-place operations, so it
 * reflects the content of the new (incoming) collection.
 *
 * The reconciliation algorithm has 2 code paths:
 * - "fast" path that don't require any memory allocation;
 * - "slow" path that requires additional memory allocation for intermediate data structures used to
 * collect additional information about the live collection.
 * It might happen that the algorithm switches between the two modes in question in a single
 * reconciliation path - generally it tries to stay on the "fast" path as much as possible.
 *
 * The overall complexity of the algorithm is O(n + m) for speed and O(n) for memory (where n is the
 * length of the live collection and m is the length of the incoming collection). Given the problem
 * at hand the complexity / performance constraints makes it impossible to perform the absolute
 * minimum of operation to reconcile the 2 collections. The algorithm makes different tradeoffs to
 * stay within reasonable performance bounds and may apply sub-optimal number of operations in
 * certain situations.
 *
 * @param liveCollection the current, live collection;
 * @param newCollection the new, incoming collection;
 * @param trackByFn key generation function that determines equality between items in the life and
 *     incoming collection;
 */
export function reconcile(liveCollection, newCollection, trackByFn) {
    let detachedItems = undefined;
    let liveKeysInTheFuture = undefined;
    let liveStartIdx = 0;
    let liveEndIdx = liveCollection.length - 1;
    if (Array.isArray(newCollection)) {
        let newEndIdx = newCollection.length - 1;
        while (liveStartIdx <= liveEndIdx && liveStartIdx <= newEndIdx) {
            // compare from the beginning
            const liveStartValue = liveCollection.at(liveStartIdx);
            const newStartValue = newCollection[liveStartIdx];
            const isStartMatching = valuesMatching(liveStartIdx, liveStartValue, liveStartIdx, newStartValue, trackByFn);
            if (isStartMatching !== 0) {
                if (isStartMatching < 0) {
                    liveCollection.updateValue(liveStartIdx, newStartValue);
                }
                liveStartIdx++;
                continue;
            }
            // compare from the end
            // TODO(perf): do _all_ the matching from the end
            const liveEndValue = liveCollection.at(liveEndIdx);
            const newEndValue = newCollection[newEndIdx];
            const isEndMatching = valuesMatching(liveEndIdx, liveEndValue, newEndIdx, newEndValue, trackByFn);
            if (isEndMatching !== 0) {
                if (isEndMatching < 0) {
                    liveCollection.updateValue(liveEndIdx, newEndValue);
                }
                liveEndIdx--;
                newEndIdx--;
                continue;
            }
            // Detect swap and moves:
            const liveStartKey = trackByFn(liveStartIdx, liveStartValue);
            const liveEndKey = trackByFn(liveEndIdx, liveEndValue);
            const newStartKey = trackByFn(liveStartIdx, newStartValue);
            if (Object.is(newStartKey, liveEndKey)) {
                const newEndKey = trackByFn(newEndIdx, newEndValue);
                // detect swap on both ends;
                if (Object.is(newEndKey, liveStartKey)) {
                    liveCollection.swap(liveStartIdx, liveEndIdx);
                    liveCollection.updateValue(liveEndIdx, newEndValue);
                    newEndIdx--;
                    liveEndIdx--;
                }
                else {
                    // the new item is the same as the live item with the end pointer - this is a move forward
                    // to an earlier index;
                    liveCollection.move(liveEndIdx, liveStartIdx);
                }
                liveCollection.updateValue(liveStartIdx, newStartValue);
                liveStartIdx++;
                continue;
            }
            // Fallback to the slow path: we need to learn more about the content of the live and new
            // collections.
            detachedItems ??= new UniqueValueMultiKeyMap();
            liveKeysInTheFuture ??=
                initLiveItemsInTheFuture(liveCollection, liveStartIdx, liveEndIdx, trackByFn);
            // Check if I'm inserting a previously detached item: if so, attach it here
            if (attachPreviouslyDetached(liveCollection, detachedItems, liveStartIdx, newStartKey)) {
                liveCollection.updateValue(liveStartIdx, newStartValue);
                liveStartIdx++;
                liveEndIdx++;
            }
            else if (!liveKeysInTheFuture.has(newStartKey)) {
                // Check if we seen a new item that doesn't exist in the old collection and must be INSERTED
                const newItem = liveCollection.create(liveStartIdx, newCollection[liveStartIdx]);
                liveCollection.attach(liveStartIdx, newItem);
                liveStartIdx++;
                liveEndIdx++;
            }
            else {
                // We know that the new item exists later on in old collection but we don't know its index
                // and as the consequence can't move it (don't know where to find it). Detach the old item,
                // hoping that it unlocks the fast path again.
                detachedItems.set(liveStartKey, liveCollection.detach(liveStartIdx));
                liveEndIdx--;
            }
        }
        // Final cleanup steps:
        // - more items in the new collection => insert
        while (liveStartIdx <= newEndIdx) {
            createOrAttach(liveCollection, detachedItems, trackByFn, liveStartIdx, newCollection[liveStartIdx]);
            liveStartIdx++;
        }
    }
    else if (newCollection != null) {
        // iterable - immediately fallback to the slow path
        const newCollectionIterator = newCollection[Symbol.iterator]();
        let newIterationResult = newCollectionIterator.next();
        while (!newIterationResult.done && liveStartIdx <= liveEndIdx) {
            const liveValue = liveCollection.at(liveStartIdx);
            const newValue = newIterationResult.value;
            const isStartMatching = valuesMatching(liveStartIdx, liveValue, liveStartIdx, newValue, trackByFn);
            if (isStartMatching !== 0) {
                // found a match - move on, but update value
                if (isStartMatching < 0) {
                    liveCollection.updateValue(liveStartIdx, newValue);
                }
                liveStartIdx++;
                newIterationResult = newCollectionIterator.next();
            }
            else {
                detachedItems ??= new UniqueValueMultiKeyMap();
                liveKeysInTheFuture ??=
                    initLiveItemsInTheFuture(liveCollection, liveStartIdx, liveEndIdx, trackByFn);
                // Check if I'm inserting a previously detached item: if so, attach it here
                const newKey = trackByFn(liveStartIdx, newValue);
                if (attachPreviouslyDetached(liveCollection, detachedItems, liveStartIdx, newKey)) {
                    liveCollection.updateValue(liveStartIdx, newValue);
                    liveStartIdx++;
                    liveEndIdx++;
                    newIterationResult = newCollectionIterator.next();
                }
                else if (!liveKeysInTheFuture.has(newKey)) {
                    liveCollection.attach(liveStartIdx, liveCollection.create(liveStartIdx, newValue));
                    liveStartIdx++;
                    liveEndIdx++;
                    newIterationResult = newCollectionIterator.next();
                }
                else {
                    // it is a move forward - detach the current item without advancing in collections
                    const liveKey = trackByFn(liveStartIdx, liveValue);
                    detachedItems.set(liveKey, liveCollection.detach(liveStartIdx));
                    liveEndIdx--;
                }
            }
        }
        // this is a new item as we run out of the items in the old collection - create or attach a
        // previously detached one
        while (!newIterationResult.done) {
            createOrAttach(liveCollection, detachedItems, trackByFn, liveCollection.length, newIterationResult.value);
            newIterationResult = newCollectionIterator.next();
        }
    }
    // Cleanups common to the array and iterable:
    // - more items in the live collection => delete starting from the end;
    while (liveStartIdx <= liveEndIdx) {
        liveCollection.destroy(liveCollection.detach(liveEndIdx--));
    }
    // - destroy items that were detached but never attached again.
    detachedItems?.forEach(item => {
        liveCollection.destroy(item);
    });
}
function attachPreviouslyDetached(prevCollection, detachedItems, index, key) {
    if (detachedItems !== undefined && detachedItems.has(key)) {
        prevCollection.attach(index, detachedItems.get(key));
        detachedItems.delete(key);
        return true;
    }
    return false;
}
function createOrAttach(liveCollection, detachedItems, trackByFn, index, value) {
    if (!attachPreviouslyDetached(liveCollection, detachedItems, index, trackByFn(index, value))) {
        const newItem = liveCollection.create(index, value);
        liveCollection.attach(index, newItem);
    }
    else {
        liveCollection.updateValue(index, value);
    }
}
function initLiveItemsInTheFuture(liveCollection, start, end, trackByFn) {
    const keys = new Set();
    for (let i = start; i <= end; i++) {
        keys.add(trackByFn(i, liveCollection.at(i)));
    }
    return keys;
}
/**
 * A specific, partial implementation of the Map interface with the following characteristics:
 * - allows multiple values for a given key;
 * - maintain FIFO order for multiple values corresponding to a given key;
 * - assumes that all values are unique.
 *
 * The implementation aims at having the minimal overhead for cases where keys are _not_ duplicated
 * (the most common case in the list reconciliation algorithm). To achieve this, the first value for
 * a given key is stored in a regular map. Then, when more values are set for a given key, we
 * maintain a form of linked list in a separate map. To maintain this linked list we assume that all
 * values (in the entire collection) are unique.
 */
export class UniqueValueMultiKeyMap {
    constructor() {
        // A map from a key to the first value corresponding to this key.
        this.kvMap = new Map();
        // A map that acts as a linked list of values - each value maps to the next value in this "linked
        // list" (this only works if values are unique). Allocated lazily to avoid memory consumption when
        // there are no duplicated values.
        this._vMap = undefined;
    }
    has(key) {
        return this.kvMap.has(key);
    }
    delete(key) {
        if (!this.has(key))
            return false;
        const value = this.kvMap.get(key);
        if (this._vMap !== undefined && this._vMap.has(value)) {
            this.kvMap.set(key, this._vMap.get(value));
            this._vMap.delete(value);
        }
        else {
            this.kvMap.delete(key);
        }
        return true;
    }
    get(key) {
        return this.kvMap.get(key);
    }
    set(key, value) {
        if (this.kvMap.has(key)) {
            let prevValue = this.kvMap.get(key);
            ngDevMode &&
                assertNotSame(prevValue, value, `Detected a duplicated value ${value} for the key ${key}`);
            if (this._vMap === undefined) {
                this._vMap = new Map();
            }
            const vMap = this._vMap;
            while (vMap.has(prevValue)) {
                prevValue = vMap.get(prevValue);
            }
            vMap.set(prevValue, value);
        }
        else {
            this.kvMap.set(key, value);
        }
    }
    forEach(cb) {
        for (let [key, value] of this.kvMap) {
            cb(value, key);
            if (this._vMap !== undefined) {
                const vMap = this._vMap;
                while (vMap.has(value)) {
                    value = vMap.get(value);
                    cb(value, key);
                }
            }
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdF9yZWNvbmNpbGlhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3JlbmRlcjMvbGlzdF9yZWNvbmNpbGlhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFHSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0M7Ozs7R0FJRztBQUNILE1BQU0sT0FBZ0IsY0FBYztJQU1sQyxPQUFPLENBQUMsSUFBTztRQUNiLGtCQUFrQjtJQUNwQixDQUFDO0lBQ0QsV0FBVyxDQUFDLEtBQWEsRUFBRSxLQUFRO1FBQ2pDLGtCQUFrQjtJQUNwQixDQUFDO0lBRUQsNEZBQTRGO0lBQzVGLG1GQUFtRjtJQUNuRixrQkFBa0I7SUFDbEIsSUFBSSxDQUFDLE1BQWMsRUFBRSxNQUFjO1FBQ2pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQzFCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakMsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxDQUFD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QUFDLEtBQUssQ0FBQztnQkFDeEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBRSxDQUFDO29CQUN6QixFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUcmFja0J5RnVuY3Rpb259IGZyb20gJy4uL2NoYW5nZV9kZXRlY3Rpb24nO1xuaW1wb3J0IHthc3NlcnROb3RTYW1lfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5cbi8qKlxuICogQSB0eXBlIHJlcHJlc2VudGluZyB0aGUgbGl2ZSBjb2xsZWN0aW9uIHRvIGJlIHJlY29uY2lsZWQgd2l0aCBhbnkgbmV3IChpbmNvbWluZykgY29sbGVjdGlvbi4gVGhpc1xuICogaXMgYW4gYWRhcHRlciBjbGFzcyB0aGF0IG1ha2VzIGl0IHBvc3NpYmxlIHRvIHdvcmsgd2l0aCBkaWZmZXJlbnQgaW50ZXJuYWwgZGF0YSBzdHJ1Y3R1cmVzLFxuICogcmVnYXJkbGVzcyBvZiB0aGUgYWN0dWFsIHZhbHVlcyBvZiB0aGUgaW5jb21pbmcgY29sbGVjdGlvbi5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpdmVDb2xsZWN0aW9uPFQsIFY+IHtcbiAgYWJzdHJhY3QgZ2V0IGxlbmd0aCgpOiBudW1iZXI7XG4gIGFic3RyYWN0IGF0KGluZGV4OiBudW1iZXIpOiBWO1xuICBhYnN0cmFjdCBhdHRhY2goaW5kZXg6IG51bWJlciwgaXRlbTogVCk6IHZvaWQ7XG4gIGFic3RyYWN0IGRldGFjaChpbmRleDogbnVtYmVyKTogVDtcbiAgYWJzdHJhY3QgY3JlYXRlKGluZGV4OiBudW1iZXIsIHZhbHVlOiBWKTogVDtcbiAgZGVzdHJveShpdGVtOiBUKTogdm9pZCB7XG4gICAgLy8gbm9vcCBieSBkZWZhdWx0XG4gIH1cbiAgdXBkYXRlVmFsdWUoaW5kZXg6IG51bWJlciwgdmFsdWU6IFYpOiB2b2lkIHtcbiAgICAvLyBub29wIGJ5IGRlZmF1bHRcbiAgfVxuXG4gIC8vIG9wZXJhdGlvbnMgYmVsb3cgY291bGQgYmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mIHRoZSBvcGVyYXRpb25zIGRlZmluZWQgc28gZmFyLCBidXQgaGF2aW5nXG4gIC8vIHRoZW0gZXhwbGljaXRseSBhbGxvdyBjbGVhciBleHByZXNzaW9uIG9mIGludGVudCBhbmQgcG90ZW50aWFsbHkgbW9yZSBwZXJmb3JtYW50XG4gIC8vIGltcGxlbWVudGF0aW9uc1xuICBzd2FwKGluZGV4MTogbnVtYmVyLCBpbmRleDI6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0SWR4ID0gTWF0aC5taW4oaW5kZXgxLCBpbmRleDIpO1xuICAgIGNvbnN0IGVuZElkeCA9IE1hdGgubWF4KGluZGV4MSwgaW5kZXgyKTtcbiAgICBjb25zdCBlbmRJdGVtID0gdGhpcy5kZXRhY2goZW5kSWR4KTtcbiAgICBpZiAoZW5kSWR4IC0gc3RhcnRJZHggPiAxKSB7XG4gICAgICBjb25zdCBzdGFydEl0ZW0gPSB0aGlzLmRldGFjaChzdGFydElkeCk7XG4gICAgICB0aGlzLmF0dGFjaChzdGFydElkeCwgZW5kSXRlbSk7XG4gICAgICB0aGlzLmF0dGFjaChlbmRJZHgsIHN0YXJ0SXRlbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXR0YWNoKHN0YXJ0SWR4LCBlbmRJdGVtKTtcbiAgICB9XG4gIH1cbiAgbW92ZShwcmV2SW5kZXg6IG51bWJlciwgbmV3SWR4OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLmF0dGFjaChuZXdJZHgsIHRoaXMuZGV0YWNoKHByZXZJbmRleCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHZhbHVlc01hdGNoaW5nPFY+KFxuICAgIGxpdmVJZHg6IG51bWJlciwgbGl2ZVZhbHVlOiBWLCBuZXdJZHg6IG51bWJlciwgbmV3VmFsdWU6IFYsXG4gICAgdHJhY2tCeTogVHJhY2tCeUZ1bmN0aW9uPFY+KTogbnVtYmVyIHtcbiAgaWYgKGxpdmVJZHggPT09IG5ld0lkeCAmJiBPYmplY3QuaXMobGl2ZVZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICAvLyBtYXRjaGluZyBhbmQgbm8gdmFsdWUgaWRlbnRpdHkgdG8gdXBkYXRlXG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoT2JqZWN0LmlzKHRyYWNrQnkobGl2ZUlkeCwgbGl2ZVZhbHVlKSwgdHJhY2tCeShuZXdJZHgsIG5ld1ZhbHVlKSkpIHtcbiAgICAvLyBtYXRjaGluZyBidXQgcmVxdWlyZXMgdmFsdWUgaWRlbnRpdHkgdXBkYXRlXG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogVGhlIGxpdmUgY29sbGVjdGlvbiByZWNvbmNpbGlhdGlvbiBhbGdvcml0aG0gdGhhdCBwZXJmb3JtIHZhcmlvdXMgaW4tcGxhY2Ugb3BlcmF0aW9ucywgc28gaXRcbiAqIHJlZmxlY3RzIHRoZSBjb250ZW50IG9mIHRoZSBuZXcgKGluY29taW5nKSBjb2xsZWN0aW9uLlxuICpcbiAqIFRoZSByZWNvbmNpbGlhdGlvbiBhbGdvcml0aG0gaGFzIDIgY29kZSBwYXRoczpcbiAqIC0gXCJmYXN0XCIgcGF0aCB0aGF0IGRvbid0IHJlcXVpcmUgYW55IG1lbW9yeSBhbGxvY2F0aW9uO1xuICogLSBcInNsb3dcIiBwYXRoIHRoYXQgcmVxdWlyZXMgYWRkaXRpb25hbCBtZW1vcnkgYWxsb2NhdGlvbiBmb3IgaW50ZXJtZWRpYXRlIGRhdGEgc3RydWN0dXJlcyB1c2VkIHRvXG4gKiBjb2xsZWN0IGFkZGl0aW9uYWwgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGxpdmUgY29sbGVjdGlvbi5cbiAqIEl0IG1pZ2h0IGhhcHBlbiB0aGF0IHRoZSBhbGdvcml0aG0gc3dpdGNoZXMgYmV0d2VlbiB0aGUgdHdvIG1vZGVzIGluIHF1ZXN0aW9uIGluIGEgc2luZ2xlXG4gKiByZWNvbmNpbGlhdGlvbiBwYXRoIC0gZ2VuZXJhbGx5IGl0IHRyaWVzIHRvIHN0YXkgb24gdGhlIFwiZmFzdFwiIHBhdGggYXMgbXVjaCBhcyBwb3NzaWJsZS5cbiAqXG4gKiBUaGUgb3ZlcmFsbCBjb21wbGV4aXR5IG9mIHRoZSBhbGdvcml0aG0gaXMgTyhuICsgbSkgZm9yIHNwZWVkIGFuZCBPKG4pIGZvciBtZW1vcnkgKHdoZXJlIG4gaXMgdGhlXG4gKiBsZW5ndGggb2YgdGhlIGxpdmUgY29sbGVjdGlvbiBhbmQgbSBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBpbmNvbWluZyBjb2xsZWN0aW9uKS4gR2l2ZW4gdGhlIHByb2JsZW1cbiAqIGF0IGhhbmQgdGhlIGNvbXBsZXhpdHkgLyBwZXJmb3JtYW5jZSBjb25zdHJhaW50cyBtYWtlcyBpdCBpbXBvc3NpYmxlIHRvIHBlcmZvcm0gdGhlIGFic29sdXRlXG4gKiBtaW5pbXVtIG9mIG9wZXJhdGlvbiB0byByZWNvbmNpbGUgdGhlIDIgY29sbGVjdGlvbnMuIFRoZSBhbGdvcml0aG0gbWFrZXMgZGlmZmVyZW50IHRyYWRlb2ZmcyB0b1xuICogc3RheSB3aXRoaW4gcmVhc29uYWJsZSBwZXJmb3JtYW5jZSBib3VuZHMgYW5kIG1heSBhcHBseSBzdWItb3B0aW1hbCBudW1iZXIgb2Ygb3BlcmF0aW9ucyBpblxuICogY2VydGFpbiBzaXR1YXRpb25zLlxuICpcbiAqIEBwYXJhbSBsaXZlQ29sbGVjdGlvbiB0aGUgY3VycmVudCwgbGl2ZSBjb2xsZWN0aW9uO1xuICogQHBhcmFtIG5ld0NvbGxlY3Rpb24gdGhlIG5ldywgaW5jb21pbmcgY29sbGVjdGlvbjtcbiAqIEBwYXJhbSB0cmFja0J5Rm4ga2V5IGdlbmVyYXRpb24gZnVuY3Rpb24gdGhhdCBkZXRlcm1pbmVzIGVxdWFsaXR5IGJldHdlZW4gaXRlbXMgaW4gdGhlIGxpZmUgYW5kXG4gKiAgICAgaW5jb21pbmcgY29sbGVjdGlvbjtcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29uY2lsZTxULCBWPihcbiAgICBsaXZlQ29sbGVjdGlvbjogTGl2ZUNvbGxlY3Rpb248VCwgVj4sIG5ld0NvbGxlY3Rpb246IEl0ZXJhYmxlPFY+fHVuZGVmaW5lZHxudWxsLFxuICAgIHRyYWNrQnlGbjogVHJhY2tCeUZ1bmN0aW9uPFY+KTogdm9pZCB7XG4gIGxldCBkZXRhY2hlZEl0ZW1zOiBVbmlxdWVWYWx1ZU11bHRpS2V5TWFwPHVua25vd24sIFQ+fHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgbGV0IGxpdmVLZXlzSW5UaGVGdXR1cmU6IFNldDx1bmtub3duPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgbGV0IGxpdmVTdGFydElkeCA9IDA7XG4gIGxldCBsaXZlRW5kSWR4ID0gbGl2ZUNvbGxlY3Rpb24ubGVuZ3RoIC0gMTtcblxuICBpZiAoQXJyYXkuaXNBcnJheShuZXdDb2xsZWN0aW9uKSkge1xuICAgIGxldCBuZXdFbmRJZHggPSBuZXdDb2xsZWN0aW9uLmxlbmd0aCAtIDE7XG5cbiAgICB3aGlsZSAobGl2ZVN0YXJ0SWR4IDw9IGxpdmVFbmRJZHggJiYgbGl2ZVN0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgLy8gY29tcGFyZSBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgIGNvbnN0IGxpdmVTdGFydFZhbHVlID0gbGl2ZUNvbGxlY3Rpb24uYXQobGl2ZVN0YXJ0SWR4KTtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0VmFsdWUgPSBuZXdDb2xsZWN0aW9uW2xpdmVTdGFydElkeF07XG4gICAgICBjb25zdCBpc1N0YXJ0TWF0Y2hpbmcgPVxuICAgICAgICAgIHZhbHVlc01hdGNoaW5nKGxpdmVTdGFydElkeCwgbGl2ZVN0YXJ0VmFsdWUsIGxpdmVTdGFydElkeCwgbmV3U3RhcnRWYWx1ZSwgdHJhY2tCeUZuKTtcbiAgICAgIGlmIChpc1N0YXJ0TWF0Y2hpbmcgIT09IDApIHtcbiAgICAgICAgaWYgKGlzU3RhcnRNYXRjaGluZyA8IDApIHtcbiAgICAgICAgICBsaXZlQ29sbGVjdGlvbi51cGRhdGVWYWx1ZShsaXZlU3RhcnRJZHgsIG5ld1N0YXJ0VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGxpdmVTdGFydElkeCsrO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY29tcGFyZSBmcm9tIHRoZSBlbmRcbiAgICAgIC8vIFRPRE8ocGVyZik6IGRvIF9hbGxfIHRoZSBtYXRjaGluZyBmcm9tIHRoZSBlbmRcbiAgICAgIGNvbnN0IGxpdmVFbmRWYWx1ZSA9IGxpdmVDb2xsZWN0aW9uLmF0KGxpdmVFbmRJZHgpO1xuICAgICAgY29uc3QgbmV3RW5kVmFsdWUgPSBuZXdDb2xsZWN0aW9uW25ld0VuZElkeF07XG4gICAgICBjb25zdCBpc0VuZE1hdGNoaW5nID1cbiAgICAgICAgICB2YWx1ZXNNYXRjaGluZyhsaXZlRW5kSWR4LCBsaXZlRW5kVmFsdWUsIG5ld0VuZElkeCwgbmV3RW5kVmFsdWUsIHRyYWNrQnlGbik7XG4gICAgICBpZiAoaXNFbmRNYXRjaGluZyAhPT0gMCkge1xuICAgICAgICBpZiAoaXNFbmRNYXRjaGluZyA8IDApIHtcbiAgICAgICAgICBsaXZlQ29sbGVjdGlvbi51cGRhdGVWYWx1ZShsaXZlRW5kSWR4LCBuZXdFbmRWYWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgbGl2ZUVuZElkeC0tO1xuICAgICAgICBuZXdFbmRJZHgtLTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIERldGVjdCBzd2FwIGFuZCBtb3ZlczpcbiAgICAgIGNvbnN0IGxpdmVTdGFydEtleSA9IHRyYWNrQnlGbihsaXZlU3RhcnRJZHgsIGxpdmVTdGFydFZhbHVlKTtcbiAgICAgIGNvbnN0IGxpdmVFbmRLZXkgPSB0cmFja0J5Rm4obGl2ZUVuZElkeCwgbGl2ZUVuZFZhbHVlKTtcbiAgICAgIGNvbnN0IG5ld1N0YXJ0S2V5ID0gdHJhY2tCeUZuKGxpdmVTdGFydElkeCwgbmV3U3RhcnRWYWx1ZSk7XG4gICAgICBpZiAoT2JqZWN0LmlzKG5ld1N0YXJ0S2V5LCBsaXZlRW5kS2V5KSkge1xuICAgICAgICBjb25zdCBuZXdFbmRLZXkgPSB0cmFja0J5Rm4obmV3RW5kSWR4LCBuZXdFbmRWYWx1ZSk7XG4gICAgICAgIC8vIGRldGVjdCBzd2FwIG9uIGJvdGggZW5kcztcbiAgICAgICAgaWYgKE9iamVjdC5pcyhuZXdFbmRLZXksIGxpdmVTdGFydEtleSkpIHtcbiAgICAgICAgICBsaXZlQ29sbGVjdGlvbi5zd2FwKGxpdmVTdGFydElkeCwgbGl2ZUVuZElkeCk7XG4gICAgICAgICAgbGl2ZUNvbGxlY3Rpb24udXBkYXRlVmFsdWUobGl2ZUVuZElkeCwgbmV3RW5kVmFsdWUpO1xuICAgICAgICAgIG5ld0VuZElkeC0tO1xuICAgICAgICAgIGxpdmVFbmRJZHgtLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGUgbmV3IGl0ZW0gaXMgdGhlIHNhbWUgYXMgdGhlIGxpdmUgaXRlbSB3aXRoIHRoZSBlbmQgcG9pbnRlciAtIHRoaXMgaXMgYSBtb3ZlIGZvcndhcmRcbiAgICAgICAgICAvLyB0byBhbiBlYXJsaWVyIGluZGV4O1xuICAgICAgICAgIGxpdmVDb2xsZWN0aW9uLm1vdmUobGl2ZUVuZElkeCwgbGl2ZVN0YXJ0SWR4KTtcbiAgICAgICAgfVxuICAgICAgICBsaXZlQ29sbGVjdGlvbi51cGRhdGVWYWx1ZShsaXZlU3RhcnRJZHgsIG5ld1N0YXJ0VmFsdWUpO1xuICAgICAgICBsaXZlU3RhcnRJZHgrKztcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIEZhbGxiYWNrIHRvIHRoZSBzbG93IHBhdGg6IHdlIG5lZWQgdG8gbGVhcm4gbW9yZSBhYm91dCB0aGUgY29udGVudCBvZiB0aGUgbGl2ZSBhbmQgbmV3XG4gICAgICAvLyBjb2xsZWN0aW9ucy5cbiAgICAgIGRldGFjaGVkSXRlbXMgPz89IG5ldyBVbmlxdWVWYWx1ZU11bHRpS2V5TWFwKCk7XG4gICAgICBsaXZlS2V5c0luVGhlRnV0dXJlID8/PVxuICAgICAgICAgIGluaXRMaXZlSXRlbXNJblRoZUZ1dHVyZShsaXZlQ29sbGVjdGlvbiwgbGl2ZVN0YXJ0SWR4LCBsaXZlRW5kSWR4LCB0cmFja0J5Rm4pO1xuXG4gICAgICAvLyBDaGVjayBpZiBJJ20gaW5zZXJ0aW5nIGEgcHJldmlvdXNseSBkZXRhY2hlZCBpdGVtOiBpZiBzbywgYXR0YWNoIGl0IGhlcmVcbiAgICAgIGlmIChhdHRhY2hQcmV2aW91c2x5RGV0YWNoZWQobGl2ZUNvbGxlY3Rpb24sIGRldGFjaGVkSXRlbXMsIGxpdmVTdGFydElkeCwgbmV3U3RhcnRLZXkpKSB7XG4gICAgICAgIGxpdmVDb2xsZWN0aW9uLnVwZGF0ZVZhbHVlKGxpdmVTdGFydElkeCwgbmV3U3RhcnRWYWx1ZSk7XG4gICAgICAgIGxpdmVTdGFydElkeCsrO1xuICAgICAgICBsaXZlRW5kSWR4Kys7XG4gICAgICB9IGVsc2UgaWYgKCFsaXZlS2V5c0luVGhlRnV0dXJlLmhhcyhuZXdTdGFydEtleSkpIHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgd2Ugc2VlbiBhIG5ldyBpdGVtIHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgb2xkIGNvbGxlY3Rpb24gYW5kIG11c3QgYmUgSU5TRVJURURcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IGxpdmVDb2xsZWN0aW9uLmNyZWF0ZShsaXZlU3RhcnRJZHgsIG5ld0NvbGxlY3Rpb25bbGl2ZVN0YXJ0SWR4XSk7XG4gICAgICAgIGxpdmVDb2xsZWN0aW9uLmF0dGFjaChsaXZlU3RhcnRJZHgsIG5ld0l0ZW0pO1xuICAgICAgICBsaXZlU3RhcnRJZHgrKztcbiAgICAgICAgbGl2ZUVuZElkeCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gV2Uga25vdyB0aGF0IHRoZSBuZXcgaXRlbSBleGlzdHMgbGF0ZXIgb24gaW4gb2xkIGNvbGxlY3Rpb24gYnV0IHdlIGRvbid0IGtub3cgaXRzIGluZGV4XG4gICAgICAgIC8vIGFuZCBhcyB0aGUgY29uc2VxdWVuY2UgY2FuJ3QgbW92ZSBpdCAoZG9uJ3Qga25vdyB3aGVyZSB0byBmaW5kIGl0KS4gRGV0YWNoIHRoZSBvbGQgaXRlbSxcbiAgICAgICAgLy8gaG9waW5nIHRoYXQgaXQgdW5sb2NrcyB0aGUgZmFzdCBwYXRoIGFnYWluLlxuICAgICAgICBkZXRhY2hlZEl0ZW1zLnNldChsaXZlU3RhcnRLZXksIGxpdmVDb2xsZWN0aW9uLmRldGFjaChsaXZlU3RhcnRJZHgpKTtcbiAgICAgICAgbGl2ZUVuZElkeC0tO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpbmFsIGNsZWFudXAgc3RlcHM6XG4gICAgLy8gLSBtb3JlIGl0ZW1zIGluIHRoZSBuZXcgY29sbGVjdGlvbiA9PiBpbnNlcnRcbiAgICB3aGlsZSAobGl2ZVN0YXJ0SWR4IDw9IG5ld0VuZElkeCkge1xuICAgICAgY3JlYXRlT3JBdHRhY2goXG4gICAgICAgICAgbGl2ZUNvbGxlY3Rpb24sIGRldGFjaGVkSXRlbXMsIHRyYWNrQnlGbiwgbGl2ZVN0YXJ0SWR4LCBuZXdDb2xsZWN0aW9uW2xpdmVTdGFydElkeF0pO1xuICAgICAgbGl2ZVN0YXJ0SWR4Kys7XG4gICAgfVxuXG4gIH0gZWxzZSBpZiAobmV3Q29sbGVjdGlvbiAhPSBudWxsKSB7XG4gICAgLy8gaXRlcmFibGUgLSBpbW1lZGlhdGVseSBmYWxsYmFjayB0byB0aGUgc2xvdyBwYXRoXG4gICAgY29uc3QgbmV3Q29sbGVjdGlvbkl0ZXJhdG9yID0gbmV3Q29sbGVjdGlvbltTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgbGV0IG5ld0l0ZXJhdGlvblJlc3VsdCA9IG5ld0NvbGxlY3Rpb25JdGVyYXRvci5uZXh0KCk7XG4gICAgd2hpbGUgKCFuZXdJdGVyYXRpb25SZXN1bHQuZG9uZSAmJiBsaXZlU3RhcnRJZHggPD0gbGl2ZUVuZElkeCkge1xuICAgICAgY29uc3QgbGl2ZVZhbHVlID0gbGl2ZUNvbGxlY3Rpb24uYXQobGl2ZVN0YXJ0SWR4KTtcbiAgICAgIGNvbnN0IG5ld1ZhbHVlID0gbmV3SXRlcmF0aW9uUmVzdWx0LnZhbHVlO1xuICAgICAgY29uc3QgaXNTdGFydE1hdGNoaW5nID1cbiAgICAgICAgICB2YWx1ZXNNYXRjaGluZyhsaXZlU3RhcnRJZHgsIGxpdmVWYWx1ZSwgbGl2ZVN0YXJ0SWR4LCBuZXdWYWx1ZSwgdHJhY2tCeUZuKTtcbiAgICAgIGlmIChpc1N0YXJ0TWF0Y2hpbmcgIT09IDApIHtcbiAgICAgICAgLy8gZm91bmQgYSBtYXRjaCAtIG1vdmUgb24sIGJ1dCB1cGRhdGUgdmFsdWVcbiAgICAgICAgaWYgKGlzU3RhcnRNYXRjaGluZyA8IDApIHtcbiAgICAgICAgICBsaXZlQ29sbGVjdGlvbi51cGRhdGVWYWx1ZShsaXZlU3RhcnRJZHgsIG5ld1ZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBsaXZlU3RhcnRJZHgrKztcbiAgICAgICAgbmV3SXRlcmF0aW9uUmVzdWx0ID0gbmV3Q29sbGVjdGlvbkl0ZXJhdG9yLm5leHQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRldGFjaGVkSXRlbXMgPz89IG5ldyBVbmlxdWVWYWx1ZU11bHRpS2V5TWFwKCk7XG4gICAgICAgIGxpdmVLZXlzSW5UaGVGdXR1cmUgPz89XG4gICAgICAgICAgICBpbml0TGl2ZUl0ZW1zSW5UaGVGdXR1cmUobGl2ZUNvbGxlY3Rpb24sIGxpdmVTdGFydElkeCwgbGl2ZUVuZElkeCwgdHJhY2tCeUZuKTtcblxuICAgICAgICAvLyBDaGVjayBpZiBJJ20gaW5zZXJ0aW5nIGEgcHJldmlvdXNseSBkZXRhY2hlZCBpdGVtOiBpZiBzbywgYXR0YWNoIGl0IGhlcmVcbiAgICAgICAgY29uc3QgbmV3S2V5ID0gdHJhY2tCeUZuKGxpdmVTdGFydElkeCwgbmV3VmFsdWUpO1xuICAgICAgICBpZiAoYXR0YWNoUHJldmlvdXNseURldGFjaGVkKGxpdmVDb2xsZWN0aW9uLCBkZXRhY2hlZEl0ZW1zLCBsaXZlU3RhcnRJZHgsIG5ld0tleSkpIHtcbiAgICAgICAgICBsaXZlQ29sbGVjdGlvbi51cGRhdGVWYWx1ZShsaXZlU3RhcnRJZHgsIG5ld1ZhbHVlKTtcbiAgICAgICAgICBsaXZlU3RhcnRJZHgrKztcbiAgICAgICAgICBsaXZlRW5kSWR4Kys7XG4gICAgICAgICAgbmV3SXRlcmF0aW9uUmVzdWx0ID0gbmV3Q29sbGVjdGlvbkl0ZXJhdG9yLm5leHQoKTtcbiAgICAgICAgfSBlbHNlIGlmICghbGl2ZUtleXNJblRoZUZ1dHVyZS5oYXMobmV3S2V5KSkge1xuICAgICAgICAgIGxpdmVDb2xsZWN0aW9uLmF0dGFjaChsaXZlU3RhcnRJZHgsIGxpdmVDb2xsZWN0aW9uLmNyZWF0ZShsaXZlU3RhcnRJZHgsIG5ld1ZhbHVlKSk7XG4gICAgICAgICAgbGl2ZVN0YXJ0SWR4Kys7XG4gICAgICAgICAgbGl2ZUVuZElkeCsrO1xuICAgICAgICAgIG5ld0l0ZXJhdGlvblJlc3VsdCA9IG5ld0NvbGxlY3Rpb25JdGVyYXRvci5uZXh0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaXQgaXMgYSBtb3ZlIGZvcndhcmQgLSBkZXRhY2ggdGhlIGN1cnJlbnQgaXRlbSB3aXRob3V0IGFkdmFuY2luZyBpbiBjb2xsZWN0aW9uc1xuICAgICAgICAgIGNvbnN0IGxpdmVLZXkgPSB0cmFja0J5Rm4obGl2ZVN0YXJ0SWR4LCBsaXZlVmFsdWUpO1xuICAgICAgICAgIGRldGFjaGVkSXRlbXMuc2V0KGxpdmVLZXksIGxpdmVDb2xsZWN0aW9uLmRldGFjaChsaXZlU3RhcnRJZHgpKTtcbiAgICAgICAgICBsaXZlRW5kSWR4LS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyB0aGlzIGlzIGEgbmV3IGl0ZW0gYXMgd2UgcnVuIG91dCBvZiB0aGUgaXRlbXMgaW4gdGhlIG9sZCBjb2xsZWN0aW9uIC0gY3JlYXRlIG9yIGF0dGFjaCBhXG4gICAgLy8gcHJldmlvdXNseSBkZXRhY2hlZCBvbmVcbiAgICB3aGlsZSAoIW5ld0l0ZXJhdGlvblJlc3VsdC5kb25lKSB7XG4gICAgICBjcmVhdGVPckF0dGFjaChcbiAgICAgICAgICBsaXZlQ29sbGVjdGlvbiwgZGV0YWNoZWRJdGVtcywgdHJhY2tCeUZuLCBsaXZlQ29sbGVjdGlvbi5sZW5ndGgsXG4gICAgICAgICAgbmV3SXRlcmF0aW9uUmVzdWx0LnZhbHVlKTtcbiAgICAgIG5ld0l0ZXJhdGlvblJlc3VsdCA9IG5ld0NvbGxlY3Rpb25JdGVyYXRvci5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2xlYW51cHMgY29tbW9uIHRvIHRoZSBhcnJheSBhbmQgaXRlcmFibGU6XG4gIC8vIC0gbW9yZSBpdGVtcyBpbiB0aGUgbGl2ZSBjb2xsZWN0aW9uID0+IGRlbGV0ZSBzdGFydGluZyBmcm9tIHRoZSBlbmQ7XG4gIHdoaWxlIChsaXZlU3RhcnRJZHggPD0gbGl2ZUVuZElkeCkge1xuICAgIGxpdmVDb2xsZWN0aW9uLmRlc3Ryb3kobGl2ZUNvbGxlY3Rpb24uZGV0YWNoKGxpdmVFbmRJZHgtLSkpO1xuICB9XG5cblxuICAvLyAtIGRlc3Ryb3kgaXRlbXMgdGhhdCB3ZXJlIGRldGFjaGVkIGJ1dCBuZXZlciBhdHRhY2hlZCBhZ2Fpbi5cbiAgZGV0YWNoZWRJdGVtcz8uZm9yRWFjaChpdGVtID0+IHtcbiAgICBsaXZlQ29sbGVjdGlvbi5kZXN0cm95KGl0ZW0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYXR0YWNoUHJldmlvdXNseURldGFjaGVkPFQsIFY+KFxuICAgIHByZXZDb2xsZWN0aW9uOiBMaXZlQ29sbGVjdGlvbjxULCBWPixcbiAgICBkZXRhY2hlZEl0ZW1zOiBVbmlxdWVWYWx1ZU11bHRpS2V5TWFwPHVua25vd24sIFQ+fHVuZGVmaW5lZCwgaW5kZXg6IG51bWJlcixcbiAgICBrZXk6IHVua25vd24pOiBib29sZWFuIHtcbiAgaWYgKGRldGFjaGVkSXRlbXMgIT09IHVuZGVmaW5lZCAmJiBkZXRhY2hlZEl0ZW1zLmhhcyhrZXkpKSB7XG4gICAgcHJldkNvbGxlY3Rpb24uYXR0YWNoKGluZGV4LCBkZXRhY2hlZEl0ZW1zLmdldChrZXkpISk7XG4gICAgZGV0YWNoZWRJdGVtcy5kZWxldGUoa2V5KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9yQXR0YWNoPFQsIFY+KFxuICAgIGxpdmVDb2xsZWN0aW9uOiBMaXZlQ29sbGVjdGlvbjxULCBWPixcbiAgICBkZXRhY2hlZEl0ZW1zOiBVbmlxdWVWYWx1ZU11bHRpS2V5TWFwPHVua25vd24sIFQ+fHVuZGVmaW5lZCxcbiAgICB0cmFja0J5Rm46IFRyYWNrQnlGdW5jdGlvbjx1bmtub3duPiwgaW5kZXg6IG51bWJlciwgdmFsdWU6IFYpIHtcbiAgaWYgKCFhdHRhY2hQcmV2aW91c2x5RGV0YWNoZWQobGl2ZUNvbGxlY3Rpb24sIGRldGFjaGVkSXRlbXMsIGluZGV4LCB0cmFja0J5Rm4oaW5kZXgsIHZhbHVlKSkpIHtcbiAgICBjb25zdCBuZXdJdGVtID0gbGl2ZUNvbGxlY3Rpb24uY3JlYXRlKGluZGV4LCB2YWx1ZSk7XG4gICAgbGl2ZUNvbGxlY3Rpb24uYXR0YWNoKGluZGV4LCBuZXdJdGVtKTtcbiAgfSBlbHNlIHtcbiAgICBsaXZlQ29sbGVjdGlvbi51cGRhdGVWYWx1ZShpbmRleCwgdmFsdWUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXRMaXZlSXRlbXNJblRoZUZ1dHVyZTxUPihcbiAgICBsaXZlQ29sbGVjdGlvbjogTGl2ZUNvbGxlY3Rpb248dW5rbm93biwgdW5rbm93bj4sIHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyLFxuICAgIHRyYWNrQnlGbjogVHJhY2tCeUZ1bmN0aW9uPHVua25vd24+KTogU2V0PHVua25vd24+IHtcbiAgY29uc3Qga2V5cyA9IG5ldyBTZXQoKTtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAga2V5cy5hZGQodHJhY2tCeUZuKGksIGxpdmVDb2xsZWN0aW9uLmF0KGkpKSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59XG5cbi8qKlxuICogQSBzcGVjaWZpYywgcGFydGlhbCBpbXBsZW1lbnRhdGlvbiBvZiB0aGUgTWFwIGludGVyZmFjZSB3aXRoIHRoZSBmb2xsb3dpbmcgY2hhcmFjdGVyaXN0aWNzOlxuICogLSBhbGxvd3MgbXVsdGlwbGUgdmFsdWVzIGZvciBhIGdpdmVuIGtleTtcbiAqIC0gbWFpbnRhaW4gRklGTyBvcmRlciBmb3IgbXVsdGlwbGUgdmFsdWVzIGNvcnJlc3BvbmRpbmcgdG8gYSBnaXZlbiBrZXk7XG4gKiAtIGFzc3VtZXMgdGhhdCBhbGwgdmFsdWVzIGFyZSB1bmlxdWUuXG4gKlxuICogVGhlIGltcGxlbWVudGF0aW9uIGFpbXMgYXQgaGF2aW5nIHRoZSBtaW5pbWFsIG92ZXJoZWFkIGZvciBjYXNlcyB3aGVyZSBrZXlzIGFyZSBfbm90XyBkdXBsaWNhdGVkXG4gKiAodGhlIG1vc3QgY29tbW9uIGNhc2UgaW4gdGhlIGxpc3QgcmVjb25jaWxpYXRpb24gYWxnb3JpdGhtKS4gVG8gYWNoaWV2ZSB0aGlzLCB0aGUgZmlyc3QgdmFsdWUgZm9yXG4gKiBhIGdpdmVuIGtleSBpcyBzdG9yZWQgaW4gYSByZWd1bGFyIG1hcC4gVGhlbiwgd2hlbiBtb3JlIHZhbHVlcyBhcmUgc2V0IGZvciBhIGdpdmVuIGtleSwgd2VcbiAqIG1haW50YWluIGEgZm9ybSBvZiBsaW5rZWQgbGlzdCBpbiBhIHNlcGFyYXRlIG1hcC4gVG8gbWFpbnRhaW4gdGhpcyBsaW5rZWQgbGlzdCB3ZSBhc3N1bWUgdGhhdCBhbGxcbiAqIHZhbHVlcyAoaW4gdGhlIGVudGlyZSBjb2xsZWN0aW9uKSBhcmUgdW5pcXVlLlxuICovXG5leHBvcnQgY2xhc3MgVW5pcXVlVmFsdWVNdWx0aUtleU1hcDxLLCBWPiB7XG4gIC8vIEEgbWFwIGZyb20gYSBrZXkgdG8gdGhlIGZpcnN0IHZhbHVlIGNvcnJlc3BvbmRpbmcgdG8gdGhpcyBrZXkuXG4gIHByaXZhdGUga3ZNYXAgPSBuZXcgTWFwPEssIFY+KCk7XG4gIC8vIEEgbWFwIHRoYXQgYWN0cyBhcyBhIGxpbmtlZCBsaXN0IG9mIHZhbHVlcyAtIGVhY2ggdmFsdWUgbWFwcyB0byB0aGUgbmV4dCB2YWx1ZSBpbiB0aGlzIFwibGlua2VkXG4gIC8vIGxpc3RcIiAodGhpcyBvbmx5IHdvcmtzIGlmIHZhbHVlcyBhcmUgdW5pcXVlKS4gQWxsb2NhdGVkIGxhemlseSB0byBhdm9pZCBtZW1vcnkgY29uc3VtcHRpb24gd2hlblxuICAvLyB0aGVyZSBhcmUgbm8gZHVwbGljYXRlZCB2YWx1ZXMuXG4gIHByaXZhdGUgX3ZNYXA6IE1hcDxWLCBWPnx1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgaGFzKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmt2TWFwLmhhcyhrZXkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogSyk6IGJvb2xlYW4ge1xuICAgIGlmICghdGhpcy5oYXMoa2V5KSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgdmFsdWUgPSB0aGlzLmt2TWFwLmdldChrZXkpITtcbiAgICBpZiAodGhpcy5fdk1hcCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuX3ZNYXAuaGFzKHZhbHVlKSkge1xuICAgICAgdGhpcy5rdk1hcC5zZXQoa2V5LCB0aGlzLl92TWFwLmdldCh2YWx1ZSkhKTtcbiAgICAgIHRoaXMuX3ZNYXAuZGVsZXRlKHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5rdk1hcC5kZWxldGUoa2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGdldChrZXk6IEspOiBWfHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMua3ZNYXAuZ2V0KGtleSk7XG4gIH1cblxuICBzZXQoa2V5OiBLLCB2YWx1ZTogVik6IHZvaWQge1xuICAgIGlmICh0aGlzLmt2TWFwLmhhcyhrZXkpKSB7XG4gICAgICBsZXQgcHJldlZhbHVlID0gdGhpcy5rdk1hcC5nZXQoa2V5KSE7XG4gICAgICBuZ0Rldk1vZGUgJiZcbiAgICAgICAgICBhc3NlcnROb3RTYW1lKFxuICAgICAgICAgICAgICBwcmV2VmFsdWUsIHZhbHVlLCBgRGV0ZWN0ZWQgYSBkdXBsaWNhdGVkIHZhbHVlICR7dmFsdWV9IGZvciB0aGUga2V5ICR7a2V5fWApO1xuXG4gICAgICBpZiAodGhpcy5fdk1hcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3ZNYXAgPSBuZXcgTWFwKCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZNYXAgPSB0aGlzLl92TWFwO1xuICAgICAgd2hpbGUgKHZNYXAuaGFzKHByZXZWYWx1ZSkpIHtcbiAgICAgICAgcHJldlZhbHVlID0gdk1hcC5nZXQocHJldlZhbHVlKSE7XG4gICAgICB9XG4gICAgICB2TWFwLnNldChwcmV2VmFsdWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5rdk1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yRWFjaChjYjogKHY6IFYsIGs6IEspID0+IHZvaWQpIHtcbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgdGhpcy5rdk1hcCkge1xuICAgICAgY2IodmFsdWUsIGtleSk7XG4gICAgICBpZiAodGhpcy5fdk1hcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHZNYXAgPSB0aGlzLl92TWFwO1xuICAgICAgICB3aGlsZSAodk1hcC5oYXModmFsdWUpKSB7XG4gICAgICAgICAgdmFsdWUgPSB2TWFwLmdldCh2YWx1ZSkhO1xuICAgICAgICAgIGNiKHZhbHVlLCBrZXkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=