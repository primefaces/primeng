import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer2,Inject,forwardRef,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/menuitem';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-slideMenuSub',
    template: `
        <ul [ngClass]="{'ui-slidemenu-rootlist':root, 'ui-submenu-list':!root}"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth"
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration + 'ms'" [style.transitionTimingFunction]="easing">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li *ngIf="child.separator" class="ui-menu-separator ui-widget-content">
                <li *ngIf="!child.separator" #listitem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menuitem-active':listitem==activeItem}"
                    [class]="child.styleClass" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" 
                        (click)="itemClick($event, child, listitem)">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'ui-state-active'" 
                        [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                        [attr.target]="child.target" [attr.title]="child.title" [attr.id]="child.id"
                        [ngClass]="{'ui-state-disabled':child.disabled}" 
                        (click)="itemClick($event, child, listitem)">
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                    </a>
                    <p-slideMenuSub class="ui-submenu" [item]="child" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </ng-template>
        </ul>
    `
})
export class SlideMenuSub implements OnDestroy {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    @Input() backLabel: string = 'Back';
    
    @Input() menuWidth: string;
    
    @Input() effectDuration: any;
        
    @Input() easing: string = 'ease-out';
        
    constructor(@Inject(forwardRef(() => SlideMenu)) public slideMenu: SlideMenu) {}
        
    activeItem: any;
                            
    itemClick(event, item: MenuItem, listitem: any) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url) {
            event.preventDefault();
        }
                
        if(item.command) {            
            item.command({
                originalEvent: event,
                item: item
            });
        }
        
        if(item.items && !this.slideMenu.animating) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
            this.activeItem = listitem;
            this.slideMenu.animating = true;
            setTimeout(() => this.slideMenu.animating = false, this.effectDuration);
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
            [class]="styleClass" [ngStyle]="style" (click)="onClick($event)">
            <div class="ui-slidemenu-wrapper" [style.height.px]="viewportHeight">
                <div #slideMenuContent class="ui-slidemenu-content">
                    <p-slideMenuSub [item]="model" root="root" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <div #backward class="ui-slidemenu-backward ui-widget-header ui-corner-all" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="ui-slidemenu-backward-icon fa fa-fw fa-caret-left"></span><span>{{backLabel}}</span>
                </div>
            </div>
        </div>
    `,
    providers: [DomHandler]
})
export class SlideMenu implements AfterViewInit,OnDestroy {

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
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    @ViewChild('backward') backwardViewChild: ElementRef;
    
    @ViewChild('slideMenuContent') slideMenuContentViewChild: ElementRef;
    
    public container: HTMLDivElement;
    
    public backwardElement: HTMLDivElement;
    
    public slideMenuContentElement: HTMLDivElement;
    
    public documentClickListener: any;
    
    public preventDocumentDefault: any;
        
    public left: number = 0;
    
    public animating: boolean = false;
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}

    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        this.backwardElement = <HTMLDivElement> this.backwardViewChild.nativeElement;
        this.slideMenuContentElement = <HTMLDivElement> this.slideMenuContentViewChild.nativeElement;
        this.slideMenuContentElement.style.height = this.viewportHeight - this.domHandler.getHiddenElementOuterHeight(this.backwardElement) + 'px';
        
        if(this.popup) {
            if(this.appendTo) {
                if(this.appendTo === 'body')
                    document.body.appendChild(this.container);
                else
                    this.domHandler.appendChild(this.container, this.appendTo);
            }
            
            this.documentClickListener = this.renderer.listen('document', 'click', () => {
                if(!this.preventDocumentDefault) {
                    this.hide();
                }
                this.preventDocumentDefault = false;
            });
        }
    }
    
    toggle(event) {
        if(this.container.offsetParent)
            this.hide();
        else
            this.show(event);
    }
    
    show(event) {
        this.preventDocumentDefault = true;
        this.moveOnTop();
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    }
    
    hide() {
        this.container.style.display = 'none';
    }

    moveOnTop() {
        if(this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    
    onClick(event) {
        this.preventDocumentDefault = true;
    }
    
    goBack() {
        this.left += this.menuWidth;
    }
        
    ngOnDestroy() {
        if(this.popup) {
            if(this.documentClickListener) {
                this.documentClickListener();
            }
            
            if(this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        }
    }

}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [SlideMenu,RouterModule],
    declarations: [SlideMenu,SlideMenuSub]
})
export class SlideMenuModule { }
