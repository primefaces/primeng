import {NgModule,Component,ElementRef,OnDestroy,Input,Output,EventEmitter,Renderer2,ViewChild,Inject,forwardRef,ChangeDetectorRef} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from 'primeng/dom';
import {MenuItem} from 'primeng/api';
import {RouterModule} from '@angular/router';

@Component({
    selector: '[pMenuItemContent]',
    template: `
        <a *ngIf="!item.routerLink" [attr.href]="item.url||null" class="ui-menuitem-link ui-corner-all" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" [attr.data-automationid]="item.automationId" [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
            [ngClass]="{'ui-state-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem">
            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="ui-menuitem-text">{{item.label}}</span>
        </a>
        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [attr.data-automationid]="item.automationId" [queryParams]="item.queryParams" [routerLinkActive]="'ui-menuitem-link-active"
            [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" [attr.target]="item.target" [attr.id]="item.id" [attr.tabindex]="item.tabindex ? item.tabindex : '0'" 
            [attr.title]="item.title" [ngClass]="{'ui-state-disabled':item.disabled}" (click)="menu.itemClick($event, item)" role="menuitem"
            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
            <span class="ui-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon"></span>
            <span class="ui-menuitem-text">{{item.label}}</span>
        </a>
    `
})
export class MenuItemContent {

    @Input("pMenuItemContent") item: MenuItem;

    menu: Menu;
    
    constructor(@Inject(forwardRef(() => Menu)) menu) {
        this.menu = menu as Menu;
    }
}

@Component({
    selector: 'p-menu',
    template: `
        <div #container [ngClass]="{'ui-menu ui-widget ui-widget-content ui-corner-all': true, 'ui-menu-dynamic ui-shadow': popup}"
            [class]="styleClass" [ngStyle]="style" (click)="preventDocumentDefault=true" *ngIf="!popup || visible"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)">
            <ul>
                <ng-template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="ui-menu-separator ui-widget-content" *ngIf="submenu.separator" [ngClass]="{'ui-helper-hidden': submenu.visible === false}"></li>
                    <li class="ui-submenu-header ui-widget-header ui-corner-all" [attr.data-automationid]="submenu.automationId" *ngIf="!submenu.separator" [ngClass]="{'ui-helper-hidden': submenu.visible === false}">{{submenu.label}}</li>
                    <ng-template ngFor let-item [ngForOf]="submenu.items">
                        <li class="ui-menu-separator ui-widget-content" *ngIf="item.separator" [ngClass]="{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}"></li>
                        <li class="ui-menuitem ui-widget ui-corner-all" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'ui-helper-hidden': (item.visible === false || submenu.visible === false)}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                    </ng-template>
                </ng-template>
                <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="ui-menu-separator ui-widget-content" *ngIf="item.separator" [ngClass]="{'ui-helper-hidden': item.visible === false}"></li>
                    <li class="ui-menuitem ui-widget ui-corner-all" *ngIf="!item.separator" [pMenuItemContent]="item" [ngClass]="{'ui-helper-hidden': item.visible === false}" [ngStyle]="item.style" [class]="item.styleClass"></li>
                </ng-template>
            </ul>
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
    ]
})
export class Menu implements OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;
    
    @Input() baseZIndex: number = 0;
    
    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';

    @ViewChild('container') containerViewChild: ElementRef;

    @Output() onShow: EventEmitter<any> = new EventEmitter();
    
    @Output() onHide: EventEmitter<any> = new EventEmitter();
    
    container: HTMLDivElement;
    
    documentClickListener: any;

    documentResizeListener: any;
    
    preventDocumentDefault: boolean;

    target: any;

    visible: boolean;
    
    constructor(public el: ElementRef, public renderer: Renderer2,private cd: ChangeDetectorRef) {}

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
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.container, this.target);
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                }
            break;

            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
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
        this.cd.detectChanges();
    }

    onWindowResize() {
        this.hide();
    }
    
    itemClick(event, item: MenuItem) {
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
        
        if (this.popup) {
            this.hide();
        }
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
    
    hasSubMenu(): boolean {
        if (this.model) {
            for (var item of this.model) {
                if (item.items) {
                    return true;
                }
            }
        }
        return false;
    }
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Menu,RouterModule],
    declarations: [Menu,MenuItemContent]
})
export class MenuModule { }
