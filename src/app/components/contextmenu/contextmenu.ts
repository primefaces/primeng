import { NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer2,Inject,forwardRef,ViewChild,NgZone,EventEmitter,ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { MenuItem } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';  
import { RouterModule } from '@angular/router';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul [ngClass]="{'p-submenu-list':!root}">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #item [ngClass]="{'p-menuitem':true,'p-menuitem-active': child === activeItem,'p-hidden': child.visible === false}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" role="none">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url ? child.url : null" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'" (click)="onItemClick($event, child)"
                        [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass" pRipple
                        [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="child === activeItem">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" role="menuitem"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, child)" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}"
                        [ngStyle]="child.style" [class]="child.styleClass" pRipple
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <p-contextMenuSub [parentActive]="child === activeItem" [item]="child" *ngIf="child.items" (leafClick)="onLeafClick()"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ContextMenuSub {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }

    @Output() leafClick: EventEmitter<any> = new EventEmitter();

    set parentActive(value) {
        this._parentActive = value;
        if (!value) {
            this.activeItem = null;
        }
    }

    contextMenu: ContextMenu;

    constructor(@Inject(forwardRef(() => ContextMenu)) contextMenu) {
        this.contextMenu = contextMenu as ContextMenu;
    }

    activeItem: any;

    containerOffset: any;

    hideTimeout: any;

    _parentActive: boolean;

    onItemMouseEnter(event, item, menuitem) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        if (menuitem.disabled) {
            return;
        }

        this.activeItem = menuitem;

        let nextElement = item.children[0].nextElementSibling;
        if (nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            this.position(sublist, item);
        }
    }

    onItemClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (!item.url && !item.routerLink) {
            event.preventDefault();
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        if (item.items) {
            if (this.activeItem && item === this.activeItem) {
                this.activeItem = null;
            }
            else {
                this.activeItem = item;
            }
        }

        if (!item.items) {
            this.onLeafClick();
        }
    }

    onLeafClick() {
        this.activeItem = null;
        if (this.root) {
            this.contextMenu.hide();
        }

        this.leafClick.emit();
    }

    position(sublist, item) {
        this.containerOffset = DomHandler.getOffset(item.parentElement)
        let viewport = DomHandler.getViewport();
        let sublistWidth = sublist.offsetParent ? sublist.offsetWidth : DomHandler.getHiddenElementOuterWidth(sublist);
        let itemOuterWidth = DomHandler.getOuterWidth(item.children[0]);
        let itemOuterHeight = DomHandler.getOuterHeight(item.children[0]);
        let sublistHeight = sublist.offsetHeight ? sublist.offsetHeight : DomHandler.getHiddenElementOuterHeight(sublist);

        if ((parseInt(this.containerOffset.top) + itemOuterHeight + sublistHeight) > (viewport.height - DomHandler.calculateScrollbarHeight())) {
            sublist.style.removeProperty('top');
            sublist.style.bottom = '0px';
        }
        else {
            sublist.style.removeProperty('bottom');
            sublist.style.top = '0px';
        }

        if ((parseInt(this.containerOffset.left) + itemOuterWidth + sublistWidth) > (viewport.width - DomHandler.calculateScrollbarWidth())) {
            sublist.style.left = -sublistWidth + 'px';
        }
        else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }
}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div #container [ngClass]="'p-contextmenu p-component'"
            [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" [parentActive]="parentActive" root="root"></p-contextMenuSub>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./contextmenu.css']
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

    @Input() triggerEvent: string = 'contextmenu';

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    @ViewChild('container') containerViewChild: ElementRef;

    parentActive: boolean;

    documentClickListener: any;

    windowResizeListener: any;

    triggerEventListener: any;

    constructor(public el: ElementRef, public renderer: Renderer2, public zone: NgZone) { }

    ngAfterViewInit() {
        if (this.global) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.triggerEventListener = this.renderer.listen(documentTarget, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
            });
        }
        else if (this.target) {
            this.triggerEventListener = this.renderer.listen(this.target, this.triggerEvent, (event) => {
                this.show(event);
                event.preventDefault();
                event.stopPropagation();
            });
        }

        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }

    show(event?: MouseEvent) {
        this.position(event);
        this.moveOnTop();
        this.containerViewChild.nativeElement.style.display = 'block';
        this.parentActive = true;
        DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        this.bindGlobalListeners();

        if (event) {
            event.preventDefault();
        }

        this.onShow.emit();
    }

    hide() {
        this.containerViewChild.nativeElement.style.display = 'none';
        this.parentActive = false;
        this.unbindGlobalListeners();
        this.onHide.emit();
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
            let width = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetWidth : DomHandler.getHiddenElementOuterWidth(this.containerViewChild.nativeElement);
            let height = this.containerViewChild.nativeElement.offsetParent ? this.containerViewChild.nativeElement.offsetHeight : DomHandler.getHiddenElementOuterHeight(this.containerViewChild.nativeElement);
            let viewport = DomHandler.getViewport();

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
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
                if (this.containerViewChild.nativeElement.offsetParent && this.isOutsideClicked(event) && event.button !== 2) {
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

    isOutsideClicked(event: Event) {
        return !(this.containerViewChild.nativeElement.isSameNode(event.target) || this.containerViewChild.nativeElement.contains(event.target));
    }

    ngOnDestroy() {
        this.unbindGlobalListeners();

        if (this.triggerEventListener) {
            this.triggerEventListener();
        }

        if (this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }

}

@NgModule({
    imports: [CommonModule,RouterModule,RippleModule],
    exports: [ContextMenu,RouterModule],
    declarations: [ContextMenu,ContextMenuSub]
})
export class ContextMenuModule { }
