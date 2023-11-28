import { CommonModule, DOCUMENT, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { AppComponent } from '../../layout/app.component';
import { AppNewsComponent } from '../../layout/news/app.news.component';
import { AppTopBarComponent } from '../../layout/topbar/app.topbar.component';
import { AppConfigService } from '../../service/appconfigservice';
import { BlockSectionComponent } from './blocksection.component';
import { FeaturesSectionComponent } from './featuressection.component';
import { FooterSectionComponent } from './footersection.component';
import { HeroSectionComponent } from './herosection.component';
import { TemplateSectionComponent } from './templatesection.component';
import { ThemeSectionComponent } from './themesection.component';
import { UsersSectionComponent } from './userssection.component';

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
    ]
})
export class LandingComponent implements OnInit, AfterViewInit {
    private window: Window;

    private tableTheme = 'lara-light-blue';

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

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: any, private configService: AppConfigService, public app: AppComponent, private metaService: Meta, private titleService: Title) {
        this.window = this.document.defaultView as Window;
    }

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({ name: 'description', content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.' });
    }

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId) && this.configService.config.theme !== this.tableTheme) {
            this.changeTableTheme(this.configService.config.darkMode ? 'lara-dark-blue' : 'lara-light-blue');
        }
    }

    toggleDarkMode() {
        const theme = this.isDarkMode ? 'lara-light-blue' : 'lara-dark-blue';
        const newTableTheme = this.isDarkMode ? this.tableTheme.replace('dark', 'light') : this.tableTheme.replace('light', 'dark');

        this.configService.changeTheme({ name: theme, dark: !this.isDarkMode });
        this.replaceTableTheme(newTableTheme);
    }

    changeTableTheme(value: string) {
        this.replaceTableTheme(value);
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
