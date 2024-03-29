import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { AtlantisLogo } from './atlantislogo';
import { AtlantisSeparator } from './atlantisseparator';
@Component({
    standalone: true,
    selector: 'atlantis-page',
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
        AtlantisSeparator
    ],
    template: `<div class="atlantis template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="atlantisLogo"></template-hero>
        <atlantis-separator></atlantis-separator>
        <template-license [license]="license"></template-license>
        <atlantis-separator></atlantis-separator>
        <div [style.display]="'none'">
            <atlantis-separator></atlantis-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-youtube-screen.png"></template-youtube>
        </div>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <atlantis-separator></atlantis-separator>
        <template-configuration
            title="Angular with CLI"
            description="Atlantis is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <atlantis-separator></atlantis-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <atlantis-separator></atlantis-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class AtlantisPage {
    atlantisLogo = AtlantisLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-hero-dashboard2.png',
        description: 'Prepare to be amazed by the remastered Atlantis for PrimeNG featuring a new gorgeous dark mode for the entire layout, 5 menu modes, reusable css widgets, utilities, modern icons and many more.',
        liveHref: 'https://www.primefaces.org/atlantis-ng/',
        docHref: 'https://www.primefaces.org/atlantis-ng/documentation/'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/freya-ng.jpg',
            href: '/templates/freya'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/ultima-ng.jpg',
            href: '/templates/ultima'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/verona-ng.jpg',
            href: '/templates/verona'
        }
    ];

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Atlantis is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-features2-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Atlantis has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-lifetime.png'
        },
        {
            title: 'Full SaSS Support',
            description: 'Sass is utilized for both the application and components to provide simplicity and flexibility.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable-dark.png'
        },
        {
            title: 'Ready to Use Pages',
            description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-features2-ready.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/atlantis-features2-mobile.png'
        }
    ];

    animationFeaturesData1 = [
        {
            id: 1,
            title: 'PrimeFlex CSS Utilities',
            description: 'PrimeFlex is a CSS utility library featuring various helpers such as a grid system, flexbox, spacing, elevation and more.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-utilities.png'
        },
        {
            id: 2,
            title: 'PrimeBlocks',
            description: 'Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-blocks.png'
        },
        {
            id: 3,
            title: 'PrimeIcons',
            description: 'Atlantis ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Atlantis uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeNG UI components are excluded from the Atlantis Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: 'The stunning dark and light modes will impress your users.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Atlantis offers 16 built-in component themes with dark and light options. You are also free to create you own theme by defining couple SASS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Static, Overlay, Slim, Slim+, Reveal, Drawer and Horizontal are the available menu layouts depending on your preference.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Slim.png'
                },
                {
                    id: 3,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Reveal.png'
                },
                {
                    id: 4,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Horizontal.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Slim+',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Slim+.png'
                },
                {
                    id: 7,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/atlantis/Drawer.png'
                }
            ]
        }
    ];

    license = {
        documentLink: 'https://atlantis.primeng.org/documentation',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$59',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', 'Lifetime Support', 'Unlimited Updates']
            },
            {
                title: 'Extended License',
                price: '$590',
                included: ['Commercial Usage', 'Multiple End Products', 'Lifetime Support', 'Unlimited Updates']
            }
        ]
    };
}
