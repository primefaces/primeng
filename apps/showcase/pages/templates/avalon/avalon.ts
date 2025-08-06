import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { TemplateRelatedModule } from '@/components/template/templaterelated';
import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { TemplateYoutubeModule } from '@/components/template/templateyoutube';
import { Component } from '@angular/core';
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
            appName="avalon"
        ></template-configuration>
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
        patternClass: 'select-none absolute md:w-[60rem] h-auto md:bottom-0 bottom-40 -left-32 xl:-left-12 md:-left-32 z-[6] opacity-75',
        light: true,
        rectangle: true,
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-hero-dashboard2.png',
        description:
            'An elegantly designed admin template offering 7 menu layouts with light and dark modes. The layout is mobile-friendly and cross-browser compatible, built with SASS, CSS3 and HTML5 ensuring excellent performance to get you started with your next project!',
        liveHref: 'https://avalon.primeng.org/',
        docHref: 'https://avalon.primeng.org/documentation'
    };

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/avalon-features2-responsive.png'
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
            title: 'Top Notch Quality',
            description: 'Superior standards with 100% compatibility for strict mode and linting tools.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/common/quality.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/common/customizable-dark.png'
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
            description:
                'Powered by Figma as the design tool. It will be possible to download the Figma file after your purchase. Note that PrimeNG UI components are excluded from the template Figma file as they are available in PrimeOne for Figma only.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: '2 color schemes with 8 surface color alternatives for each.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: '17 built-in theme colors with the power of 3 presets: Aura, Lara and Nora.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Static, Overlay, Slim, Slim+, Reveal, Drawer and Horizontal are the available menu layouts depending on your preference.',
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
            description: 'Numerous topbar themes with an appealing design.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/avalon/features-animation-menu-themes.png'
        }
    ];

    license = {
        documentLink: 'https://avalon.primeng.org/documentation',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        showDiscount: false,
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$49',
                discount_price: '$29',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', '1 Year Free Updates | $19 for +1 year']
            },
            {
                title: 'Extended License',
                price: '$490',
                discount_price: '$290',
                included: ['Commercial Usage', 'Multiple End Products', '1 Year Free Updates | $190 for +1 year']
            }
        ]
    };
}
