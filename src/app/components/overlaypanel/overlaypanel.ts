import {NgModule,Component,Input,Output,AfterViewInit,AfterViewChecked,OnDestroy,EventEmitter,Renderer2,ElementRef,ChangeDetectorRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {trigger,state,style,transition,animate} from '@angular/animations';

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [ngStyle]="style" [class]="styleClass"
            [style.display]="visible ? 'block' : 'none'" (click)="onPanelClick($event)" [@panelState]="visible ? 'visible' : 'hidden'">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a href="#" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" (click)="onCloseClick($event)">
                <span class="fa fa-fw fa-close"></span>
            </a>
        </div>
    `,
    animations: [
        trigger('panelState', [
            state('hidden', style({
                opacity: 0
            })),
            state('visible', style({
                opacity: 1
            })),
            transition('visible => hidden', animate('400ms ease-in')),
            transition('hidden => visible', animate('400ms ease-out'))
        ])
    ],
    providers: [DomHandler]
})
export class OverlayPanel implements AfterViewInit,AfterViewChecked,OnDestroy {

    @Input() dismissable: boolean = true;

    @Input() showCloseIcon: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();
    
    container: any;

    visible: boolean = false;

    documentClickListener: any;
    
    selfClick: boolean;
        
    target: any;
    
    willHide: boolean;
    
    willShow: boolean;
    
    targetClickEvent: boolean;
    
    closeClick: boolean;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, private cd: ChangeDetectorRef) {}
    
    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
        }
    }
    
    ngAfterViewChecked() {
        if(this.willShow) {
            this.domHandler.absolutePosition(this.container, this.target);
            this.bindDocumentClickListener();
            this.onAfterShow.emit(null);
            this.willShow = false;
        }
        
        if(this.willHide) {
            this.onAfterHide.emit(null);
            this.willHide = false;
        }
    }
    
    bindDocumentClickListener() {
        if(!this.documentClickListener && this.dismissable) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.selfClick && !this.targetClickEvent) {
                    this.hide();
                }
                
                this.selfClick = false;
                this.targetClickEvent = false;
                this.cd.markForCheck();
            });
        }
    }
    
    unbindDocumentClickListener() {
        if(this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }
    
    toggle(event, target?) {                          
        if(!this.target || this.target === (target||event.currentTarget||event.target)) {
            if(this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
    }

    show(event, target?) {
        this.onBeforeShow.emit(null);
        this.target = target||event.currentTarget||event.target;
        this.container.style.zIndex = ++DomHandler.zindex;

        this.visible = true;
        this.willShow = true;
        
        if(event.type === 'click') {
            this.targetClickEvent = true;
        }
    }

    hide() {
        if(this.visible) {
            this.onBeforeHide.emit(null);
            this.willHide = true;
            this.visible = false;
            this.selfClick = false;
            this.targetClickEvent = false;
            this.unbindDocumentClickListener();
        }
    }
        
    onPanelClick(event) {
        if(this.closeClick) {
            this.hide();
            this.closeClick = false;
        }
        else if(this.dismissable) {
            this.selfClick = true;
        }
    }

    onCloseClick(event) {
        this.closeClick = true;
        event.preventDefault();
    }

    ngOnDestroy() {
        this.unbindDocumentClickListener();
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
        
        this.target = null;
    }
}

@NgModule({
    imports: [CommonModule],
    exports: [OverlayPanel],
    declarations: [OverlayPanel]
})
export class OverlayPanelModule { }
