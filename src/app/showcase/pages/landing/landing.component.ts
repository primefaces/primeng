import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, afterNextRender } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    imports: [CommonModule, NgOptimizedImage, AppNewsComponent, AppTopBarComponent, HeroSectionComponent, FeaturesSectionComponent, UsersSectionComponent, ThemeSectionComponent, BlockSectionComponent, TemplateSectionComponent, FooterSectionComponent]
})
export class LandingComponent implements OnInit {
    private tableTheme = 'lara-light-blue';

    constructor(private configService: AppConfigService, private metaService: Meta, private titleService: Title) {
        afterNextRender(() => {
            if (this.configService.config.theme !== this.tableTheme) {
                this.changeTableTheme(this.configService.config.darkMode ? 'lara-dark-blue' : 'lara-light-blue');
            }
        });
    }

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

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({ name: 'description', content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.' });
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
