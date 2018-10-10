import {NgModule,Component,ElementRef,AfterViewChecked,OnDestroy,Input,Renderer2,Inject,forwardRef,ViewChild} from '@angular/core';
import {trigger,state,style,transition,animate,AnimationEvent} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-slideMenuSub',
    template: `
        <ul [ngClass]="{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root, 'ui-active-submenu': (-slideMenu.left == (index * menuWidth))}"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration + 'ms'" [style.transitionTimingFunction]="easing">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content" [ngClass]="{'ui-helper-hidden': child.visible === false}">
                <li *ngIf="!child.separator" #listitem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem,'ui-helper-hidden': child.visible === false}"
                    [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" 
                        (click)="itemClick($event, child, listitem)">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" 
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" 
                        (click)="itemClick($event, child, listitem)">
                        <span class="ui-menuitem-icon" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon pi pi-fw pi-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-slideMenuSub class="ui-submenu" [item]="child" [index]="index + 1" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `
})
export class SlideMenuSub implements OnDestroy {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    @Input() backLabel: string = 'Back';
    
    @Input() menuWidth: number;
    
    @Input() effectDuration: any;
        
    @Input() easing: string = 'ease-out';

    @Input() index: number;
        
    constructor(@Inject(forwardRef(() => SlideMenu)) public slideMenu: SlideMenu) {}
        
    activeItem: any;
                            
    itemClick(event, item: MenuItem, listitem: any) {
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
        
    ngOnDestroy() {
        this.activeItem = null;
    }
}

@Component({
    selector: 'p-slideMenu',
    template: `
        <div #container [ngClass]="{'ui-slidemenu ui-widget ui-widget-content ui-corner-all':true, 'ui-slidemenu-dynamic ui-shadow':popup}" 
            [class]="styleClass" [ngStyle]="style" (click)="onClick($event)"
            [@overlayAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}" [@.disabled]="popup !== true" (@overlayAnimation.start)="onOverlayAnimationStart($event)" *ngIf="!popup || visible">
            <div class="ui-slidemenu-wrapper" [style.height.px]="viewportHeight">
                <div #slideMenuContent class="ui-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [index]="0" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <div #backward class="ui-slidemenu-backward ui-widget-header ui-corner-all" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="ui-slidemenu-backward-icon pi pi-fw pi-caret-left"></span><span>{{backLabel}}</span>
                </div>
            </div>
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
    
    @Input() showTransitionOptions: string = '225ms ease-out';

    @Input() hideTransitionOptions: string = '195ms ease-in';

    containerViewChild: ElementRef;
    
    backwardViewChild: ElementRef;
    
    slideMenuContentViewChild: ElementRef;
     
    documentClickListener: any;

    documentResizeListener: any;
    
    preventDocumentDefault: boolean;
        
    left: number = 0;
    
    animating: boolean = false;
    
    target: any;

    visible: boolean;

    viewportUpdated: boolean;

    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}

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
        this.slideMenuContentViewChild.nativeElement.style.height = this.viewportHeight - this.domHandler.getHiddenElementOuterHeight(this.backwardViewChild.nativeElement) + 'px';
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
    }

    onOverlayAnimationStart(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                if (this.popup) {
                    this.updateViewPort();
                    this.moveOnTop();
                    this.appendOverlay();
                    this.domHandler.absolutePosition(this.containerViewChild.nativeElement, this.target);
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
                document.body.appendChild(this.containerViewChild.nativeElement);
            else
                this.domHandler.appendChild(this.containerViewChild.nativeElement, this.appendTo);
        }
    }

    restoreOverlayAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.containerViewChild.nativeElement);
        }
    }
    
    moveOnTop() {
        if (this.autoZIndex) {
            this.containerViewChild.nativeElement.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }

    hide() {
        this.visible = false;
    }

    onWindowResize() {
        this.hide();
    }
    
    onClick(event) {
        this.preventDocumentDefault = true;
    }
    
    goBack() {
        this.left += this.menuWidth;
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

    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.preventDocumentDefault = false;
        this.target = null;
        this.left = 0;
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
    exports: [SlideMenu,RouterModule],
    declarations: [SlideMenu,SlideMenuSub]
})
export class SlideMenuModule { }
