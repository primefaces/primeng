import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[pDynamicDialogContent]',
    standalone: true
})
export class DynamicDialogContent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
