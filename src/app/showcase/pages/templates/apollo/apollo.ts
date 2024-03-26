import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { ApolloLogo } from './apollologo';
import { ApolloSeparator } from './apolloseparator';

@Component({
    standalone: true,
    selector: 'apollo-page',
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
        ApolloSeparator
    ],
    template: `<div class="apollo template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="apolloLogo"></template-hero>
        <div [style.display]="'none'">
            <apollo-separator></apollo-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-youtube-screen.png"></template-youtube>
        </div>
        <apollo-separator></apollo-separator>
        <template-license [license]="license"></template-license>
        <apollo-separator></apollo-separator>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features" displayType="horizontal"></template-features-animation>
        <apollo-separator></apollo-separator>
        <template-configuration
            title="Angular with CLI"
            description="Apollo is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <apollo-separator></apollo-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <apollo-separator></apollo-separator>
        <template-features [featuresData]="apolloFeatures2Data" displayType="vertical"></template-features>
        <apollo-separator></apollo-separator>
        <template-related [relatedData]="apolloRelatedData"></template-related>
    </div>`
})
export class ApolloPage {
    apolloLogo = ApolloLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-hero-dashboard2.png',
        description: 'An amazing Angular CLI application template with light-dim-dark modes, four menu layouts, various menu themes, sample apps, ready to use template pages and 24 PrimeNG themes.',
        liveHref: 'https://apollo.primeng.org',
        docHref: 'https://apollo.primeng.org/documentation'
    };

    apolloRelatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/diamond-ng.jpg',
            href: '/templates/diamond'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/avalon-ng.jpg',
            href: '/templates/avalon'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/babylon-ng.jpg',
            href: '/templates/babylon'
        }
    ];

    apolloFeatures2Data = [
        {
            title: 'Fully Responsive',
            description: 'Apollo is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-responsive.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Apollo has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-lifetime.png'
        },
        {
            title: 'Top Notch Quality',
            description: 'Superior standards with 100% compatibility for strict mode and linting tools.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality-dark.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable-dark.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-mobile.png'
        }
    ];

    animationFeaturesData1 = [
        {
            id: 1,
            title: 'PrimeFlex CSS Utilities',
            width: 1440,
            height: 1789,
            description: 'PrimeFlex is a CSS utility library featuring various helpers such as a grid system, flexbox, spacing, elevation and more.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-utilities.png'
        },
        {
            id: 2,
            title: 'PrimeBlocks',
            width: 1440,
            height: 1789,
            description: 'Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-blocks.png'
        },
        {
            id: 3,
            title: 'PrimeIcons',
            width: 1440,
            height: 1789,
            description: 'Apollo ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            width: 1440,
            height: 1788,
            description:
                'Apollo uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeNG UI components are excluded from the Apollo Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-figma.png'
        }
    ];

    apolloFeatures1Data = [
        {
            height: 940,
            width: 960,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features1-feature1.png',
            title: 'Ready to Use Applications',
            description: 'Mail, File System, Tasks, Calendar, Blog and Chat are the sample applications to get started with ease.'
        },
        {
            height: 940,
            width: 960,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features1-feature2.png',
            title: 'E-Commerce Pages',
            description: 'Apollo offers E-commerce pages to kickstart your e-commerce project powered by PrimeBlocks.'
        },
        {
            height: 940,
            width: 960,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features1-feature3.png',
            title: 'Ready to Use Pages',
            description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light / Dark / Dim Modes',
            description: 'Apollo has 3 display modes to choose from; Light, Dim and Dark.',
            height: 940,
            width: 960,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Apollo offers 24 built-in component themes and creating your own theme is a matter of defining couple of sass variables.',
            width: 940,
            height: 960,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Static, Overlay, Slim, Slim+, Reveal, Drawer and Horizontal are the available menu layouts depending on your preference.',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Slim.png'
                },
                {
                    id: 3,
                    title: 'Reveal',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Reveal.png'
                },
                {
                    id: 4,
                    title: 'Horizontal',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Horizontal.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Slim+',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Slim+.png'
                },
                {
                    id: 7,
                    title: 'Drawer',
                    width: 1440,
                    height: 1789,
                    src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/Drawer.png'
                }
            ]
        },
        {
            id: 4,
            title: 'Menu Themes',
            description: 'Stunning theming for the main menu with 3 alternatives; Color Scheme, Primary Color and Transparent.',
            width: 960,
            height: 940,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-menu-themes.png'
        }
    ];

    license = {
        documentLink: 'https://apollo.primeng.org/documentation/',
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
