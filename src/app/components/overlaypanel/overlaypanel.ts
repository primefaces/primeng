import {NgModule,Component,Input,Output,OnDestroy,EventEmitter,Renderer2,ElementRef,ChangeDetectorRef,NgZone} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [ngStyle]="style" [class]="styleClass" (click)="onContainerClick()"
            [@animation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" (@animation.start)="onAnimationStart($event)" *ngIf="visible">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a tabindex="0" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" (click)="onCloseClick($event)" (keydown.enter)="hide()" [attr.aria-label]="ariaCloseLabel">
                <span class="ui-overlaypanel-close-icon pi pi-times"></span>
            </a>
        </div>
    `,
    animations: [
        trigger('animation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ]
})
export class OverlayPanel implements OnDestroy {

    @Input() dismissable: boolean = true;

    @Input() showCloseIcon: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;

    @Input() ariaCloseLabel: string;
    
    @Input() baseZIndex: number = 0;
    
    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();
    
    container: HTMLDivElement;

    visible: boolean = false;

    isContainerClicked: boolean = true;

    documentClickListener: any;
            
    target: any;
    
    willHide: boolean;
        
    documentResizeListener: any;
    
    constructor(public el: ElementRef, public renderer: Renderer2, private cd: ChangeDetectorRef, private zone: NgZone) {}
        
    onContainerClick() {
        this.isContainerClicked = true;
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.zone.runOutsideAngular(() => {
                let documentEvent = DomHandler.isIOS() ? 'touchstart' : 'click';
                this.documentClickListener = this.renderer.listen('document', documentEvent, (event) => {
                    if (!this.container.contains(event.target) && this.target !== event.target && !this.target.contains(event.target) && !this.isContainerClicked) {
                        this.zone.run(() => {
                            this.hide();
                        });
                    }

                    this.isContainerClicked = false;
                    this.cd.markForCheck();
                });
            });
        }
    }
    
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    
    toggle(event, target?) {
        if (this.visible) {
            this.visible = false;

            if (this.hasTargetChanged(event, target)) {
                this.target = target||event.currentTarget||event.target;

                setTimeout(() => {
                    this.visible = true;
                }, 200);
            }
        }
        else {
            this.show(event, target);
        }
    }

    show(event, target?) {
        this.target = target||event.currentTarget||event.target;
        this.visible = true;
    }

    hasTargetChanged(event, target) {
        return this.target != null && this.target !== (target||event.currentTarget||event.target);
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }

    onAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.container = event.element;
                this.onShow.emit(null);
                this.appendContainer();
                if (this.autoZIndex) {
                    this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                DomHandler.absolutePosition(this.container, this.target);
                if (DomHandler.getOffset(this.container).top < DomHandler.getOffset(this.target).top) {
                    DomHandler.addClass(this.container, 'ui-overlaypanel-flipped');
                }
                if (Math.floor(DomHandler.getOffset(this.container).left) < Math.floor(DomHandler.getOffset(this.target).left) &&
                    DomHandler.getOffset(this.container).left > 0) {
                    DomHandler.addClass(this.container, 'ui-overlaypanel-shifted');
                }
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
            break;

            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
            break;
        }
    }

    hide() {
        this.visible = false;
    }

    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }

    onWindowResize(event) {
        this.hide();
    }

    bindDocumentResizeListener() {
        this.documentResizeListener = this.onWindowResize.bind(this);
        window.addEventListener('resize', this.documentResizeListener);
    }
    
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    onContainerDestroy() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
    }

    ngOnDestroy() {
        this.target = null;
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [OverlayPanel],
    declarations: [OverlayPanel]
})
export class OverlayPanelModule { }
