import { TemplateConfigurationModule } from '@/components/template/templateconfiguration';
import { TemplateFeaturesModule } from '@/components/template/templatefeatures';
import { TemplateFeaturesAnimationModule } from '@/components/template/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from '@/components/template/templatehero/templatehero';
import { TemplateLicenseModule } from '@/components/template/templatelicense';
import { Component } from '@angular/core';
import { GenesisLogo } from './genesislogo';
import { GenesisSeparator } from './genesisseparator';

@Component({
    standalone: true,
    selector: 'genesis-page',
    imports: [TemplateHeroModule, TemplateLicenseModule, GenesisSeparator, TemplateFeaturesAnimationModule, TemplateConfigurationModule, TemplateFeaturesModule],
    template: `
        <div class="template">
            <template-hero [templateHeroData]="templateHeroData" [templateLogo]="genesisLogo"></template-hero>
            <genesis-separator></genesis-separator>
            <template-license [license]="license"></template-license>
            <genesis-separator></genesis-separator>
            <template-features-animation [featuresData]="animationFeaturesData1" title="Features"></template-features-animation>
            <genesis-separator></genesis-separator>
            <template-configuration title="Angular with CLI" description="Genesis is powered by Angular CLI to get started in no time following the best practices." appName="genesis"></template-configuration>
            <genesis-separator></genesis-separator>
            <template-features [featuresData]="featuresData" displayType="horizontal"></template-features>
            <genesis-separator></genesis-separator>
            <template-features-animation [featuresData]="animationFeaturesData2" title="Features"></template-features-animation>
            <genesis-separator></genesis-separator>
            <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
        </div>
    `
})
export class GenesisPage {
    genesisLogo = GenesisLogo;

    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primeng/images/templates/genesis/hero-pattern.png',
        patternClass: 'select-none absolute z-[6] w-[58rem] md:w-[50rem] h-auto top-12 md:top-32 -left-24 md:-left-12 opacity-75',
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/genesis/dashboard-2.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/genesis/dashboard-1.png',
        description: 'Genesis, crafted by Prime, is the ultimate multi-purpose website template built with Angular. It offers unmatched versatility and performance with a suite of example pages to elevate your projects.',
        liveHref: 'https://genesis.primeng.org',
        isMultipurpose: true
    };

    featuresData = [
        {
            title: 'Modern and Sleek Design',
            description: 'Enjoy a contemporary design that looks great on all devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/horizontal-features-img-1.png'
        },
        {
            title: 'SEO & Performance',
            description: 'Can be further optimized with Angular SSR.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/horizontal-features-img-2.png'
        },
        {
            title: 'Animation / Effects',
            description: 'Enhance engagement with captivating animations and effects.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/horizontal-features-img-3.png'
        }
    ];

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Genesis is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/fully-responsive.png'
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
            src: 'https://primefaces.org/cdn/primevue/images/templates/apollo/apollo-features2-quality.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality-dark.png'
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
            title: 'Various Landing Pages',
            description: 'Choose from 9 templates for industries like SaaS, Travel, and Real Estate, each tailored to specific business needs.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/animation-landing-pages.png'
        },
        {
            id: 2,
            title: 'Secondary Pages',
            description: 'Includes essential pages like About, Pricing, Blog, and Contact for a complete user experience.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/animation-second-pages.png'
        },
        {
            id: 3,
            title: 'Dark & Light Modes',
            description: 'Easily switch between Light and Dark modes to match your aesthetic preferences.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/animation-dark-light-modes.png'
        },
        {
            id: 4,
            title: 'Themes',
            description: 'Customize with 16 color themes to align with your brand effortlessly.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/animation-menu-themes.png'
        }
    ];

    animationFeaturesData2 = [
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
            src: 'https://primefaces.org/cdn/primeng/images/templates/genesis/animation-figma.png'
        }
    ];

    license = {
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
