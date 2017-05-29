import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer2,EventEmitter,Inject,forwardRef,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Location} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-contextMenuSub',
    template: `
        <ul [ngClass]="{'ui-helper-reset':root, 'ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-child ui-shadow':!root}" class="ui-menu-list"
            (click)="listClick($event)">
            <ng-template ngFor let-child [ngForOf]="(root ? item : item.items)">
                <li #item [ngClass]="{'ui-menuitem ui-widget ui-corner-all':true,'ui-menu-parent':child.items,'ui-menuitem-active':item==activeItem}"
                    (mouseenter)="onItemMouseEnter($event,item,child)" (mouseleave)="onItemMouseLeave($event,item)" [style.display]="child.visible === false ? 'none' : 'block'">
                    <a *ngIf="!child.routerLink" [href]="child.url||'#'" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="ui-menuitem-link ui-corner-all" [attr.target]="child.target"
                        [ngClass]="{'ui-state-disabled':child.disabled}" (click)="itemClick($event, child)">
                        <span class="ui-submenu-icon fa fa-fw fa-caret-right" *ngIf="child.items"></span>
                        <span class="ui-menuitem-icon fa fa-fw" *ngIf="child.icon" [ngClass]="child.icon"></span>
                        <span class="ui-menuitem-text">{{child.label}}</span>
                    </a>
                    <p-contextMenuSub class="ui-submenu" [item]="child" *ngIf="child.items"></p-contextMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    providers: [DomHandler]
})
export class ContextMenuSub {

    @Input() item: MenuItem;
    
    @Input() root: boolean;
    
    constructor(public domHandler: DomHandler, @Inject(forwardRef(() => ContextMenu)) public contextMenu: ContextMenu) {}
        
    activeItem: any;

    containerLeft: any;
                
    onItemMouseEnter(event, item, menuitem) {
        if(menuitem.disabled) {
            return;
        }
        
        this.activeItem = item;
        let nextElement =  item.children[0].nextElementSibling;
        if(nextElement) {
            let sublist = nextElement.children[0];
            sublist.style.zIndex = ++DomHandler.zindex;
            this.position(sublist, item);
        }
    }
    
    onItemMouseLeave(event, link) {
        this.activeItem = null;
    }
    
    itemClick(event, item: MenuItem) {
        if(item.disabled) {
            event.preventDefault();
            return;
        }
        
        if(!item.url) {
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
    }
    
    listClick(event) {
        this.activeItem = null;
    }
    
    position(sublist, item) {
        this.containerLeft = this.domHandler.getOffset(item.parentElement)
        let viewport = this.domHandler.getViewport();
        let sublistWidth = sublist.offsetParent ? sublist.offsetWidth: this.domHandler.getHiddenElementOuterWidth(sublist);
        let itemOuterWidth = this.domHandler.getOuterWidth(item.children[0]);

        sublist.style.top = '0px';

        if((parseInt(this.containerLeft.left) + itemOuterWidth + sublistWidth) > (viewport.width - this.calculateScrollbarWidth())) {
            sublist.style.left = -sublistWidth + 'px';
        }
        else {
            sublist.style.left = itemOuterWidth + 'px';
        }
    }

    calculateScrollbarWidth(): number {
        let scrollDiv = document.createElement("div");
        scrollDiv.className = "ui-scrollbar-measure";
        document.body.appendChild(scrollDiv);

        let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        
        return scrollbarWidth;
    }
}

@Component({
    selector: 'p-contextMenu',
    template: `
        <div #container [ngClass]="'ui-contextmenu ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix ui-menu-dynamic ui-shadow'" 
            [class]="styleClass" [ngStyle]="style" [style.display]="visible ? 'block' : 'none'">
            <p-contextMenuSub [item]="model" root="root"></p-contextMenuSub>
        </div>
    `,
    providers: [DomHandler]
})
export class ContextMenu implements AfterViewInit,OnDestroy {

    @Input() model: MenuItem[];
    
    @Input() global: boolean;
    
    @Input() target: any;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    container: HTMLDivElement;
    
    visible: boolean;
            
    documentClickListener: any;
    
    rightClickListener: any;
        
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer2) {}

    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        
        this.documentClickListener = this.renderer.listen('document', 'click', () => {
            this.hide();
        });
        
        if(this.global) {
            this.rightClickListener = this.renderer.listen('document', 'contextmenu', (event) => {
                this.show(event);
                event.preventDefault();
            });
        }
        else if(this.target) {
            this.rightClickListener = this.renderer.listen(this.target, 'contextmenu', (event) => {
                this.show(event);
                event.preventDefault();
                event.stopPropagation();
            });
        }
        
        if(this.appendTo) {
            if(this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                this.domHandler.appendChild(this.container, this.appendTo);
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
            let left = event.pageX + 1;
            let top = event.pageY + 1;
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
        if(this.documentClickListener) {
            this.documentClickListener();
        }
        
        if(this.rightClickListener) {
            this.rightClickListener();
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
    imports: [CommonModule,RouterModule],
    exports: [ContextMenu,RouterModule],
    declarations: [ContextMenu,ContextMenuSub]
})
export class ContextMenuModule { }