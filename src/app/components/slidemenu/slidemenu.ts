import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
    AfterContentInit,
    AfterViewChecked,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    NgModule,
    OnDestroy,
    Output,
    PLATFORM_ID,
    QueryList,
    Renderer2,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    ViewRef,
    forwardRef
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem, OverlayService, PrimeNGConfig, PrimeTemplate, SharedModule } from 'primeng/api';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { AngleRightIcon } from 'primeng/icons/angleright';
import { CaretLeftIcon } from 'primeng/icons/caretleft';
import { CaretRightIcon } from 'primeng/icons/caretright';
import { TooltipModule } from 'primeng/tooltip';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { ZIndexUtils } from 'primeng/utils';

@Component({
    selector: 'p-slideMenuSub',
    template: `
        <ul
            #sublist
            [ngClass]="{ 'p-slidemenu-rootlist': root, 'p-submenu-list': !root, 'p-active-submenu': isActive }"
            [style.width.px]="menuWidth"
            [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'"
            [style.transitionDuration]="effectDuration + 'ms'"
            [style.transitionTimingFunction]="easing"
        >
            <ng-template ngFor let-child [ngForOf]="root ? item : item?.items">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{ 'p-hidden': child.visible === false }"></li>
                <li
                    *ngIf="!child.separator"
                    #listitem
                    [ngClass]="{ 'p-menuitem': true, 'p-menuitem-active': listitem == activeItem, 'p-hidden': child.visible === false }"
                    pTooltip
                    [tooltipOptions]="child.tooltipOptions"
                    [class]="child.styleClass"
                    [ngStyle]="child.style"
                >
                    <a
                        *ngIf="!child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [attr.href]="child.url"
                        class="p-menuitem-link"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        [attr.tabindex]="child.disabled || !isActive ? null : '0'"
                        (click)="itemClick($event, child, listitem)"
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <AngleRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" />
                            <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                    </a>
                    <a
                        *ngIf="child.routerLink"
                        (keydown)="onItemKeyDown($event)"
                        [routerLink]="child.routerLink"
                        [queryParams]="child.queryParams"
                        [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions || { exact: false }"
                        [href]="child.url"
                        class="p-menuitem-link"
                        [target]="child.target"
                        [attr.title]="child.title"
                        [attr.id]="child.id"
                        [attr.tabindex]="child.disabled || !isActive ? null : '0'"
                        [ngClass]="{ 'p-disabled': child.disabled }"
                        (click)="itemClick($event, child, listitem)"
                        [fragment]="child.fragment"
                        [queryParamsHandling]="child.queryParamsHandling"
                        [preserveFragment]="child.preserveFragment"
                        [skipLocationChange]="child.skipLocationChange"
                        [replaceUrl]="child.replaceUrl"
                        [state]="child.state"
                    >
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon" [ngStyle]="child.iconStyle"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{ child.label }}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-menuitem-badge" *ngIf="child.badge" [ngClass]="child.badgeStyleClass">{{ child.badge }}</span>
                        <ng-container *ngIf="child.items">
                            <CaretRightIcon *ngIf="!slideMenu.submenuIconTemplate" [styleClass]="'p-submenu-icon'" />
                            <ng-template *ngTemplateOutlet="slideMenu.submenuIconTemplate"></ng-template>
                        </ng-container>
                    </a>
                    <p-slideMenuSub class="p-submenu" [item]="child" [index]="index + 1" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'p-element'
    }
})
export class SlideMenuSub implements OnDestroy {
    @Input() item: MenuItem | undefined;

    @Input() root: boolean | undefined;

    @Input() backLabel: string = 'Back';

    @Input() menuWidth: number | undefined;

    @Input() effectDuration: any;

    @Input() easing: string = 'ease-out';

    @Input() index: number | undefined;

    @ViewChild('sublist') sublistViewChild: ElementRef | undefined;

    slideMenu: SlideMenu;

    transitionEndListener: VoidListener;

    constructor(@Inject(forwardRef(() => SlideMenu)) slideMenu: SlideMenu, @Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2) {
        this.slideMenu = slideMenu as SlideMenu;
    }
    activeItem: any;

    itemClick(event: MouseEvent, item: MenuItem, listitem: any) {
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

        if (item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;

            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(() => (this.slideMenu.animating = false), this.effectDuration);
        }

        if (!item.items && this.slideMenu.popup) {
            this.slideMenu.hide();
        }
    }

    focusNextList(listitem: HTMLElement) {
        if (!this.slideMenu.animating) {
            let focusableElements = DomHandler.getFocusableElements(listitem);

            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            this.unbindTransitionEndListener();
        }
    }

    onItemKeyDown(event: KeyboardEvent) {
        let listItem = (event.target as HTMLElement).parentElement;

        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    (listItem.children[0] as HTMLElement).click();
                    this.transitionEndListener = this.renderer.listen(this.sublistViewChild?.nativeElement, 'transitionend', this.focusNextList.bind(this, listItem));
                }

                event.preventDefault();
                break;

            default:
                break;
        }
    }

    unbindTransitionEndListener() {
        if (this.transitionEndListener && this.sublistViewChild) {
            this.transitionEndListener();
            this.transitionEndListener = null;
        }
    }

    ngOnDestroy() {
        this.activeItem = null;
        this.unbindTransitionEndListener();
    }

    get isActive() {
        return -this.slideMenu.left == (this.index as number) * (this.menuWidth as number);
    }
}
/**
 * SlideMenu displays submenus with slide animation.
 * @group Components
 */
@Component({
    selector: 'p-slideMenu',
    template: `
        <div
            #container
            [ngClass]="{ 'p-slidemenu p-component': true, 'p-slidemenu-overlay': popup }"
            [class]="styleClass"
            [ngStyle]="style"
            (click)="onOverlayClick($event)"
            [@overlayAnimation]="{ value: 'visible', params: { showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions } }"
            [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)"
            (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
            *ngIf="!popup || visible"
        >
            <div class="p-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'" [style.width]="menuWidth + 'px'">
                <div #slideMenuContent class="p-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [index]="0" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <a #backward (keydown.enter)="onBackwardKeydown($event)" (keydown.space)="onBackwardKeydown($event)" class="p-slidemenu-backward p-menuitem-link" tabindex="0" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <CaretLeftIcon *ngIf="!backIconTemplate" [styleClass]="'p-slidemenu-backward-icon'" />
                    <ng-template *ngTemplateOutlet="backIconTemplate"></ng-template>
                    <span>{{ backLabel }}</span>
                </a>
            </div>
        </div>
    `,
    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('{{showTransitionParams}}')]), transition(':leave', [animate('{{hideTransitionParams}}', style({ opacity: 0 }))])])],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./slidemenu.css'],
    host: {
        class: 'p-element'
    }
})
export class SlideMenu implements AfterViewChecked, AfterContentInit, OnDestroy {
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
     * Inline style of the element.
     * @group Props
     */
    @Input() style: { [klass: string]: any } | null | undefined;
    /**
     * Class of the element.
     * @group Props
     */
    @Input() styleClass: string | undefined;
    /**
     * Width of the submenus.
     * @group Props
     */
    @Input() menuWidth: number = 190;
    /**
     * Height of the scrollable area, a scrollbar appears if a menu height is longer than this value.
     * @group Props
     */
    @Input() viewportHeight: number = 180;
    /**
     * Duration of the sliding animation in milliseconds.
     * @group Props
     */
    @Input() effectDuration: any = 250;
    /**
     * Easing animation to use for sliding.
     * @group Props
     */
    @Input() easing: string = 'ease-out';
    /**
     * Label of element to navigate back.
     * @group Props
     */
    @Input() backLabel: string = 'Back';
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

    @ContentChildren(PrimeTemplate) templates: QueryList<PrimeTemplate> | undefined;

    containerViewChild: ElementRef | undefined;

    backwardViewChild: ElementRef | undefined;

    slideMenuContentViewChild: ElementRef | undefined;

    documentClickListener: VoidListener;

    documentResizeListener: VoidListener;

    preventDocumentDefault: boolean | undefined;

    scrollHandler: Nullable<ConnectedOverlayScrollHandler>;

    left: number = 0;

    animating: boolean = false;

    target: any;

    visible: boolean | undefined;

    viewportUpdated: boolean | undefined;

    window: Window;

    submenuIconTemplate: TemplateRef<any> | undefined;

    backIconTemplate: TemplateRef<any> | undefined;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        public el: ElementRef,
        public renderer: Renderer2,
        public cd: ChangeDetectorRef,
        public config: PrimeNGConfig,
        public overlayService: OverlayService
    ) {
        this.window = this.document.defaultView as Window;
    }

    ngAfterViewChecked() {
        if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
            this.updateViewPort();
            this.viewportUpdated = true;
        }
    }

    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'backicon':
                    this.backIconTemplate = item.template;
                    break;

                case 'submenuicon':
                    this.submenuIconTemplate = item.template;
                    break;
            }
        });
    }

    @ViewChild('container') set container(element: ElementRef) {
        this.containerViewChild = element;
    }

    @ViewChild('backward') set backward(element: ElementRef) {
        this.backwardViewChild = element;
    }

    @ViewChild('slideMenuContent') set slideMenuContent(element: ElementRef) {
        this.slideMenuContentViewChild = element;
    }

    updateViewPort() {
        this.renderer.setStyle(this.slideMenuContentViewChild?.nativeElement, 'height', this.viewportHeight - DomHandler.getHiddenElementOuterHeight(this.backwardViewChild?.nativeElement) + 'px');
    }

    /**
     * Toggles the visibility of the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    toggle(event: Event) {
        if (this.visible) this.hide();
        else this.show(event);

        this.preventDocumentDefault = true;
    }
    /**
     * Displays the popup menu.
     * @param {Event} event - Browser event.
     * @group Method
     */
    show(event: Event) {
        this.target = event.currentTarget;
        this.visible = true;
        this.preventDocumentDefault = true;
        this.cd.markForCheck();
    }

    onOverlayClick(event: MouseEvent) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }

        this.preventDocumentDefault = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                if (this.popup) {
                    this.updateViewPort();
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.containerViewChild?.nativeElement, this.target);
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
                ZIndexUtils.clear(event.element);
                break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body') this.renderer.appendChild(this.document.body, this.containerViewChild?.nativeElement);
            else DomHandler.appendChild(this.containerViewChild?.nativeElement, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.renderer.appendChild(this.el.nativeElement, this.containerViewChild?.nativeElement);
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.containerViewChild?.nativeElement, this.baseZIndex + this.config.zIndex.menu);
        }
    }

    /**
     * Hides the popup menu.
     * @group Method
     */
    hide() {
        this.visible = false;
        this.cd.markForCheck();
    }

    onWindowResize() {
        if (this.visible && !DomHandler.isTouchDevice()) {
            this.hide();
        }
    }

    goBack() {
        this.left += this.menuWidth;
    }

    onBackwardKeydown(event: KeyboardEvent) {
        this.goBack();

        if (!this.left) {
            setTimeout(() => {
                let focusableElements = DomHandler.getFocusableElements(this.el.nativeElement);

                if (focusableElements && focusableElements.length > 0) {
                    focusableElements[0].focus();
                }
            }, 1);
        }

        event.preventDefault();
    }

    bindDocumentClickListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentClickListener) {
                const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

                this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                    if (!this.preventDocumentDefault) {
                        this.hide();
                        this.cd.detectChanges();
                    }

                    this.preventDocumentDefault = false;
                });
            }
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    }

    bindDocumentResizeListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.documentResizeListener) {
                this.documentResizeListener = this.renderer.listen(this.window, 'resize', this.onWindowResize.bind(this));
            }
        }
    }

    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }

    bindScrollListener() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.scrollHandler) {
                this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                    if (this.visible) {
                        this.hide();
                    }
                });
            }

            this.scrollHandler.bindScrollListener();
        }
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
        this.left = 0;

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

            this.restoreOverlayAppend();
            this.onOverlayHide();
        }
    }
}

@NgModule({
    imports: [CommonModule, RouterModule, TooltipModule, SharedModule, CaretLeftIcon, CaretRightIcon, AngleRightIcon],
    exports: [SlideMenu, RouterModule, TooltipModule, SharedModule],
    declarations: [SlideMenu, SlideMenuSub]
})
export class SlideMenuModule {}
