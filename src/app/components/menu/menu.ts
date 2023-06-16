import {
    NgModule,
    Component,
    ElementRef,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    Renderer2,
    Inject,
    forwardRef,
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    ViewEncapsulation,
    ViewRef,
    PLATFORM_ID,
    TemplateRef,
    Pipe,
    PipeTransform
} from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { DomHandler, ConnectedOverlayScrollHandler } from 'primeng/dom';
import { MenuItem, OverlayService, PrimeNGConfig } from 'primeng/api';
import { ZIndexUtils } from 'primeng/utils';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { VoidListener } from 'primeng/ts-helpers';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'safeHtml'
})
class SafeHtmlPipe implements PipeTransform {
    constructor(@Inject(PLATFORM_ID) private readonly platformId: any, private readonly sanitizer: DomSanitizer) {}

    public transform(value: string): SafeHtml {
        if (!value || !isPlatformBrowser(this.platformId)) {
            return value;
        }

        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: '[pMenuItemContent]',
    template: `
        <a
            *ngIf="!item?.routerLink"
            (keydown)="onItemKeyDown($event)"
            [attr.href]="item.url || null"
            class="p-menuitem-link"
            [attr.tabindex]="item.disabled ? null : '0'"
            [attr.data-automationid]="item.automationId"
            [target]="item.target"
            [attr.title]="item.title"
            [attr.id]="item.id"
            [ngClass]="{ 'p-disabled': item.disabled }"
            (click)="menu.itemClick($event, item)"
            role="menuitem"
        >
            <ng-container *ngTemplateOutlet="itemContent"></ng-container>
        </a>
        <a
            *ngIf="item?.routerLink"
            (keydown)="onItemKeyDown($event)"
            [routerLink]="item.routerLink"
            [attr.data-automationid]="item.automationId"
            [queryParams]="item.queryParams"
            routerLinkActive="p-menuitem-link-active"
            [routerLinkActiveOptions]="item.routerLinkActiveOptions || { exact: false }"
            class="p-menuitem-link"
            [target]="item.target"
            [attr.id]="item.id"
            [attr.tabindex]="item.disabled ? null : '0'"
            [attr.title]="item.title"
            [ngClass]="{ 'p-disabled': item.disabled }"
            (click)="menu.itemClick($event, item)"
            role="menuitem"
            pRipple
            [fragment]="item.fragment"
            [queryParamsHandling]="item.queryParamsHandling"
            [preserveFragment]="item.preserveFragment"
            [skipLocationChange]="item.skipLocationChange"
            [replaceUrl]="item.replaceUrl"
            [state]="item.state"
        >
            <ng-container *ngTemplateOutlet="itemContent"></ng-container>
        </a>

        <ng-template #itemContent>
            <span class="p-menuitem-icon" *ngIf="item.icon" [ngClass]="item.icon" [class]="item.iconClass" [ngStyle]="item.iconStyle"></span>
            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{ item.label }}</span>
            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label | safeHtml"></span></ng-template>
            <span class="p-menuitem-badge" *ngIf="item.badge" [ngClass]="item.badgeStyleClass">{{ item.badge }}</span>
        </ng-template>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class MenuItemContent {
    @Input('pMenuItemContent') item: MenuItem | undefined;

    menu: Menu;

    constructor(@Inject(forwardRef(() => Menu)) menu: Menu) {
        this.menu = menu as Menu;
    }

    onItemKeyDown(event: any) {
        let listItem = event.currentTarget.parentElement;

        switch (event.code) {
            case 'ArrowDown':
                var nextItem = this.findNextItem(listItem);
                if (nextItem) {
                    nextItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'ArrowUp':
                var prevItem = this.findPrevItem(listItem);
                if (prevItem) {
                    prevItem.children[0].focus();
                }

                event.preventDefault();
                break;

            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    listItem.children[0].click();
                }

                event.preventDefault();
                break;

            default:
                break;
        }
    }

    findNextItem(item: any): any {
        let nextItem = item.nextElementSibling;

        if (nextItem) return DomHandler.hasClass(nextItem, 'p-disabled') || !DomHandler.hasClass(nextItem, 'p-menuitem') ? this.findNextItem(nextItem) : nextItem;
        else return null;
    }

    findPrevItem(item: any): any {
        let prevItem = item.previousElementSibling;

        if (prevItem) return DomHandler.hasClass(prevItem, 'p-disabled') || !DomHandler.hasClass(prevItem, 'p-menuitem') ? this.findPrevItem(prevItem) : prevItem;
        else return null;
    }
}
/**
 * Menu is a navigation / command component that supports dynamic and static positioning.
 * @group Components
 */
@Component({
    selector: 'p-menu',
    template: `
        <div
            #container
            [ngClass]="{ 'p-menu p-component': true, 'p-menu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            *ngIf="!popup || visible"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
        >
            <ul class="p-menu-list p-reset" role="menu">
                <ng-template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="p-menu-separator" *ngIf="submenu.separator" [ngClass]="{ 'p-hidden': submenu.visible === false }" role="separator"></li>
                    <li
                        class="p-submenu-header"
                        [attr.data-automationid]="submenu.automationId"
                        *ngIf="!submenu.separator"
                        [ngClass]="{ 'p-hidden': submenu.visible === false, flex: submenu.visible }"
                        pTooltip
                        [tooltipOptions]="submenu.tooltipOptions"
                        role="none"
                    >
                        <span *ngIf="submenu.escape !== false; else htmlSubmenuLabel">{{ submenu.label }}</span>
                        <ng-template #htmlSubmenuLabel><span [innerHTML]="submenu.label | safeHtml"></span></ng-template>
                    </li>
                    <ng-template ngFor let-item [ngForOf]="submenu.items">
                        <li class="p-menu-separator" *ngIf="item.separator" [ngClass]="{ 'p-hidden': item.visible === false || submenu.visible === false }" role="separator"></li>
                        <li
                            class="p-menuitem"
                            *ngIf="!item.separator"
                            [pMenuItemContent]="item"
                            [ngClass]="{ 'p-hidden': item.visible === false || submenu.visible === false }"
                            [ngStyle]="item.style"
                            [class]="item.styleClass"
                            pTooltip
                            [tooltipOptions]="item.tooltipOptions"
                            role="none"
                        ></li>
                    </ng-template>
                </ng-template>
                <ng-template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="p-menu-separator" *ngIf="item.separator" [ngClass]="{ 'p-hidden': item.visible === false }" role="separator"></li>
                    <li
                        class="p-menuitem"
                        *ngIf="!item.separator"
                        [pMenuItemContent]="item"
                        [ngClass]="{ 'p-hidden': item.visible === false }"
                        [ngStyle]="item.style"
                        [class]="item.styleClass"
                        pTooltip
                        [tooltipOptions]="item.tooltipOptions"
                        role="none"
                    ></li>
                </ng-template>
            </ul>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./menu.css'],
    host: {
        class: 'p-element'
    }
})
export class Menu implements OnDestroy {
    /**
     * An array of menuitems.
     * @group Props
     */
    @Input() model: MenuItem[] | undefined;
    /**
     * Defines if menu would displayed as a popup.
     * @group Props
     */
    @Input() popup: boolean | undefined;
    /**
     * Inline style of the component.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Style class of the component.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Target element to attach the overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any;
    /**
     * Whether to automatically manage layering.
     * @group Props
     */
    @Input() autoZIndex: boolean = true;
    /**
     * Base zIndex value to use in layering.
     * @group Props
     */
    @Input() baseZIndex: number = 0;
    /**
     * Transition options of the show animation.
     * @group Props
     */
    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
    /**
     * Transition options of the hide animation.
     * @group Props
     */
    @Input() hideTransitionOptions: string = '.1s linear';
    /**
     * Callback to invoke when overlay menu is shown.
     * @group Emits
     */
    @Output() onShow: EventEmitter<any> = new EventEmitter<any>();
    /**
     * Callback to invoke when overlay menu is hidden.
     * @group Emits
     */
    @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

    container: HTMLDivElement | undefined;

    scrollHandler: ConnectedOverlayScrollHandler | null | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    preventDocumentDefault: boolean | undefined;

    target: any;

    visible: boolean | undefined;

    relativeAlign: boolean | undefined;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        private cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {}
    /**
     * Toggles the visibility of the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public toggle(event: Event) {
        if (this.visible) this.hide();
        else this.show(event);

        this.preventDocumentDefault = true;
    }
    /**
     * Displays the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    public show(event: any) {
        this.target = event.currentTarget;
        this.relativeAlign = event.relativeAlign;
        this.visible = true;
        this.preventDocumentDefault = true;
        this.cd.markForCheck();
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.container = event.element;
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    this.alignOverlay();
                    this.bindDocumentClickListener();
                    this.bindDocumentResizeListener();
                    this.bindScrollListener();
                }
                break;

            case 'void':
                this.onOverlayHide();
                this.onHide.emit({});
                break;
        }
    }

    onOverlayAnimationEnd(event: AnimationEvent) {
        switch (event.toState) {
            case 'void':
                if (this.autoZIndex) {
                    ZIndexUtils.clear(event.element);
                }
                break;
        }
    }

    alignOverlay() {
        if (this.relativeAlign) DomHandler.relativePosition(this.container, this.target);
        else DomHandler.absolutePosition(this.container, this.target);
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.container);
            else DomHandler.appendChild(this.container, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.container);
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.container, this.baseZIndex + this.config.zIndex.menu);
        }
    }
    /**
     * Hides the popup menu.
     * @group Method
     */
    public hide() {
        this.visible = false;
        this.relativeAlign = false;
        this.cd.markForCheck();
    }

    onWindowResize() {
        if (this.visible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }

    itemClick(event: MouseEvent, item: MenuItem) {
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

        if (this.popup) {
            this.hide();
        }
    }

    onOverlayClick(event: Event) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }

        this.preventDocumentDefault = true;
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && isPlatformBrowser(this.platformId)) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
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
        if (!this.documentResizeListener && isPlatformBrowser(this.platformId)) {
            const window = this.document.defaultView;
            this.documentResizeListener = this.renderer.listen(window, 'resize', this.onWindowResize.bind(this));
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (!this.scrollHandler && isPlatformBrowser(this.platformId)) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.visible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler?.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.preventDocumentDefault = false;

        if (!(this.cd as ViewRef).destroyed) {
            this.target = null;
        }
    }

    ngOnDestroy() {
        if (this.popup) {
            if (this.scrollHandler) {
                this.scrollHandler.destroy();
                this.scrollHandler = null;
            }

            if (this.container && this.autoZIndex) {
                ZIndexUtils.clear(this.container);
            }

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
    imports: [CommonModule, RouterModule, RippleModule, TooltipModule],
    exports: [Menu, RouterModule, TooltipModule],
    declarations: [Menu, MenuItemContent, SafeHtmlPipe]
})
export class MenuModule {}
