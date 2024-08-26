import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, afterNextRender } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { AppNewsComponent } from '../../layout/news/app.news.component';
import { AppTopBarComponent } from '../../layout/topbar/app.topbar.component';
import { AppConfigService } from '@service/appconfigservice';
import { BlockSectionComponent } from './blocksection.component';
import { FeaturesSectionComponent } from './featuressection.component';
import { FooterSectionComponent } from './footersection.component';
import { HeroSectionComponent } from './herosection.component';
import { TemplateSectionComponent } from './templatesection.component';
import { ThemeSectionComponent } from './themesection.component';
import { UsersSectionComponent } from './userssection.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'landing',
    standalone: true,
    templateUrl: './landing.component.html',
    imports: [
        CommonModule,
        NgOptimizedImage,
        AppNewsComponent,
        AppTopBarComponent,
        HeroSectionComponent,
        FeaturesSectionComponent,
        UsersSectionComponent,
        ThemeSectionComponent,
        BlockSectionComponent,
        TemplateSectionComponent,
        FooterSectionComponent,
    ],
})
export class LandingComponent implements OnInit {
    subscription!: Subscription;

    constructor(private configService: AppConfigService, private metaService: Meta, private titleService: Title) {}

    get landingClass() {
        return {
            'layout-dark': this.isDarkMode,
            'layout-light': !this.isDarkMode,
            'layout-news-active': this.isNewsActive,
        };
    }

    get isDarkMode() {
        return this.configService.appState().darkTheme;
    }

    get isNewsActive() {
        return this.configService.state.newsActive;
    }

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({
            name: 'description',
            content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.',
        });
    }
}
