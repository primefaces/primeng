import {Component,Input,Output,OnInit,AfterViewInit,OnDestroy,EventEmitter,Renderer,ElementRef} from '@angular/core';
import {DomHandler} from '../dom/domhandler';

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [ngStyle]="style" [class]="styleClass"
            [style.display]="visible ? 'block' : 'none'" (click)="onPanelClick()">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a href="#" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" [ngClass]="{'ui-state-hover':hoverCloseIcon}"
                (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false" (click)="onCloseClick($event)"><span class="fa fa-fw fa-close"></span></a>
        </div>
    `,
    providers: [DomHandler]
})
export class OverlayPanel implements OnInit,AfterViewInit,OnDestroy {

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

    hoverCloseIcon: boolean;

    documentClickListener: any;
    
    selfClick: boolean;
    
    targetEvent: boolean;
    
    target: any;

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}

    ngOnInit() {
        if(this.dismissable) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
                if(!this.selfClick&&!this.targetEvent) {
                    this.hide();
                }
                this.selfClick = false;
                this.targetEvent = false;
            });
        }
    }
    
    ngAfterViewInit() {  
        this.container = this.el.nativeElement.children[0]; 
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.appendTo.appendChild(this.container);
        }
    }
    
    toggle(event,target?) {
        let currentTarget = (target||event.currentTarget||event.target);
                                
        if(!this.target||this.target == currentTarget) {
            if(this.visible)
                this.hide();
            else
                this.show(event, target);
        }
        else {
            this.show(event, target);
        }
        
        if(this.dismissable) {
            this.targetEvent = true;
        }

        this.target = currentTarget;
    }

    show(event,target?) {
        if(this.dismissable) {
            this.targetEvent = true;
        }
        
        this.onBeforeShow.emit(null);
        let elementTarget = target||event.currentTarget||event.target;
        this.container.style.zIndex = ++DomHandler.zindex;

        if(this.visible) {
            this.domHandler.absolutePosition(this.container, elementTarget);
        }
        else {
            this.visible = true;
            this.domHandler.absolutePosition(this.container, elementTarget);
            this.domHandler.fadeIn(this.container, 250);
        }
        this.onAfterShow.emit(null);
    }

    hide() {
        if(this.visible) {
            this.onBeforeHide.emit(null);
            this.visible = false;
            this.onAfterHide.emit(null);
        }
    }
    
    onPanelClick() {
        if(this.dismissable) {
            this.selfClick = true;
        }
    }

    onCloseClick(event) {
        this.hide();
        
        if(this.dismissable) {
            this.selfClick = true;
        }
        
        event.preventDefault();
    }

    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
        
        this.target = null;
    }
}
