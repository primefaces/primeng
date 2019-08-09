import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef, Injector, EmbeddedViewRef, ViewContainerRef, OnInit } from '@angular/core';
import { trigger,state,style,transition,animate,AnimationEvent } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DialogModule, Dialog } from '../dialog/dialog';

@Component({
	selector: 'p-dynamicDialog',
	template: `
		<ng-template pDynamicDialogContent></ng-template>
	`,
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {

	visible: boolean = true;

	dialogRef: ComponentRef<Dialog>;
	componentRef: ComponentRef<any>;

	@ViewChild(DynamicDialogContent, { static: false }) insertionPoint: DynamicDialogContent;
	
	childComponentType: Type<any>;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, public renderer: Renderer2,
			public config: DynamicDialogConfig, private dynamicDialogRef: DynamicDialogRef, public zone: NgZone) { }

	ngAfterViewInit() {
		this.loadChildComponent(this.childComponentType);
		this.cd.detectChanges();
	}

	loadChildComponent(componentType: Type<any>) {
		const { insertionPoint, componentFactoryResolver, config } = this;
		const viewContainerRef = insertionPoint.viewContainerRef;
		viewContainerRef.clear(); // todo evaluate if this is needed

		const componentFactory = componentFactoryResolver.resolveComponentFactory(componentType);
		const componentRef =  viewContainerRef.createComponent(componentFactory);
		const {rootNodes} = (componentRef.hostView as EmbeddedViewRef<any>);
		const dialogFactory = componentFactoryResolver.resolveComponentFactory(Dialog);
		const dialogRef = viewContainerRef.createComponent(dialogFactory, 0, null , [[], rootNodes, [] ]);
		const dialogInstance = dialogRef.instance;
		dialogFactory.inputs
			.map(({propName})=> propName)
			.filter((propName) => !!config[propName])
			.forEach((propName) => dialogInstance[propName] = config[propName]);	

		dialogInstance.visible = true;
		dialogInstance.visibleChange.subscribe(this.close.bind(this));
		
		this.dialogRef = dialogRef;
		this.componentRef = componentRef;
	}
	
	moveOnTop() {
        if (this.config.autoZIndex !== false) {
			const zIndex = this.config.baseZIndex||0 + (++DomHandler.zindex);
			this.dialogRef.instance.container.style.zIndex = String(zIndex);
		}
	}
	
	close() {
		this.dynamicDialogRef.close();
	}

	ngOnDestroy() {
		if(this.dialogRef) {
			this.dialogRef.destroy();
		}
		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}
}

@NgModule({
	imports: [CommonModule, DialogModule],
	declarations: [DynamicDialogComponent, DynamicDialogContent],
	entryComponents: [DynamicDialogComponent, Dialog]
})
export class DynamicDialogModule { }