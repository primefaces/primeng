import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { TemplateRelatedModule } from '@/components/template/templaterelated';
import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { TemplateYoutubeModule } from '@/components/template/templateyoutube';
import { Component } from '@angular/core';
import { SakaiLogo } from './sakailogo';
import { SakaiSeparator } from './sakaiseparator';
@Component({
    standalone: true,
    selector: 'sakai-page',
    imports: [
        TemplateHeroModule,
        TemplateSeparatorModule,
        TemplateFeaturesAnimationModule,
        TemplateFeaturesModule,
        TemplateConfigurationModule,
        TemplateFeaturesAnimationModule,
        TemplateRelatedModule,
        TemplateYoutubeModule,
        TemplateLicenseModule,
        SakaiSeparator
    ],
    template: `<div class="sakai template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="sakaiLogo"></template-hero>
        <sakai-separator></sakai-separator>
        <template-features [featuresData]="features1Data" displayType="horizontal"></template-features>
        <sakai-separator></sakai-separator>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <sakai-separator></sakai-separator>
        <template-configuration
            title="Angular with CLI"
            description="Sakai is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <sakai-separator></sakai-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <sakai-separator></sakai-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class SakaiPage {
    sakaiLogo = SakaiLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-hero-dashboard2.png',
        description: 'Sakai is an application template for Angular and is distributed as a CLI project.',
        liveHref: 'https://sakai.primeng.org/',
        docHref: 'https://sakai.primeng.org/documentation',
        free: true,
        storeHref: 'https://github.com/primefaces/sakai-ng',
        supportHref: 'https://github.com/primefaces/sakai-ng/issues'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/diamond-ng.jpg',
            href: '/templates/diamond'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/babylon-ng.jpg',
            href: '/templates/babylon'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/ultima-ng.jpg',
            href: '/templates/ultima'
        }
    ];

    features1Data = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-github.png',
            title: 'Open Source and Free to Use',
            description: "Explore Sakai, our versatile, open-source Angular application template. It's free for your every innovation."
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-ready.png',
            title: 'Ready to Use Pages',
            description: 'Landing, login and error pages are provided as template pages to get started with building your app in no time.'
        }
    ];
    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Atlantis is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-features2-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Full SaSS Support',
            description: 'Sass is utilized for both the application and components to provide simplicity and flexibility.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable-dark.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/sakai-features2-mobile.png'
        }
    ];

    animationFeaturesData1 = [
        {
            id: 1,
            title: 'PrimeFlex CSS Utilities',
            description: 'PrimeFlex is a CSS utility library featuring various helpers such as a grid grid-cols-12 gap-4 system, flexbox, spacing, elevation and more.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/babylon/features-animation-utilities.png'
        },
        {
            id: 2,
            title: 'PrimeBlocks',
            description: 'Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/babylon/features-animation-blocks.png'
        },
        {
            id: 3,
            title: 'PrimeIcons',
            description: 'Atlantis ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/babylon/features-animation-icons.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Various Free Themes',
            description: 'Sakai has various free themes to choose from; PrimeOne Design, Bootstrap, Material Design with light and dark options.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: '2 Menu Orientations',
            description: 'Sakai has 2 menu modes; Static and Overlay',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/Static.png'
                },
                {
                    id: 2,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/sakai/Overlay.png'
                }
            ]
        }
    ];
}
