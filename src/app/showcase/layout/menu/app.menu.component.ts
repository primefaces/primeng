import { Component, ElementRef, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { default as MenuData } from 'src/assets/showcase/data/menu.json';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';
declare let gtag: Function;

export interface MenuItem {
    name?: string;
    icon?: string;
    children?: MenuItem[];
    routerLink?: string;
    href?: string;
}

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent {
    @Input() active: boolean;

    menu!: MenuItem[];

    config!: AppConfig;

    subscription!: Subscription;

    routeSubscription!: Subscription;

    constructor(private configService: AppConfigService, private el: ElementRef, private router: Router) {
        this.menu = MenuData.data;
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe((config) => (this.config = config));
        this.routeSubscription = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                setTimeout(() => {
                    this.scrollToActiveItem();
                }, 1);
            }
        });
    }

    scrollToActiveItem() {
        let activeItem = DomHandler.findSingle(this.el.nativeElement, '.router-link-active');
        if (activeItem) {
            activeItem.scrollIntoView({ inline: 'start', behavior: 'smooth' });
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }
}
