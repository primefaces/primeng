import {NgModule,Component,Input,ContentChildren,QueryList,AfterContentInit,TemplateRef,ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {PrimeTemplate, SharedModule} from 'primeng/api';
import {RouterModule} from '@angular/router';

@Component({
    selector: 'p-tabMenu',
    template: `
        <div [ngClass]="'ui-tabmenu ui-widget ui-widget-content ui-corner-all'" [ngStyle]="style" [class]="styleClass">
            <ul class="ui-tabmenu-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" role="tablist">
                <li *ngFor="let item of model; let i = index" role="tab" [attr.aria-selected]="activeItem==item" [attr.aria-expanded]="activeItem==item"
                    [ngClass]="{'ui-tabmenuitem ui-state-default ui-corner-top':true,'ui-state-disabled':item.disabled,
                        'ui-tabmenuitem-hasicon':item.icon,'ui-state-active':activeItem==item,'ui-helper-hidden': item.visible === false}"
                        [routerLinkActive]="'ui-state-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}">
                    <a *ngIf="!item.routerLink" [attr.href]="item.url" class="ui-menuitem-link ui-corner-all" role="presentation" (click)="itemClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'"
                        [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id">
                        <ng-container *ngIf="!itemTemplate">
                            <span class="ui-menuitem-icon " [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                    </a>
                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" role="presentation" class="ui-menuitem-link ui-corner-all" (click)="itemClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'"
                        [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state">
                        <ng-container *ngIf="!itemTemplate">
                            <span class="ui-menuitem-icon " [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="ui-menuitem-text">{{item.label}}</span>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                    </a>
                </li>
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tabmenu.css']
})
export class TabMenu implements AfterContentInit {

    @Input() model: MenuItem[];

    @Input() activeItem: MenuItem;

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    itemTemplate: TemplateRef<any>;

    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch(item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                break;
                
                default:
                    this.itemTemplate = item.template;
                break;
            }
        });
    }

    itemClick(event: Event, item: MenuItem) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }

        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }

        this.activeItem = item;
    }
}

@NgModule({
    imports: [CommonModule,RouterModule,SharedModule],
    exports: [TabMenu,RouterModule,SharedModule],
    declarations: [TabMenu]
})
export class TabMenuModule { }
