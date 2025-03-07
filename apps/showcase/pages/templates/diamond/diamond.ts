import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { TemplateRelatedModule } from '@/components/template/templaterelated';
import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { TemplateYoutubeModule } from '@/components/template/templateyoutube';
import { Component } from '@angular/core';
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
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-remastered-hero-dashboard-1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-remastered-hero-dashboard-2.png',
        description: 'An amazing application template for Angular based on CLI featuring light-dark modes with 8 surface colors, 7 menu layouts, various menu themes, sample apps, ready to use template pages and 3 presets.',
        liveHref: 'https://diamond.primeng.org',
        docHref: 'https://diamond.primeng.org/documentation'
    };

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Diamond is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-remastered-features-responsive.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/cross-browser.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/common/cross-browser-dark.png'
        },
        {
            title: 'Support',
            description: `PrimeTek offers assistance with account management and licensing issues, with the expectation that users have the necessary technical knowledge to use our products, as we do not offer technical support or consulting. Users
            can seek assistance in our community via our public <a href="https://discord.com/invite/gzKFYnpmCY">Discord</a> and
            <a href="https://github.com/orgs/primefaces/discussions/categories/primeng-templates" class="doc-link">Forum</a>.`,
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/support.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/common/customizable-dark.png'
        },
        {
            title: 'Ready to Use Pages',
            description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-remastered-features-ready.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/diamond-remastered-features-mobile.png'
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
            description: 'Diamond ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/primeicons.png'
        },
        {
            id: 4,
            title: 'Figma File',
            description:
                'Powered by Figma as the design tool. It will be possible to download the Figma file after your purchase. Note that PrimeNG UI components are excluded from the template Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-remastered-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: '2 color schemes with 8 surface color alternatives for each.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-remastered-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Themes and Presets',
            description: 'Diamond offers 17 built-in theme colors with the power of 3 presets: Aura, Lara and Nora.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-remastered-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Static, Overlay, Slim, Compact, Horizontal, Reveal and Drawer are the available menu layouts depending on your preference.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-remastered-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/static-remastered.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/slim-remastered.png'
                },
                {
                    id: 3,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/horizontal-remastered.png'
                },
                {
                    id: 4,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/drawer-remastered.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/overlay-remastered.png'
                },
                {
                    id: 6,
                    title: 'Compact',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/compact-remastered.png'
                },
                {
                    id: 7,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/reveal-remastered.png'
                }
            ]
        },
        {
            id: 4,
            title: 'Menu Themes',
            description: 'Stunning theming options for the main menu.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/diamond/features-remastered-animation-orientations.png'
        }
    ];

    license = {
        documentLink: 'https://diamond.primeng.org/documentation/',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        showDiscount: false,
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$59',
                discount_price: '$39',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', '1 Year Free Updates']
            },
            {
                title: 'Extended License',
                price: '$590',
                discount_price: '$390',
                included: ['Commercial Usage', 'Multiple End Products', '1 Year Free Updates']
            }
        ]
    };
}
