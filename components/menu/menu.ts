import {NgModule,Component,ElementRef,AfterViewInit,OnDestroy,Input,Output,Renderer,EventEmitter,ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DomHandler} from '../dom/domhandler';
import {MenuItem} from '../common/api';
import {Router} from '@angular/router';

@Component({
    selector: 'p-menu',
    template: `
        <div #container [ngClass]="{'ui-menu ui-widget ui-widget-content ui-corner-all ui-helper-clearfix':true,'ui-menu-dynamic ui-shadow':popup}" 
            [class]="styleClass" [ngStyle]="style" (click)="preventDocumentDefault=true">
            <ul class="ui-menu-list ui-helper-reset">
                <template ngFor let-submenu [ngForOf]="model" *ngIf="hasSubMenu()">
                    <li class="ui-widget-header ui-corner-all"><h3>{{submenu.label}}</h3></li>
                    <li *ngFor="let item of submenu.items" class="ui-menuitem ui-widget ui-corner-all">
                        <a #link [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" 
                            [ngClass]="{'ui-state-hover':link==hoveredItem&&!item.disabled,'ui-state-disabled':item.disabled}"
                            (mouseenter)="hoveredItem=$event.target" (mouseleave)="hoveredItem=null" (click)="itemClick($event, item)">
                            <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                </template>
                <template ngFor let-item [ngForOf]="model" *ngIf="!hasSubMenu()">
                    <li class="ui-menuitem ui-widget ui-corner-all">
                        <a #link [href]="item.url||'#'" class="ui-menuitem-link ui-corner-all" 
                            [ngClass]="{'ui-state-hover':link==hoveredItem&&!item.disabled,'ui-state-disabled':item.disabled}"
                            (mouseenter)="hoveredItem=$event.target" (mouseleave)="hoveredItem=null" (click)="itemClick($event, item)">
                            <span class="ui-menuitem-icon fa fa-fw" *ngIf="item.icon" [ngClass]="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </a>
                    </li>
                </template>
            </ul>
        </div>
    `,
    providers: [DomHandler]
})
export class Menu implements AfterViewInit,OnDestroy {

    @Input() model: MenuItem[];

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() appendTo: any;
    
    @ViewChild('container') containerViewChild: ElementRef;
    
    container: HTMLDivElement;
    
    documentClickListener: any;
    
    preventDocumentDefault: any;
    
    constructor(public el: ElementRef, public domHandler: DomHandler, public renderer: Renderer, public router: Router) {}

    ngAfterViewInit() {
        this.container = <HTMLDivElement> this.containerViewChild.nativeElement;
        
        if(this.popup) {
            if(this.appendTo) {
                if(this.appendTo === 'body')
                    document.body.appendChild(this.el.nativeElement);
                else
                    this.domHandler.appendChild(this.el.nativeElement, this.appendTo);
            }
                
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
        let target = event.target;
        if(target.parentElement.nodeName == 'BUTTON') {
            target = target.parentElement;
        }
        
        this.container.style.display = 'block';
        this.domHandler.absolutePosition(this.container, target);
        this.domHandler.fadeIn(this.container, 250);
    }
    
    hide() {
        this.container.style.display = 'none';
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
        
        if(this.popup) {
            this.hide();
        }
        
        if(item.routerLink) {
            this.router.navigate(item.routerLink);
        }
    }
    
    ngOnDestroy() {
        if(this.popup) {
            this.documentClickListener();
            
            if(this.appendTo) {
                this.el.nativeElement.appendChild(this.container);
            }
        }
        
        if(this.model) {
            for(let item of this.model) {
                this.unsubscribe(item);
            }
        }
    }
    
    hasSubMenu(): boolean {
        if(this.model) {
            for(var item of this.model) {
                if(item.items) {
                    return true;
                }
            }
        }
        return false;
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
}

@NgModule({
    imports: [CommonModule],
    exports: [Menu],
    declarations: [Menu]
})
export class MenuModule { }