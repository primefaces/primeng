/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BehaviorSubject } from 'rxjs';
import { Injectable } from './di';
import * as i0 from "./r3_symbols";
/**
 * *Internal* service that keeps track of pending tasks happening in the system.
 *
 * This information is needed to make sure that the serialization on the server
 * is delayed until all tasks in the queue (such as an initial navigation or a
 * pending HTTP request) are completed.
 *
 * Pending tasks continue to contribute to the stableness of `ApplicationRef`
 * throughout the lifetime of the application.
 */
export class PendingTasks {
    constructor() {
        this.taskId = 0;
        this.pendingTasks = new Set();
        this.hasPendingTasks = new BehaviorSubject(false);
    }
    get _hasPendingTasks() {
        return this.hasPendingTasks.value;
    }
    add() {
        if (!this._hasPendingTasks) {
            this.hasPendingTasks.next(true);
        }
        const taskId = this.taskId++;
        this.pendingTasks.add(taskId);
        return taskId;
    }
    remove(taskId) {
        this.pendingTasks.delete(taskId);
        if (this.pendingTasks.size === 0 && this._hasPendingTasks) {
            this.hasPendingTasks.next(false);
        }
    }
    ngOnDestroy() {
        this.pendingTasks.clear();
        if (this._hasPendingTasks) {
            this.hasPendingTasks.next(false);
        }
    }
    static { this.ɵfac = function PendingTasks_Factory(t) { return new (t || PendingTasks)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: PendingTasks, factory: PendingTasks.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.setClassMetadata(PendingTasks, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVuZGluZ190YXNrcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvc3JjL3BlbmRpbmdfdGFza3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVyQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDOztBQUdoQzs7Ozs7Ozs7O0dBU0c7QUFFSCxNQUFNLE9BQU8sWUFBWTtJQUR6QjtRQUVVLFdBQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxpQkFBWSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFJekMsb0JBQWUsR0FBRyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUMsQ0FBQztLQXdCdkQ7SUEzQkMsSUFBWSxnQkFBZ0I7UUFDMUIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBR0QsR0FBRztRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxDQUFDO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNLENBQUMsTUFBYztRQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqQyxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxRCxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQztJQUNILENBQUM7NkVBN0JVLFlBQVk7dUVBQVosWUFBWSxXQUFaLFlBQVksbUJBREEsTUFBTTs7Z0ZBQ2xCLFlBQVk7Y0FEeEIsVUFBVTtlQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnLi9kaSc7XG5pbXBvcnQge09uRGVzdHJveX0gZnJvbSAnLi9pbnRlcmZhY2UvbGlmZWN5Y2xlX2hvb2tzJztcblxuLyoqXG4gKiAqSW50ZXJuYWwqIHNlcnZpY2UgdGhhdCBrZWVwcyB0cmFjayBvZiBwZW5kaW5nIHRhc2tzIGhhcHBlbmluZyBpbiB0aGUgc3lzdGVtLlxuICpcbiAqIFRoaXMgaW5mb3JtYXRpb24gaXMgbmVlZGVkIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBzZXJpYWxpemF0aW9uIG9uIHRoZSBzZXJ2ZXJcbiAqIGlzIGRlbGF5ZWQgdW50aWwgYWxsIHRhc2tzIGluIHRoZSBxdWV1ZSAoc3VjaCBhcyBhbiBpbml0aWFsIG5hdmlnYXRpb24gb3IgYVxuICogcGVuZGluZyBIVFRQIHJlcXVlc3QpIGFyZSBjb21wbGV0ZWQuXG4gKlxuICogUGVuZGluZyB0YXNrcyBjb250aW51ZSB0byBjb250cmlidXRlIHRvIHRoZSBzdGFibGVuZXNzIG9mIGBBcHBsaWNhdGlvblJlZmBcbiAqIHRocm91Z2hvdXQgdGhlIGxpZmV0aW1lIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAqL1xuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgUGVuZGluZ1Rhc2tzIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSB0YXNrSWQgPSAwO1xuICBwcml2YXRlIHBlbmRpbmdUYXNrcyA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICBwcml2YXRlIGdldCBfaGFzUGVuZGluZ1Rhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLmhhc1BlbmRpbmdUYXNrcy52YWx1ZTtcbiAgfVxuICBoYXNQZW5kaW5nVGFza3MgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICBhZGQoKTogbnVtYmVyIHtcbiAgICBpZiAoIXRoaXMuX2hhc1BlbmRpbmdUYXNrcykge1xuICAgICAgdGhpcy5oYXNQZW5kaW5nVGFza3MubmV4dCh0cnVlKTtcbiAgICB9XG4gICAgY29uc3QgdGFza0lkID0gdGhpcy50YXNrSWQrKztcbiAgICB0aGlzLnBlbmRpbmdUYXNrcy5hZGQodGFza0lkKTtcbiAgICByZXR1cm4gdGFza0lkO1xuICB9XG5cbiAgcmVtb3ZlKHRhc2tJZDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5wZW5kaW5nVGFza3MuZGVsZXRlKHRhc2tJZCk7XG4gICAgaWYgKHRoaXMucGVuZGluZ1Rhc2tzLnNpemUgPT09IDAgJiYgdGhpcy5faGFzUGVuZGluZ1Rhc2tzKSB7XG4gICAgICB0aGlzLmhhc1BlbmRpbmdUYXNrcy5uZXh0KGZhbHNlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnBlbmRpbmdUYXNrcy5jbGVhcigpO1xuICAgIGlmICh0aGlzLl9oYXNQZW5kaW5nVGFza3MpIHtcbiAgICAgIHRoaXMuaGFzUGVuZGluZ1Rhc2tzLm5leHQoZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuIl19