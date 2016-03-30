import {Component,Input,Output,OnInit,OnDestroy,EventEmitter,Renderer,ElementRef} from 'angular2/core';
import {DomHandler} from '../dom/domhandler';

declare var PUI: any;

@Component({
    selector: 'p-overlayPanel',
    template: `
        <div [ngClass]="'ui-overlaypanel ui-widget ui-widget-content ui-corner-all ui-shadow'" [attr.style]="style" [attr.styleClass]="styleClass"
            [style.display]="visible ? 'block' : 'none'" (click)="$event.stopPropagation()">
            <div class="ui-overlaypanel-content">
                <ng-content></ng-content>
            </div>
            <a href="#" *ngIf="showCloseIcon" class="ui-overlaypanel-close ui-state-default" [ngClass]="{'ui-state-hover':hoverCloseIcon}"
                (mouseenter)="hoverCloseIcon=true" (mouseleave)="hoverCloseIcon=false" (click)="onCloseClick($event)"><span class="fa fa-fw fa-close"></span></a>
        </div>
    `,
    providers: [DomHandler]
})
export class OverlayPanel implements OnInit, OnDestroy {

    @Input() dismissable: boolean = true;

    @Input() showCloseIcon: boolean;

    @Input() style: string;

    @Input() styleClass: string;

    @Output() onBeforeShow: EventEmitter<any> = new EventEmitter();

    @Output() onAfterShow: EventEmitter<any> = new EventEmitter();

    @Output() onBeforeHide: EventEmitter<any> = new EventEmitter();

    @Output() onAfterHide: EventEmitter<any> = new EventEmitter();

    visible: boolean = false;

    hoverCloseIcon: boolean;

    documentClickListener: any;

    constructor(private el: ElementRef, private domHandler: DomHandler, private renderer: Renderer) {}

    ngOnInit() {
        if(this.dismissable) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
                this.hide();
            });
        }
    }

    show(event,target?) {
        this.onBeforeShow.emit(null);
        let elementTarget = target||event.currentTarget||event.target;
        let container = this.el.nativeElement.children[0];
        container.style.zIndex = ++PUI.zindex;

        if(this.visible) {
            this.domHandler.absolutePosition(container, elementTarget);
            if(this.dismissable) {
                this.hide();
            }
        }
        else {
            this.visible = true;
            this.domHandler.absolutePosition(container, elementTarget);
            this.domHandler.fadeIn(container, 250);
        }
        this.onAfterShow.emit(null);

        event.stopPropagation();
    }

    hide() {
        if(this.visible) {
            this.onBeforeHide.emit(null);
            this.visible = false;
            this.onAfterHide.emit(null);
        }
    }

    onCloseClick(event) {
        this.hide();
        event.preventDefault();
    }

    ngOnDestroy() {
        if(this.documentClickListener) {
            this.documentClickListener();
        }
    }
}
