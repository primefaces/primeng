import {NgModule,Component,ElementRef,OnDestroy,Input,Renderer2,Inject,forwardRef} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-tieredMenuSub',
    template: `
        <ul [ngClass]="{'ui-widget-content ui-corner-all ui-shadow ui-submenu-list': !root}" (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listItem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style"
                    (mouseenter)="onItemMouseEnter($event, listItem, child)" (mouseleave)="onItemMouseLeave($event)">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" 
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url||'#'" 
                        class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-tieredMenuSub class="ui-submenu" [item]="child" *ngIf="child.items" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex" [hideDelay]="hideDelay"></p-tieredMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    providers: [DomHandler]
})
export class TieredMenuSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() hideDelay: number = 250;

    constructor(@Inject(forwardRef(() => TieredMenu)) public tieredMenu: TieredMenu, public domHandler: DomHandler) {}
    
    activeItem: HTMLLIElement;

    hideTimeout: any;
                
    onItemMouseEnter(event: Event, item: HTMLLIElement, menuitem: MenuItem) {
        if (menuitem.disabled) {
            return;
        }

        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
            this.hideTimeout = null;
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
            sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
        }
    }
    
    onItemMouseLeave(event: Event) {
        this.hideTimeout = setTimeout(() => {
            this.activeItem = null;
        }, this.hideDelay);
    }
    
    itemClick(event: Event, item: MenuItem) {
        if (item.disabled) {
            event.preventDefault();
            return true;
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

        if (!item.items && this.tieredMenu.popup) {
            this.tieredMenu.hide();
        }
    }
    
    listClick(event: Event) {
        this.activeItem = null;
    }
}

@Component({
    selector: 'p-tieredMenu',
    template: `
        <div [ngClass]="{'ui-tieredmenu ui-widget ui-widget-content ui-corner-all':true, 'ui-tieredmenu-dynamic ui-shadow':popup}" [class]="styleClass" [ngStyle]="style"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" *ngIf="!popup || visible">
            <p-tieredMenuSub [item]="model" root="root" [baseZIndex]="baseZIndex" [autoZIndex]="autoZIndex" [hideDelay]="hideDelay"></p-tieredMenuSub>
        </div>
    `,
    animations: [
        trigger('overlayAnimation', [
            state('void', style({
                transform: 'translateY(5%)',
                opacity: 0
            })),
            state('visible', style({
                transform: 'translateY(0)',
                opacity: 1
            })),
            transition('void => visible', animate('{{showTransitionParams}}')),
            transition('visible => void', animate('{{hideTransitionParams}}'))
        ])
    ],
    providers: [DomHandler]
})
export class TieredMenu implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;

    @Input() hideDelay: number = 250
    
    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';

    container: HTMLDivElement;
    
    documentClickListener: any;

    documentResizeListener: any;
    
    preventDocumentDefault: boolean;

    target: any;

    visible: boolean;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}
    
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
        this.preventDocumentDefault = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.appendOverlay();
                    this.domHandler.absolutePosition(this.container, this.target);
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
                this.domHandler.appendChild(this.container, this.appendTo);
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
    }

    onWindowResize() {
        this.hide();
    }
    
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if (!this.preventDocumentDefault) {
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
    imports: [CommonModule,RouterModule],
    exports: [TieredMenu,RouterModule],
    declarations: [TieredMenu,TieredMenuSub]
})
export class TieredMenuModule { }
