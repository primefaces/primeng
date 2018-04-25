import { NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, Renderer2, Inject, forwardRef, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from '../dom/domhandler';
import { MenuItem } from '../common/menuitem';
import { Location } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul [ngClass]="{'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}" class="ui-menu-list" (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #item [ngClass]="{'ui-menuitem ui-corner-all':true,'ui-menuitem-active':item==activeItem,'ui-helper-hidden': child.visible === false}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" (mouseleave)="onItemMouseLeave($event,item)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" (click)="itemClick($event, child)"
                        [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" 
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        (click)="itemClick($event, child)" [ngClass]="{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}" 
                        [ngStyle]="child.style" [class]="child.styleClass">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-contextMenuSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    providers: [DomHandler]
})
export class ContextMenuSub {

    @Input() item: MenuItem;

    @Input() root: boolean;

    constructor(public domHandler: DomHandler, @Inject(forwardRef(() => ContextMenu)) public contextMenu: ContextMenu) { }

    activeItem: any;

    containerLeft: any;

    hideTimeout: any;

    onItemMouseEnter(event, item, menuitem) {
        if (menuitem.disabled) {
            return;
        }

        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        this.activeItem = item;
        let nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            this.position(sublist, item);
        }
    }

    onItemMouseLeave(event, link) {
        this.hideTimeout = setTimeout(() => {
            this.activeItem = null;
        }, 1000);
    }

    itemClick(event, item: MenuItem)  {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }

    listClick(event) {
        this.activeItem = null;
    }

    position(sublist, item) {
        this.containerLeft = this.domHandler.getOffset(item.parentElement)
        let viewport = this.domHandler.getViewport();
        let sublistWidth = sublist.offsetParent ? sublist.offsetWidth : this.domHandler.getHiddenElementOuterWidth(sublist);
        let itemOuterWidth = this.domHandler.getOuterWidth(item.children[0]);

        sublist.style.top = '0px';

        if ((parseInt(this.containerLeft.left) + itemOuterWidth + sublistWidth) > (viewport.width - this.calculateScrollbarWidth())) {
            sublist.style.left = -sublistWidth + 'px';
        }
        else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }

    calculateScrollbarWidth(): number {
        let scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);

        let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    }
}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div #container [ngClass]="'ui-contextmenu ui-widget ui-widget-content ui-corner-all ui-shadow'" 
            [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" root="root"></p-contextMenuSub>
        </div>
    `,
    providers: [DomHandler]
})
export class ContextMenu implements AfterViewInit, OnDestroy {

    @Input() model: MenuItem[];

    @Input() global: boolean;

    @Input() target: any;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @ViewChild('container') containerViewChild: ElementRef;

    documentClickListener: any;

    windowResizeListener: any;

    rightClickListener: any;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.global) {
            this.rightClickListener = this.renderer.listen('document', 'contextmenu', (event) => {
                this.show(event);
                event.preventDefault();
            });
        }
        else if (this.target) {
            this.rightClickListener = this.renderer.listen(this.target, 'contextmenu', (event) => {
                this.show(event);
                event.preventDefault();
                event.stopPropagation();
            });
        }

        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }

    show(event?: MouseEvent) {
        this.position(event);
        this.moveOnTop();
        this.containerViewChild.nativeElement.style.display = 'block';
        this.domHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        this.bindGlobalListeners();

        if (event) {
            event.preventDefault();
        }
    }

    hide() {
        this.containerViewChild.nativeElement.style.display = 'none';
        this.unbindGlobalListeners();
    }

    moveOnTop() {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }

    toggle(event?: MouseEvent) {
        if (this.containerViewChild.nativeElement.offsetParent)
            this.hide();
        else
            this.show(event);
    }

    position(event?: MouseEvent) {
        if (event) {
            let left = event.pageX + 1;
            let top = event.pageY + 1;
            let width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : this.domHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
            let height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : this.domHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
            let viewport = this.domHandler.getViewport();

            //flip
            if (left + width - document.body.scrollLeft > viewport.width) {
                left -= width;
            }

            //flip
            if (top + height - document.body.scrollTop > viewport.height) {
                top -= height;
            }

            //fit
            if (left < document.body.scrollLeft) {
                left = document.body.scrollLeft;
            }

            //fit
            if (top < document.body.scrollTop) {
                top = document.body.scrollTop;
            }

            this.containerViewChild.nativeElement.style.left = left + 'px';
            this.containerViewChild.nativeElement.style.top = top + 'px';
        }
    }

    bindGlobalListeners() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', (event) => {
                if (this.containerViewChild.nativeElement.offsetParent && event.button !== 2) {
                    this.hide();
                }
            });
        }

        this.zone.runOutsideAngular(() => {
            if (!this.windowResizeListener) {
                this.windowResizeListener = this.onWindowResize.bind(this);
                window.addEventListener('resize', this.windowResizeListener);
            }
        });
    }

    unbindGlobalListeners() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }

        if (this.windowResizeListener) {
            window.removeEventListener('resize', this.windowResizeListener);
            this.windowResizeListener = null;
        }
    }

    onWindowResize(event) {
        if (this.containerViewChild.nativeElement.offsetParent) {
            this.hide();
        }
    }

    ngOnDestroy() {
        this.unbindGlobalListeners();

        if (this.rightClickListener) {
            this.rightClickListener();
        }

        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }

}

@NgModule({
    imports: [CommonModule, RouterModule],
    exports: [ContextMenu, RouterModule],
    declarations: [ContextMenu, ContextMenuSub]
})
export class ContextMenuModule { }