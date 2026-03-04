import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
    selector: 'features-section',
    standalone: true,
    imports: [CommonModule, AnimateOnScrollModule],
    template: `
        <section class="landing-features py-20">
            <div class="section-header">Features</div>
            <p class="section-detail">PrimeNG is the most complete solution for your UI requirements.</p>
            <div class="mt-14 px-7 lg:px-20">
                <div class="features-container">
                    <div class="grid grid-cols-12 gap-3.5">
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-components.svg" class="block mb-3.5" alt="components icon" />
                                <div class="font-semibold mb-3.5">80+ UI Components</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">The ultimate set of UI Components to assist you with 80+ impressive Angular Components.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-theme.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Styled or Unstyled</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Choose from a variety of pre-built themes or implement your design systems with the CSS library of your choice like TailwindCSS.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-community.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Community</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Connect with the other open source community members, collaborate and have a voice in the project roadmap.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-accessibility.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Accessibility</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Compliant with the Web Content Accessibility Guidelines (WCAG 2.0).</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-support.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Enterprise Support</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Exceptional support service featuring response within 1 business day and option to request enhancements and new features for the library.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-mobile.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Mobile</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">First class support for responsive design led by touch optimized elements.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-productivity.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Blocks</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">500+ pre-designed copy paste ready UI blocks to build spectacular apps in no time.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-5 w-full animate-duration-500" pAnimateOnScroll enterClass="animate-fadein">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-ts.svg" alt="components icon" class="block mb-3.5" />
                                <div class="font-semibold mb-3.5">Typescript</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Top-notch support for Typescript with types and tooling assistance.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
})
export class FeaturesSectionComponent {
    constructor(private configService: AppConfigService) {}

    get isDarkMode() {
        return this.configService.appState().darkTheme;
    }
}
