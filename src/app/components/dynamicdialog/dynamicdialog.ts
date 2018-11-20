import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { trigger,state,style,transition,animate,AnimationEvent } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { DynamicDialogRef } from './dynamicdialog-ref';

@Component({
	selector: 'p-dynamicDialog',
	template: `
		<div [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true}"
			[@animation]="'visible'" (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
			[style.width]="config.width" [style.height]="config.height" >
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top">
                <span class="ui-dialog-title">{{config.header}}</span>
                <a [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" tabindex="0" role="button" (click)="close($event)" (keydown.enter)="close($event)">
                    <span class="pi pi-times"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content">
				<ng-template pDynamicDialogContent></ng-template>
			</div>
		</div>
	`,
	animations: [
        trigger('animation', [
            state('void', style({
                transform: 'translate3d(0, 25%, 0) scale(0.9)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'none',
                opacity: 1
            })),
            transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)'))
        ])
	],
	providers: [DomHandler]
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {

	visible: boolean = true;

	componentRef: ComponentRef<any>;

	@ViewChild(DynamicDialogContent)
	insertionPoint: DynamicDialogContent;

	childComponentType: Type<any>;

	container: HTMLDivElement;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, public config: DynamicDialogConfig, private dialogRef: DynamicDialogRef, private domHandler: DomHandler) { }

	ngAfterViewInit() {
		this.loadChildComponent(this.childComponentType);
		this.cd.detectChanges();
	}

	onOverlayClicked(evt: MouseEvent) {
		this.dialogRef.close();
	}

	onDialogClicked(evt: MouseEvent) {
		evt.stopPropagation();
	}

	loadChildComponent(componentType: Type<any>) {
		let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

		let viewContainerRef = this.insertionPoint.viewContainerRef;
		viewContainerRef.clear();

		this.componentRef = viewContainerRef.createComponent(componentFactory);
	}

	positionOverlay() {		
		this.center();
    }
    
    center() {
        let elementWidth = this.domHandler.getOuterWidth(this.container);
        let elementHeight = this.domHandler.getOuterHeight(this.container);
        if(elementWidth == 0 && elementHeight == 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = this.domHandler.getOuterWidth(this.container);
            elementHeight = this.domHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        let viewport = this.domHandler.getViewport();
        let x = Math.max(Math.floor((viewport.width - elementWidth) / 2), 0);
        let y = Math.max(Math.floor((viewport.height - elementHeight) / 2), 0);

        this.container.style.left = x + 'px';
        this.container.style.top = y + 'px';
    }

	onAnimationStart(event: AnimationEvent) {
		if (event.toState === 'visible') {
			this.container = event.element;
			this.positionOverlay();
		}
	}
	
	onAnimationEnd(event: AnimationEvent) {
		if (event.toState === 'void') {
			this.dialogRef.close();
		}
    }

	close() {
		this.visible = false;		
	}

	ngOnDestroy() {
		this.container = null;

		if (this.componentRef) {
			this.componentRef.destroy();
		}
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [DynamicDialogComponent, DynamicDialogContent],
	entryComponents: [DynamicDialogComponent]
})
export class DynamicDialogModule { }