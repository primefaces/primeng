import {NgModule,Component,ElementRef,AfterViewChecked,OnDestroy,Input,Renderer2,Inject,forwardRef,ViewChild,Output,EventEmitter,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation, ViewRef} from '@angular/core';
import {trigger,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler, ConnectedOverlayScrollHandler} from 'primeng/dom';
import {MenuItem, OverlayService, PrimeNGConfig} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {ZIndexUtils} from 'primeng/utils';
import {TooltipModule} from 'primeng/tooltip';

@Component({
    selector: 'p-slideMenuSub',
    template: `
        <ul #sublist [ngClass]="{'p-slidemenu-rootlist':root, 'p-submenu-list':!root, 'p-active-submenu': isActive}"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration + 'ms'" [style.transitionTimingFunction]="easing">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="p-menu-separator" [ngClass]="{'p-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listitem [ngClass]="{'p-menuitem':true,'p-menuitem-active':listitem==activeItem,'p-hidden': child.visible === false}" pTooltip [tooltipOptions]="child.tooltipOptions"
                    [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" (keydown)="onItemKeyDown($event)"  [attr.href]="child.url" class="p-menuitem-link" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" [attr.tabindex]="child.disabled || !isActive ? null : '0'"
                        (click)="itemClick($event, child, listitem)">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-fw pi-angle-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" (keydown)="onItemKeyDown($event)"  [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'"
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url" class="p-menuitem-link"
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id" [attr.tabindex]="child.disabled || !isActive ? null : '0'"
                        [ngClass]="{'p-disabled':child.disabled}"
                        (click)="itemClick($event, child, listitem)"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                        <span class="p-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-slideMenuSub class="p-submenu" [item]="child" [index]="index + 1" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    encapsulation: ViewEncapsulation.None,
    host: {
        'class': 'p-element'
    }
})
export class SlideMenuSub implements OnDestroy {

    @Input() item: MenuItem;

    @Input() root: boolean;

    @Input() backLabel: string = 'Back';

    @Input() menuWidth: number;

    @Input() effectDuration: any;

    @Input() easing: string = 'ease-out';

    @Input() index: number;

    @ViewChild('sublist') sublistViewChild: ElementRef;

    slideMenu: SlideMenu;

    transitionEndListener: any;

    constructor(@Inject(forwardRef(() => SlideMenu)) slideMenu) {
        this.slideMenu = slideMenu as SlideMenu;
    }
    activeItem: any;

    itemClick(event, item: MenuItem, listitem: any) {
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
            setTimeout(() => this.slideMenu.animating = false, this.effectDuration);
        }

        if (!item.items && this.slideMenu.popup) {
            this.slideMenu.hide();
        }
    }

    focusNextList(listitem) {
        if (!this.slideMenu.animating) {
            let focusableElements = DomHandler.getFocusableElements(listitem);

            if (focusableElements && focusableElements.length > 0) {
                focusableElements[0].focus();
            }

            this.unbindTransitionEndListener();
        }
    }

    onItemKeyDown(event) {
        let listItem = event.currentTarget.parentElement;

        switch (event.code) {
            case 'Space':
            case 'Enter':
                if (listItem && !DomHandler.hasClass(listItem, 'p-disabled')) {
                    listItem.children[0].click();
                    this.transitionEndListener = this.focusNextList.bind(this,listItem);
                    this.sublistViewChild.nativeElement.addEventListener('transitionend', this.transitionEndListener);
                }

                event.preventDefault();
            break;

            default:
            break;
        }
    }

    unbindTransitionEndListener() {
        if (this.transitionEndListener && this.sublistViewChild) {
            this.sublistViewChild.nativeElement.removeEventListener('transitionend', this.transitionEndListener);
            this.transitionEndListener = null;
        }
    }

    ngOnDestroy() {
        this.activeItem = null;
        this.unbindTransitionEndListener();
    }

    get isActive() {
        return -this.slideMenu.left == (this.index * this.menuWidth)
    }
}

@Component({
    selector: 'p-slideMenu',
    template: `
        <div #container [ngClass]="{'p-slidemenu p-component':true, 'p-slidemenu-overlay':popup}"
            [class]="styleClass" [ngStyle]="style" (click)="onOverlayClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true"
            (@overlayAnimation.start)="onOverlayAnimationStart($event)" (@overlayAnimation.done)="onOverlayAnimationEnd($event)" *ngIf="!popup || visible">
            <div class="p-slidemenu-wrapper" [style.height]="left ? viewportHeight + 'px' : 'auto'" [style.width]="menuWidth + 'px'">
                <div #slideMenuContent class="p-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [index]="0" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <a #backward (keydown.enter)="onBackwardKeydown($event)" (keydown.space)="onBackwardKeydown($event)" class="p-slidemenu-backward p-menuitem-link" tabindex="0" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="p-slidemenu-backward-icon pi pi-fw pi-caret-left"></span><span>{{backLabel}}</span>
                </a>
            </div>
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
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./slidemenu.css'],
    host: {
        'class': 'p-element'
    }
})
export class SlideMenu implements AfterViewChecked, OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @Input() menuWidth: number = 190;

    @Input() viewportHeight: number = 180;

    @Input() effectDuration: any = 250;

    @Input() easing: string = 'ease-out';

    @Input() backLabel: string = 'Back';

    @Input() appendTo: any;

    @Input() autoZIndex: boolean = true;

    @Input() baseZIndex: number = 0;

    @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

    @Input() hideTransitionOptions: string = '.1s linear';

    @Output() onShow: EventEmitter<any> = new EventEmitter();

    @Output() onHide: EventEmitter<any> = new EventEmitter();

    containerViewChild: ElementRef;

    backwardViewChild: ElementRef;

    slideMenuContentViewChild: ElementRef;

    documentClickListener: any;

    documentResizeListener: any;

    preventDocumentDefault: boolean;

    scrollHandler: any;

    left: number = 0;

    animating: boolean = false;

    target: any;

    visible: boolean;

    viewportUpdated: boolean;

    constructor(public el: ElementRef, public renderer: Renderer2, public cd: ChangeDetectorRef, public config: PrimeNGConfig, public overlayService: OverlayService) {}

    ngAfterViewChecked() {
        if (!this.viewportUpdated && !this.popup && this.containerViewChild) {
            this.updateViewPort();
            this.viewportUpdated = true;
        }
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
        this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - DomHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
    }

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
        this.cd.markForCheck();
    }

    onOverlayClick(event) {
        if (this.popup) {
            this.overlayService.add({
                originalEvent: event,
                target: this.el.nativeElement
            });
        }

        this.preventDocumentDefault = true;
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                if (this.popup) {
                    this.updateViewPort();
                    this.moveOnTop();
                    this.onShow.emit({});
                    this.appendOverlay();
                    DomHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
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
        switch(event.toState) {
            case 'void':
                ZIndexUtils.clear(event.element);
            break;
        }
    }

    appendOverlay() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                DomHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }

    moveOnTop() {
        if (this.autoZIndex) {
            ZIndexUtils.set('menu', this.containerViewChild.nativeElement, this.baseZIndex + this.config.zIndex.menu);
        }
    }

    hide() {
        this.visible = false;
        this.cd.markForCheck();
    }

    onWindowResize() {
        this.hide();
    }

    goBack() {
        this.left += this.menuWidth;
    }

    onBackwardKeydown(event) {
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
        if (!this.documentClickListener) {
            const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

            this.documentClickListener = this.renderer.listen(documentTarget, 'click', () => {
                if (!this.preventDocumentDefault) {
                    this.hide();
                    this.cd.detectChanges();
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

    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.target, () => {
                if (this.visible) {
                    this.hide();
                }
            });
        }

        this.scrollHandler.bindScrollListener();
    }

    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }

    onOverlayHide() {
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
    imports: [CommonModule,RouterModule,TooltipModule],
    exports: [SlideMenu,RouterModule,TooltipModule],
    declarations: [SlideMenu,SlideMenuSub]
})
export class SlideMenuModule { }
