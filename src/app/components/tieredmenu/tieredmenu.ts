import {NgModule,Component,ElementRef,OnDestroy,Input,Renderer2,Inject,forwardRef,ChangeDetectorRef,AfterViewInit,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {trigger,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {MenuItem} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-tieredMenuSub',
    template: `
        <ul [ngClass]="{'p-submenu-list': !root}" (click)="listClick($event)" role="menubar">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}" role="separator">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'p-menuitem':true,'p-menuitem-active':listItem==activeItem,'p-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style" role="none"
                    (mouseenter)="onItemMouseEnter($event, listItem, child)">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="p-menuitem-link" [attr.target]="child.target" [attr.tabindex]="child.disabled ? null : '0'" [attr.title]="child.title" [attr.id]="child.id" 
                        [ngClass]="{'p-disabled':child.disabled}" (click)="itemClick($event, listItem, child)" role="menuitem" [attr.aria-haspopup]="item.items != null" [attr.aria-expanded]="item === activeItem" pRipple>
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" role="menuitem" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" role="menuitem" [attr.tabindex]="child.disabled ? null : '0'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}"
                        class="p-menuitem-link" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" (click)="itemClick($event, listItem, child)" pRipple
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text">{{child.label}}</span>
                        <span class="p-submenu-icon pi pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <p-tieredMenuSub [item]="child" *ngIf="child.items" [baseZIndex]="baseZIndex" [parentActive]="listItem==activeItem" [autoZIndex]="autoZIndex"></p-tieredMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tieredmenu.css']
})
export class TieredMenuSub implements AfterViewInit, OnDestroy {

    @Input() item: MenuItem;
    
    @Input() root: boolean;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() get parentActive(): boolean {
        return this._parentActive;
    }
    set parentActive(value) {
        this._parentActive = value;

        if (!value) {
            this.activeItem = null;
        }
    }

    tieredMenu: TieredMenu;

    _parentActive: boolean;

    rootItemClick: boolean;

    documentClickListener: any;

    ngAfterViewInit() {
        if (this.root && !this.tieredMenu.popup) {
            this.bindDocumentClickListener();
        }
    }
    
    constructor(@Inject(forwardRef(() => TieredMenu)) tieredMenu, private cf: ChangeDetectorRef, public renderer: Renderer2) {
        this.tieredMenu = tieredMenu as TieredMenu;
    }

    activeItem: HTMLLIElement;

    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (this.tieredMenu.popup || (!this.root || this.activeItem)) {
            if (menuitem.disabled) {
                return;
            }

            this.activeItem = item;
            let nextElement:  HTMLElement =  <HTMLElement> item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist:  HTMLElement = <HTMLElement> nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                sublist.style.zIndex = String(++DomHandler.zindex);
                            
                sublist.style.top = '0px';
                sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
            }
        }
    }
    
    itemClick(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (menuitem.disabled) {
            event.preventDefault();
            return true;
        }
        
        if (!menuitem.url) {
            event.preventDefault();
        }
        
        if (menuitem.command) {            
            menuitem.command({
                originalEvent: event,
                item: menuitem
            });
        }

        if (this.root && !this.activeItem && !this.tieredMenu.popup ) {
            this.activeItem = item;
            let nextElement:  HTMLElement =  <HTMLElement> item.children[0].nextElementSibling;
            if (nextElement) {
                let sublist:  HTMLElement = <HTMLElement> nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                sublist.style.zIndex = String(++DomHandler.zindex);
                            
                sublist.style.top = '0px';
                sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';

                this.rootItemClick = true;
            }
        }

        if (!menuitem.items && this.tieredMenu.popup) {
            this.tieredMenu.hide();
        }
    }
    
    listClick(event: Event) {
        if (!this.rootItemClick) {
            this.activeItem = null;
        }
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.tieredMenu && this.tieredMenu.el ? this.tieredMenu.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.rootItemClick) {
                    this.parentActive = false;
                    this.activeItem = null;
                    this.cf.markForCheck();
                }

                this.rootItemClick = false;
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    ngOnDestroy() {
        if (this.root && !this.tieredMenu.popup) {
            this.unbindDocumentClickListener();
        }
    }
}

@Component({
    selector: 'p-tieredMenu',
    template: `
        <div [ngClass]="{'p-tieredmenu p-component':true, 'p-tieredmenu-overlay':popup}" [class]="styleClass" [ngStyle]="style"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" 
            (@overlayAnimation.start)="onOverlayAnimationStart($event)" (click)="preventDocumentDefault=true" *ngIf="!popup || visible">
            <p-tieredMenuSub [item]="model" root="root" [parentActive]="parentActive" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex"></p-tieredMenuSub>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('{{showTransitionParams}}')
              ]),
              transition(':leave', [
                animate('{{hideTransitionParams}}', style({ opacity: 0 }))
              ])
        ])
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TieredMenu implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    parentActive: boolean;

    container: HTMLDivElement;
    
    documentClickListener: any;

    documentResizeListener: any;
    
    preventDocumentDefault: boolean;

    target: any;

    visible: boolean;
    
    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef) {}
    
    toggle(event) {
        if (this.visible)
            this.hide();
        else
            this.show(event);

        this.preventDocumentDefault = true;
    }
    
    show(event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.parentActive = true;
        this.preventDocumentDefault = true;
        this.cd.markForCheck();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
            break;

            case 'void':
                this.onOverlayHide();
            break;
        }
    }
    
    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }

    hide() {
        this.visible = false;
        this.parentActive = false;
        this.cd.markForCheck();
    }

    onWindowResize() {
        this.hide();
    }
    
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.preventDocumentDefault && this.popup) {
                    this.hide();
                }

                this.preventDocumentDefault = false;
            });
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
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

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
    }
    
    ngOnDestroy() {
        if (this.popup) {
            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }

}

@NgModule({
    imports: [CommonModule,RouterModule,RippleModule],
    exports: [TieredMenu,RouterModule],
    declarations: [TieredMenu,TieredMenuSub]
})
export class TieredMenuModule { }
