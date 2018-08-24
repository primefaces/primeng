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
            <div #xBar class="ui-scrollpanel-bar ui-scrollpanel-bar-x"></div>
            <div #yBar class="ui-scrollpanel-bar ui-scrollpanel-bar-y"></div>   
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

    @ViewChild('xBar') xBarViewChild: ElementRef;
    
    @ViewChild('yBar') yBarViewChild: ElementRef;

    scrollYRatio: number;

    scrollXRatio: number;

    timeoutFrame: any = (fn) => setTimeout(fn, 0);

    initialized: boolean;

    lastPageY: number;

    lastPageX: number;

    isXBarClicked: boolean;

    isYBarClicked: boolean;

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.moveBar();
            this.moveBar = this.moveBar.bind(this);
            this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
            this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
            this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
            this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
            
            window.addEventListener('resize', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('scroll', this.moveBar);
            this.contentViewChild.nativeElement.addEventListener('mouseenter', this.moveBar);
            this.xBarViewChild.nativeElement.addEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.addEventListener('mousedown', this.onYBarMouseDown);

            this.calculateContainerHeight();

            this.initialized = true;
        });
    }

    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;

        let containerStyles = getComputedStyle(container),
        xBarStyles = getComputedStyle(xBar),
        pureContainerHeight = this.domHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);

        if (containerStyles['max-height'] != "none" && pureContainerHeight == 0) {
            if(content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + "px";
            }
        }
    }

    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;

        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;

        this.scrollXRatio = ownWidth / totalWidth;

        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;

        this.scrollYRatio = ownHeight / totalHeight;

        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                this.domHandler.addClass(xBar, 'ui-scrollpanel-hidden');
            } 
            else {
                this.domHandler.removeClass(xBar, 'ui-scrollpanel-hidden');
                xBar.style.cssText = 'width:' + Math.max(this.scrollXRatio * 100, 10) + '%; left:' + (content.scrollLeft / totalWidth) * 100 + '%;bottom:' + bottom + 'px;';
            }

            if (this.scrollYRatio >= 1) {
                this.domHandler.addClass(yBar, 'ui-scrollpanel-hidden');
            } 
            else {
                this.domHandler.removeClass(yBar, 'ui-scrollpanel-hidden');
                yBar.style.cssText = 'height:' + Math.max(this.scrollYRatio * 100, 10) + '%; top: calc(' + (content.scrollTop / totalHeight) * 100 + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
    }

    onYBarMouseDown(e: MouseEvent) {
        this.isYBarClicked = true;
        this.lastPageY = e.pageY;
        this.domHandler.addClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        
        this.domHandler.addClass(document.body, 'ui-scrollpanel-grabbed');

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }

    onXBarMouseDown(e: MouseEvent) {
        this.isXBarClicked = true;
        this.lastPageX = e.pageX;
        this.domHandler.addClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');

        this.domHandler.addClass(document.body, 'ui-scrollpanel-grabbed');

        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
        e.preventDefault();
    }

    onDocumentMouseMove(e: MouseEvent) {
        if(this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if(this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
        
    }

    onMouseMoveForXBar(e: MouseEvent) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }

    onMouseMoveForYBar(e: MouseEvent) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;

        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }

    onDocumentMouseUp(e: Event) {
        this.domHandler.removeClass(this.yBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        this.domHandler.removeClass(this.xBarViewChild.nativeElement, 'ui-scrollpanel-grabbed');
        this.domHandler.removeClass(document.body, 'ui-scrollpanel-grabbed');

        document.removeEventListener('mousemove', this.onDocumentMouseMove);
        document.removeEventListener('mouseup', this.onDocumentMouseUp);
        this.isXBarClicked = false;
        this.isYBarClicked = false;
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
            this.xBarViewChild.nativeElement.removeEventListener('mousedown', this.onXBarMouseDown);
            this.yBarViewChild.nativeElement.removeEventListener('mousedown', this.onYBarMouseDown);
        }
    }

    refresh() {
        this.moveBar();
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [ScrollPanel],
    declarations: [ScrollPanel]
})
export class ScrollPanelModule { }
