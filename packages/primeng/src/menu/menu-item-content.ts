import { isPlatformBrowser, NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, output, Pipe, PipeTransform, PLATFORM_ID, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenuItem, SharedModule } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { BindModule } from 'primeng/bind';
import { Ripple } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItemTemplateContext } from 'primeng/types/menu';
import { MenuStyle } from './style/menustyle';
import type { Menu } from './menu';
import { MENU_INSTANCE } from './menu-token';

@Pipe({
    name: 'safeHtml',
    standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
    private platformId = inject(PLATFORM_ID);
    private sanitizer = inject(DomSanitizer);

    public transform(value: string): SafeHtml {
        if (!value || !isPlatformBrowser(this.platformId)) {
            return value;
        }

        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

@Component({
    selector: '[pMenuItemContent]',
    standalone: true,
    imports: [NgTemplateOutlet, RouterModule, Ripple, TooltipModule, BadgeModule, SharedModule, SafeHtmlPipe, BindModule],
    template: `
        @let _item = item();
        <div [class]="cx('itemContent')" (click)="onItemClick($event, _item)" [attr.data-pc-section]="'content'" [pBind]="getPTOptions('itemContent')">
            @if (!itemTemplate()) {
                @if (!_item?.routerLink) {
                    <a
                        [attr.title]="_item?.title"
                        [attr.href]="_item?.url || null"
                        [attr.data-automationid]="_item?.automationId"
                        [attr.tabindex]="-1"
                        [class]="cn(cx('itemLink'), _item?.linkClass)"
                        [style]="_item?.linkStyle"
                        [target]="_item?.target"
                        [pBind]="getPTOptions('itemLink')"
                        pRipple
                    >
                        <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: _item }"></ng-container>
                    </a>
                } @else {
                    <a
                        [routerLink]="_item?.routerLink"
                        [attr.data-automationid]="_item?.automationId"
                        [attr.tabindex]="-1"
                        [attr.title]="_item?.title"
                        [queryParams]="_item?.queryParams"
                        routerLinkActive="p-menu-item-link-active"
                        [routerLinkActiveOptions]="getRouterLinkActiveOptions(_item)"
                        [class]="cn(cx('itemLink'), _item?.linkClass)"
                        [style]="_item?.linkStyle"
                        [target]="_item?.target"
                        [fragment]="_item?.fragment"
                        [queryParamsHandling]="_item?.queryParamsHandling"
                        [preserveFragment]="_item?.preserveFragment"
                        [skipLocationChange]="_item?.skipLocationChange"
                        [replaceUrl]="_item?.replaceUrl"
                        [state]="_item?.state"
                        [pBind]="getPTOptions('itemLink')"
                        pRipple
                    >
                        <ng-container *ngTemplateOutlet="itemContent; context: { $implicit: _item }"></ng-container>
                    </a>
                }
            } @else {
                <ng-container *ngTemplateOutlet="itemTemplate(); context: { $implicit: _item }"></ng-container>
            }

            <ng-template #itemContent>
                @if (_item?.icon) {
                    <span [class]="cn(cx('itemIcon', { item: _item }), _item?.iconClass)" [pBind]="getPTOptions('itemIcon')" [style]="_item?.iconStyle" [attr.data-pc-section]="'itemicon'"></span>
                }
                @if (_item?.escape !== false) {
                    <span [class]="cn(cx('itemLabel'), _item?.labelClass)" [style]="_item?.labelStyle" [pBind]="getPTOptions('itemLabel')" [attr.data-pc-section]="'itemlabel'">{{ _item?.label }}</span>
                } @else {
                    <span [class]="cn(cx('itemLabel'), _item?.labelClass)" [style]="_item?.labelStyle" [attr.data-pc-section]="'itemlabel'" [innerHTML]="_item?.label | safeHtml" [pBind]="getPTOptions('itemLabel')"></span>
                }
                @if (_item?.badge) {
                    <p-badge [class]="_item?.badgeStyleClass" [value]="_item?.badge" [pt]="getPTOptions('pcBadge')" [unstyled]="unstyled()" />
                }
            </ng-template>
        </div>
    `,
    encapsulation: ViewEncapsulation.None,
    providers: [MenuStyle]
})
export class MenuItemContent extends BaseComponent {
    item = input<MenuItem | undefined>(undefined, { alias: 'pMenuItemContent' });

    itemTemplate = input<TemplateRef<MenuItemTemplateContext> | undefined>();

    menuitemId = input<string>('');

    idx = input<number>(0);

    onMenuItemClick = output<{ originalEvent: Event; item: MenuItem | undefined }>();

    menu = inject<Menu>(MENU_INSTANCE);

    _componentStyle = inject(MenuStyle);

    hostName = 'Menu';

    onItemClick(event: Event, item: MenuItem | undefined) {
        this.onMenuItemClick.emit({ originalEvent: event, item });
    }

    getRouterLinkActiveOptions(item: MenuItem | undefined) {
        return item?.routerLinkActiveOptions || { exact: false };
    }

    getPTOptions(key: string) {
        return this.menu.getPTOptions(key, this.item(), this.idx(), this.menuitemId());
    }
}
