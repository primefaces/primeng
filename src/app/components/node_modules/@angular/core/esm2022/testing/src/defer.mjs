/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵCONTAINER_HEADER_OFFSET as CONTAINER_HEADER_OFFSET, ɵDeferBlockState as DeferBlockState, ɵgetDeferBlocks as getDeferBlocks, ɵrenderDeferBlockState as renderDeferBlockState, ɵtriggerResourceLoading as triggerResourceLoading } from '@angular/core';
/**
 * Represents an individual defer block for testing purposes.
 *
 * @publicApi
 * @developerPreview
 */
export class DeferBlockFixture {
    /** @nodoc */
    constructor(block, componentFixture) {
        this.block = block;
        this.componentFixture = componentFixture;
    }
    /**
     * Renders the specified state of the defer fixture.
     * @param state the defer state to render
     */
    async render(state) {
        if (!hasStateTemplate(state, this.block)) {
            const stateAsString = getDeferBlockStateNameFromEnum(state);
            throw new Error(`Tried to render this defer block in the \`${stateAsString}\` state, ` +
                `but there was no @${stateAsString.toLowerCase()} block defined in a template.`);
        }
        if (state === DeferBlockState.Complete) {
            await triggerResourceLoading(this.block.tDetails, this.block.lView, this.block.tNode);
        }
        // If the `render` method is used explicitly - skip timer-based scheduling for
        // `@placeholder` and `@loading` blocks and render them immediately.
        const skipTimerScheduling = true;
        renderDeferBlockState(state, this.block.tNode, this.block.lContainer, skipTimerScheduling);
        this.componentFixture.detectChanges();
    }
    /**
     * Retrieves all nested child defer block fixtures
     * in a given defer block.
     */
    getDeferBlocks() {
        const deferBlocks = [];
        // An LContainer that represents a defer block has at most 1 view, which is
        // located right after an LContainer header. Get a hold of that view and inspect
        // it for nested defer blocks.
        const deferBlockFixtures = [];
        if (this.block.lContainer.length >= CONTAINER_HEADER_OFFSET) {
            const lView = this.block.lContainer[CONTAINER_HEADER_OFFSET];
            getDeferBlocks(lView, deferBlocks);
            for (const block of deferBlocks) {
                deferBlockFixtures.push(new DeferBlockFixture(block, this.componentFixture));
            }
        }
        return Promise.resolve(deferBlockFixtures);
    }
}
function hasStateTemplate(state, block) {
    switch (state) {
        case DeferBlockState.Placeholder:
            return block.tDetails.placeholderTmplIndex !== null;
        case DeferBlockState.Loading:
            return block.tDetails.loadingTmplIndex !== null;
        case DeferBlockState.Error:
            return block.tDetails.errorTmplIndex !== null;
        case DeferBlockState.Complete:
            return true;
        default:
            return false;
    }
}
function getDeferBlockStateNameFromEnum(state) {
    switch (state) {
        case DeferBlockState.Placeholder:
            return 'Placeholder';
        case DeferBlockState.Loading:
            return 'Loading';
        case DeferBlockState.Error:
            return 'Error';
        default:
            return 'Main';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3Rpbmcvc3JjL2RlZmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyx3QkFBd0IsSUFBSSx1QkFBdUIsRUFBMkMsZ0JBQWdCLElBQUksZUFBZSxFQUFFLGVBQWUsSUFBSSxjQUFjLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUUsdUJBQXVCLElBQUksc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFJdlM7Ozs7O0dBS0c7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLGFBQWE7SUFDYixZQUNZLEtBQXdCLEVBQVUsZ0JBQTJDO1FBQTdFLFVBQUssR0FBTCxLQUFLLENBQW1CO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUEyQjtJQUFHLENBQUM7SUFFN0Y7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFzQjtRQUNqQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3pDLE1BQU0sYUFBYSxHQUFHLDhCQUE4QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVELE1BQU0sSUFBSSxLQUFLLENBQ1gsNkNBQTZDLGFBQWEsWUFBWTtnQkFDdEUscUJBQXFCLGFBQWEsQ0FBQyxXQUFXLEVBQUUsK0JBQStCLENBQUMsQ0FBQztRQUN2RixDQUFDO1FBQ0QsSUFBSSxLQUFLLEtBQUssZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sc0JBQXNCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RixDQUFDO1FBQ0QsOEVBQThFO1FBQzlFLG9FQUFvRTtRQUNwRSxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQztRQUNqQyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUMzRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILGNBQWM7UUFDWixNQUFNLFdBQVcsR0FBd0IsRUFBRSxDQUFDO1FBQzVDLDJFQUEyRTtRQUMzRSxnRkFBZ0Y7UUFDaEYsOEJBQThCO1FBQzlCLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBQzlCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxJQUFJLHVCQUF1QixFQUFFLENBQUM7WUFDNUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUM3RCxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBQ25DLEtBQUssTUFBTSxLQUFLLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ2hDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQy9FLENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDN0MsQ0FBQztDQUNGO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxLQUFzQixFQUFFLEtBQXdCO0lBQ3hFLFFBQVEsS0FBSyxFQUFFLENBQUM7UUFDZCxLQUFLLGVBQWUsQ0FBQyxXQUFXO1lBQzlCLE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLENBQUM7UUFDdEQsS0FBSyxlQUFlLENBQUMsT0FBTztZQUMxQixPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDO1FBQ2xELEtBQUssZUFBZSxDQUFDLEtBQUs7WUFDeEIsT0FBTyxLQUFLLENBQUMsUUFBUSxDQUFDLGNBQWMsS0FBSyxJQUFJLENBQUM7UUFDaEQsS0FBSyxlQUFlLENBQUMsUUFBUTtZQUMzQixPQUFPLElBQUksQ0FBQztRQUNkO1lBQ0UsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLDhCQUE4QixDQUFDLEtBQXNCO0lBQzVELFFBQVEsS0FBSyxFQUFFLENBQUM7UUFDZCxLQUFLLGVBQWUsQ0FBQyxXQUFXO1lBQzlCLE9BQU8sYUFBYSxDQUFDO1FBQ3ZCLEtBQUssZUFBZSxDQUFDLE9BQU87WUFDMUIsT0FBTyxTQUFTLENBQUM7UUFDbkIsS0FBSyxlQUFlLENBQUMsS0FBSztZQUN4QixPQUFPLE9BQU8sQ0FBQztRQUNqQjtZQUNFLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7ybVDT05UQUlORVJfSEVBREVSX09GRlNFVCBhcyBDT05UQUlORVJfSEVBREVSX09GRlNFVCwgybVEZWZlckJsb2NrRGV0YWlscyBhcyBEZWZlckJsb2NrRGV0YWlscywgybVEZWZlckJsb2NrU3RhdGUgYXMgRGVmZXJCbG9ja1N0YXRlLCDJtWdldERlZmVyQmxvY2tzIGFzIGdldERlZmVyQmxvY2tzLCDJtXJlbmRlckRlZmVyQmxvY2tTdGF0ZSBhcyByZW5kZXJEZWZlckJsb2NrU3RhdGUsIMm1dHJpZ2dlclJlc291cmNlTG9hZGluZyBhcyB0cmlnZ2VyUmVzb3VyY2VMb2FkaW5nfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHR5cGUge0NvbXBvbmVudEZpeHR1cmV9IGZyb20gJy4vY29tcG9uZW50X2ZpeHR1cmUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gaW5kaXZpZHVhbCBkZWZlciBibG9jayBmb3IgdGVzdGluZyBwdXJwb3Nlcy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiBAZGV2ZWxvcGVyUHJldmlld1xuICovXG5leHBvcnQgY2xhc3MgRGVmZXJCbG9ja0ZpeHR1cmUge1xuICAvKiogQG5vZG9jICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBibG9jazogRGVmZXJCbG9ja0RldGFpbHMsIHByaXZhdGUgY29tcG9uZW50Rml4dHVyZTogQ29tcG9uZW50Rml4dHVyZTx1bmtub3duPikge31cblxuICAvKipcbiAgICogUmVuZGVycyB0aGUgc3BlY2lmaWVkIHN0YXRlIG9mIHRoZSBkZWZlciBmaXh0dXJlLlxuICAgKiBAcGFyYW0gc3RhdGUgdGhlIGRlZmVyIHN0YXRlIHRvIHJlbmRlclxuICAgKi9cbiAgYXN5bmMgcmVuZGVyKHN0YXRlOiBEZWZlckJsb2NrU3RhdGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWhhc1N0YXRlVGVtcGxhdGUoc3RhdGUsIHRoaXMuYmxvY2spKSB7XG4gICAgICBjb25zdCBzdGF0ZUFzU3RyaW5nID0gZ2V0RGVmZXJCbG9ja1N0YXRlTmFtZUZyb21FbnVtKHN0YXRlKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgVHJpZWQgdG8gcmVuZGVyIHRoaXMgZGVmZXIgYmxvY2sgaW4gdGhlIFxcYCR7c3RhdGVBc1N0cmluZ31cXGAgc3RhdGUsIGAgK1xuICAgICAgICAgIGBidXQgdGhlcmUgd2FzIG5vIEAke3N0YXRlQXNTdHJpbmcudG9Mb3dlckNhc2UoKX0gYmxvY2sgZGVmaW5lZCBpbiBhIHRlbXBsYXRlLmApO1xuICAgIH1cbiAgICBpZiAoc3RhdGUgPT09IERlZmVyQmxvY2tTdGF0ZS5Db21wbGV0ZSkge1xuICAgICAgYXdhaXQgdHJpZ2dlclJlc291cmNlTG9hZGluZyh0aGlzLmJsb2NrLnREZXRhaWxzLCB0aGlzLmJsb2NrLmxWaWV3LCB0aGlzLmJsb2NrLnROb2RlKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIGByZW5kZXJgIG1ldGhvZCBpcyB1c2VkIGV4cGxpY2l0bHkgLSBza2lwIHRpbWVyLWJhc2VkIHNjaGVkdWxpbmcgZm9yXG4gICAgLy8gYEBwbGFjZWhvbGRlcmAgYW5kIGBAbG9hZGluZ2AgYmxvY2tzIGFuZCByZW5kZXIgdGhlbSBpbW1lZGlhdGVseS5cbiAgICBjb25zdCBza2lwVGltZXJTY2hlZHVsaW5nID0gdHJ1ZTtcbiAgICByZW5kZXJEZWZlckJsb2NrU3RhdGUoc3RhdGUsIHRoaXMuYmxvY2sudE5vZGUsIHRoaXMuYmxvY2subENvbnRhaW5lciwgc2tpcFRpbWVyU2NoZWR1bGluZyk7XG4gICAgdGhpcy5jb21wb25lbnRGaXh0dXJlLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYWxsIG5lc3RlZCBjaGlsZCBkZWZlciBibG9jayBmaXh0dXJlc1xuICAgKiBpbiBhIGdpdmVuIGRlZmVyIGJsb2NrLlxuICAgKi9cbiAgZ2V0RGVmZXJCbG9ja3MoKTogUHJvbWlzZTxEZWZlckJsb2NrRml4dHVyZVtdPiB7XG4gICAgY29uc3QgZGVmZXJCbG9ja3M6IERlZmVyQmxvY2tEZXRhaWxzW10gPSBbXTtcbiAgICAvLyBBbiBMQ29udGFpbmVyIHRoYXQgcmVwcmVzZW50cyBhIGRlZmVyIGJsb2NrIGhhcyBhdCBtb3N0IDEgdmlldywgd2hpY2ggaXNcbiAgICAvLyBsb2NhdGVkIHJpZ2h0IGFmdGVyIGFuIExDb250YWluZXIgaGVhZGVyLiBHZXQgYSBob2xkIG9mIHRoYXQgdmlldyBhbmQgaW5zcGVjdFxuICAgIC8vIGl0IGZvciBuZXN0ZWQgZGVmZXIgYmxvY2tzLlxuICAgIGNvbnN0IGRlZmVyQmxvY2tGaXh0dXJlcyA9IFtdO1xuICAgIGlmICh0aGlzLmJsb2NrLmxDb250YWluZXIubGVuZ3RoID49IENPTlRBSU5FUl9IRUFERVJfT0ZGU0VUKSB7XG4gICAgICBjb25zdCBsVmlldyA9IHRoaXMuYmxvY2subENvbnRhaW5lcltDT05UQUlORVJfSEVBREVSX09GRlNFVF07XG4gICAgICBnZXREZWZlckJsb2NrcyhsVmlldywgZGVmZXJCbG9ja3MpO1xuICAgICAgZm9yIChjb25zdCBibG9jayBvZiBkZWZlckJsb2Nrcykge1xuICAgICAgICBkZWZlckJsb2NrRml4dHVyZXMucHVzaChuZXcgRGVmZXJCbG9ja0ZpeHR1cmUoYmxvY2ssIHRoaXMuY29tcG9uZW50Rml4dHVyZSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRlZmVyQmxvY2tGaXh0dXJlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFzU3RhdGVUZW1wbGF0ZShzdGF0ZTogRGVmZXJCbG9ja1N0YXRlLCBibG9jazogRGVmZXJCbG9ja0RldGFpbHMpIHtcbiAgc3dpdGNoIChzdGF0ZSkge1xuICAgIGNhc2UgRGVmZXJCbG9ja1N0YXRlLlBsYWNlaG9sZGVyOlxuICAgICAgcmV0dXJuIGJsb2NrLnREZXRhaWxzLnBsYWNlaG9sZGVyVG1wbEluZGV4ICE9PSBudWxsO1xuICAgIGNhc2UgRGVmZXJCbG9ja1N0YXRlLkxvYWRpbmc6XG4gICAgICByZXR1cm4gYmxvY2sudERldGFpbHMubG9hZGluZ1RtcGxJbmRleCAhPT0gbnVsbDtcbiAgICBjYXNlIERlZmVyQmxvY2tTdGF0ZS5FcnJvcjpcbiAgICAgIHJldHVybiBibG9jay50RGV0YWlscy5lcnJvclRtcGxJbmRleCAhPT0gbnVsbDtcbiAgICBjYXNlIERlZmVyQmxvY2tTdGF0ZS5Db21wbGV0ZTpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmZXJCbG9ja1N0YXRlTmFtZUZyb21FbnVtKHN0YXRlOiBEZWZlckJsb2NrU3RhdGUpIHtcbiAgc3dpdGNoIChzdGF0ZSkge1xuICAgIGNhc2UgRGVmZXJCbG9ja1N0YXRlLlBsYWNlaG9sZGVyOlxuICAgICAgcmV0dXJuICdQbGFjZWhvbGRlcic7XG4gICAgY2FzZSBEZWZlckJsb2NrU3RhdGUuTG9hZGluZzpcbiAgICAgIHJldHVybiAnTG9hZGluZyc7XG4gICAgY2FzZSBEZWZlckJsb2NrU3RhdGUuRXJyb3I6XG4gICAgICByZXR1cm4gJ0Vycm9yJztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICdNYWluJztcbiAgfVxufVxuIl19