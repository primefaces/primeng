/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RuntimeError } from '../errors';
import { removeFromArray } from '../util/array_utils';
import { assertEqual } from '../util/assert';
import { collectNativeNodes } from './collect_native_nodes';
import { checkNoChangesInternal, detectChangesInternal } from './instructions/change_detection';
import { markViewDirty } from './instructions/mark_view_dirty';
import { CONTAINER_HEADER_OFFSET, VIEW_REFS } from './interfaces/container';
import { isLContainer } from './interfaces/type_checks';
import { CONTEXT, FLAGS, PARENT, TVIEW } from './interfaces/view';
import { destroyLView, detachView, detachViewFromDOM } from './node_manipulation';
import { storeLViewOnDestroy, updateAncestorTraversalFlagsOnAttach } from './util/view_utils';
export class ViewRef {
    get rootNodes() {
        const lView = this._lView;
        const tView = lView[TVIEW];
        return collectNativeNodes(tView, lView, tView.firstChild, []);
    }
    constructor(
    /**
     * This represents `LView` associated with the component when ViewRef is a ChangeDetectorRef.
     *
     * When ViewRef is created for a dynamic component, this also represents the `LView` for the
     * component.
     *
     * For a "regular" ViewRef created for an embedded view, this is the `LView` for the embedded
     * view.
     *
     * @internal
     */
    _lView, 
    /**
     * This represents the `LView` associated with the point where `ChangeDetectorRef` was
     * requested.
     *
     * This may be different from `_lView` if the `_cdRefInjectingView` is an embedded view.
     */
    _cdRefInjectingView, notifyErrorHandler = true) {
        this._lView = _lView;
        this._cdRefInjectingView = _cdRefInjectingView;
        this.notifyErrorHandler = notifyErrorHandler;
        this._appRef = null;
        this._attachedToViewContainer = false;
    }
    get context() {
        return this._lView[CONTEXT];
    }
    /**
     * @deprecated Replacing the full context object is not supported. Modify the context
     *   directly, or consider using a `Proxy` if you need to replace the full object.
     * // TODO(devversion): Remove this.
     */
    set context(value) {
        if (ngDevMode) {
            // Note: We have a warning message here because the `@deprecated` JSDoc will not be picked
            // up for assignments on the setter. We want to let users know about the deprecated usage.
            console.warn('Angular: Replacing the `context` object of an `EmbeddedViewRef` is deprecated.');
        }
        this._lView[CONTEXT] = value;
    }
    get destroyed() {
        return (this._lView[FLAGS] & 256 /* LViewFlags.Destroyed */) === 256 /* LViewFlags.Destroyed */;
    }
    destroy() {
        if (this._appRef) {
            this._appRef.detachView(this);
        }
        else if (this._attachedToViewContainer) {
            const parent = this._lView[PARENT];
            if (isLContainer(parent)) {
                const viewRefs = parent[VIEW_REFS];
                const index = viewRefs ? viewRefs.indexOf(this) : -1;
                if (index > -1) {
                    ngDevMode &&
                        assertEqual(index, parent.indexOf(this._lView) - CONTAINER_HEADER_OFFSET, 'An attached view should be in the same position within its container as its ViewRef in the VIEW_REFS array.');
                    detachView(parent, index);
                    removeFromArray(viewRefs, index);
                }
            }
            this._attachedToViewContainer = false;
        }
        destroyLView(this._lView[TVIEW], this._lView);
    }
    onDestroy(callback) {
        storeLViewOnDestroy(this._lView, callback);
    }
    /**
     * Marks a view and all of its ancestors dirty.
     *
     * This can be used to ensure an {@link ChangeDetectionStrategy#OnPush} component is
     * checked when it needs to be re-rendered but the two normal triggers haven't marked it
     * dirty (i.e. inputs haven't changed and events haven't fired in the view).
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * @usageNotes
     * ### Example
     *
     * ```typescript
     * @Component({
     *   selector: 'app-root',
     *   template: `Number of ticks: {{numberOfTicks}}`
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     * })
     * class AppComponent {
     *   numberOfTicks = 0;
     *
     *   constructor(private ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks++;
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     * ```
     */
    markForCheck() {
        markViewDirty(this._cdRefInjectingView || this._lView);
    }
    /**
     * Detaches the view from the change detection tree.
     *
     * Detached views will not be checked during change detection runs until they are
     * re-attached, even if they are dirty. `detach` can be used in combination with
     * {@link ChangeDetectorRef#detectChanges} to implement local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
     *   `,
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     * })
     * class App {
     * }
     * ```
     */
    detach() {
        this._lView[FLAGS] &= ~128 /* LViewFlags.Attached */;
    }
    /**
     * Re-attaches a view to the change detection tree.
     *
     * This can be used to re-attach views that were previously detached from the tree
     * using {@link ChangeDetectorRef#detach}. Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: 'Data: {{dataProvider.data}}'
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {}
     *
     *   set live(value) {
     *     if (value) {
     *       this.ref.reattach();
     *     } else {
     *       this.ref.detach();
     *     }
     *   }
     * }
     *
     * @Component({
     *   selector: 'app-root',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     * })
     * class AppComponent {
     *   live = true;
     * }
     * ```
     */
    reattach() {
        updateAncestorTraversalFlagsOnAttach(this._lView);
        this._lView[FLAGS] |= 128 /* LViewFlags.Attached */;
    }
    /**
     * Checks the view and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement
     * local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * @usageNotes
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check every five seconds.
     *
     * See {@link ChangeDetectorRef#detach} for more information.
     */
    detectChanges() {
        // Add `RefreshView` flag to ensure this view is refreshed if not already dirty.
        // `RefreshView` flag is used intentionally over `Dirty` because it gets cleared before
        // executing any of the actual refresh code while the `Dirty` flag doesn't get cleared
        // until the end of the refresh. Using `RefreshView` prevents creating a potential difference
        // in the state of the LViewFlags during template execution.
        this._lView[FLAGS] |= 1024 /* LViewFlags.RefreshView */;
        detectChangesInternal(this._lView, this.notifyErrorHandler);
    }
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't
     * introduce other changes.
     */
    checkNoChanges() {
        if (ngDevMode) {
            checkNoChangesInternal(this._lView, this.notifyErrorHandler);
        }
    }
    attachToViewContainerRef() {
        if (this._appRef) {
            throw new RuntimeError(902 /* RuntimeErrorCode.VIEW_ALREADY_ATTACHED */, ngDevMode && 'This view is already attached directly to the ApplicationRef!');
        }
        this._attachedToViewContainer = true;
    }
    detachFromAppRef() {
        this._appRef = null;
        detachViewFromDOM(this._lView[TVIEW], this._lView);
    }
    attachToAppRef(appRef) {
        if (this._attachedToViewContainer) {
            throw new RuntimeError(902 /* RuntimeErrorCode.VIEW_ALREADY_ATTACHED */, ngDevMode && 'This view is already attached to a ViewContainer!');
        }
        this._appRef = appRef;
        updateAncestorTraversalFlagsOnAttach(this._lView);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL3ZpZXdfcmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQW1CLE1BQU0sV0FBVyxDQUFDO0FBRXpELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLHNCQUFzQixFQUFFLHFCQUFxQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDOUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQyxDQUFDO0FBQzdELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDdEQsT0FBTyxFQUFDLE9BQU8sRUFBZSxLQUFLLEVBQXFCLE1BQU0sRUFBRSxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2hGLE9BQU8sRUFBNEIsbUJBQW1CLEVBQUUsb0NBQW9DLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQVF2SCxNQUFNLE9BQU8sT0FBTztJQUlsQixJQUFJLFNBQVM7UUFDWCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzFCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQixPQUFPLGtCQUFrQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxD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UyxJQUFJLG1EQUFtRCxDQUFDLENBQUM7UUFDeEUsQ0FBQztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZn0gZnJvbSAnLi4vY2hhbmdlX2RldGVjdGlvbi9jaGFuZ2VfZGV0ZWN0b3JfcmVmJztcbmltcG9ydCB7UnVudGltZUVycm9yLCBSdW50aW1lRXJyb3JDb2RlfSBmcm9tICcuLi9lcnJvcnMnO1xuaW1wb3J0IHtFbWJlZGRlZFZpZXdSZWYsIFZpZXdSZWZUcmFja2VyfSBmcm9tICcuLi9saW5rZXIvdmlld19yZWYnO1xuaW1wb3J0IHtyZW1vdmVGcm9tQXJyYXl9IGZyb20gJy4uL3V0aWwvYXJyYXlfdXRpbHMnO1xuaW1wb3J0IHthc3NlcnRFcXVhbH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5pbXBvcnQge2NvbGxlY3ROYXRpdmVOb2Rlc30gZnJvbSAnLi9jb2xsZWN0X25hdGl2ZV9ub2Rlcyc7XG5pbXBvcnQge2NoZWNrTm9DaGFuZ2VzSW50ZXJuYWwsIGRldGVjdENoYW5nZXNJbnRlcm5hbH0gZnJvbSAnLi9pbnN0cnVjdGlvbnMvY2hhbmdlX2RldGVjdGlvbic7XG5pbXBvcnQge21hcmtWaWV3RGlydHl9IGZyb20gJy4vaW5zdHJ1Y3Rpb25zL21hcmtfdmlld19kaXJ0eSc7XG5pbXBvcnQge0NPTlRBSU5FUl9IRUFERVJfT0ZGU0VULCBWSUVXX1JFRlN9IGZyb20gJy4vaW50ZXJmYWNlcy9jb250YWluZXInO1xuaW1wb3J0IHtpc0xDb250YWluZXJ9IGZyb20gJy4vaW50ZXJmYWNlcy90eXBlX2NoZWNrcyc7XG5pbXBvcnQge0NPTlRFWFQsIEVOVklST05NRU5ULCBGTEFHUywgTFZpZXcsIExWaWV3RmxhZ3MsIFBBUkVOVCwgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7ZGVzdHJveUxWaWV3LCBkZXRhY2hWaWV3LCBkZXRhY2hWaWV3RnJvbURPTX0gZnJvbSAnLi9ub2RlX21hbmlwdWxhdGlvbic7XG5pbXBvcnQge21hcmtBbmNlc3RvcnNGb3JUcmF2ZXJzYWwsIHN0b3JlTFZpZXdPbkRlc3Ryb3ksIHVwZGF0ZUFuY2VzdG9yVHJhdmVyc2FsRmxhZ3NPbkF0dGFjaH0gZnJvbSAnLi91dGlsL3ZpZXdfdXRpbHMnO1xuXG5cbi8vIE5lZWRlZCBkdWUgdG8gdHNpY2tsZSBkb3dubGV2ZWxpbmcgd2hlcmUgbXVsdGlwbGUgYGltcGxlbWVudHNgIHdpdGggY2xhc3NlcyBjcmVhdGVzXG4vLyBtdWx0aXBsZSBAZXh0ZW5kcyBpbiBDbG9zdXJlIGFubm90YXRpb25zLCB3aGljaCBpcyBpbGxlZ2FsLiBUaGlzIHdvcmthcm91bmQgZml4ZXNcbi8vIHRoZSBtdWx0aXBsZSBAZXh0ZW5kcyBieSBtYWtpbmcgdGhlIGFubm90YXRpb24gQGltcGxlbWVudHMgaW5zdGVhZFxuaW50ZXJmYWNlIENoYW5nZURldGVjdG9yUmVmSW50ZXJmYWNlIGV4dGVuZHMgQ2hhbmdlRGV0ZWN0b3JSZWYge31cblxuZXhwb3J0IGNsYXNzIFZpZXdSZWY8VD4gaW1wbGVtZW50cyBFbWJlZGRlZFZpZXdSZWY8VD4sIENoYW5nZURldGVjdG9yUmVmSW50ZXJmYWNlIHtcbiAgcHJpdmF0ZSBfYXBwUmVmOiBWaWV3UmVmVHJhY2tlcnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfYXR0YWNoZWRUb1ZpZXdDb250YWluZXIgPSBmYWxzZTtcblxuICBnZXQgcm9vdE5vZGVzKCk6IGFueVtdIHtcbiAgICBjb25zdCBsVmlldyA9IHRoaXMuX2xWaWV3O1xuICAgIGNvbnN0IHRWaWV3ID0gbFZpZXdbVFZJRVddO1xuICAgIHJldHVybiBjb2xsZWN0TmF0aXZlTm9kZXModFZpZXcsIGxWaWV3LCB0Vmlldy5maXJzdENoaWxkLCBbXSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIC8qKlxuICAgICAgICogVGhpcyByZXByZXNlbnRzIGBMVmlld2AgYXNzb2NpYXRlZCB3aXRoIHRoZSBjb21wb25lbnQgd2hlbiBWaWV3UmVmIGlzIGEgQ2hhbmdlRGV0ZWN0b3JSZWYuXG4gICAgICAgKlxuICAgICAgICogV2hlbiBWaWV3UmVmIGlzIGNyZWF0ZWQgZm9yIGEgZHluYW1pYyBjb21wb25lbnQsIHRoaXMgYWxzbyByZXByZXNlbnRzIHRoZSBgTFZpZXdgIGZvciB0aGVcbiAgICAgICAqIGNvbXBvbmVudC5cbiAgICAgICAqXG4gICAgICAgKiBGb3IgYSBcInJlZ3VsYXJcIiBWaWV3UmVmIGNyZWF0ZWQgZm9yIGFuIGVtYmVkZGVkIHZpZXcsIHRoaXMgaXMgdGhlIGBMVmlld2AgZm9yIHRoZSBlbWJlZGRlZFxuICAgICAgICogdmlldy5cbiAgICAgICAqXG4gICAgICAgKiBAaW50ZXJuYWxcbiAgICAgICAqL1xuICAgICAgcHVibGljIF9sVmlldzogTFZpZXcsXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhpcyByZXByZXNlbnRzIHRoZSBgTFZpZXdgIGFzc29jaWF0ZWQgd2l0aCB0aGUgcG9pbnQgd2hlcmUgYENoYW5nZURldGVjdG9yUmVmYCB3YXNcbiAgICAgICAqIHJlcXVlc3RlZC5cbiAgICAgICAqXG4gICAgICAgKiBUaGlzIG1heSBiZSBkaWZmZXJlbnQgZnJvbSBgX2xWaWV3YCBpZiB0aGUgYF9jZFJlZkluamVjdGluZ1ZpZXdgIGlzIGFuIGVtYmVkZGVkIHZpZXcuXG4gICAgICAgKi9cbiAgICAgIHByaXZhdGUgX2NkUmVmSW5qZWN0aW5nVmlldz86IExWaWV3LCByZWFkb25seSBub3RpZnlFcnJvckhhbmRsZXIgPSB0cnVlKSB7fVxuXG4gIGdldCBjb250ZXh0KCk6IFQge1xuICAgIHJldHVybiB0aGlzLl9sVmlld1tDT05URVhUXSBhcyB1bmtub3duIGFzIFQ7XG4gIH1cblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgUmVwbGFjaW5nIHRoZSBmdWxsIGNvbnRleHQgb2JqZWN0IGlzIG5vdCBzdXBwb3J0ZWQuIE1vZGlmeSB0aGUgY29udGV4dFxuICAgKiAgIGRpcmVjdGx5LCBvciBjb25zaWRlciB1c2luZyBhIGBQcm94eWAgaWYgeW91IG5lZWQgdG8gcmVwbGFjZSB0aGUgZnVsbCBvYmplY3QuXG4gICAqIC8vIFRPRE8oZGV2dmVyc2lvbik6IFJlbW92ZSB0aGlzLlxuICAgKi9cbiAgc2V0IGNvbnRleHQodmFsdWU6IFQpIHtcbiAgICBpZiAobmdEZXZNb2RlKSB7XG4gICAgICAvLyBOb3RlOiBXZSBoYXZlIGEgd2FybmluZyBtZXNzYWdlIGhlcmUgYmVjYXVzZSB0aGUgYEBkZXByZWNhdGVkYCBKU0RvYyB3aWxsIG5vdCBiZSBwaWNrZWRcbiAgICAgIC8vIHVwIGZvciBhc3NpZ25tZW50cyBvbiB0aGUgc2V0dGVyLiBXZSB3YW50IHRvIGxldCB1c2VycyBrbm93IGFib3V0IHRoZSBkZXByZWNhdGVkIHVzYWdlLlxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICdBbmd1bGFyOiBSZXBsYWNpbmcgdGhlIGBjb250ZXh0YCBvYmplY3Qgb2YgYW4gYEVtYmVkZGVkVmlld1JlZmAgaXMgZGVwcmVjYXRlZC4nKTtcbiAgICB9XG5cbiAgICB0aGlzLl9sVmlld1tDT05URVhUXSA9IHZhbHVlIGFzIHVua25vd24gYXMge307XG4gIH1cblxuICBnZXQgZGVzdHJveWVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAodGhpcy5fbFZpZXdbRkxBR1NdICYgTFZpZXdGbGFncy5EZXN0cm95ZWQpID09PSBMVmlld0ZsYWdzLkRlc3Ryb3llZDtcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2FwcFJlZikge1xuICAgICAgdGhpcy5fYXBwUmVmLmRldGFjaFZpZXcodGhpcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9hdHRhY2hlZFRvVmlld0NvbnRhaW5lcikge1xuICAgICAgY29uc3QgcGFyZW50ID0gdGhpcy5fbFZpZXdbUEFSRU5UXTtcbiAgICAgIGlmIChpc0xDb250YWluZXIocGFyZW50KSkge1xuICAgICAgICBjb25zdCB2aWV3UmVmcyA9IHBhcmVudFtWSUVXX1JFRlNdIGFzIFZpZXdSZWY8dW5rbm93bj5bXSB8IG51bGw7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gdmlld1JlZnMgPyB2aWV3UmVmcy5pbmRleE9mKHRoaXMpIDogLTE7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgbmdEZXZNb2RlICYmXG4gICAgICAgICAgICAgIGFzc2VydEVxdWFsKFxuICAgICAgICAgICAgICAgICAgaW5kZXgsIHBhcmVudC5pbmRleE9mKHRoaXMuX2xWaWV3KSAtIENPTlRBSU5FUl9IRUFERVJfT0ZGU0VULFxuICAgICAgICAgICAgICAgICAgJ0FuIGF0dGFjaGVkIHZpZXcgc2hvdWxkIGJlIGluIHRoZSBzYW1lIHBvc2l0aW9uIHdpdGhpbiBpdHMgY29udGFpbmVyIGFzIGl0cyBWaWV3UmVmIGluIHRoZSBWSUVXX1JFRlMgYXJyYXkuJyk7XG4gICAgICAgICAgZGV0YWNoVmlldyhwYXJlbnQsIGluZGV4KTtcbiAgICAgICAgICByZW1vdmVGcm9tQXJyYXkodmlld1JlZnMhLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2F0dGFjaGVkVG9WaWV3Q29udGFpbmVyID0gZmFsc2U7XG4gICAgfVxuICAgIGRlc3Ryb3lMVmlldyh0aGlzLl9sVmlld1tUVklFV10sIHRoaXMuX2xWaWV3KTtcbiAgfVxuXG4gIG9uRGVzdHJveShjYWxsYmFjazogRnVuY3Rpb24pIHtcbiAgICBzdG9yZUxWaWV3T25EZXN0cm95KHRoaXMuX2xWaWV3LCBjYWxsYmFjayBhcyAoKSA9PiB2b2lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrcyBhIHZpZXcgYW5kIGFsbCBvZiBpdHMgYW5jZXN0b3JzIGRpcnR5LlxuICAgKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGVuc3VyZSBhbiB7QGxpbmsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kjT25QdXNofSBjb21wb25lbnQgaXNcbiAgICogY2hlY2tlZCB3aGVuIGl0IG5lZWRzIHRvIGJlIHJlLXJlbmRlcmVkIGJ1dCB0aGUgdHdvIG5vcm1hbCB0cmlnZ2VycyBoYXZlbid0IG1hcmtlZCBpdFxuICAgKiBkaXJ0eSAoaS5lLiBpbnB1dHMgaGF2ZW4ndCBjaGFuZ2VkIGFuZCBldmVudHMgaGF2ZW4ndCBmaXJlZCBpbiB0aGUgdmlldykuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gT25QdXNoIGNvbXBvbmVudHMgLS0+XG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdhcHAtcm9vdCcsXG4gICAqICAgdGVtcGxhdGU6IGBOdW1iZXIgb2YgdGlja3M6IHt7bnVtYmVyT2ZUaWNrc319YFxuICAgKiAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgKiB9KVxuICAgKiBjbGFzcyBBcHBDb21wb25lbnQge1xuICAgKiAgIG51bWJlck9mVGlja3MgPSAwO1xuICAgKlxuICAgKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgKiAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgKiAgICAgICB0aGlzLm51bWJlck9mVGlja3MrKztcbiAgICogICAgICAgLy8gdGhlIGZvbGxvd2luZyBpcyByZXF1aXJlZCwgb3RoZXJ3aXNlIHRoZSB2aWV3IHdpbGwgbm90IGJlIHVwZGF0ZWRcbiAgICogICAgICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gICAqICAgICB9LCAxMDAwKTtcbiAgICogICB9XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBtYXJrRm9yQ2hlY2soKTogdm9pZCB7XG4gICAgbWFya1ZpZXdEaXJ0eSh0aGlzLl9jZFJlZkluamVjdGluZ1ZpZXcgfHwgdGhpcy5fbFZpZXcpO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGFjaGVzIHRoZSB2aWV3IGZyb20gdGhlIGNoYW5nZSBkZXRlY3Rpb24gdHJlZS5cbiAgICpcbiAgICogRGV0YWNoZWQgdmlld3Mgd2lsbCBub3QgYmUgY2hlY2tlZCBkdXJpbmcgY2hhbmdlIGRldGVjdGlvbiBydW5zIHVudGlsIHRoZXkgYXJlXG4gICAqIHJlLWF0dGFjaGVkLCBldmVuIGlmIHRoZXkgYXJlIGRpcnR5LiBgZGV0YWNoYCBjYW4gYmUgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoXG4gICAqIHtAbGluayBDaGFuZ2VEZXRlY3RvclJlZiNkZXRlY3RDaGFuZ2VzfSB0byBpbXBsZW1lbnQgbG9jYWwgY2hhbmdlXG4gICAqIGRldGVjdGlvbiBjaGVja3MuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gZGV0YWNoL3JlYXR0YWNoL2xvY2FsIGRpZ2VzdCAtLT5cbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaXZlIGRlbW8gb25jZSByZWYuZGV0ZWN0Q2hhbmdlcyBpcyBtZXJnZWQgaW50byBtYXN0ZXIgLS0+XG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBkZWZpbmVzIGEgY29tcG9uZW50IHdpdGggYSBsYXJnZSBsaXN0IG9mIHJlYWRvbmx5IGRhdGEuXG4gICAqIEltYWdpbmUgdGhlIGRhdGEgY2hhbmdlcyBjb25zdGFudGx5LCBtYW55IHRpbWVzIHBlciBzZWNvbmQuIEZvciBwZXJmb3JtYW5jZSByZWFzb25zLFxuICAgKiB3ZSB3YW50IHRvIGNoZWNrIGFuZCB1cGRhdGUgdGhlIGxpc3QgZXZlcnkgZml2ZSBzZWNvbmRzLiBXZSBjYW4gZG8gdGhhdCBieSBkZXRhY2hpbmdcbiAgICogdGhlIGNvbXBvbmVudCdzIGNoYW5nZSBkZXRlY3RvciBhbmQgZG9pbmcgYSBsb2NhbCBjaGVjayBldmVyeSBmaXZlIHNlY29uZHMuXG4gICAqXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY2xhc3MgRGF0YVByb3ZpZGVyIHtcbiAgICogICAvLyBpbiBhIHJlYWwgYXBwbGljYXRpb24gdGhlIHJldHVybmVkIGRhdGEgd2lsbCBiZSBkaWZmZXJlbnQgZXZlcnkgdGltZVxuICAgKiAgIGdldCBkYXRhKCkge1xuICAgKiAgICAgcmV0dXJuIFsxLDIsMyw0LDVdO1xuICAgKiAgIH1cbiAgICogfVxuICAgKlxuICAgKiBAQ29tcG9uZW50KHtcbiAgICogICBzZWxlY3RvcjogJ2dpYW50LWxpc3QnLFxuICAgKiAgIHRlbXBsYXRlOiBgXG4gICAqICAgICA8bGkgKm5nRm9yPVwibGV0IGQgb2YgZGF0YVByb3ZpZGVyLmRhdGFcIj5EYXRhIHt7ZH19PC9saT5cbiAgICogICBgLFxuICAgKiB9KVxuICAgKiBjbGFzcyBHaWFudExpc3Qge1xuICAgKiAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBkYXRhUHJvdmlkZXI6IERhdGFQcm92aWRlcikge1xuICAgKiAgICAgcmVmLmRldGFjaCgpO1xuICAgKiAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgKiAgICAgICB0aGlzLnJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAqICAgICB9LCA1MDAwKTtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdhcHAnLFxuICAgKiAgIHByb3ZpZGVyczogW0RhdGFQcm92aWRlcl0sXG4gICAqICAgdGVtcGxhdGU6IGBcbiAgICogICAgIDxnaWFudC1saXN0PjxnaWFudC1saXN0PlxuICAgKiAgIGAsXG4gICAqIH0pXG4gICAqIGNsYXNzIEFwcCB7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICBkZXRhY2goKTogdm9pZCB7XG4gICAgdGhpcy5fbFZpZXdbRkxBR1NdICY9IH5MVmlld0ZsYWdzLkF0dGFjaGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlLWF0dGFjaGVzIGEgdmlldyB0byB0aGUgY2hhbmdlIGRldGVjdGlvbiB0cmVlLlxuICAgKlxuICAgKiBUaGlzIGNhbiBiZSB1c2VkIHRvIHJlLWF0dGFjaCB2aWV3cyB0aGF0IHdlcmUgcHJldmlvdXNseSBkZXRhY2hlZCBmcm9tIHRoZSB0cmVlXG4gICAqIHVzaW5nIHtAbGluayBDaGFuZ2VEZXRlY3RvclJlZiNkZXRhY2h9LiBWaWV3cyBhcmUgYXR0YWNoZWQgdG8gdGhlIHRyZWUgYnkgZGVmYXVsdC5cbiAgICpcbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaW5rIHRvIGEgY2hhcHRlciBvbiBkZXRhY2gvcmVhdHRhY2gvbG9jYWwgZGlnZXN0IC0tPlxuICAgKlxuICAgKiBAdXNhZ2VOb3Rlc1xuICAgKiAjIyMgRXhhbXBsZVxuICAgKlxuICAgKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY3JlYXRlcyBhIGNvbXBvbmVudCBkaXNwbGF5aW5nIGBsaXZlYCBkYXRhLiBUaGUgY29tcG9uZW50IHdpbGwgZGV0YWNoXG4gICAqIGl0cyBjaGFuZ2UgZGV0ZWN0b3IgZnJvbSB0aGUgbWFpbiBjaGFuZ2UgZGV0ZWN0b3IgdHJlZSB3aGVuIHRoZSBjb21wb25lbnQncyBsaXZlIHByb3BlcnR5XG4gICAqIGlzIHNldCB0byBmYWxzZS5cbiAgICpcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjbGFzcyBEYXRhUHJvdmlkZXIge1xuICAgKiAgIGRhdGEgPSAxO1xuICAgKlxuICAgKiAgIGNvbnN0cnVjdG9yKCkge1xuICAgKiAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgKiAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmRhdGEgKiAyO1xuICAgKiAgICAgfSwgNTAwKTtcbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogQENvbXBvbmVudCh7XG4gICAqICAgc2VsZWN0b3I6ICdsaXZlLWRhdGEnLFxuICAgKiAgIGlucHV0czogWydsaXZlJ10sXG4gICAqICAgdGVtcGxhdGU6ICdEYXRhOiB7e2RhdGFQcm92aWRlci5kYXRhfX0nXG4gICAqIH0pXG4gICAqIGNsYXNzIExpdmVEYXRhIHtcbiAgICogICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgZGF0YVByb3ZpZGVyOiBEYXRhUHJvdmlkZXIpIHt9XG4gICAqXG4gICAqICAgc2V0IGxpdmUodmFsdWUpIHtcbiAgICogICAgIGlmICh2YWx1ZSkge1xuICAgKiAgICAgICB0aGlzLnJlZi5yZWF0dGFjaCgpO1xuICAgKiAgICAgfSBlbHNlIHtcbiAgICogICAgICAgdGhpcy5yZWYuZGV0YWNoKCk7XG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIEBDb21wb25lbnQoe1xuICAgKiAgIHNlbGVjdG9yOiAnYXBwLXJvb3QnLFxuICAgKiAgIHByb3ZpZGVyczogW0RhdGFQcm92aWRlcl0sXG4gICAqICAgdGVtcGxhdGU6IGBcbiAgICogICAgIExpdmUgVXBkYXRlOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJsaXZlXCI+XG4gICAqICAgICA8bGl2ZS1kYXRhIFtsaXZlXT1cImxpdmVcIj48bGl2ZS1kYXRhPlxuICAgKiAgIGAsXG4gICAqIH0pXG4gICAqIGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAqICAgbGl2ZSA9IHRydWU7XG4gICAqIH1cbiAgICogYGBgXG4gICAqL1xuICByZWF0dGFjaCgpOiB2b2lkIHtcbiAgICB1cGRhdGVBbmNlc3RvclRyYXZlcnNhbEZsYWdzT25BdHRhY2godGhpcy5fbFZpZXcpO1xuICAgIHRoaXMuX2xWaWV3W0ZMQUdTXSB8PSBMVmlld0ZsYWdzLkF0dGFjaGVkO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgdmlldyBhbmQgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBUaGlzIGNhbiBhbHNvIGJlIHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCB7QGxpbmsgQ2hhbmdlRGV0ZWN0b3JSZWYjZGV0YWNofSB0byBpbXBsZW1lbnRcbiAgICogbG9jYWwgY2hhbmdlIGRldGVjdGlvbiBjaGVja3MuXG4gICAqXG4gICAqIDwhLS0gVE9ETzogQWRkIGEgbGluayB0byBhIGNoYXB0ZXIgb24gZGV0YWNoL3JlYXR0YWNoL2xvY2FsIGRpZ2VzdCAtLT5cbiAgICogPCEtLSBUT0RPOiBBZGQgYSBsaXZlIGRlbW8gb25jZSByZWYuZGV0ZWN0Q2hhbmdlcyBpcyBtZXJnZWQgaW50byBtYXN0ZXIgLS0+XG4gICAqXG4gICAqIEB1c2FnZU5vdGVzXG4gICAqICMjIyBFeGFtcGxlXG4gICAqXG4gICAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBkZWZpbmVzIGEgY29tcG9uZW50IHdpdGggYSBsYXJnZSBsaXN0IG9mIHJlYWRvbmx5IGRhdGEuXG4gICAqIEltYWdpbmUsIHRoZSBkYXRhIGNoYW5nZXMgY29uc3RhbnRseSwgbWFueSB0aW1lcyBwZXIgc2Vjb25kLiBGb3IgcGVyZm9ybWFuY2UgcmVhc29ucyxcbiAgICogd2Ugd2FudCB0byBjaGVjayBhbmQgdXBkYXRlIHRoZSBsaXN0IGV2ZXJ5IGZpdmUgc2Vjb25kcy5cbiAgICpcbiAgICogV2UgY2FuIGRvIHRoYXQgYnkgZGV0YWNoaW5nIHRoZSBjb21wb25lbnQncyBjaGFuZ2UgZGV0ZWN0b3IgYW5kIGRvaW5nIGEgbG9jYWwgY2hhbmdlIGRldGVjdGlvblxuICAgKiBjaGVjayBldmVyeSBmaXZlIHNlY29uZHMuXG4gICAqXG4gICAqIFNlZSB7QGxpbmsgQ2hhbmdlRGV0ZWN0b3JSZWYjZGV0YWNofSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICovXG4gIGRldGVjdENoYW5nZXMoKTogdm9pZCB7XG4gICAgLy8gQWRkIGBSZWZyZXNoVmlld2AgZmxhZyB0byBlbnN1cmUgdGhpcyB2aWV3IGlzIHJlZnJlc2hlZCBpZiBub3QgYWxyZWFkeSBkaXJ0eS5cbiAgICAvLyBgUmVmcmVzaFZpZXdgIGZsYWcgaXMgdXNlZCBpbnRlbnRpb25hbGx5IG92ZXIgYERpcnR5YCBiZWNhdXNlIGl0IGdldHMgY2xlYXJlZCBiZWZvcmVcbiAgICAvLyBleGVjdXRpbmcgYW55IG9mIHRoZSBhY3R1YWwgcmVmcmVzaCBjb2RlIHdoaWxlIHRoZSBgRGlydHlgIGZsYWcgZG9lc24ndCBnZXQgY2xlYXJlZFxuICAgIC8vIHVudGlsIHRoZSBlbmQgb2YgdGhlIHJlZnJlc2guIFVzaW5nIGBSZWZyZXNoVmlld2AgcHJldmVudHMgY3JlYXRpbmcgYSBwb3RlbnRpYWwgZGlmZmVyZW5jZVxuICAgIC8vIGluIHRoZSBzdGF0ZSBvZiB0aGUgTFZpZXdGbGFncyBkdXJpbmcgdGVtcGxhdGUgZXhlY3V0aW9uLlxuICAgIHRoaXMuX2xWaWV3W0ZMQUdTXSB8PSBMVmlld0ZsYWdzLlJlZnJlc2hWaWV3O1xuICAgIGRldGVjdENoYW5nZXNJbnRlcm5hbCh0aGlzLl9sVmlldywgdGhpcy5ub3RpZnlFcnJvckhhbmRsZXIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgY2hhbmdlIGRldGVjdG9yIGFuZCBpdHMgY2hpbGRyZW4sIGFuZCB0aHJvd3MgaWYgYW55IGNoYW5nZXMgYXJlIGRldGVjdGVkLlxuICAgKlxuICAgKiBUaGlzIGlzIHVzZWQgaW4gZGV2ZWxvcG1lbnQgbW9kZSB0byB2ZXJpZnkgdGhhdCBydW5uaW5nIGNoYW5nZSBkZXRlY3Rpb24gZG9lc24ndFxuICAgKiBpbnRyb2R1Y2Ugb3RoZXIgY2hhbmdlcy5cbiAgICovXG4gIGNoZWNrTm9DaGFuZ2VzKCk6IHZvaWQge1xuICAgIGlmIChuZ0Rldk1vZGUpIHtcbiAgICAgIGNoZWNrTm9DaGFuZ2VzSW50ZXJuYWwodGhpcy5fbFZpZXcsIHRoaXMubm90aWZ5RXJyb3JIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBhdHRhY2hUb1ZpZXdDb250YWluZXJSZWYoKSB7XG4gICAgaWYgKHRoaXMuX2FwcFJlZikge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlZJRVdfQUxSRUFEWV9BVFRBQ0hFRCxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiYgJ1RoaXMgdmlldyBpcyBhbHJlYWR5IGF0dGFjaGVkIGRpcmVjdGx5IHRvIHRoZSBBcHBsaWNhdGlvblJlZiEnKTtcbiAgICB9XG4gICAgdGhpcy5fYXR0YWNoZWRUb1ZpZXdDb250YWluZXIgPSB0cnVlO1xuICB9XG5cbiAgZGV0YWNoRnJvbUFwcFJlZigpIHtcbiAgICB0aGlzLl9hcHBSZWYgPSBudWxsO1xuICAgIGRldGFjaFZpZXdGcm9tRE9NKHRoaXMuX2xWaWV3W1RWSUVXXSwgdGhpcy5fbFZpZXcpO1xuICB9XG5cbiAgYXR0YWNoVG9BcHBSZWYoYXBwUmVmOiBWaWV3UmVmVHJhY2tlcikge1xuICAgIGlmICh0aGlzLl9hdHRhY2hlZFRvVmlld0NvbnRhaW5lcikge1xuICAgICAgdGhyb3cgbmV3IFJ1bnRpbWVFcnJvcihcbiAgICAgICAgICBSdW50aW1lRXJyb3JDb2RlLlZJRVdfQUxSRUFEWV9BVFRBQ0hFRCxcbiAgICAgICAgICBuZ0Rldk1vZGUgJiYgJ1RoaXMgdmlldyBpcyBhbHJlYWR5IGF0dGFjaGVkIHRvIGEgVmlld0NvbnRhaW5lciEnKTtcbiAgICB9XG4gICAgdGhpcy5fYXBwUmVmID0gYXBwUmVmO1xuICAgIHVwZGF0ZUFuY2VzdG9yVHJhdmVyc2FsRmxhZ3NPbkF0dGFjaCh0aGlzLl9sVmlldyk7XG4gIH1cbn1cbiJdfQ==