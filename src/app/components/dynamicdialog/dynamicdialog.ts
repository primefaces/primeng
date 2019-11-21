import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { trigger,state,style,transition,animate,AnimationEvent } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogRef } from './dynamicdialog-ref';

@Component({
	selector: 'p-dynamicDialog',
	template: `
		<div #mask class="ui-widget-overlay ui-dialog-mask ui-dialog-mask-scrollblocker" *ngIf="visible" (click)="onMaskClick()"></div>
		<div [ngClass]="{'ui-dialog ui-dynamicdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl': config.rtl}" [ngStyle]="config.style" [class]="config.styleClass"
			[@animation]="{value: 'visible', params: {transitionParams: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}" 
			(@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
			[style.width]="config.width" [style.height]="config.height">
            <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" *ngIf="config.showHeader === false ? false: true">
                <span class="ui-dialog-title">{{config.header}}</span>
                <a [ngClass]="'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all'" tabindex="0" role="button" (click)="close()" (keydown.enter)="close()" *ngIf="config.closable === false ? false : true">
                    <span class="pi pi-times"></span>
                </a>
            </div>
            <div class="ui-dialog-content ui-widget-content" [ngStyle]="config.contentStyle">
				<ng-template pDynamicDialogContent></ng-template>
			</div>
			<div class="ui-dialog-footer ui-widget-content" *ngIf="config.footer">
				{{config.footer}}
            </div>
		</div>
	`,
	animations: [
        trigger('animation', [
            state('void', style({
                transform: 'translateX(-50%) translateY(-50%) scale(0.7)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateX(-50%) translateY(-50%) scale(1)',
                opacity: 1
            })),
            transition('* => *', animate('{{transitionParams}}'))
        ])
	]
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {

	visible: boolean = true;

	componentRef: ComponentRef<any>;

	mask: HTMLDivElement;

	@ViewChild(DynamicDialogContent, { static: false }) insertionPoint: DynamicDialogContent;
	
	@ViewChild('mask', { static: false }) maskViewChild: ElementRef;

	childComponentType: Type<any>;

	container: HTMLDivElement;

	documentEscapeListener: Function;

	constructor(private componentFactoryResolver: ComponentFactoryResolver, private cd: ChangeDetectorRef, public renderer: Renderer2,
			public config: DynamicDialogConfig, private dialogRef: DynamicDialogRef, public zone: NgZone) { }

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
	
	moveOnTop() {
        if (this.config.autoZIndex !== false) {
			const zIndex = this.config.baseZIndex||0 + (++DomHandler.zindex);
			this.container.style.zIndex = String(zIndex);
			this.maskViewChild.nativeElement.style.zIndex = String(zIndex - 1);
		}
    }

	onAnimationStart(event: AnimationEvent) {
		switch(event.toState) {
			case 'visible':
				this.container = event.element;
				this.moveOnTop();
				this.bindGlobalListeners();
				DomHandler.addClass(document.body, 'ui-overflow-hidden');
			break;

			case 'void':
				this.onContainerDestroy();
			break;
		}
	}
	
	onAnimationEnd(event: AnimationEvent) {
		if (event.toState === 'void') {
			this.dialogRef.close();
		}
	}

	onContainerDestroy() {
		DomHandler.removeClass(document.body, 'ui-overflow-hidden');
		this.unbindGlobalListeners();
		this.container = null;
	}
	    
	close() {
		this.visible = false;
	}

	onMaskClick() {
		if (this.config.dismissableMask) {
			this.close();
		}
	}

	bindGlobalListeners() {
        if (this.config.closeOnEscape !== false && this.config.closable !== false) {
            this.bindDocumentEscapeListener();
        }
    }
    
    unbindGlobalListeners() {
        this.unbindDocumentEscapeListener();
	}
	
	bindDocumentEscapeListener() {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) == DomHandler.zindex) {
					this.close();
				}
            }
        });
    }
    
    unbindDocumentEscapeListener() {
        if(this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }

	ngOnDestroy() {
		this.onContainerDestroy();

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