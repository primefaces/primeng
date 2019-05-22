import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[pDynamicDialogContent]'
})
export class DynamicDialogContent {
  
	constructor(public viewContainerRef: ViewContainerRef) {}

}
