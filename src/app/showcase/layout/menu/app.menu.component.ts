import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DomHandler } from 'primeng/dom';
import { StyleClassModule } from 'primeng/styleclass';
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
export class AppMenuComponent {
    menu!: MenuItem[];

    constructor(@Inject(PLATFORM_ID) private platformId: any, private configService: AppConfigService, private el: ElementRef) {
        this.menu = MenuData.data;
    }

    get isActive(): boolean {
        return this.configService.state.menuActive;
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                this.scrollToActiveItem();
            }, 1);
        }
    }

    scrollToActiveItem() {
        let activeItem = DomHandler.findSingle(this.el.nativeElement, '.router-link-active');
        if (activeItem && !this.isInViewport(activeItem)) {
            activeItem.scrollIntoView({ block: 'center' });
        }
    }

    isInViewport(element) {
        if (isPlatformBrowser(this.platformId)) {
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || (document.documentElement.clientHeight && rect.right <= (window.innerWidth || document.documentElement.clientWidth)));
        }
    }
}
