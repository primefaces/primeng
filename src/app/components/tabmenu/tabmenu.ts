import {NgModule,Component,Input,ContentChildren,QueryList,AfterContentInit,AfterViewInit,AfterViewChecked,TemplateRef,ChangeDetectionStrategy, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {RippleModule} from 'primeng/ripple';
import {PrimeTemplate, SharedModule} from 'primeng/api';
import {RouterModule} from '@angular/router';
import {DomHandler} from 'primeng/dom';

@Component({
    selector: 'p-tabMenu',
    template: `
        <div [ngClass]="'p-tabmenu p-component'" [ngStyle]="style" [class]="styleClass">
            <ul #navbar class="p-tabmenu-nav p-reset" role="tablist">
                <li *ngFor="let item of model; let i = index" role="tab" [attr.aria-selected]="activeItem==item" [attr.aria-expanded]="activeItem==item"
                    [ngClass]="{'p-tabmenuitem':true,'p-disabled':item.disabled,'p-highlight':activeItem==item,'p-hidden': item.visible === false}">
                    <a *ngIf="!item.routerLink" [attr.href]="item.url" class="p-menuitem-link" role="presentation" (click)="itemClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'"
                        [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id" pRipple>
                        <ng-container *ngIf="!itemTemplate">
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlLabel">{{item.label}}</span>
                            <ng-template #htmlLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                    </a>
                    <a *ngIf="item.routerLink" [routerLink]="item.routerLink" [queryParams]="item.queryParams" [routerLinkActive]="'p-menuitem-link-active'" [routerLinkActiveOptions]="item.routerLinkActiveOptions||{exact:false}"
                        role="presentation" class="p-menuitem-link" (click)="itemClick($event,item)" [attr.tabindex]="item.disabled ? null : '0'"
                        [attr.target]="item.target" [attr.title]="item.title" [attr.id]="item.id"
                        [fragment]="item.fragment" [queryParamsHandling]="item.queryParamsHandling" [preserveFragment]="item.preserveFragment" [skipLocationChange]="item.skipLocationChange" [replaceUrl]="item.replaceUrl" [state]="item.state" pRipple>
                        <ng-container *ngIf="!itemTemplate">
                            <span class="p-menuitem-icon" [ngClass]="item.icon" *ngIf="item.icon"></span>
                            <span class="p-menuitem-text" *ngIf="item.escape !== false; else htmlRouteLabel">{{item.label}}</span>
                            <ng-template #htmlRouteLabel><span class="p-menuitem-text" [innerHTML]="item.label"></span></ng-template>
                        </ng-container>
                        <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: item, index: i}"></ng-container>
                    </a>
                </li>
                <li #inkbar class="p-tabmenu-ink-bar"></li>
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./tabmenu.css']
})
export class TabMenu implements AfterContentInit,AfterViewInit,AfterViewChecked {

    @Input() model: MenuItem[];

    @Input() activeItem: MenuItem;

    @Input() popup: boolean;

    @Input() style: any;

    @Input() styleClass: string;

    @ViewChild('navbar') navbar: ElementRef;

    @ViewChild('inkbar') inkbar: ElementRef;

    @ContentChildren(PrimeTemplate) templates: QueryList<any>;

    itemTemplate: TemplateRef<any>;

    tabChanged: boolean;

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

    ngAfterViewInit() {
        this.updateInkBar();
    }

    ngAfterViewChecked() {
        if (this.tabChanged) {
            this.updateInkBar();
            this.tabChanged = false;
        }
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
        this.tabChanged = true;
    }

    updateInkBar() {
        let tabHeader = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
        if (tabHeader) {
            this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
            this.inkbar.nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
        }
    }
}

@NgModule({
    imports: [CommonModule,RouterModule,SharedModule,RippleModule],
    exports: [TabMenu,RouterModule,SharedModule],
    declarations: [TabMenu]
})
export class TabMenuModule { }
