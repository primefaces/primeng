import { NgModule, Component, ElementRef, AfterViewInit, OnDestroy, Input, Output, Renderer2, Inject, forwardRef, ViewChild, NgZone, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { MenuItem, ContextMenuService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { RouterModule } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul [ngClass]="{'p-submenu-list':!root}" (mouseleave)="onItemMouseLeave($event,item,child)">
            <ng-template ngFor let-child let-index="index.toString()" [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #item [ngClass]="{'p-menuitem':true,'p-menuitem-active': isActive(index),'p-hidden': child.visible === false}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" role="none" [attr.data-itemindex]="root ? index : (level + '_' + index)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url ? child.url : null" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, item, child)" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}" [ngStyle]="child.style" [class]="child.styleClass" pRipple
                        [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="isActive(index)">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" role="menuitem"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled ? null : '0'"
                        (click)="onItemClick($event, item, child)" [ngClass]="{'p-menuitem-link':true,'p-disabled':child.disabled}"
                        [ngStyle]="child.style" [class]="child.styleClass" pRipple
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <p-contextMenuSub [level]="level ? (level + '_' + index) : index"  [item]="child" *ngIf="child.items" (leafClick)="onLeafClick()"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None
})
export class ContextMenuSub {
    //`

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() level: any;

    @Output() leafClick: EventEmitter<any> = new EventEmitter();

    contextMenu: ContextMenu;

    activeIndex: string;

    activeIndexChangeSubscription: Subscription;

    constructor(@Inject(forwardRef(() => ContextMenu)) contextMenu) {
        this.contextMenu = contextMenu as ContextMenu;
    }

    ngOnInit() {
        this.activeIndexChangeSubscription = this.contextMenu.contextMenuService.activeIndexChange$.pipe(takeUntil(this.contextMenu.ngDestroy$)).subscribe((activeIndex) => {
            if (activeIndex && activeIndex.startsWith(this.level)) {
                this.position(this.contextMenu.contextMenuService.activeMenuItem);
            }

            this.activeIndex = activeIndex;
            this.contextMenu.cd.markForCheck();
        });
    }

    containerOffset: any;

    hideTimeout: any;

    onItemMouseEnter(event, item, menuItem) {
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
        }

        if (menuItem.disabled) {
            return;
        }

        if (!this.activeIndex || !this.activeIndex.startsWith(item.getAttribute('data-itemindex')))
            this.contextMenu.contextMenuService.changeActiveMenuItem(item);
    }

    onItemMouseLeave(event, item, menuItem) {
        if (this.contextMenu.el.nativeElement.contains(<Node> event.toElement) && !this.root) {
            this.contextMenu.contextMenuService.changeActiveMenuItem(this.contextMenu.contextMenuService.activeMenuItem.parentElement.parentElement.parentElement)
        }
    }

    onItemClick(event, item, menuItem) {
        if (menuItem.disabled) {
            event.preventDefault();
            return;
        }

        if (!menuItem.url && !menuItem.routerLink) {
            event.preventDefault();
        }

        if (menuItem.command) {
            menuItem.command({
                originalEvent: event,
                item: menuItem
            });
        }

        if (menuItem.items) {
            let itemIndex = item.getAttribute('data-itemindex');
            if (this.activeIndex && this.activeIndex.startsWith(itemIndex) && !DomHandler.hasClass(item, "p-submenu-closed")) {
                this.contextMenu.contextMenuService.changeActiveMenuItem(item, true);
            }
            else {
                this.contextMenu.contextMenuService.changeActiveMenuItem(item);
            }
        }

        if (!menuItem.items) {
            this.onLeafClick();
        }
    }

    onLeafClick() {
        this.contextMenu.contextMenuService.resetActiveMenuItem();

        if (this.root) {
            this.contextMenu.hide();
        }

        this.leafClick.emit();
    }

    position(item) {
        let nextElement = item.children[0].nextElementSibling;

        if (nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
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

    isActive(index) {
        return (this.activeIndex && this.activeIndex.startsWith(this.level ? this.level + '_' + index : index));
    }
}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div #container [ngClass]="'p-contextmenu p-component'"
            [class]="styleClass" [ngStyle]="style">
            <p-contextMenuSub [item]="model" root="root"></p-contextMenuSub>
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

    documentClickListener: any;

    windowResizeListener: any;

    triggerEventListener: any;

    keydownEventListener: any;

    ngDestroy$ = new Subject();

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public zone: NgZone, public contextMenuService: ContextMenuService) { }

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
        DomHandler.fadeIn(this.containerViewChild.nativeElement, 250);
        this.bindGlobalListeners();

        if (event) {
            event.preventDefault();
        }

        this.onShow.emit();
    }

    hide() {
        this.containerViewChild.nativeElement.style.display = 'none';
        this.unbindGlobalListeners();
        this.contextMenuService.resetActiveMenuItem();
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

    findNextItem(item) {
        let nextItem = item.nextElementSibling;

        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-menu-separator') || DomHandler.hasClass(nextItem.children[0], 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }

    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem){
            return DomHandler.hasClass(prevItem, 'p-menu-separator') || DomHandler.hasClass(prevItem.children[0], 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;
        }
        else
            return null;
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

        if (!this.keydownEventListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.keydownEventListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
                this.cd.markForCheck();
                switch (event.key) {
                    case 'ArrowDown':
                        if (this.contextMenuService.activeMenuItem) {
                            let nextElement = this.findNextItem(this.contextMenuService.activeMenuItem);

                            if (nextElement) {
                                this.contextMenuService.changeActiveMenuItem(nextElement);
                            }
                        }
                        else {
                            let firstElement = document.querySelector("[data-itemindex]");

                            if (firstElement) {
                                if (DomHandler.hasClass(firstElement.children[0], 'p-disabled')) {
                                    firstElement = this.findNextItem(firstElement);
                                }

                                this.contextMenuService.changeActiveMenuItem(firstElement);
                            }
                        }
                    break;
        
                    case 'ArrowUp':
                        if (this.contextMenuService.activeMenuItem) {
                            let prevElement = this.findPrevItem(this.contextMenuService.activeMenuItem);

                            if (prevElement) {
                                this.contextMenuService.changeActiveMenuItem(prevElement);
                            }
                        }
                        else {
                            let lastElement = document.querySelectorAll("[data-itemindex]")[document.querySelectorAll("[data-itemindex]").length - 1];
                            if (lastElement) {
                                if (DomHandler.hasClass(lastElement.children[0], 'p-disabled')) {
                                    lastElement = this.findPrevItem(lastElement);
                                }

                                this.contextMenuService.changeActiveMenuItem(lastElement);
                            }
                        }
                    break;
        
                    case 'ArrowRight':
                        if (this.contextMenuService.activeMenuItem) {
                            if (this.contextMenuService.activeMenuItem.parentElement &&this.contextMenuService.activeMenuItem.parentElement.style.left.startsWith('-')) {
                                this.keydownLeft();
                            }
                            else {
                                this.keydownRight();
                            }
                        }
                    break;

                    case 'ArrowLeft':
                        if (this.contextMenuService.activeMenuItem) {
                            if (this.contextMenuService.activeMenuItem.children[1] && this.contextMenuService.activeMenuItem.children[1].children[0].style.left.startsWith('-')) {
                                this.keydownRight();
                            }
                            else {
                                this.keydownLeft();
                            }
                        }
                    break;

                    case 'Escape':
                        this.hide();
                    break;

                    case 'Enter':
                        if (this.contextMenuService.activeMenuItem) {
                            this.contextMenuService.activeMenuItem.children[0].click();
                        }
                    break;
        
                    default:
                    break;
                }

                event.preventDefault();
            });
        }

        this.zone.runOutsideAngular(() => {
            if (!this.windowResizeListener) {
                this.windowResizeListener = this.onWindowResize.bind(this);
                window.addEventListener('resize', this.windowResizeListener);
            }
        });
    }

    keydownRight() {
        if (this.contextMenuService.activeMenuItem && DomHandler.hasClass(this.contextMenuService.activeMenuItem, 'p-submenu-closed')) {
            DomHandler.removeClass(this.contextMenuService.activeMenuItem, 'p-submenu-closed');
            this.contextMenuService.changeActiveMenuItem(this.contextMenuService.activeMenuItem);
        }
        else if (this.contextMenuService.activeMenuItem.children.length >= 2) {
            this.contextMenuService.changeActiveMenuItem(this.contextMenuService.activeMenuItem.children[1].children[0].children[0]);
        }
    }

    keydownLeft() {
        let parentItem = this.contextMenuService.activeMenuItem.parentElement.parentElement.parentElement;
        let itemIndex = parentItem.getAttribute('data-itemindex');
        if (itemIndex)
            this.contextMenuService.changeActiveMenuItem(parentItem, true);
        else{
            this.contextMenuService.changeActiveMenuItem(this.contextMenuService.activeMenuItem, true);
        }
    }

    unbindGlobalListeners() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }

        if (this.keydownEventListener) {
            this.keydownEventListener();
            this.keydownEventListener = null;
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

        this.ngDestroy$.next(true);
        this.ngDestroy$.complete();
    }

}

@NgModule({
    imports: [CommonModule, RouterModule, RippleModule],
    exports: [ContextMenu, RouterModule],
    declarations: [ContextMenu, ContextMenuSub],
    providers: [ContextMenuService]
})
export class ContextMenuModule { }