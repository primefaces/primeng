import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pDynamicDialogContent]',
  host: {
    'class': 'p-element'
  }
})
export class DynamicDialogContent {

	constructor(public viewContainerRef: ViewContainerRef) {}

}
