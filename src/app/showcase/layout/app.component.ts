import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AppConfigService } from '../service/appconfigservice';
import Announcement from '../data/news.json';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarService } from '../service/carservice';
import { CountryService } from '../service/countryservice';
import { CustomerService } from '../service/customerservice';
import { EventService } from '../service/eventservice';
import { IconService } from '../service/iconservice';
import { NodeService } from '../service/nodeservice';
import { PhotoService } from '../service/photoservice';
import { ProductService } from '../service/productservice';
import { AppMainComponent } from './app.main.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { AppNewsComponent } from './news/app.news.component';
import { AppConfigComponent } from './config/app.config.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { LandingComponent } from '../pages/landing/landing.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, AppMainComponent, LandingComponent, AppNewsComponent, AppConfigComponent, AppTopBarComponent, AppMenuComponent],
    providers: [CarService, CountryService, EventService, NodeService, IconService, CustomerService, PhotoService, AppConfigService, ProductService]
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private configService: AppConfigService, private router: Router) {
        if (isPlatformBrowser(platformId) && window && process.env.NODE_ENV === 'production') {
            this.injectScripts();
        }
        this.handleRouteEvents();
    }

    public subscription: Subscription;

    public announcement: any = Announcement;

    public newsActive: boolean;

    storageKey = 'primeng';

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const itemString = localStorage.getItem(this.storageKey);
            if (itemString) {
                const item = JSON.parse(itemString);
                if (item.hiddenNews && item.hiddenNews !== Announcement.id) {
                    this.newsActive = true;
                }
            } else {
                this.newsActive = true;
            }
        }
    }

    onNewsClose() {
        if (isPlatformBrowser(this.platformId)) {
            this.newsActive = false;

            const item = {
                hiddenNews: this.announcement.id
            };

            localStorage.setItem(this.storageKey, JSON.stringify(item));
        }
    }

    injectScripts() {
        const script = this.renderer.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-W297P962XH';
        this.renderer.appendChild(this.document.body, script);

        const scriptBody = this.renderer.createElement('script');
        scriptBody.type = 'text/javascript';
        scriptBody.text = `
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
    
          gtag('config', 'G-W297P962XH');
        `;
        this.renderer.appendChild(this.document.body, scriptBody);
    }

    handleRouteEvents() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (typeof window['gtag'] === 'function') {
                    window['gtag']('event', 'page_view', {
                        page_path: event.urlAfterRedirects
                    });
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
