import { AppNewsComponent } from '@/components/layout/news/app.news.component';
import { AppTopBarComponent } from '@/components/layout/topbar/app.topbar.component';
import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, computed, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { BlockSectionComponent } from './blocksection.component';
import { FeaturesSectionComponent } from './featuressection.component';
import { FooterSectionComponent } from './footersection.component';
import { HeroSectionComponent } from './herosection.component';
import { TemplateSectionComponent } from './templatesection.component';
import { ThemeSectionComponent } from './themesection.component';
import { UsersSectionComponent } from './userssection.component';
import { AppDesignerComponent } from '@/components/layout/designer/app.designer.component';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'landing',
    standalone: true,
    templateUrl: './landing.component.html',
    imports: [CommonModule, AppNewsComponent, AppTopBarComponent, ButtonModule, HeroSectionComponent, FeaturesSectionComponent, UsersSectionComponent, ThemeSectionComponent, BlockSectionComponent, TemplateSectionComponent, FooterSectionComponent]
})
export class LandingComponent implements OnInit {
    subscription!: Subscription;

    isNewsActive = computed(() => this.configService.newsActive());

    isDarkMode = computed(() => this.configService.appState().darkTheme);

    landingClass = computed(() => {
        return {
            'layout-dark': this.isDarkMode(),
            'layout-light': !this.isDarkMode(),
            'layout-news-active': this.isNewsActive()
        };
    });

    constructor(
        private configService: AppConfigService,
        private metaService: Meta,
        private titleService: Title
    ) {}

    ngOnInit() {
        this.titleService.setTitle('PrimeNG - Angular UI Component Library');
        this.metaService.updateTag({
            name: 'description',
            content: 'The ultimate collection of design-agnostic, flexible and accessible Angular UI Components.'
        });
    }
}
