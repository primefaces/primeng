import { NgModule, Component, Input, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';

@Component({
    selector: 'p-scrollPanel',
    template: `
        <div #container [ngClass]="'ui-scrollpanel ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <div class="ui-scrollpanel-wrapper">
                <div #content class="ui-scrollpanel-content">
                    <ng-content></ng-content>
                </div>
            </div>
            <div #bar class="ui-scrollpanel-bar"></div>
        </div>
    `,
    providers: [DomHandler]
})
export class ScrollPanel implements AfterViewInit, OnDestroy {

    @Input() style: any;

    @Input() styleClass: string;
    
    constructor(public el: ElementRef, public zone: NgZone, public domHandler: DomHandler) {}

    @ViewChild('container') containerViewChild: ElementRef;

    @ViewChild('content') contentViewChild: ElementRef;
    
    @ViewChild('bar') barViewChild: ElementRef;

    scrollRatio: number;

    timeoutFrame: any = (fn) => setTimeout(fn, 0);

    initialized: boolean;

    lastPageY: number;

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);
            this.onBarMouseDown = this.onBarMouseDown.bind(this);
            this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
            this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
            
            window.addEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('mouseenter', this.moveBar);
            this.barViewChild.nativeElement.addEventListener('mousedown', this.onBarMouseDown);
            this.initialized = true;
        });
    }

    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let bar = this.barViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - bar.clientWidth) * -1;

        this.scrollRatio = ownHeight / totalHeight;

        this.requestAnimationFrame(() => {
            if (this.scrollRatio >= 1) {
                this.domHandler.addClass(bar, 'ui-scrollpanel-hidden');
            } 
            else {
                this.domHandler.removeClass(bar, 'ui-scrollpanel-hidden');
                bar.style.cssText = 'height:' + Math.max(this.scrollRatio * 100, 10) + '%; top:' + (content.scrollTop / totalHeight) * 100 + '%;right:' + right + 'px;';
            }
        });
    }

    onBarMouseDown(e: MouseEvent) {
        this.lastPageY = e.pageY;
        this.domHandler.addClass(this.barViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        this.domHandler.addClass(document.body, 'ui-scrollpanel-grabbed');

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }

    onDocumentMouseMove(e: MouseEvent) {
        let delta = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += delta / this.scrollRatio;
        });
    }

    onDocumentMouseUp(e: Event) {
        this.domHandler.removeClass(this.barViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        this.domHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');

        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
    }

    requestAnimationFrame(f: Function) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }

    ngOnDestroy() {
        if (this.initialized) {
            window.removeEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.removeEventListener('mouseenter', this.moveBar);
            this.barViewChild.nativeElement.removeEventListener('mousedown', this.onBarMouseDown);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [ScrollPanel],
    declarations: [ScrollPanel]
})
export class ScrollPanelModule { }
