import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'events-doc',
    template: ` <section class="py-6">
        <app-code [code]="code" [hideToggleCode]="true"></app-code>
    </section>`
})
export class EventsDoc {
    code: Code = {
        typescript: `
import { OverlayOptions, OverlayOnBeforeShowEvent, OverlayOnShowEvent, OverlayOnBeforeHideEvent, OverlayOnHideEvent } from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { AnimationEvent } from '@angular/animations';

this.primeng.overlayOptions: OverlayOptions = {
    onBeforeShow: (event?: OverlayOnBeforeShowEvent) => {};    // Callback to invoke before the overlay is shown.
    onShow: (event?: OverlayOnShowEvent) => {};                // Callback to invoke when the overlay is shown.
    onBeforeHide: (event?: OverlayOnBeforeHideEvent) => {};    // Callback to invoke before the overlay is hidden.
    onHide: (event?: OverlayOnHideEvent) => {};                // Callback to invoke when the overlay is hidden.
    onAnimationStart: (event?: AnimationEvent) => {};          // Callback to invoke when the animation is started.
    onAnimationDone: (event?: AnimationEvent) => {};           // Callback to invoke when the animation is done.
};`
    };
}
