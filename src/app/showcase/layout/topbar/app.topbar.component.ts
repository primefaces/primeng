import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import docsearch from '@docsearch/js';
import { StyleClassModule } from 'primeng/styleclass';
import Versions from '../../data/versions.json';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-topbar',
    standalone: true,
    templateUrl: './app.topbar.component.html',
    imports: [CommonModule, FormsModule, StyleClassModule, RouterModule]
})
export class AppTopBarComponent implements OnInit, OnDestroy {
    @Input() showConfigurator = true;

    @Input() showMenuButton = true;

    @Output() onDarkModeSwitch = new EventEmitter<any>();

    versions: any[] = Versions;

    scrollListener: VoidFunction | null;

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, private el: ElementRef, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private router: Router, private configService: AppConfigService) {
        this.window = this.document.defaultView as Window;
    }

    get isDarkMode() {
        return this.configService.config.darkMode;
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.bindScrollListener();
            this.initDocSearch();
        }
    }

    showMenu() {
        this.configService.showMenu();
    }

    showConfig() {
        this.configService.showConfig();
    }

    toggleDarkMode() {
        this.onDarkModeSwitch.emit(null);
    }

    initDocSearch() {
        docsearch({
            appId: 'XG1L2MUWT9',
            apiKey: '6057fe1af77fee4e7e41907b0b3ec79d',
            indexName: 'primeng',
            container: '#docsearch',
            transformItems: this.handleDocSearchTransformItems.bind(this)
        });
    }

    handleDocSearchTransformItems(results) {
        const valid = process.env.NODE_ENV !== 'production';
        return results.map((result) => {
            if (valid) {
                const url = new URL(result.url);

                url.protocol = this.window.location.protocol;
                url.hostname = this.window.location.hostname;
                url.port = this.window.location.port;
                result.url = url.toString();
            }

            return result;
        });
    }

    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = this.renderer.listen(this.window, 'scroll', () => {
                if (this.window.scrollY > 0) {
                    this.el.nativeElement.children[0].classList.add('layout-topbar-sticky');
                } else {
                    this.el.nativeElement.children[0].classList.remove('layout-topbar-sticky');
                }
            });
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindScrollListener();
    }
}
