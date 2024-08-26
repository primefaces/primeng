import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';
import { PoseidonSeparator } from './poseidonseparator';
import { PoseidonLogo } from './poseidonlogo';

@Component({
    standalone: true,
    selector: 'poseidon-page',
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
        PoseidonSeparator
    ],
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
        dashboard1: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/poseidon-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/poseidon-hero-dashboard2.png',
        description: 'A modern and easy to use premium application template with various color schemes.Based on flat design language, it is fully responsive, touch optimized, built with SASS, CSS3 and HTML5.',
        liveHref: 'https://poseidon.primeng.org',
        docHref: 'https://poseidon.primeng.org/documentation'
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

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Apollo is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/poseidon-features2-responsive.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Apollo has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-lifetime.png'
        },
        {
            title: 'Top Notch Quality',
            description: 'Superior standards with 100% compatibility for strict mode and linting tools.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-quality-dark.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primeng/images/compatible-ng.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/compatible-ng-dark.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features2-customizable-dark.png'
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
            title: 'PrimeFlex CSS Utilities',
            description: 'PrimeFlex is a CSS utility library featuring various helpers such as a grid grid-cols-12 gap-4 system, flexbox, spacing, elevation and more.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/features-animation-utilities.png'
        },
        {
            id: 2,
            title: 'PrimeBlocks',
            description: 'Fully compatible with PrimeBlocks, choose from the wide range of blocks and customize the way you like. Note that PrimeBlocks is not included in the template and requires a separate purchase.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/features-animation-blocks.png'
        },
        {
            id: 3,
            title: 'PrimeIcons',
            description: 'Poseidon ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/features-animation-icons.png'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light / Dark / Dim Modes',
            description: 'Poseidon offers you 3 uniquely designed layout modes to choose from; Light, Dim, and Dark.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Poseidon offers 12 built-in component themes with dark, light and dim options. Also if you wanna create your own theme you can do it by just defining couple SASS variables.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/features-component-themes.png'
        },
        {
            id: 3,
            title: '3 Menu Orientations',
            description: 'Poseidon has 3 menu layouts to choose from; Static, Overlay and Horizontal.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/static.png'
                },
                {
                    id: 2,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/overlay.png'
                },
                {
                    id: 3,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primeng/images/templates/poseidon/horizontal.png'
                }
            ]
        }
    ];

    license = {
        documentLink: 'https://poseidon.primeng.org/documentation/',
        description: 'The download package is an Angular CLI-based project containing all source code of the application deployed at the live demo. The project code is written in TypeScript.',
        licenseDetails: [
            {
                title: 'Basic License',
                price: '$59',
                discount_price: '$39',
                included: ['Non Commercial Usage', 'Single End Product, No Multi-Use', 'Lifetime Support', 'Unlimited Updates']
            },
            {
                title: 'Extended License',
                price: '$590',
                discount_price: '$390',
                included: ['Commercial Usage', 'Multiple End Products', 'Lifetime Support', 'Unlimited Updates']
            }
        ]
    };
}
