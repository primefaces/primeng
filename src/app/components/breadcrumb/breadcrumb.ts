import {NgModule,Component,Input, Output, EventEmitter,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-breadcrumb',
    template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'p-breadcrumb p-component'">
            <ul>
                <li [class]="home.styleClass" [ngClass]="{'p-breadcrumb-home': true, 'p-disabled':home.disabled}" [ngStyle]="home.style" *ngIf="home">
                    <a *ngIf="!home.routerLink" [href]="home.url ? home.url : null" class="p-menuitem-link" (click)="itemClick($event, home)" 
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                    <a *ngIf="home.routerLink" [routerLink]="home.routerLink" [queryParams]="home.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="home.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, home)" 
                        [attr.target]="home.target" [attr.title]="home.title" [attr.id]="home.id" [attr.tabindex]="home.disabled ? null : '0'"
                        [fragment]="home.fragment" [queryParamsHandling]="home.queryParamsHandling" [preserveFragment]="home.preserveFragment" [skipLocationChange]="home.skipLocationChange" [replaceUrl]="home.replaceUrl" [state]="home.state">
                        <span *ngIf="home.icon" class="p-menuitem-icon" [ngClass]="home.icon||'pi pi-home'"></span>
                        <ng-container *ngIf="home.label">
                            <span *ngIf="home.escape !== false; else htmlHomeRouteLabel" class="p-menuitem-text">{{home.label}}</span>
                            <ng-template #htmlHomeRouteLabel><span class="p-menuitem-text" [innerHTML]="home.label"></span></ng-template>
                        </ng-container>
                    </a>
                </li>
                <li class="p-breadcrumb-chevron pi pi-chevron-right" *ngIf="model&&home"></li>
                <ng-template ngFor let-item let-end="last" [ngForOf]="model">
                    <li [class]="item.styleClass" [ngStyle]="item.style" [ngClass]="{'p-disabled':item.disabled}">
                        <a *ngIf="!item.routerLink" [attr.href]="item.url ? item.url : null" class="p-menuitem-link" (click)="itemClick($event, item)" 
                            [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'">
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlLabel" class="p-menuitem-text">{{item.label}}</span>
                                <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                        <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'"  [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}" class="p-menuitem-link" (click)="itemClick($event, item)" 
                            [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" [attr.tabindex]="item.disabled ? null : '0'"
                            [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                            <span *ngIf="item.icon" class="p-menuitem-icon" [ngClass]="item.icon"></span>
                            <ng-container *ngIf="item.label">
                                <span *ngIf="item.escape !== false; else htmlRouteLabel" class="p-menuitem-text">{{item.label}}</span>
                                <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                            </ng-container>
                        </a>
                    </li>
                    <li class="p-breadcrumb-chevron pi pi-chevron-right" *ngIf="!end"></li>
                </ng-template>
            </ul>
        </div>
    `,
   changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./breadcrumb.css']
})
export class Breadcrumb {

    @Input() model: MenuItem[];

    @Input() style: any;

    @Input() styleClass: string;
    
    @Input() home: MenuItem;

    @Output() onItemClick: EventEmitter<any> = new EventEmitter();
        
    itemClick(event, item: MenuItem) {
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

        this.onItemClick.emit({
            originalEvent: event,
            item: item
        });
    }
    
    onHomeClick(event) {
        if (this.home) {
            this.itemClick(event, this.home);
        }
    }
}

@NgModule({
    imports: [CommonModule,RouterModule],
    exports: [Breadcrumb,RouterModule],
    declarations: [Breadcrumb]
})
export class BreadcrumbModule { }
