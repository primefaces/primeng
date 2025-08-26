import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { TemplateRelatedModule } from '@/components/template/templaterelated';
import { TemplateSeparatorModule } from '@/components/template/templateseparator';
import { TemplateYoutubeModule } from '@/components/template/templateyoutube';
import { Component } from '@angular/core';
import { VeronaLogo } from './veronalogo';
import { VeronaSeparator } from './veronaseparator';

@Component({
    standalone: true,
    selector: 'verona-page',
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
        VeronaSeparator
    ],
    template: `<div class="verona template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="veronaLogo"></template-hero>
        <verona-separator></verona-separator>
        <template-license [license]="license"></template-license>
        <verona-separator></verona-separator>
        <div [style.display]="'none'">
            <verona-separator></verona-separator>
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/verona/verona-youtube-screen.png"></template-youtube>
        </div>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <verona-separator></verona-separator>
        <template-configuration
            title="Angular with CLI"
            description="Verona is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
            appName="verona"
        ></template-configuration>
        <verona-separator></verona-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <verona-separator></verona-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class VeronaPage {
    veronaLogo = VeronaLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-hero-pattern.png',
        patternClass: 'select-none absolute z-[6] opacity-90 w-[110rem] h-auto bottom-80 left-0 md:-bottom-8 md:-left-4',
        description: 'Prepare to be amazed by the remastered Verona for PrimeNG featuring a gorgeous dark mode for the entire layout, 4 menu modes, reusable css widgets, utilities, modern icons and many more.',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-hero-dashboard2.png',
        liveHref: 'https://verona.primeng.org/',
        docHref: 'https://verona.primeng.org/documentation'
    };

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/verona-features2-responsive.png'
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
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: '2 color schemes with 8 surface color alternatives for each.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/verona/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: '17 built-in theme colors with the power of 3 presets: Aura, Lara and Nora.',
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
        documentLink: 'https://verona.primeng.org/documentation',
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
