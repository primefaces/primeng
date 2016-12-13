import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter,Inject,forwardRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul [ngClass]="{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}" class="ui-menu-list"
            (click)="listClick($event)">
            <template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" (mouseleave)="onItemMouseLeave($event,item)">
                    <a #link [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" 
                        [ngClass]="{'ui-state-hover':link==activeLink&&!child.disabled,'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-contextMenuSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-contextMenuSub>
                </li>
            </template>
        </ul>
    `,
    providers: [DomHandler]
})
export class ContextMenuSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    constructor(public domHandler: DomHandler, public router: Router, @Inject(forwardRef(() => ContextMenu)) public contextMenu: ContextMenu) {}
        
    activeItem: any;
    
    activeLink: any;
            
    onItemMouseEnter(event, item, menuitem) {
        if(menuitem.disabled) {
            return;
        }
        
        this.activeItem = item;
        this.activeLink = item.children[0];
        let nextElement =  item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            this.position(sublist, item);
        }
    }
    
    onItemMouseLeave(event, link) {
        this.activeItem = null;
        this.activeLink = null;
    }
    
    itemClick(event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url||item.routerLink) {
            event.preventDefault();
        }
        
        if(item.command) {
            if(!item.eventEmitter) {
                item.eventEmitter = new EventEmitter();
                item.eventEmitter.subscribe(item.command);
            }
            
            item.eventEmitter.emit({
                originalEvent: event,
                item: item
            });
        }
        
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    }
    
    listClick(event) {
        this.activeItem = null;
        this.activeLink = null;
    }
    
    position(sublist, item) {
        sublist.style.top = '0px';
        sublist.style.left = this.domHandler.getOuterWidth(item.children[0]) + 'px';
    }
}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div [ngClass]="'ui-contextmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-dynamic ui-shadow'" 
            [class]="styleClass" [ngStyle]="style" [style.display]="visible ? 'block' : 'none'">
            <p-contextMenuSub [item]="model" root="root"></p-contextMenuSub>
        </div>
    `,
    providers: [DomHandler]
})
export class ContextMenu implements AfterViewInit,OnDestroy {

    @Input() model: MenuItem[];
    
    @Input() global: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;
    
    visible: boolean;
        
    container: any;
    
    documentClickListener: any;
    
    documentRightClickListener: any;
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer) {}

    ngAfterViewInit() {
        this.container = this.el.nativeElement.children[0];
        
        this.documentClickListener = this.renderer.listenGlobal('body', 'click', () => {
            this.hide();
        });
        
        if(this.global) {
            this.documentRightClickListener = this.renderer.listenGlobal('body', 'contextmenu', (event) => {
                this.show(event);
                event.preventDefault();
            });
        }
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.el.nativeElement);
            else
                this.domHandler.appendChild(this.el.nativeElement, this.appendTo);
        }
    }
        
    show(event?: MouseEvent) {
        this.position(event);
        this.visible = true;
        this.domHandler.fadeIn(this.container, 250);
        
        if(event) {
            event.preventDefault();
        }
    }
    
    hide() {
        this.visible = false;
    }
    
    toggle(event?: MouseEvent) {
        if(this.visible)
            this.hide();
        else
            this.show(event);
    }
    
    position(event?: MouseEvent) {
        if(event) {
            let left = event.pageX;
            let top = event.pageY;
            let width = this.container.offsetParent ? this.container.offsetWidth: this.domHandler.getHiddenElementOuterWidth(this.container);
            let height = this.container.offsetParent ? this.container.offsetHeight: this.domHandler.getHiddenElementOuterHeight(this.container);
            let viewport = this.domHandler.getViewport();
            
            //flip
            if(left + width - document.body.scrollLeft > viewport.width) {
                left -= width;
            }
            
            //flip
            if(top + height - document.body.scrollTop > viewport.height) {
                top -= height;
            }
            
            //fit
            if(left < document.body.scrollLeft) {
                left = document.body.scrollLeft;
            }
            
            //fit
            if(top < document.body.scrollTop) {
                top = document.body.scrollTop;
            }
                
            this.container.style.left = left + 'px';
            this.container.style.top = top + 'px';
        }
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
        
    ngOnDestroy() {
        this.documentClickListener();
        
        if(this.global) {
            this.documentRightClickListener();    
        }

        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
        
        if(this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }

}

@NgModule({
    imports: [CommonModule],
    exports: [ContextMenu],
    declarations: [ContextMenu,ContextMenuSub]
})
export class ContextMenuModule { }