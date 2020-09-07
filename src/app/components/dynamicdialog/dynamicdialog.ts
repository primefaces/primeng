import { Component, NgModule, Type, ComponentFactoryResolver, ViewChild, OnDestroy, ComponentRef, AfterViewInit, ChangeDetectorRef, Renderer2, NgZone, ElementRef, ChangeDetectionStrategy, ViewRef, ViewEncapsulation } from '@angular/core';
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
        <div #mask [ngClass]="{'p-dialog-mask':true, 'p-component-overlay p-dialog-mask-scrollblocker': config.modal !== false}">
            <div [ngClass]="{'p-dialog p-dynamic-dialog p-component':true, 'p-dialog-rtl': config.rtl}" [ngStyle]="config.style" [class]="config.styleClass"
                [@animation]="{value: 'visible', params: {transform: transformOptions, transition: config.transitionOptions || '150ms cubic-bezier(0, 0, 0.2, 1)'}}"
                (@animation.start)="onAnimationStart($event)" (@animation.done)="onAnimationEnd($event)" role="dialog" *ngIf="visible"
                [style.width]="config.width" [style.height]="config.height">
                <div class="p-dialog-header" *ngIf="config.showHeader === false ? false: true">
                    <span class="p-dialog-title">{{config.header}}</span>
                    <div class="p-dialog-header-icons">
                        <button [ngClass]="'p-dialog-header-icon p-dialog-header-maximize p-link'" type="button" (click)="hide()" (keydown.enter)="hide()" *ngIf="config.closable !== false">
                            <span class="p-dialog-header-close-icon pi pi-times"></span>
                        </button>
                    </div>
                </div>
                <div class="p-dialog-content" [ngStyle]="config.contentStyle">
                    <ng-template pDynamicDialogContent></ng-template>
                </div>
                <div class="p-dialog-footer" *ngIf="config.footer">
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
    ],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['../dialog/dialog.css']
})
export class DynamicDialogComponent implements AfterViewInit, OnDestroy {

	visible: boolean = true;

	componentRef: ComponentRef<any>;

	mask: HTMLDivElement;

	@ViewChild(DynamicDialogContent) insertionPoint: DynamicDialogContent;

	@ViewChild('mask') maskViewChild: ElementRef;

	childComponentType: Type<any>;

    container: HTMLDivElement;

    wrapper: HTMLElement;

    documentKeydownListener: any;

    documentEscapeListener: Function;

    maskClickListener: Function;

    transformOptions: string = "scale(0.7)";

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
			const zIndex = (this.config.baseZIndex||0) + (++DomHandler.zindex);
			this.container.style.zIndex = String(zIndex);
			this.maskViewChild.nativeElement.style.zIndex = String(zIndex - 1);
		}
    }

	onAnimationStart(event: AnimationEvent) {
		switch(event.toState) {
			case 'visible':
                this.container = event.element;
                this.wrapper = this.container.parentElement;
				this.moveOnTop();
                this.bindGlobalListeners();

                if (this.config.modal !== false) {
                    this.enableModality();
                }
                this.focus();
			break;

			case 'void':
				this.onContainerDestroy();
			break;
		}
	}

	onAnimationEnd(event: AnimationEvent) {
		if (event.toState === 'void') {
			this.dialogRef.destroy();
		}
	}

	onContainerDestroy() {
		this.unbindGlobalListeners();

        if (this.config.modal !== false) {
            this.disableModality();
        }
        this.container = null;
	}

	close() {
        this.visible = false;
        this.cd.markForCheck();
	}

    hide() {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    enableModality() {
        if (this.config.closable !== false && this.config.dismissableMask) {
            this.maskClickListener = this.renderer.listen(this.wrapper, 'click', (event: any) => {
                if (this.wrapper && this.wrapper.isSameNode(event.target)) {
                    this.hide();
                }
            });
        }

        if (this.config.modal !== false) {
            DomHandler.addClass(document.body, 'p-overflow-hidden');
        }
    }

    disableModality() {
        if (this.wrapper) {
            if (this.config.dismissableMask) {
                this.unbindMaskClickListener();
            }

            if (this.config.modal !== false) {
                DomHandler.removeClass(document.body, 'p-overflow-hidden');
            }

            if (!(this.cd as ViewRef).destroyed) {
                this.cd.detectChanges();
            }
        }
    }

    onKeydown(event: KeyboardEvent) {
        if (event.which === 9) {
            event.preventDefault();

            let focusableElements = DomHandler.getFocusableElements(this.container);

            if (focusableElements && focusableElements.length > 0) {
                if (!focusableElements[0].ownerDocument.activeElement) {
                    focusableElements[0].focus();
                }
                else {
                    let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

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
        let focusable = DomHandler.findSingle(this.container, '[autofocus]');
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
        const documentTarget: any = this.maskViewChild ? this.maskViewChild.nativeElement.ownerDocument : 'document';

        this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) == (DomHandler.zindex + (this.config.baseZIndex ? this.config.baseZIndex : 0))) {
					this.hide();
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

    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
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
