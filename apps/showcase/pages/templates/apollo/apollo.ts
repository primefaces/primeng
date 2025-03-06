import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { TemplateRelatedModule } from '@/components/template/templaterelated';
import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { TemplateYoutubeModule } from '@/components/template/templateyoutube';
import { Component } from '@angular/core';
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
    </div>`
})
export class ApolloPage {
    apolloLogo = ApolloLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-hero-dashboard2.png',
        description: 'A spectacular application template for Angular based on CLI featuring light-dark modes with 8 surface colors, 7 menu layouts, various menu themes, sample apps, ready to use template pages and 3 presets.',
        liveHref: 'https://apollo.primeng.org',
        docHref: 'https://apollo.primeng.org/documentation'
    };

    apolloFeatures2Data = [
        {
            title: 'Fully Responsive',
            description: 'Crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-remastered-features-responsive.png'
        },
        {
            title: 'Support',
            description: `PrimeTek offers assistance with account management and licensing issues, with the expectation that users have the necessary technical knowledge to use our products, as we do not offer technical support or consulting. Users
            can seek assistance in our community via our public <a href="https://discord.com/invite/gzKFYnpmCY">Discord</a> and
            <a href="https://github.com/orgs/primefaces/discussions/categories/primeng-templates" class="doc-link">Forum</a>.`,
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/support.png'
        },
        {
            title: 'Top Notch Quality',
            description: 'Superior standards with 100% compatibility for strict mode and linting tools.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/quality.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/common/quality-dark.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/cross-browser.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/common/cross-browser-dark.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/common/customizable-dark.png'
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
            title: 'Tailwind CSS',
            description: 'The demo content is built with TailwindCSS, while the application shell uses custom CSS, offering flexibility and efficiency for responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/tailwind.png'
        },
        {
            id: 2,
            title: 'PrimeBlocks',
            description: `Designed to be fully compatible with upcoming next-gen PrimeBlocks, choose from the extensive range of blocks and customize the way you like.`,
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/primeblocks.png'
        },
        {
            id: 3,
            title: 'PrimeIcons',
            description: 'Ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/primeicons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            width: 1440,
            height: 1788,
            description:
                'Powered by Figma as the design tool. It will be possible to download the Figma file after your purchase. Note that PrimeNG UI components are excluded from the template Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: '2 color schemes with 8 surface color alternatives for each.',
            height: 940,
            width: 960,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: '17 built-in theme colors with the power of 3 presets: Aura, Lara and Nora.',
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
            description: 'Appealing theming for the main menu with 3 alternatives; Color Scheme, Primary Color and Transparent.',
            width: 960,
            height: 940,
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-menu-themes.png'
        }
    ];

    license = {
        documentLink: 'https://apollo.primeng.org/documentation/',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        showDiscount: false,
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$59',
                discount: '$39',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', '1 Year Free Updates']
            },
            {
                title: 'Extended License',
                price: '$590',
                discount: '$390',
                included: ['Commercial Usage', 'Multiple End Products', '1 Year Free Updates']
            }
        ]
    };
}
