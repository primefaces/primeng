import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter,Inject,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'p-slideMenuSub',
    template: `
        <ul [ngClass]="{'ui-helper-reset ui-menu-rootlist':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child':!root}" class="ui-menu-list"
            [style.width.px]="menuWidth" [style.left.px]="root ? slideMenu.left : slideMenu.menuWidth" 
            [style.transitionProperty]="root ? 'left' : 'none'" [style.transitionDuration]="effectDuration" [style.transitionTimingFunction]="easing">
            <template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #listitem [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':listitem==activeItem}">
                    <a #link [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                        [ngClass]="{'ui-state-hover':link==hoveredLink&&!child.disabled,'ui-menuitem-link-parent':child.items,'ui-state-disabled':child.disabled}" 
                        (click)="itemClick($event, child, listitem)" (mouseenter)="hoveredLink=link" (mouseleave)="hoveredLink=null">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-slideMenuSub class="ui-submenu" [item]="child" [menuWidth]="menuWidth" *ngIf="child.items"></p-slideMenuSub>
                </li>
            </template>
        </ul>
    `
})
export class SlideMenuSub implements OnDestroy {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    @Input() backLabel: string = 'Back';
    
    @Input() menuWidth: string;
    
    @Input() effectDuration: any = '1s';
        
    @Input() easing: string = 'ease-out';
        
    constructor(@Inject(forwardRef(() => SlideMenu)) protected slideMenu: SlideMenu, protected router: Router) {}
    
    activeItem: any;
        
    hoveredLink: any;
                
    itemClick(event, item: MenuItem, listitem: any) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url||item.routerLink) {
            event.preventDefault();
        }
        
        this.activeItem = listitem;
        
        if(item.command) {
            if(!item.eventEmitter && item.command) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
        
        if(item.items) {
            this.slideMenu.left -= this.slideMenu.menuWidth;
        }
        
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    }
        
    ngOnDestroy() {
        this.hoveredLink = null;
        this.activeItem = null;
    }
}

@Component({
    selector: 'p-slideMenu',
    template: `
        <div [ngClass]="{'ui-menu ui-slidemenu ui-widget ui-widget-content ui-corner-all':true,'ui-menu-dynamic ui-shadow':popup}" 
            [class]="styleClass" [ngStyle]="style" (click)="onClick($event)">
            <div class="ui-slidemenu-wrapper" [style.height.px]="viewportHeight">
                <div class="ui-slidemenu-content" [style.height.px]="viewportHeight - 30">
                    <p-slideMenuSub [item]="model" root="root" [menuWidth]="menuWidth" [effectDuration]="effectDuration" [easing]="easing"></p-slideMenuSub>
                </div>
                <div class="ui-slidemenu-backward ui-widget-header ui-corner-all" [style.display]="left ? 'block' : 'none'" (click)="goBack()">
                    <span class="fa fa-fw fa-caret-left"></span>{{backLabel}}
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
    
    @Input() menuWidth: number = 180;
    
    @Input() viewportHeight: number = 175;
    
    @Input() effectDuration: any = '500ms';
        
    @Input() easing: string = 'ease-out';
    
    @Input() backLabel: string = 'Back';
    
    protected container: any;
    
    protected documentClickListener: any;
    
    protected preventDocumentDefault: any;
        
    public left: number = 0;
        
    constructor(protected el: ElementRef, protected domHandler: DomHandler, protected renderer: Renderer) {}

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        
        if(this.popup) {
            this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
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
            
        this.preventDocumentDefault = true;
    }
    
    show(event) {
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, event.target);
        this.domHandler.fadeIn(this.container, 250);
    }
    
    hide() {
        this.container.style.display = 'none';
    }

    unsubscribe(item: any) {
        if(item.eventEmitter) {
            item.eventEmitter.unsubscribe();
        }
        
        if(item.items) {
            for(let childItem of item.items) {
                this.unsubscribe(childItem);
            }
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
            this.documentClickListener();
        }
        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [SlideMenu],
    declarations: [SlideMenu,SlideMenuSub]
})
export class SlideMenuModule { }