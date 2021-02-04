import {NgModule,Component,Input,ChangeDetectorRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {trigger,state,style,transition,animate} from '@angular/animations';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {RouterModule} from '@angular/router';

export class BasePanelMenuItem {

    constructor(private ref: ChangeDetectorRef) {}
        
    handleClick(event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        
        item.expanded = !item.expanded;
        this.ref.detectChanges();
        
        if (!item.url) {
            event.preventDefault();
        }
                   
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
    }
}

@Component({
    selector: 'p-panelMenuSub',
    template: `
        <ul [ngClass]="{'p-submenu-list': true, 'p-panelmenu-root-submenu': root}" [@submenu]="expanded ? {value: 'visible', params: {transitionParams: transitionOptions, height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}" role="tree">
            <ng-template ngFor let-child [ngForOf]="item.items">
                <li *ngIf="child.separator" class="p-menu-separator" role="separator">
                <li *ngIf="!child.separator" class="p-menuitem" [ngClass]="child.styleClass" [class.p-hidden]="child.visible === false" [ngStyle]="child.style">
                    <a *ngIf="!child.routerLink" [attr.href]="child.url" class="p-menuitem-link" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id"
                        [ngClass]="{'p-disabled':child.disabled}" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title">
                        <span class="p-panelmenu-icon pi pi-fw" [ngClass]="{'pi-angle-right':!child.expanded,'pi-angle-down':child.expanded}" *ngIf="child.items"></span>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlLabel">{{child.label}}</span>
                        <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                    </a>
                    <a *ngIf="child.routerLink" [routerLink]="child.routerLink" [queryParams]="child.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="child.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" 
                        [ngClass]="{'p-disabled':child.disabled}" [attr.tabindex]="!item.expanded ? null : child.disabled ? null : '0'" [attr.id]="child.id" role="treeitem" [attr.aria-expanded]="child.expanded"
                        (click)="handleClick($event,child)" [attr.target]="child.target" [attr.title]="child.title"
                        [fragment]="child.fragment" [queryParamsHandling]="child.queryParamsHandling" [preserveFragment]="child.preserveFragment" [skipLocationChange]="child.skipLocationChange" [replaceUrl]="child.replaceUrl" [state]="child.state">
                        <span class="p-panelmenu-icon pi pi-fw" [ngClass]="{'pi-angle-right':!child.expanded,'pi-angle-down':child.expanded}" *ngIf="child.items"></span>
                        <span class="p-menuitem-icon" [ngClass]="child.icon" *ngIf="child.icon"></span>
                        <span class="p-menuitem-text" *ngIf="child.escape !== false; else htmlRouteLabel">{{child.label}}</span>
                        <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="child.label"></span></ng-template>
                    </a>
                    <p-panelMenuSub [item]="child" [expanded]="child.expanded" [transitionOptions]="transitionOptions" *ngIf="child.items"></p-panelMenuSub>
                </li>
            </ng-template>
        </ul>
    `,
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({overflow: 'hidden'}), animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class PanelMenuSub extends BasePanelMenuItem {
    
    @Input() item: MenuItem;
    
    @Input() expanded: boolean;

    @Input() transitionOptions: string;

    @Input() root: boolean;

    constructor(ref: ChangeDetectorRef) {
        super(ref);
    }
}

@Component({
    selector: 'p-panelMenu',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-panelmenu p-component'">
            <ng-container *ngFor="let item of model;let f=first;let l=last;">
                <div class="p-panelmenu-panel" [ngClass]="{'p-hidden': item.visible === false}">
                    <div [ngClass]="{'p-component p-panelmenu-header':true, 'p-highlight':item.expanded,'p-disabled':item.disabled}" [class]="item.styleClass" [ngStyle]="item.style">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url" (click)="handleClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'" [attr.id]="item.id"
                           [attr.target]="item.target" [attr.title]="item.title" class="p-panelmenu-header-link" [attr.aria-expanded]="item.expanded" [attr.id]="item.id + '_header'" [attr.aria-controls]="item.id +'_content'">
                            <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                           (click)="handleClick($event,item)" [attr.target]="item.target" [attr.title]="item.title" class="p-panelmenu-header-link" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                           [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.items" class="p-panelmenu-icon pi" [ngClass]="{'pi-chevron-right':!item.expanded,'pi-chevron-down':item.expanded}"></span>
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </a>
                    </div>
                    <div *ngIf="item.items" class="p-toggleable-content" [@rootItem]="item.expanded ? {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*'}} : {value: 'hidden', params: {transitionParams: transitionOptions, height: '0'}}"  (@rootItem.done)="onToggleDone()">
                        <div class="p-panelmenu-content" role="region" [attr.id]="item.id +'_content' " [attr.aria-labelledby]="item.id +'_header'">
                            <p-panelMenuSub [item]="item" [expanded]="true" [transitionOptions]="transitionOptions" [root]="true"></p-panelMenuSub>
                        </div>
                    </div>
                </div>
            </ng-container>
        </div>
    `,
    animations: [
        trigger('rootItem', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible <=> hidden', [style({overflow: 'hidden'}), animate('{{transitionParams}}')]),
            transition('void => *', animate(0))
        ])
    ],
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./panelmenu.css']
})
export class PanelMenu extends BasePanelMenuItem {
    
    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;

    @Input() multiple: boolean = true;

    @Input() transitionOptions: string = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
    
    public animating: boolean;

    constructor(ref: ChangeDetectorRef) {
        super(ref);
    }
                
    collapseAll() {
    	for(let item of this.model) {
    		if (item.expanded) {
    			item.expanded = false;
    		}
    	}
    }

    handleClick(event, item) {
    	if (!this.multiple) {
            for(let modelItem of this.model) {
        		if (item !== modelItem && modelItem.expanded) {
        			modelItem.expanded = false;
        		}
        	}
    	}
        
        this.animating = true;
        super.handleClick(event, item);
    }
    
    onToggleDone() {
        this.animating = false;
    }

}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [PanelMenu,RouterModule],
    declarations: [PanelMenu,PanelMenuSub]
})
export class PanelMenuModule { }
