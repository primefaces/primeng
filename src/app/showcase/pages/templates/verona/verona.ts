import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { VeronaLogo } from './veronalogo';

@Component({
    standalone: true,
    selector: 'verona-page',
    imports: [TemplateHeroModule, TemplateSeparatorModule, TemplateFeaturesAnimationModule, TemplateFeaturesModule, TemplateConfigurationModule, TemplateFeaturesAnimationModule, TemplateRelatedModule, TemplateYoutubeModule, TemplateLicenseModule],
    template: `<div class="verona template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="veronaLogo"></template-hero>
        <template-separator></template-separator>
        <template-license [license]="license"></template-license>
        <template-separator></template-separator>
        <div [style.display]="'none'">
            <template-separator></template-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/verona/verona-youtube-screen.png"></template-youtube>
        </div>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <template-separator></template-separator>
        <template-configuration
            title="Angular with CLI"
            description="Verona is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <template-separator></template-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <template-separator></template-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
        <template-separator></template-separator>
        <template-related [relatedData]="relatedData"></template-related>
    </div>`
})
export class VeronaPage {
    veronaLogo = VeronaLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-hero-pattern.png',
        description: 'Prepare to be amazed by the remastered Verona for PrimeNG featuring a new gorgeous dark mode for the entire layout, 2 menu modes, reusable css widgets, utilities, modern icons and many more.',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-hero-dashboard2.png',
        liveHref: 'https://verona.primereact.org/',
        docHref: 'https://verona.primereact.org/documentation'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/freya-ng.jpg',
            href: '/templates/freya'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/apollo-ng.jpg',
            href: '/templates/apollo'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/atlantis-ng.jpg',
            href: '/templates/atlantis'
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
            description: 'Verona is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-features2-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-compatible.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-compatible-dark.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Verona has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
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
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-features2-ready.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-features2-mobile.png'
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
            description: 'Verona ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Verona uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeReact UI components are excluded from the Verona Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: 'The stunning dark and light modes will impress your users.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Verona offers 10 built-in component themes with dark and light options. You are also free to create you own theme by defining couple SASS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '4 Menu Orientations',
            description: 'Choose from Static, Overlay, Slim and Slim+ menu orientations.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/verona/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/verona/Slim.png'
                },
                {
                    id: 3,
                    title: 'Slim+',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/verona/Slim+.png'
                },
                {
                    id: 4,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/verona/Overlay.png'
                }
            ]
        },
        {
            id: 4,
            title: 'Menu Themes',
            description: 'Verona offers 10 special layout themes featuring gorgeous gradients.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-orientations.png'
        }
    ];

    license = {
        documentLink: 'https://verona.primereact.org/documentation',
        description: 'The download package is a NextJS-based project containing all application source codes deployed at the live demo. The project code is written in TypeScript.',
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$49',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', 'Lifetime Support', 'Unlimited Updates']
            },
            {
                title: 'Extended License',
                price: '$490',
                included: ['Commercial Usage', 'Multiple End Products', 'Lifetime Support', 'Unlimited Updates']
            }
        ]
    };
}
