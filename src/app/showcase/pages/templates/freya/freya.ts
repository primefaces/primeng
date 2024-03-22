import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { FreyaLogo } from './freyalogo';
import { FreyaSeparator } from './freyaseparator';
@Component({
    standalone: true,
    selector: 'freya-page',
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
        FreyaSeparator
    ],
    template: `<div class="freya template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="freyaLogo"></template-hero>
        <freya-separator></freya-separator>
        <template-license [license]="license"></template-license>
        <freya-separator></freya-separator>
        <div [style.display]="'none'">
            <freya-separator></freya-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/freya/freya-youtube-screen.png"></template-youtube>
        </div>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <freya-separator></freya-separator>
        <template-configuration
            title="Angular with CLI"
            description="Freya is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <freya-separator></freya-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
        <freya-separator></freya-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <freya-separator></freya-separator>
        <template-related [relatedData]="relatedData"></template-related>
    </div>`
})
export class FreyaPage {
    freyaLogo = FreyaLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/freya/freya-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/freya/freya-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/freya/freya-hero-dashboard2.png',
        description: 'Freya is a modern and clean application template for PrimeNG featuring a dark mode, attractive themes, customizable menu orientations, CSS widgets and template pages.',
        liveHref: 'https://www.primefaces.org/freya-react/',
        docHref: 'https://freya.primereact.org/documentation'
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
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-compatible.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-compatible-dark.png'
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
            description: 'Freya ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Freya uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeReact UI components are excluded from the Freya Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: 'Impress your users with the Light and Dark modes.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Freya offers 16 built-in component themes with dark and light options. Also if you wanna create your own theme you can do it by just defining couple SASS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Static, Overlay, Slim, Slim+, Reveal, Drawer and Horizontal are the available menu layouts depending on your preference.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/freya/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/freya/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org                    .cdn/primeng/images/templates/freya/Slim.png'
                },
                {
                    id: 3,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/freya/Reveal.png'
                },
                {
                    id: 4,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/freya/Horizontal.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/freya/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Slim+',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/freya/Slim+.png'
                },
                {
                    id: 7,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/freya/Drawer.png'
                }
            ]
        }
    ];

    license = {
        documentLink: 'https://freya.primereact.org/documentation',
        description: 'The download package is a NextJS-based project containing all application source codes deployed at the live demo. The project code is written in TypeScript.',
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
