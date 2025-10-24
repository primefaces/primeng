import { AppDesigner } from '@/components/layout/designer/app.designer';
import { AppConfigService } from '@/service/appconfigservice';
import { CarService } from '@/service/carservice';
import { CountryService } from '@/service/countryservice';
import { CustomerService } from '@/service/customerservice';
import { EventService } from '@/service/eventservice';
import { NodeService } from '@/service/nodeservice';
import { PhotoService } from '@/service/photoservice';
import { ProductService } from '@/service/productservice';
import { DOCUMENT, IMAGE_CONFIG } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { afterNextRender, Component, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    template: `<router-outlet></router-outlet> <app-designer />`,
    standalone: true,
    imports: [RouterOutlet, FormsModule, ReactiveFormsModule, HttpClientModule, AppDesigner],
    providers: [
        CarService,
        CountryService,
        EventService,
        NodeService,
        CustomerService,
        PhotoService,
        AppConfigService,
        ProductService,
        {
            provide: IMAGE_CONFIG,
            useValue: {
                disableImageSizeWarning: true,
                disableImageLazyLoadWarning: true
            }
        }
    ]
})
export class AppComponent {
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private renderer: Renderer2,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: any
    ) {
        afterNextRender(() => {
            if (process.env.NODE_ENV === 'production') {
                this.injectScripts();
            }

            this.bindRouteEvents();
        });
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
            }
        });
    }
}
