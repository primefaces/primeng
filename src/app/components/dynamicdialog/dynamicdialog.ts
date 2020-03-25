import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef } from '@angular/core';
import { trigger,style,transition,animate,AnimationEvent, animation, useAnimation } from '@angular/animations';
import { DynamicDialogContent } from './dynamicdialogcontent';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { DynamicDialogRef } from './dynamicdialog-ref';

const showAnimation = animation([
    style({ transform: '{{transform}}', opacity: 0 }),
    animate('{{transition}}', style({ transform: 'none', opacity: 1 }))
]);

const hideAnimation = animation([
    animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
	selector: 'p-dynamicDialog',
	template: `
        <div #mask class="ui-widget-overlay ui-dialog-mask ui-dialog-visible ui-dialog-mask-scrollblocker">
            <div [ngClass]="{'ui-dialog ui-dynamicdialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl': config.rtl}" [ngStyle]="config.style" [class]="config.styleClass"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
                [style.width]="config.width" [style.height]="config.height">
                <div class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" *ngIf="config.showHeader === false ? false: true">
                    <span class="ui-dialog-title">{{config.header}}</span>
                    <div class="ui-dialog-titlebar-icons">
                        <a [ngClass]="'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all'" tabindex="0" role="button" (click)="close()" (keydown.enter)="close()" *ngIf="config.closable !== false">
                            <span class="pi pi-times"></span>
                        </a>
                    </div>
                </div>
                <div class="ui-dialog-content ui-widget-content" [ngStyle]="config.contentStyle">
                    <ng-template pDynamicDialogContent></ng-template>
                </div>
                <div class="ui-dialog-footer ui-widget-content" *ngIf="config.footer">
                    {{config.footer}}
                </div>
            </div>
        </div>
	`,
	animations: [
        trigger('animation', [
            transition('void => visible', [
                useAnimation(showAnimation)
            ]),
            transition('visible => void', [
                useAnimation(hideAnimation)
            ])
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

    documentKeydownListener: any;

    documentEscapeListener: Function;

    transformOptions: string = "scale(0.7)";

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
                this.focus();
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

    onKeydown(event: KeyboardEvent) {
        if (event.which === 9) {
            event.preventDefault();

            let focusableElements = DomHandler.getFocusableElements(this.container);

            if (focusableElements && focusableElements.length > 0) {
                if (!document.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    let focusedIndex = focusableElements.indexOf(document.activeElement);

                    if (event.shiftKey) {
                        if (focusedIndex == -1 || focusedIndex === 0)
                            focusableElements[focusableElements.length - 1].focus();
                        else
                            focusableElements[focusedIndex - 1].focus();
                    }
                    else {
                        if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                            focusableElements[0].focus();
                        else
                            focusableElements[focusedIndex + 1].focus();
                    }
                }
            }
        }
    }

    focus() {
        let focusable = DomHandler.findSingle(this.container, 'a');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }

	bindGlobalListeners() {
        this.bindDocumentKeydownListener();

        if (this.config.closeOnEscape !== false && this.config.closable !== false) {
            this.bindDocumentEscapeListener();
        }
    }

    unbindGlobalListeners() {
        this.unbindDocumentKeydownListener();
        this.unbindDocumentEscapeListener();
    }

    bindDocumentKeydownListener() {
        this.zone.runOutsideAngular(() => {
            this.documentKeydownListener = this.onKeydown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
        });
    }

    unbindDocumentKeydownListener() {
        if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
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
        if (this.documentEscapeListener) {
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
