/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '../event_emitter';
import { arrayEquals, flatten } from '../util/array_utils';
function symbolIterator() {
    // @ts-expect-error accessing a private member
    return this._results[Symbol.iterator]();
}
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link ViewChildren}, {@link ContentChildren}, and {@link QueryList}
 * provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="let i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * @usageNotes
 * ### Example
 * ```typescript
 * @Component({...})
 * class Container {
 *   @ViewChildren(Item) items:QueryList<Item>;
 * }
 * ```
 *
 * @publicApi
 */
export class QueryList {
    static { Symbol.iterator; }
    /**
     * Returns `Observable` of `QueryList` notifying the subscriber of changes.
     */
    get changes() {
        return this._changes ??= new EventEmitter();
    }
    /**
     * @param emitDistinctChangesOnly Whether `QueryList.changes` should fire only when actual change
     *     has occurred. Or if it should fire when query is recomputed. (recomputing could resolve in
     *     the same result)
     */
    constructor(_emitDistinctChangesOnly = false) {
        this._emitDistinctChangesOnly = _emitDistinctChangesOnly;
        this.dirty = true;
        this._onDirty = undefined;
        this._results = [];
        this._changesDetected = false;
        this._changes = undefined;
        this.length = 0;
        this.first = undefined;
        this.last = undefined;
        // This function should be declared on the prototype, but doing so there will cause the class
        // declaration to have side-effects and become not tree-shakable. For this reason we do it in
        // the constructor.
        // [Symbol.iterator](): Iterator<T> { ... }
        const proto = QueryList.prototype;
        if (!proto[Symbol.iterator])
            proto[Symbol.iterator] = symbolIterator;
    }
    /**
     * Returns the QueryList entry at `index`.
     */
    get(index) {
        return this._results[index];
    }
    /**
     * See
     * [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
     */
    map(fn) {
        return this._results.map(fn);
    }
    filter(fn) {
        return this._results.filter(fn);
    }
    /**
     * See
     * [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
     */
    find(fn) {
        return this._results.find(fn);
    }
    /**
     * See
     * [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
     */
    reduce(fn, init) {
        return this._results.reduce(fn, init);
    }
    /**
     * See
     * [Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
     */
    forEach(fn) {
        this._results.forEach(fn);
    }
    /**
     * See
     * [Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)
     */
    some(fn) {
        return this._results.some(fn);
    }
    /**
     * Returns a copy of the internal results list as an Array.
     */
    toArray() {
        return this._results.slice();
    }
    toString() {
        return this._results.toString();
    }
    /**
     * Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
     * on change detection, it will not notify of changes to the queries, unless a new change
     * occurs.
     *
     * @param resultsTree The query results to store
     * @param identityAccessor Optional function for extracting stable object identity from a value
     *    in the array. This function is executed for each element of the query result list while
     *    comparing current query list with the new one (provided as a first argument of the `reset`
     *    function) to detect if the lists are different. If the function is not provided, elements
     *    are compared as is (without any pre-processing).
     */
    reset(resultsTree, identityAccessor) {
        this.dirty = false;
        const newResultFlat = flatten(resultsTree);
        if (this._changesDetected = !arrayEquals(this._results, newResultFlat, identityAccessor)) {
            this._results = newResultFlat;
            this.length = newResultFlat.length;
            this.last = newResultFlat[this.length - 1];
            this.first = newResultFlat[0];
        }
    }
    /**
     * Triggers a change event by emitting on the `changes` {@link EventEmitter}.
     */
    notifyOnChanges() {
        if (this._changes !== undefined && (this._changesDetected || !this._emitDistinctChangesOnly))
            this._changes.emit(this);
    }
    /** @internal */
    onDirty(cb) {
        this._onDirty = cb;
    }
    /** internal */
    setDirty() {
        this.dirty = true;
        this._onDirty?.();
    }
    /** internal */
    destroy() {
        if (this._changes !== undefined) {
            this._changes.complete();
            this._changes.unsubscribe();
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfbGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL2xpbmtlci9xdWVyeV9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUlILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUU5QyxPQUFPLEVBQUMsV0FBVyxFQUFFLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXpELFNBQVMsY0FBYztJQUNyQiw4Q0FBOEM7SUFDOUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO0FBQzFDLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sT0FBTyxTQUFTO2FBMkpuQixNQUFNLENBQUMsUUFBUTtJQWhKaEI7O09BRUc7SUFDSCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQW9CLDJCQUFvQyxLQUFLO1FBQXpDLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBaUI7UUF0QjdDLFVBQUssR0FBRyxJQUFJLENBQUM7UUFDckIsYUFBUSxHQUFnQixTQUFTLENBQUM7UUFDbEMsYUFBUSxHQUFhLEVBQUUsQ0FBQztRQUN4QixxQkFBZ0IsR0FBWSxLQUFLLENBQUM7UUFDbEMsYUFBUSxHQUF5QyxTQUFTLENBQUM7UUFFMUQsV0FBTSxHQUFXLENBQUMsQ0FBQztRQUNuQixVQUFLLEdBQU0sU0FBVSxDQUFDO1FBQ3RCLFNBQUksR0FBTSxTQUFVLENBQUM7UUFlNUIsNkZBQTZGO1FBQzdGLDZGQUE2RjtRQUM3RixtQkFBbUI7UUFDbkIsMkNBQTJDO1FBQzNDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7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QUFDLFFBQVEsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7Q0FRRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnLi4vZXZlbnRfZW1pdHRlcic7XG5pbXBvcnQge1dyaXRhYmxlfSBmcm9tICcuLi9pbnRlcmZhY2UvdHlwZSc7XG5pbXBvcnQge2FycmF5RXF1YWxzLCBmbGF0dGVufSBmcm9tICcuLi91dGlsL2FycmF5X3V0aWxzJztcblxuZnVuY3Rpb24gc3ltYm9sSXRlcmF0b3I8VD4odGhpczogUXVlcnlMaXN0PFQ+KTogSXRlcmF0b3I8VD4ge1xuICAvLyBAdHMtZXhwZWN0LWVycm9yIGFjY2Vzc2luZyBhIHByaXZhdGUgbWVtYmVyXG4gIHJldHVybiB0aGlzLl9yZXN1bHRzW1N5bWJvbC5pdGVyYXRvcl0oKTtcbn1cblxuLyoqXG4gKiBBbiB1bm1vZGlmaWFibGUgbGlzdCBvZiBpdGVtcyB0aGF0IEFuZ3VsYXIga2VlcHMgdXAgdG8gZGF0ZSB3aGVuIHRoZSBzdGF0ZVxuICogb2YgdGhlIGFwcGxpY2F0aW9uIGNoYW5nZXMuXG4gKlxuICogVGhlIHR5cGUgb2Ygb2JqZWN0IHRoYXQge0BsaW5rIFZpZXdDaGlsZHJlbn0sIHtAbGluayBDb250ZW50Q2hpbGRyZW59LCBhbmQge0BsaW5rIFF1ZXJ5TGlzdH1cbiAqIHByb3ZpZGUuXG4gKlxuICogSW1wbGVtZW50cyBhbiBpdGVyYWJsZSBpbnRlcmZhY2UsIHRoZXJlZm9yZSBpdCBjYW4gYmUgdXNlZCBpbiBib3RoIEVTNlxuICogamF2YXNjcmlwdCBgZm9yICh2YXIgaSBvZiBpdGVtcylgIGxvb3BzIGFzIHdlbGwgYXMgaW4gQW5ndWxhciB0ZW1wbGF0ZXMgd2l0aFxuICogYCpuZ0Zvcj1cImxldCBpIG9mIG15TGlzdFwiYC5cbiAqXG4gKiBDaGFuZ2VzIGNhbiBiZSBvYnNlcnZlZCBieSBzdWJzY3JpYmluZyB0byB0aGUgY2hhbmdlcyBgT2JzZXJ2YWJsZWAuXG4gKlxuICogTk9URTogSW4gdGhlIGZ1dHVyZSB0aGlzIGNsYXNzIHdpbGwgaW1wbGVtZW50IGFuIGBPYnNlcnZhYmxlYCBpbnRlcmZhY2UuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHsuLi59KVxuICogY2xhc3MgQ29udGFpbmVyIHtcbiAqICAgQFZpZXdDaGlsZHJlbihJdGVtKSBpdGVtczpRdWVyeUxpc3Q8SXRlbT47XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjbGFzcyBRdWVyeUxpc3Q8VD4gaW1wbGVtZW50cyBJdGVyYWJsZTxUPiB7XG4gIHB1YmxpYyByZWFkb25seSBkaXJ0eSA9IHRydWU7XG4gIHByaXZhdGUgX29uRGlydHk/OiAoKSA9PiB2b2lkID0gdW5kZWZpbmVkO1xuICBwcml2YXRlIF9yZXN1bHRzOiBBcnJheTxUPiA9IFtdO1xuICBwcml2YXRlIF9jaGFuZ2VzRGV0ZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY2hhbmdlczogRXZlbnRFbWl0dGVyPFF1ZXJ5TGlzdDxUPj58dW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuXG4gIHJlYWRvbmx5IGxlbmd0aDogbnVtYmVyID0gMDtcbiAgcmVhZG9ubHkgZmlyc3Q6IFQgPSB1bmRlZmluZWQhO1xuICByZWFkb25seSBsYXN0OiBUID0gdW5kZWZpbmVkITtcblxuICAvKipcbiAgICogUmV0dXJucyBgT2JzZXJ2YWJsZWAgb2YgYFF1ZXJ5TGlzdGAgbm90aWZ5aW5nIHRoZSBzdWJzY3JpYmVyIG9mIGNoYW5nZXMuXG4gICAqL1xuICBnZXQgY2hhbmdlcygpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jaGFuZ2VzID8/PSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIGVtaXREaXN0aW5jdENoYW5nZXNPbmx5IFdoZXRoZXIgYFF1ZXJ5TGlzdC5jaGFuZ2VzYCBzaG91bGQgZmlyZSBvbmx5IHdoZW4gYWN0dWFsIGNoYW5nZVxuICAgKiAgICAgaGFzIG9jY3VycmVkLiBPciBpZiBpdCBzaG91bGQgZmlyZSB3aGVuIHF1ZXJ5IGlzIHJlY29tcHV0ZWQuIChyZWNvbXB1dGluZyBjb3VsZCByZXNvbHZlIGluXG4gICAqICAgICB0aGUgc2FtZSByZXN1bHQpXG4gICAqL1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbWl0RGlzdGluY3RDaGFuZ2VzT25seTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgLy8gVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgZGVjbGFyZWQgb24gdGhlIHByb3RvdHlwZSwgYnV0IGRvaW5nIHNvIHRoZXJlIHdpbGwgY2F1c2UgdGhlIGNsYXNzXG4gICAgLy8gZGVjbGFyYXRpb24gdG8gaGF2ZSBzaWRlLWVmZmVjdHMgYW5kIGJlY29tZSBub3QgdHJlZS1zaGFrYWJsZS4gRm9yIHRoaXMgcmVhc29uIHdlIGRvIGl0IGluXG4gICAgLy8gdGhlIGNvbnN0cnVjdG9yLlxuICAgIC8vIFtTeW1ib2wuaXRlcmF0b3JdKCk6IEl0ZXJhdG9yPFQ+IHsgLi4uIH1cbiAgICBjb25zdCBwcm90byA9IFF1ZXJ5TGlzdC5wcm90b3R5cGU7XG4gICAgaWYgKCFwcm90b1tTeW1ib2wuaXRlcmF0b3JdKSBwcm90b1tTeW1ib2wuaXRlcmF0b3JdID0gc3ltYm9sSXRlcmF0b3I7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgUXVlcnlMaXN0IGVudHJ5IGF0IGBpbmRleGAuXG4gICAqL1xuICBnZXQoaW5kZXg6IG51bWJlcik6IFR8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0c1tpbmRleF07XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5tYXBdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L21hcClcbiAgICovXG4gIG1hcDxVPihmbjogKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBUW10pID0+IFUpOiBVW10ge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHRzLm1hcChmbik7XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5maWx0ZXJdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlcilcbiAgICovXG4gIGZpbHRlcjxTIGV4dGVuZHMgVD4ocHJlZGljYXRlOiAodmFsdWU6IFQsIGluZGV4OiBudW1iZXIsIGFycmF5OiByZWFkb25seSBUW10pID0+IHZhbHVlIGlzIFMpOiBTW107XG4gIGZpbHRlcihwcmVkaWNhdGU6ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IHJlYWRvbmx5IFRbXSkgPT4gdW5rbm93bik6IFRbXTtcbiAgZmlsdGVyKGZuOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHMuZmlsdGVyKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWVcbiAgICogW0FycmF5LmZpbmRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbmQpXG4gICAqL1xuICBmaW5kKGZuOiAoaXRlbTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IFR8dW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fcmVzdWx0cy5maW5kKGZuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWVcbiAgICogW0FycmF5LnJlZHVjZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlKVxuICAgKi9cbiAgcmVkdWNlPFU+KGZuOiAocHJldlZhbHVlOiBVLCBjdXJWYWx1ZTogVCwgY3VySW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gVSwgaW5pdDogVSk6IFUge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHRzLnJlZHVjZShmbiwgaW5pdCk7XG4gIH1cblxuICAvKipcbiAgICogU2VlXG4gICAqIFtBcnJheS5mb3JFYWNoXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9mb3JFYWNoKVxuICAgKi9cbiAgZm9yRWFjaChmbjogKGl0ZW06IFQsIGluZGV4OiBudW1iZXIsIGFycmF5OiBUW10pID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXN1bHRzLmZvckVhY2goZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlZVxuICAgKiBbQXJyYXkuc29tZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvc29tZSlcbiAgICovXG4gIHNvbWUoZm46ICh2YWx1ZTogVCwgaW5kZXg6IG51bWJlciwgYXJyYXk6IFRbXSkgPT4gYm9vbGVhbik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZXN1bHRzLnNvbWUoZm4pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBjb3B5IG9mIHRoZSBpbnRlcm5hbCByZXN1bHRzIGxpc3QgYXMgYW4gQXJyYXkuXG4gICAqL1xuICB0b0FycmF5KCk6IFRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHMuc2xpY2UoKTtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3Jlc3VsdHMudG9TdHJpbmcoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSBzdG9yZWQgZGF0YSBvZiB0aGUgcXVlcnkgbGlzdCwgYW5kIHJlc2V0cyB0aGUgYGRpcnR5YCBmbGFnIHRvIGBmYWxzZWAsIHNvIHRoYXRcbiAgICogb24gY2hhbmdlIGRldGVjdGlvbiwgaXQgd2lsbCBub3Qgbm90aWZ5IG9mIGNoYW5nZXMgdG8gdGhlIHF1ZXJpZXMsIHVubGVzcyBhIG5ldyBjaGFuZ2VcbiAgICogb2NjdXJzLlxuICAgKlxuICAgKiBAcGFyYW0gcmVzdWx0c1RyZWUgVGhlIHF1ZXJ5IHJlc3VsdHMgdG8gc3RvcmVcbiAgICogQHBhcmFtIGlkZW50aXR5QWNjZXNzb3IgT3B0aW9uYWwgZnVuY3Rpb24gZm9yIGV4dHJhY3Rpbmcgc3RhYmxlIG9iamVjdCBpZGVudGl0eSBmcm9tIGEgdmFsdWVcbiAgICogICAgaW4gdGhlIGFycmF5LiBUaGlzIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGZvciBlYWNoIGVsZW1lbnQgb2YgdGhlIHF1ZXJ5IHJlc3VsdCBsaXN0IHdoaWxlXG4gICAqICAgIGNvbXBhcmluZyBjdXJyZW50IHF1ZXJ5IGxpc3Qgd2l0aCB0aGUgbmV3IG9uZSAocHJvdmlkZWQgYXMgYSBmaXJzdCBhcmd1bWVudCBvZiB0aGUgYHJlc2V0YFxuICAgKiAgICBmdW5jdGlvbikgdG8gZGV0ZWN0IGlmIHRoZSBsaXN0cyBhcmUgZGlmZmVyZW50LiBJZiB0aGUgZnVuY3Rpb24gaXMgbm90IHByb3ZpZGVkLCBlbGVtZW50c1xuICAgKiAgICBhcmUgY29tcGFyZWQgYXMgaXMgKHdpdGhvdXQgYW55IHByZS1wcm9jZXNzaW5nKS5cbiAgICovXG4gIHJlc2V0KHJlc3VsdHNUcmVlOiBBcnJheTxUfGFueVtdPiwgaWRlbnRpdHlBY2Nlc3Nvcj86ICh2YWx1ZTogVCkgPT4gdW5rbm93bik6IHZvaWQge1xuICAgICh0aGlzIGFzIHtkaXJ0eTogYm9vbGVhbn0pLmRpcnR5ID0gZmFsc2U7XG4gICAgY29uc3QgbmV3UmVzdWx0RmxhdCA9IGZsYXR0ZW4ocmVzdWx0c1RyZWUpO1xuICAgIGlmICh0aGlzLl9jaGFuZ2VzRGV0ZWN0ZWQgPSAhYXJyYXlFcXVhbHModGhpcy5fcmVzdWx0cywgbmV3UmVzdWx0RmxhdCwgaWRlbnRpdHlBY2Nlc3NvcikpIHtcbiAgICAgIHRoaXMuX3Jlc3VsdHMgPSBuZXdSZXN1bHRGbGF0O1xuICAgICAgKHRoaXMgYXMgV3JpdGFibGU8dGhpcz4pLmxlbmd0aCA9IG5ld1Jlc3VsdEZsYXQubGVuZ3RoO1xuICAgICAgKHRoaXMgYXMgV3JpdGFibGU8dGhpcz4pLmxhc3QgPSBuZXdSZXN1bHRGbGF0W3RoaXMubGVuZ3RoIC0gMV07XG4gICAgICAodGhpcyBhcyBXcml0YWJsZTx0aGlzPikuZmlyc3QgPSBuZXdSZXN1bHRGbGF0WzBdO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhIGNoYW5nZSBldmVudCBieSBlbWl0dGluZyBvbiB0aGUgYGNoYW5nZXNgIHtAbGluayBFdmVudEVtaXR0ZXJ9LlxuICAgKi9cbiAgbm90aWZ5T25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFuZ2VzICE9PSB1bmRlZmluZWQgJiYgKHRoaXMuX2NoYW5nZXNEZXRlY3RlZCB8fCAhdGhpcy5fZW1pdERpc3RpbmN0Q2hhbmdlc09ubHkpKVxuICAgICAgdGhpcy5fY2hhbmdlcy5lbWl0KHRoaXMpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBvbkRpcnR5KGNiOiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25EaXJ0eSA9IGNiO1xuICB9XG5cbiAgLyoqIGludGVybmFsICovXG4gIHNldERpcnR5KCkge1xuICAgICh0aGlzIGFzIHtkaXJ0eTogYm9vbGVhbn0pLmRpcnR5ID0gdHJ1ZTtcbiAgICB0aGlzLl9vbkRpcnR5Py4oKTtcbiAgfVxuXG4gIC8qKiBpbnRlcm5hbCAqL1xuICBkZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jaGFuZ2VzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuX2NoYW5nZXMuY29tcGxldGUoKTtcbiAgICAgIHRoaXMuX2NoYW5nZXMudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGUgaW1wbGVtZW50YXRpb24gb2YgYFN5bWJvbC5pdGVyYXRvcmAgc2hvdWxkIGJlIGRlY2xhcmVkIGhlcmUsIGJ1dCB0aGlzIHdvdWxkIGNhdXNlXG4gIC8vIHRyZWUtc2hha2luZyBpc3N1ZXMgd2l0aCBgUXVlcnlMaXN0LiBTbyBpbnN0ZWFkLCBpdCdzIGFkZGVkIGluIHRoZSBjb25zdHJ1Y3RvciAoc2VlIGNvbW1lbnRzXG4gIC8vIHRoZXJlKSBhbmQgdGhpcyBkZWNsYXJhdGlvbiBpcyBsZWZ0IGhlcmUgdG8gZW5zdXJlIHRoYXQgVHlwZVNjcmlwdCBjb25zaWRlcnMgUXVlcnlMaXN0IHRvXG4gIC8vIGltcGxlbWVudCB0aGUgSXRlcmFibGUgaW50ZXJmYWNlLiBUaGlzIGlzIHJlcXVpcmVkIGZvciB0ZW1wbGF0ZSB0eXBlLWNoZWNraW5nIG9mIE5nRm9yIGxvb3BzXG4gIC8vIG92ZXIgUXVlcnlMaXN0cyB0byB3b3JrIGNvcnJlY3RseSwgc2luY2UgUXVlcnlMaXN0IG11c3QgYmUgYXNzaWduYWJsZSB0byBOZ0l0ZXJhYmxlLlxuICBbU3ltYm9sLml0ZXJhdG9yXSE6ICgpID0+IEl0ZXJhdG9yPFQ+O1xufVxuIl19