import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { DiamondLogo } from './diamondlogo';
import { DiamondSeparator } from './diamondseparator';

@Component({
    standalone: true,
    selector: 'diamond-page',
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
        DiamondSeparator
    ],
    template: `<div class="diamond template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="diamondLogo"></template-hero>
        <diamond-separator></diamond-separator>
        <template-license [license]="license"></template-license>
        <diamond-separator></diamond-separator>
        <div [style.display]="'none'">
            <diamond-separator></diamond-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-youtube-screen.png"></template-youtube>
        </div>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <diamond-separator></diamond-separator>
        <template-configuration
            title="Angular with CLI"
            description="Diamond is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <diamond-separator></diamond-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <diamond-separator></diamond-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class DiamondPage {
    diamondLogo = DiamondLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-hero-dashboard2.png',
        description: 'A spectacular application template with light&dark modes, beautiful main menu with themes and layouts, premium PrimeNG component themes, reusable css widgets, utilities, modern icons and professional template pages.',
        liveHref: 'https://diamond.primeng.org',
        docHref: 'https://diamond.primeng.org/documentation'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/apollo-ng.jpg',
            href: '/templates/apollo'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/avalon-ng.jpg',
            href: '/templates/avalon'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/layouts/verona-ng.jpg',
            href: '/templates/verona'
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
            description: 'Diamond is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-features2-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Support',
            description: `PrimeTek offers assistance with account management and licensing issues, with the expectation that users have the necessary technical knowledge to use our products, as we do not offer technical support or consulting. Users
                            can seek assistance in our community via our public Discord and Forum.`,
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
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-features2-ready.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-features2-mobile.png'
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
            description: 'Diamond ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Diamond uses Figma as the design tool. It will be possible to download the Figma file after your purchase. You can preview the Figma file before the purchase. Note that PrimeNG UI components are excluded from the Diamond Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light / Dark / Dim Modes',
            description: 'Diamond has 3 display modes to choose from; Light, Dim and Dark.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Diamond offers 30 built-in component themes and creating your own theme is a matter of defining couple of sass variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Static, Overlay, Slim, Compact, Horizontal, Reveal and Drawer are the available menu layouts depending on your preference.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Slim.png'
                },
                {
                    id: 3,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Horizontal.png'
                },
                {
                    id: 4,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Drawer.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Compact',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Compact.png'
                },
                {
                    id: 7,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/Reveal.png'
                }
            ]
        },
        {
            id: 4,
            title: 'Menu Themes',
            description: 'Stunning theming options for the main menu in light color scheme.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-animation-orientations.png'
        }
    ];

    license = {
        documentLink: 'https://diamond.primeng.org/documentation/',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$59',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', '1 Year Free Updates']
            },
            {
                title: 'Extended License',
                price: '$590',
                included: ['Commercial Usage', 'Multiple End Products', '1 Year Free Updates']
            }
        ]
    };
}
