import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { AvalonLogo } from './avalonlogo';
import { AvalonSeparator } from './avalonseparator';

@Component({
    standalone: true,
    selector: 'avalon-page',
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
        AvalonSeparator
    ],
    template: `<div class="avalon template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="avalonLogo"></template-hero>
        <avalon-separator></avalon-separator>
        <template-license [license]="license"></template-license>
        <avalon-separator></avalon-separator>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <avalon-separator></avalon-separator>
        <template-configuration
            title="Angular with CLI"
            description="Avalon is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <avalon-separator></avalon-separator>
        <template-features [featuresData]="features1Data" displayType="horizontal"></template-features>
        <avalon-separator></avalon-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <avalon-separator></avalon-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class AvalonPage {
    avalonLogo = AvalonLogo;
    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-hero-pattern.png',
        light: true,
        rectangle: true,
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-hero-dashboard2.png',
        description:
            'Welcome the new Avalon, elegantly designed with its new bootstrap theme and colors, offering 5 menu layouts with light and dark modes. The layout is mobile-friendly and cross-browser compatible, built with SASS, CSS3 and HTML5 ensuring excellent performance to get you started with your next project!',
        liveHref: 'https://avalon.primeng.org/',
        docHref: 'https://avalon.primeng.org/documentation'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/verona-ng.jpg',
            href: '/templates/verona'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/apollo-ng.jpg',
            href: '/templates/apollo'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/ultima-ng.jpg',
            href: '/templates/ultima'
        }
    ];

    features1Data = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-features1-feature1.png',
            title: 'Ready to Use Applications',
            description: 'Mail, File System, Tasks, Calendar, Blog and Chat are the sample applications to get started with ease.'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-features1-feature2.png',
            title: 'E-Commerce Pages',
            description: 'Avalon offers E-commerce pages to kickstart your e-commerce project powered by PrimeBlocks.'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-features1-feature3.png',
            title: 'Ready to Use Pages',
            description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.'
        }
    ];
    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Avalon is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-features2-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Diamond has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-lifetime.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable-dark.png'
        },
        {
            title: 'Top Notch Quality',
            description: 'Superior standards with 100% compatibility for strict mode and linting tools.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality-dark.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-features2-mobile.png'
        }
    ];

    animationFeaturesData1 = [
        {
            id: 1,
            title: 'PrimeFlex CSS Utilities',
            description: 'PrimeFlex is a CSS utility library featuring various helpers such as a grid grid-cols-12 gap-4 system, flexbox, spacing, elevation and more.',
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
            description: 'Avalon ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Avalon uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeNG UI components are excluded from the Avalon Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: 'Avalon offers you 2 uniquely designed layout modes to choose from; Light and Dark.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component 10 Beautiful Themes',
            description: 'Avalon offers 10 built-in themes and creating your own theme is a matter of defining couple of SaSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Avalon has 7 menu layouts to choose from; Static, Overlay, Slim, Slim+, Reveal, Drawer and Horizontal with Light and Dark options.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Slim.png'
                },
                {
                    id: 3,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Reveal.png'
                },
                {
                    id: 4,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Horizontal.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Slim+',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Slim+.png'
                },
                {
                    id: 7,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/Drawer.png'
                }
            ]
        },
        {
            id: 4,
            title: 'Topbar Themes',
            description: 'Avalon comes with 11 topbar themes guaranteeing an enviable design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-menu-themes.png'
        }
    ];

    license = {
        documentLink: 'https://avalon.primeng.org/documentation',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$49',
                discount_price: '$29',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', 'Lifetime Support', 'Unlimited Updates']
            },
            {
                title: 'Extended License',
                price: '$490',
                discount_price: '$290',
                included: ['Commercial Usage', 'Multiple End Products', 'Lifetime Support', 'Unlimited Updates']
            }
        ]
    };
}
