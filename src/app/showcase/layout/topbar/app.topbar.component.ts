import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import docsearch from '@docsearch/js';
import { Subscription } from 'rxjs';
import Versions from '../../data/versions.json';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';
import { FormsModule } from '@angular/forms';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
    selector: 'app-topbar',
    standalone: true,
    templateUrl: './app.topbar.component.html',
    animations: [
        trigger('overlayMenuAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' }))]),
            transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])
        ])
    ],
    imports: [CommonModule, FormsModule, StyleClassModule, RouterModule]
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    @Input() showConfigurator: boolean = true;

    @Input() showMenuButton: boolean = true;

    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('topbarMenu') topbarMenu: ElementRef;

    @ViewChild('containerElement') containerElement: ElementRef;

    activeMenuIndex: number;

    outsideClickListener: VoidFunction | null;

    config: AppConfig;

    subscription: Subscription;

    versions: any[] = Versions;

    scrollListener: VoidFunction | null;

    private window: Window;

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private renderer: Renderer2, private router: Router, private configService: AppConfigService) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe((config) => (this.config = config));

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activeMenuIndex = null;
            }
        });

        if (isPlatformBrowser(this.platformId)) {
            this.bindScrollListener();
            this.initDocSearch();
        }
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
            this.scrollListener = this.renderer.listen(this.window, 'scroll', (event) => {
                if (this.window.scrollY > 0) {
                    this.containerElement.nativeElement.classList.add('layout-topbar-sticky');
                } else {
                    this.containerElement.nativeElement.classList.remove('layout-topbar-sticky');
                }
            });
        }
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick.emit();
        event.preventDefault();
    }

    onConfigButtonClick(event: Event) {
        this.configService.toggleConfig();
        event.preventDefault();
    }

    onDarkModeToggle(event) {
        let newTheme = null;
        let {theme, dark} = this.config
        dark = !dark;

        if (!dark) {
            newTheme = theme.replace('dark', 'light');
        } else {
            if (theme.includes('light') && theme !== 'fluent-light') newTheme = theme.replace('light', 'dark');
            else newTheme = 'lara-dark-teal'; //fallback
        }

        this.configService.changeTheme(event, newTheme, dark)
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.isOutsideTopbarMenuClicked(event)) {
                    this.activeMenuIndex = null;
                }
            });
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }

    toggleMenu(event: Event, index: number) {
        this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
        event.preventDefault();
    }

    isOutsideTopbarMenuClicked(event): boolean {
        return !(this.topbarMenu.nativeElement.isSameNode(event.target) || this.topbarMenu.nativeElement.contains(event.target));
    }

    onOverlayMenuEnter(event: AnimationEvent) {
        switch (event.toState) {
            case 'visible':
                this.bindOutsideClickListener();
                break;

            case 'void':
                this.unbindOutsideClickListener();
                break;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.unbindScrollListener();
    }
}
