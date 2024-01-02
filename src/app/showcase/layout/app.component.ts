import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, Renderer2, afterNextRender } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Theme } from '../domain/theme';
import { LandingComponent } from '../pages/landing/landing.component';
import { AppConfigService } from '../service/appconfigservice';
import { CarService } from '../service/carservice';
import { CountryService } from '../service/countryservice';
import { CustomerService } from '../service/customerservice';
import { EventService } from '../service/eventservice';
import { IconService } from '../service/iconservice';
import { NodeService } from '../service/nodeservice';
import { PhotoService } from '../service/photoservice';
import { ProductService } from '../service/productservice';
import { AppMainComponent } from './app.main.component';
import { AppConfigComponent } from './config/app.config.component';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppNewsComponent } from './news/app.news.component';
import { AppTopBarComponent } from './topbar/app.topbar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    standalone: true,
    imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, AppMainComponent, LandingComponent, AppNewsComponent, AppConfigComponent, AppTopBarComponent, AppMenuComponent],
    providers: [CarService, CountryService, EventService, NodeService, IconService, CustomerService, PhotoService, AppConfigService, ProductService]
})
export class AppComponent implements OnDestroy {
    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private primeng: PrimeNGConfig, private configService: AppConfigService, private router: Router, @Inject(PLATFORM_ID) private platformId: any) {
        afterNextRender(() => {
            if (process.env.NODE_ENV === 'production') {
                this.injectScripts();
            }

            this.bindRouteEvents();
        });
    }

    themeChangeSubscription: Subscription;
    theme

    ngOnInit(): void {
        this.primeng.ripple = true;

        this.themeChangeSubscription = this.configService.themeChange$.subscribe((theme: Theme) => {
            this.switchTheme(theme);
            console.log("ds")
            
        });
        if (isPlatformBrowser(this.platformId)) {
          if(this.configService.getAppState()==="true"){
            this.switchThemeByLocalStorage()
            
          }
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

    bindRouteEvents() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                if (typeof window['gtag'] === 'function') {
                    window['gtag']('event', 'page_view', {
                        page_path: event.urlAfterRedirects
                    });
                }

                const { theme, darkMode } = this.configService.config;
                const landingTheme = darkMode ? 'lara-dark-blue' : 'lara-light-blue';
                if (event.urlAfterRedirects === '/' && theme !== landingTheme) {
                    this.switchTheme({ name: landingTheme, dark: darkMode });
                }
            }
        });
    }
    switchThemeByLocalStorage() {
        const id = 'theme-link';
        const linkElement = <HTMLLinkElement>this.document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(this.configService.config.theme, "lara-dark-blue"));
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
            this.configService.updateConfig({
                theme: "lara-dark-blue",
                darkMode: true
            });
        });
    }
    switchTheme(theme: Theme) {
        const id = 'theme-link';
        const linkElement = <HTMLLinkElement>this.document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(this.configService.config.theme, theme.name));
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
            this.configService.updateConfig({
                theme: theme.name,
                darkMode: theme.dark
            });
            this.configService.completeThemeChange(theme);
            this.configService.setAppState(theme.dark);
        });
    }

    ngOnDestroy() {
        if (this.themeChangeSubscription) {
            this.themeChangeSubscription.unsubscribe();
        }
    }
}
