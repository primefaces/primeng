import {NgModule,Component,Input,Output,OnDestroy,EventEmitter,Renderer2,ElementRef,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [ngStyle]="style" [class]="styleClass" (click)="onPanelClick($event)"
            [@animation]="'visible'" (@animation.start)="onAnimationStart($event)" *ngIf="visible">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a href="#" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" (click)="onCloseClick($event)">
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
            transition('void => visible', animate('225ms ease-out')),
            transition('visible => void', animate('195ms ease-in'))
        ])
    ],
    providers: [DomHandler]
})
export class OverlayPanel implements OnDestroy {

    @Input() dismissable: boolean = true;

    @Input() showCloseIcon: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();
    
    container: HTMLDivElement;

    visible: boolean = false;

    documentClickListener: any;
    
    selfClick: boolean;
        
    target: any;
    
    willHide: boolean;
        
    targetClickEvent: boolean;
    
    closeClick: boolean;

    documentResizeListener: any;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, private cd: ChangeDetectorRef) {}
        
    bindDocumentClickListener() {
        if (!this.documentClickListener && this.dismissable) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.selfClick && !this.targetClickEvent) {
                    this.hide();
                }
                
                this.selfClick = false;
                this.targetClickEvent = false;
                this.cd.markForCheck();
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
        if (!this.target || this.target === (target||event.currentTarget||event.target)) {
            if (this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
    }

    show(event, target?) {
        this.target = target||event.currentTarget||event.target;
        if (this.visible && this.container) {
            this.domHandler.absolutePosition(this.container, this.target);
        }

        this.visible = true;
        
        if (event.type === 'click') {
            this.targetClickEvent = true;
        }
    }

    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
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
                this.container.style.zIndex = String(++DomHandler.zindex);
                this.domHandler.absolutePosition(this.container, this.target);
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
            break;

            case 'void':
                this.onHide.emit(null);
                this.ngOnDestroy();
            break;
        }
    }

    hide() {
        this.visible = false;
    }
    
    onPanelClick(event) {
        if (this.closeClick) {
            this.hide();
            this.closeClick = false;
        }
        else if (this.dismissable) {
            this.selfClick = true;
        }
    }

    onCloseClick(event) {
        this.closeClick = true;
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

    ngOnDestroy() {
        this.restoreAppend();
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.target = null;
        this.selfClick = false;
        this.targetClickEvent = false;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [OverlayPanel],
    declarations: [OverlayPanel]
})
export class OverlayPanelModule { }
