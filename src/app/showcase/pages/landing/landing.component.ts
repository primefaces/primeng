import { CommonModule, DOCUMENT, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import docsearch from '@docsearch/js';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import Versions from '../../data/versions.json';
import { AppComponent } from '../../layout/app.component';
import { AppNewsComponent } from '../../layout/news/app.news.component';
import { AppTopBarComponent } from '../../layout/topbar/app.topbar.component';
import { AppConfigService } from '../../service/appconfigservice';
import { DropdownModule } from 'primeng/dropdown';
import { HeroSectionComponent } from './herosection.component';
import { FeaturesSectionComponent } from './featuressection.component';
import { UsersSectionComponent } from './userssection.component';
import { ThemeSectionComponent } from './themesection.component';
import { BlockSectionComponent } from './blocksection.component';
import { TemplateSectionComponent } from './templatesection.component';
import { FooterSectionComponent } from './footersection.component';

@Component({
    selector: 'landing',
    standalone: true,
    templateUrl: './landing.component.html',
    imports: [
        CommonModule,
        NgOptimizedImage,
        InputSwitchModule,
        ButtonModule,
        RadioButtonModule,
        InputNumberModule,
        TabMenuModule,
        ChartModule,
        ProgressBarModule,
        ChipModule,
        SelectButtonModule,
        SliderModule,
        BadgeModule,
        CalendarModule,
        TableModule,
        RouterModule,
        CheckboxModule,
        DropdownModule,
        AppNewsComponent,
        AppTopBarComponent,
        HeroSectionComponent,
        FeaturesSectionComponent,
        UsersSectionComponent,
        ThemeSectionComponent,
        BlockSectionComponent,
        TemplateSectionComponent,
        FooterSectionComponent
    ],
})
export class LandingComponent implements OnInit {
    @ViewChild('containerElement') containerElement: ElementRef;

    @ViewChild('editor') editor: ElementRef;

    versions: any[] = Versions;

    scrollListener: any;

    tableTheme: string = 'lara-light-blue';

    isNpmCopied: boolean = false;

    user : any = null

    users : any[]

    usersData = [
        { name: 'fox', width: '51', height: '22' },
        { name: 'airbus', width: '87', height: '16' },
        { name: 'mercedes', width: '34', height: '34' },
        { name: 'ford', width: '64', height: '26' },
        { name: 'vw', width: '35', height: '34' },
        { name: 'intel', width: '53', height: '34' },
        { name: 'unicredit', width: '79', height: '18' },
        { name: 'lufthansa', width: '97', height: '18' },
        { name: 'nvidia', width: '86', height: '16' },
        { name: 'verizon', width: '102', height: '18' },
        { name: 'amex', width: '81', height: '30' }
    ];

    private window: Window;

    get landingClass() {
        return {
            'layout-dark': this.isDarkMode,
            'layout-light': !this.isDarkMode,
            'layout-news-active': this.isNewsActive
        };
    }

    get isDarkMode() {
        return this.configService.config.darkMode;
    }

    get isNewsActive() {
        return this.configService.state.newsActive;
    }

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: any,
        private configService: AppConfigService,
        private cd: ChangeDetectorRef,
        public app: AppComponent,
        private metaService: Meta,
        private titleService: Title
    ) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({ name: 'description', content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.' });
        this.changeTableTheme(this.configService.config.darkMode ? 'lara-dark-blue' : 'lara-light-blue');

        if (isPlatformBrowser(this.platformId)) {
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

    copyNpm() {
        navigator.clipboard.writeText('npm i primeng');
        this.isNpmCopied = true;
        setTimeout(() => {
            this.isNpmCopied = false;
        }, 2000);
    }

    ngAfterViewInit() {
        this.cd.detectChanges();
    }

    toggleDarkMode() {
        const theme = this.isDarkMode ? 'lara-light-blue' : 'lara-dark-blue';
        const newTableTheme = this.isDarkMode ? this.tableTheme.replace('dark', 'light') : this.tableTheme.replace('light', 'dark');

        this.configService.changeTheme({ name: theme, dark: !this.isDarkMode });
        this.replaceTableTheme(newTableTheme);
    }

    changeTableTheme(value: string) {
        if (isPlatformBrowser(this.platformId)) {
            this.replaceTableTheme(value);
        }
    }

    replaceTableTheme(newTheme: string) {
        const elementId = 'home-table-link';
        const linkElement = <HTMLLinkElement>document.getElementById(elementId);
        const tableThemeTokens = linkElement?.getAttribute('href').split('/') || null;
        const currentTableTheme = tableThemeTokens ? tableThemeTokens[tableThemeTokens.length - 2] : null;

        if (currentTableTheme !== newTheme && tableThemeTokens) {
            const newThemeUrl = linkElement.getAttribute('href').replace(currentTableTheme, newTheme);

            const cloneLinkElement = <HTMLLinkElement>linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('id', elementId + '-clone');
            cloneLinkElement.setAttribute('href', newThemeUrl);
            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', elementId);
            });
            linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);

            this.tableTheme = newTheme;
        }
    }

 
}
