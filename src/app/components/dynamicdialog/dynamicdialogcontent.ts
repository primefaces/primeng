import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[pDynamicDialogContent]',
    host: {
        class: 'p-element'
    },
    standalone: false
})
export class DynamicDialogContent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
