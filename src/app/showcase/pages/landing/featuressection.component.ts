import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppConfigService } from '@service/appconfigservice';

@Component({
    selector: 'features-section',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="landing-features py-20">
            <div class="section-header">Features</div>
            <p class="section-detail">PrimeNG is the most complete solution for your UI requirements.</p>
            <div class="mt-16 px-8 lg:px-20">
                <div class="features-container">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-components.svg" width="30" height="25" class="block mb-3" alt="components icon" />
                                <div class="font-semibold mb-4 text-lg">80+ UI Components</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">The ultimate set of UI Components to assist you with 80+ impressive Angular Components.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-community.svg" width="30" height="25" alt="components icon" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Community</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Connect with the other open source community members, collaborate and have a voice in the project roadmap.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-productivity.svg" width="30" height="25" alt="components icon" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Productivity</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Boost your productivity by achieving more in less time and accomplish amazing results.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-accessibility.svg" alt="components icon" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Accessibility</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Compliant with the Web Content Accessibility Guidelines (WCAG 2.0).</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-support.svg" alt="components icon" width="30" height="25" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Enterprise Support</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Exceptional support service featuring response within 1 business day and option to request enhancements and new features for the library.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-mobile.svg" width="30" height="25" alt="components icon" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Mobile</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">First class support for responsive design led by touch optimized elements.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-theme.svg" width="30" height="25" alt="components icon" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Themes</div>
                                <p class="m-0 text-surface-500 dark:text-surface-400 font-medium">Built on a design-agnostic api, choose from a vast amount of themes such as Material, Bootstrap, custom or develop your own.</p>
                            </div>
                        </div>
                        <div class="col-span-12 md:col-span-6 xl:col-span-3 flex justify-center">
                            <div class="box p-6 w-full animate-duration-500">
                                <img src="https://primefaces.org/cdn/primeng/images/landing/features/icon-ts.svg" width="30" height="25" alt="components icon" class="block mb-3" />
                                <div class="font-semibold mb-4 text-lg">Typescript</div>
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
        return this.configService.config().darkMode;
    }
}