import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { trigger,state,style,transition,animate,AnimationEvent } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DialogModule, Dialog } from '../dialog/dialog';

//todo how to set all inputs of a component 
/*
[transitionOptions]="config.transitionOptions"
	[header]="config.header"
		[draggable]="config.draggable"
		[resizable]="config.resizable"
		[positionLeft]="config.positionLeft"
		[positionTop]="config.positionTop"
		[contentStyle]="config.contentStyle"
		[modal]="config.modal"
		[closeOnEscape]="config.closeOnEscape"
		[dismissableMask]="config.dismissableMask"
		[rtl]="config.rtl"
		[closable]="config.closable"
		[responsive]="config.responsive"
		[appendTo]="config.appendTo"
		[style]="config.style"
		[styleClass]="config.styleClass"
		[showHeader]="config.showHeader"
		[breakpoint]="config.breakpoint"
		[blockScroll]="config.blockScroll"
		[autoZIndex]="config.autoZIndex"
		[baseZIndex]="config.baseZIndex"
		[minX]="config.minX"
		[minY]="config.minY"
		[focusOnShow]="config.focusOnShow"
		[maximizable]="config.maximizable"
		[focusTrap]="config.focusTrap"
		
		[closeIcon]="config.closeIcon"
		[minimizeIcon]="config.minimizeIcon"
		[maximizeIcon]="config.maximizeIcon"

*/

@Component({
	selector: 'p-dynamicDialog',
	template: `
	<p-dialog #dialog
	    [header]="config.header"
		(onHide)="close()"
		(click)="moveOnTop()"
		[(visible)]="visible"

	
		
		>
		<ng-template pDynamicDialogContent></ng-template>
	</p-dialog>
	`,
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {

	visible: boolean = true;

	componentRef: ComponentRef<any>;

	@ViewChild(DynamicDialogContent, { static: false }) insertionPoint: DynamicDialogContent;
	
	@ViewChild('dialog', { static: false }) dialog: Dialog;

	childComponentType: Type<any>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, public renderer: Renderer2,
			public config: DynamicDialogConfig, private dialogRef: DynamicDialogRef, public zone: NgZone) { }

	ngAfterViewInit() {
		this.loadChildComponent(this.childComponentType);
		this.cd.detectChanges();
	}

	loadChildComponent(componentType: Type<any>) {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

		let viewContainerRef = this.insertionPoint.viewContainerRef;
		viewContainerRef.clear();

		this.componentRef = viewContainerRef.createComponent(componentFactory);
	}
	
	moveOnTop() {
        if (this.config.autoZIndex !== false) {
			const zIndex = this.config.baseZIndex||0 + (++DomHandler.zindex);
			this.dialog.container.style.zIndex = String(zIndex);
		}
	}
	
	close() {
		this.dialogRef.close();
	}

	ngOnDestroy() {
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}
}

@NgModule({
	imports: [CommonModule, DialogModule],
	declarations: [DynamicDialogComponent, DynamicDialogContent],
	entryComponents: [DynamicDialogComponent]
})
export class DynamicDialogModule { }