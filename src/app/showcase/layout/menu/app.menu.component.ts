import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, afterNextRender } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AutoCompleteModule } from '@alamote/primeng/autocomplete';
import { DomHandler } from '@alamote/primeng/dom';
import { StyleClassModule } from '@alamote/primeng/styleclass';
import { Subscription } from 'rxjs';
import { default as MenuData } from 'src/assets/showcase/data/menu.json';
import { AppConfigService } from '../../service/appconfigservice';
import { AppMenuItemComponent } from './app.menuitem.component';

export interface MenuItem {
    name?: string;
    icon?: string;
    children?: MenuItem[];
    routerLink?: string;
    href?: string;
}

@Component({
    selector: 'app-menu',
    template: ` <aside>
        <nav>
            <ol class="layout-menu">
                <li *ngFor="let item of menu; let i = index" app-menuitem [item]="item" [root]="true"></li>
            </ol>
        </nav>
    </aside>`,
    host: {
        class: 'layout-sidebar',
        '[class.active]': 'isActive'
    },
    standalone: true,
    imports: [CommonModule, StyleClassModule, RouterModule, AutoCompleteModule, AppMenuItemComponent]
})
export class AppMenuComponent implements OnDestroy {
    menu!: MenuItem[];

    private routerSubscription: Subscription;

    constructor(private configService: AppConfigService, private el: ElementRef, private router: Router) {
        this.menu = MenuData.data;

        afterNextRender(() => {
            setTimeout(() => {
                this.scrollToActiveItem();
            }, 1);

            this.routerSubscription = this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd && this.configService.state.menuActive) {
                    this.configService.hideMenu();
                    DomHandler.unblockBodyScroll('blocked-scroll');
                }
            });
        });
    }

    get isActive(): boolean {
        return this.configService.state.menuActive;
    }

    scrollToActiveItem() {
        let activeItem = DomHandler.findSingle(this.el.nativeElement, '.router-link-active');
        if (activeItem && !this.isInViewport(activeItem)) {
            activeItem.scrollIntoView({ block: 'center' });
        }
    }

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || (document.documentElement.clientHeight && rect.right <= (window.innerWidth || document.documentElement.clientWidth)));
    }

    ngOnDestroy() {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
            this.routerSubscription = null;
        }
    }
}
