import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { UltimaLogo } from './ultimalogo';
import { UltimaSeparator } from './ultimaseparator';

@Component({
    standalone: true,
    selector: 'ultima-page',
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
        UltimaSeparator
    ],
    template: `<div class="ultima template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="ultimaLogo"></template-hero>
        <ultima-separator></ultima-separator>
        <template-license [license]="license"></template-license>
        <ultima-separator></ultima-separator>
        <div [style.display]="'none'">
            <ultima-separator></ultima-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/ultima/ultima-youtube-screen.png"></template-youtube>
        </div>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <ultima-separator></ultima-separator>
        <template-configuration
            title="Angular with CLI"
            description="Ultima is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <ultima-separator></ultima-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <ultima-separator></ultima-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class UltimaPage {
    ultimaLogo = UltimaLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/ultima/ultima-hero-pattern.png',
        description: 'A highly customizable premium application template featuring 4 menu modes, 13 themes, light and dark modes based on material design language, it is fully responsive, touch optimized, built with SASS, CSS3 and HTML5.',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/ultima/ultima-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/ultima/ultima-hero-dashboard2.png',
        liveHref: 'https://ultima.primeng.org',
        docHref: 'https://ultima.primeng.org/documentation'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/diamond-ng.jpg',
            href: '/templates/diamond'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/apollo-ng.jpg',
            href: '/templates/apollo'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/avalon-ng.jpg',
            href: '/templates/avalon'
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
            description: 'Freya is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/freya-features2-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Freya has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-lifetime.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable-dark.png'
        },
        {
            title: 'Ready to Use Pages',
            description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/freya-features2-ready.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/freya-features2-mobile.png'
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
            description: 'Ultima ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Ultima uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeNG UI components are excluded from the Ultima Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: 'Ultima offers you 2 uniquely designed layout modes to choose from; Light and Dark.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Ultima offers 17 built-in component themes with dark and light options. Also if you wanna create your own theme you can do it by just defining couple SASS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/features-animation-component-themes.png'
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
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Slim.png'
                },
                {
                    id: 3,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Reveal.png'
                },
                {
                    id: 4,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Horizontal.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Slim+',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Slim+.png'
                },
                {
                    id: 7,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/ultima/Drawer.png'
                }
            ]
        }
    ];

    license = {
        documentLink: 'https://ultima.primeng.org/documentation/',
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
