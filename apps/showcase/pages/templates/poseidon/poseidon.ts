import { TemplateConfiguration } from '@/components/template/templateconfiguration';
import { TemplateFeatures } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimation } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHero } from '@/components/template/templatehero/templatehero';
import { TemplateLicense } from '@/components/template/templatelicense';
import { TemplateYoutube } from '@/components/template/templateyoutube';
import { Component } from '@angular/core';
import { PoseidonLogo } from './poseidonlogo';
import { PoseidonSeparator } from './poseidonseparator';

@Component({
    standalone: true,
    selector: 'poseidon-page',
    imports: [TemplateHero, TemplateFeaturesAnimation, TemplateFeatures, TemplateConfiguration, TemplateFeaturesAnimation, TemplateYoutube, TemplateLicense, PoseidonSeparator],
    template: `<div class="apollo template">
        <template-hero [templateHeroData]="templateHeroData" [templateLogo]="poseidonLogo"></template-hero>
        <poseidon-separator></poseidon-separator>
        <div [style.display]="'none'">
            <template-youtube imgSrc="https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-youtube-screen.png"></template-youtube>
            <poseidon-separator></poseidon-separator>
        </div>
        <template-license [license]="license"></template-license>
        <poseidon-separator></poseidon-separator>
        <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
        <poseidon-separator></poseidon-separator>
        <template-configuration
            title="Angular with CLI"
            description="Poseidon is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
            appName="poseidon"
        ></template-configuration>
        <poseidon-separator></poseidon-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <poseidon-separator></poseidon-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
    </div>`
})
export class PoseidonPage {
    poseidonLogo = PoseidonLogo;
    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/hero-background.png',
        patternClass: 'select-none absolute z-[6] w-[72rem] md:w-[100rem] h-auto bottom-[25rem] -left-40 md:-bottom-12 xl:bottom-0 md:-left-48 xl:-left-28 opacity-90',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-hero-1.jpg',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-hero-2.jpg',
        description: 'A modern and easy to use premium application template with various color schemes.Based on flat design language, it is fully responsive, touch optimized, built with SASS, CSS3 and HTML5.',
        liveHref: 'https://poseidon.primeng.org',
        docHref: 'https://poseidon.primeng.org/documentation'
    };

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-responsive.png'
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
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-mobile.png'
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
            description: `Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.`,
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
            description: `Poseidon uses Figma as the design tool. It will be possible to download the Figma file after your purchase.
                    You can <a href="https://www.figma.com/design/eMNbyxsMp3H0PQbMyyGK77/Preview-%7C-Poseidon?node-id=0-1&t=wJRSplRnKvjqju9S-1" target="_blank" rel="noopener noreferrer">preview the Figma file</a> the Figma file before the purchase.
                    Note that PrimeNG UI components are excluded from the
                    Avalon Figma file as they are available in <a href="/uikit">PrimeOne for Figma</a> only.`,
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-figma.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light and Dark Modes',
            description: '2 color schemes with numerous surface color alternatives for each.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-lightdark.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Poseidon offers 17 fully customizable built-in themes featuring different presets such as Aura, Lara and Nora.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-component.png'
        },
        {
            id: 3,
            title: '7 Menu Orientations',
            description: 'Poseidon has 7 menu layouts to choose from; Static, Overlay, Horizontal, Compact, Slim, Reveal and Drawer.',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-static.png'
                },
                {
                    id: 2,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-overlay.png'
                },
                {
                    id: 3,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-horizontal.png'
                },
                {
                    id: 4,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-drawer.png'
                },
                {
                    id: 5,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-slim.png'
                },
                {
                    id: 6,
                    title: 'Compact',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-compact.png'
                },
                {
                    id: 7,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-reveal.png'
                }
            ]
        },
        {
            id: 4,
            title: 'Application Themes',
            description: 'The application layout and components seamlessly complements your brand color.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/nextgen/poseidon-layout.png'
        }
    ];

    license = {
        documentLink: 'https://poseidon.primeng.org/documentation/',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        showDiscount: false,
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$59',
                discount_price: '$39',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', '1 Year Free Updates | $19 for +1 year']
            },
            {
                title: 'Extended License',
                price: '$590',
                discount_price: '$390',
                included: ['Commercial Usage', 'Multiple End Products', '1 Year Free Updates | $190 for +1 year']
            }
        ]
    };
}
