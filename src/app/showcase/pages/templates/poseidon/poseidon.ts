import { Component } from '@angular/core';
import { TemplateConfigurationModule } from 'src/app/showcase/layout/templates/templateconfiguration';
import { TemplateFeaturesModule } from 'src/app/showcase/layout/templates/templatefeatures';
import { TemplateFeaturesAnimationModule } from 'src/app/showcase/layout/templates/templatefeaturesanimation/templatefeaturesanimation';
import { TemplateHeroModule } from 'src/app/showcase/layout/templates/templatehero/templatehero';
import { TemplateLicenseModule } from 'src/app/showcase/layout/templates/templatelicense';
import { TemplateRelatedModule } from 'src/app/showcase/layout/templates/templaterelated';
import { TemplateSeparatorModule } from 'src/app/showcase/layout/templates/templateseparator';
import { TemplateYoutubeModule } from 'src/app/showcase/layout/templates/templateyoutube';

@Component({
    standalone: true,
    selector: 'poseidon-page',
    imports: [TemplateHeroModule, TemplateSeparatorModule, TemplateFeaturesAnimationModule, TemplateFeaturesModule, TemplateConfigurationModule, TemplateFeaturesAnimationModule, TemplateRelatedModule, TemplateYoutubeModule, TemplateLicenseModule],
    template: `<div class="apollo template">
        <template-hero [templateHeroData]="templateHeroData"></template-hero>
        <template-separator></template-separator>
        <template-youtube imgSrc="https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-youtube-screen.png"></template-youtube>
        <template-separator></template-separator>
        <template-license [license]="license"></template-license>
        <template-separator></template-separator>
        <template-features [featuresData]="features1Data" displayType="horizontal"></template-features>
        <template-separator></template-separator>
        <template-configuration
            title="Angular with CLI"
            description="Poseidon is powered by Angular CLI to get started in no time following the best practices like service based component interaction modular design and strict mode support"
        ></template-configuration>
        <template-separator></template-separator>
        <template-features-animation [featuresData]="animationFeaturesData1"></template-features-animation>
        <template-separator></template-separator>
        <template-features [featuresData]="features2Data" displayType="vertical"></template-features>
        <template-separator></template-separator>
        <template-related [relatedData]="relatedData"></template-related>
    </div>`
})
export class PoseidonPage {
    templateHeroData = {
        pattern: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-hero-pattern.png',
        dashboard1: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-hero-dashboard1.png',
        dashboard2: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-hero-dashboard2.png',
        description: 'A modern and easy to use premium application template with various color schemes.Based on flat design language, it is fully responsive, touch optimized, built with SASS, CSS3 and HTML5.',
        liveHref: 'https://apollo.primereact.org',
        docHref: 'https://apollo.primereact.org/documentation'
    };

    relatedData = [
        {
            src: 'https://primefaces.org/cdn/primereact/images/templates/diamond-react.jpg',
            href: '/templates/diamond'
        },
        {
            src: 'https://primefaces.org/cdn/primereact/images/templates/avalon-react.jpg',
            href: '/templates/avalon'
        },
        {
            src: 'https://primefaces.org/cdn/primereact/images/templates/babylon-react.jpg',
            href: '/templates/babylon'
        }
    ];

    features2Data = [
        {
            title: 'Fully Responsive',
            description: 'Apollo is crafted to provide optimal viewing and interaction experience for a wide range of devices.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-responsive.png'
        },
        {
            title: 'Lifetime Support',
            description: 'Apollo has a dedicated forum where lifetime support is delivered by engineers at PrimeTek in a timely manner.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-lifetime.png'
        },
        {
            title: 'Top Notch Quality',
            description: 'Superior standards with 100% compatibility for strict mode and linting tools.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-quality.png',
            darkSrc: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-quality-dark.png'
        },
        {
            title: 'Cross Browser Compatible',
            description: 'First class support for Firefox, Safari, Chrome and Edge.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-compatible.png',
            darkSrc: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-compatible-dark.png'
        },
        {
            title: 'Customizable Design',
            description: 'Fully customizable with a mixture of Sass and CSS variables.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-customizable.png',
            darkSrc: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-customizable-dark.png'
        },
        {
            title: 'Mobile Experience',
            description: 'Touch optimized enhanced mobile experience with responsive design.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/apollo-features2-mobile.png'
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
            description: 'Apollo ships with PrimeIcons, PrimeTek’s modern icon library including a wide range of icons for your applications.',
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/features-animation-icons.png'
        }
    ];

    features1Data = [
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features1-feature1.png',
            title: 'Ready to Use Applications',
            description: 'Mail, File System, Tasks, Calendar, Blog and Chat are the sample applications to get started with ease.'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features1-feature2.png',
            title: 'E-Commerce Pages',
            description: 'Apollo offers E-commerce pages to kickstart your e-commerce project powered by PrimeBlocks.'
        },
        {
            src: 'https://primefaces.org/cdn/primeng/images/templates/apollo/apollo-features1-feature3.png',
            title: 'Ready to Use Pages',
            description: 'Landing, login, invoice, help, user management and error pages are provided as template pages to get started with building your app.'
        }
    ];

    animationFeaturesData2 = [
        {
            id: 1,
            title: 'Light / Dark / Dim Modes',
            description: 'Poseidon offers you 3 uniquely designed layout modes to choose from; Light, Dim, and Dark.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/features-animation-darkmode.png'
        },
        {
            id: 2,
            title: 'Component Themes',
            description: 'Poseidon offers 12 built-in component themes with dark, light and dim options. Also if you wanna create your own theme you can do it by just defining couple SASS variables.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/features-animation-component-themes.png'
        },
        {
            id: 3,
            title: '3 Menu Orientations',
            description: 'Poseidon has 3 menu layouts to choose from; Static, Overlay and Horizontal.',
            src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/features-animation-orientations.png',
            type: 'inline-animation',
            inlineFeaturesData: [
                {
                    id: 1,
                    title: 'Static',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Static.png'
                },
                {
                    id: 2,
                    title: 'Slim',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Slim.png'
                },
                {
                    id: 3,
                    title: 'Reveal',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Reveal.png'
                },
                {
                    id: 4,
                    title: 'Horizontal',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Horizontal.png'
                },
                {
                    id: 5,
                    title: 'Overlay',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Overlay.png'
                },
                {
                    id: 6,
                    title: 'Slim+',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Slim+.png'
                },
                {
                    id: 7,
                    title: 'Drawer',
                    src: 'https://primefaces.org/cdn/primereact/images/templates/apollo/Drawer.png'
                }
            ]
        }
    ];

    license = {
        documentLink: 'https://apollo.primereact.org/documentation/',
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
