import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AppConfigService } from '../service/appconfigservice';
import Announcement from '../data/news.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private configService: AppConfigService, private router: Router) {
        if(isPlatformBrowser(platformId) && window && process.env.NODE_ENV === 'production'){
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
