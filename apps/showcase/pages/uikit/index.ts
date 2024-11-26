import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RippleModule } from 'primeng/ripple';
import { Subscription } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, RippleModule],
    template: `
        <div>
            <div style="border-radius: 50px; max-height: 500px" class="overflow-hidden mb-8 flex items-center">
                <img alt="PrimeNG Designer" src="https://primefaces.org/cdn/primeng/images/uikit/primeone-cover-{{ isDarkMode ? 'dark' : 'light' }}.jpeg" class="w-full" />
            </div>

            <div class="card mb-8" style="border-radius: 50px">
                <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-20">
                    <div class="w-full md:w-6/12">
                        <img alt="PrimeNG Designer" src="https://primefaces.org/cdn/primeng/images/uikit/uikit-figma.png" class="w-full" />
                    </div>
                    <div class="w-full md:w-6/12">
                        <div class="text-primary font-bold mb-2">UP-TO-DATE</div>
                        <div class="text-surface-900 dark:text-surface-0 text-5xl font-bold mb-4">Best Features of Figma</div>
                        <p class="mb-4 text-lg">PrimeOne for Figma uses the latest powerful features like components, variants, auto layout, styles, variables and interactive components. It'll always follow the best practices.</p>

                        <ul class="flex flex-wrap m-0 p-0 text-lg">
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Auto Layout</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Variants</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Variables and Styles</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Interactive Components</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Boolean, Instance Swap and Text Properties</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Nested Instances</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-20">
                    <div class="w-full md:w-6/12">
                        <div class="text-primary font-bold mb-2">ENTERPRISE GRADE</div>
                        <div class="text-surface-900 dark:text-surface-0 text-5xl font-bold mb-4">Powerful System</div>
                        <p class="mb-4 text-lg">Save countless hours on every project with a carefully designed system that uses Prime UI Suite components. Start producing design results in no time.</p>

                        <ul class="flex flex-wrap m-0 p-0 text-lg">
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Numerous Components</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Icon Library</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Easy Customization</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Atomic Approach</span>
                            </li>
                        </ul>
                    </div>
                    <div class="w-full md:w-6/12">
                        <img alt="PrimeNG Designer" src="https://primefaces.org/cdn/primeng/images/uikit/uikit-system.png" class="w-full" />
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20 mb-20">
                    <div class="w-full md:w-6/12">
                        <img alt="PrimeNG Designer" src="https://primefaces.org/cdn/primeng/images/uikit/uikit-themes.png" class="w-full" />
                    </div>
                    <div class="w-full md:w-6/12">
                        <div class="text-primary font-bold mb-2">DARK MODE</div>
                        <div class="text-surface-900 dark:text-surface-0 text-5xl font-bold mb-4">Two Themes</div>
                        <p class="mb-4 text-lg">PrimeOne is designed based on Aura Light and Aura Dark themes. Easily change the themes of your designs using Figma's Swap Library feature or Tokens Studio Sets.</p>

                        <ul class="flex flex-wrap m-0 p-0 text-lg">
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Aura Light</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Aura Dark</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-center gap-6 md:gap-20">
                    <div class="w-full md:w-6/12">
                        <div class="text-primary font-bold mb-2">TOKENS STUDIO</div>
                        <div class="text-surface-900 dark:text-surface-0 text-5xl font-bold mb-4">Tokens Support</div>
                        <p class="mb-4 text-lg">Empower yourself with unprecedented control over your designs. Tokens Studio integration unlocks a whole new level of flexibility, allowing you to create and manage design tokens seamlessly.</p>

                        <ul class="flex flex-wrap m-0 p-0 text-lg">
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Countless Design Tokens</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Light and Dark Sets</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Well Documented</span>
                            </li>
                            <li class="flex items-center w-6/12 p-4">
                                <i class="pi pi-check-circle text-green-600 mr-2"></i>
                                <span class="font-bold">Primitive, Semantic and Component Tokens</span>
                            </li>
                        </ul>
                    </div>
                    <div class="w-full md:w-6/12">
                        <img alt="Tokens Support" src="https://primefaces.org/cdn/primeng/images/uikit/uikit-tokens.png" class="w-full" />
                    </div>
                </div>
            </div>

            <div class="flex flex-col md:flex-row gap-6 md:gap-6 mb-8">
                <a
                    href="https://www.figma.com/design/G855HjuSyK8viJr0a5ZjRG/Preview-%7C%C2%A0PrimeOne-%7C-3.0.1?node-id=830-41631&t=m1MbOTTqKsBSRBLS-1"
                    class="p-8 w-full md:w-6/12 bg-white flex flex-col items-center border-2 border-transparent hover:border-primary transition-colors duration-300"
                    style="border-radius: 50px"
                >
                    <span class="text-gray-900 text-4xl font-bold mb-8">Preview Light</span>
                    <img alt="Figma Light" src="https://primefaces.org/cdn/primeng/images/uikit/logo-figma-light.svg" class="w-16" />
                </a>
                <a
                    href="https://www.figma.com/design/XBQzDl4vDOO0pyxEGYcICt/Preview-%7C%C2%A0Dark-%7C-PrimeOne-%7C-3.0.1?node-id=806-36648&t=7AME0kw905t3PVVY-1"
                    class="p-8 w-full md:w-6/12 bg-gray-900 flex flex-col items-center border-2 border-transparent hover:border-primary transition-colors duration-300"
                    style="border-radius: 50px"
                >
                    <span class="text-white text-4xl font-bold mb-8">Preview Dark</span>
                    <img alt="Figma Dark" src="https://primefaces.org/cdn/primeng/images/uikit/logo-figma-dark.svg" class="w-16" />
                </a>
            </div>

            <div class="card mb-8" style="border-radius: 50px">
                <div class="text-surface-900 dark:text-surface-0 font-bold text-5xl mb-6 text-center">Pricing</div>
                <div class="mb-2 text-center leading-normal text-lg">Choose the right plan for your business. Whether you are an individual or a member of a team, UI Kit is available for affordable prices.</div>
                <a href="https://www.primefaces.org/uikit/licenses" class="mb-12 text-primary font-medium hover:underline text-center block">View License Details</a>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 lg:col-span-4">
                        <div class="p-4 h-full">
                            <div class="shadow p-8 h-full flex flex-col bg-surface-0 dark:bg-surface-900" style="border-radius: 6px">
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Single Designer</div>
                                <div class="text-surface-600 dark:text-surface-200 font-medium">For individual designers</div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <div class="flex gap-4 flex-wrap">
                                    <span class="text-2xl font-bold text-surface-900 dark:text-surface-0 line-through text-muted-color">$99</span>
                                    <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">$49</span>
                                </div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <ul class="list-none p-0 m-0 grow text-lg">
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span class="font-bold">1 Designer</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Auto Layout & Variants</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Interactive Components</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Tokens Studio Support</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Lifetime Support</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Use on Unlimited Projects</span>
                                    </li>
                                </ul>
                                <hr class="mb-4 mx-0 border-t border-0 border-surface mt-auto" />
                                <a href="https://www.primefaces.org/store/uikit.xhtml" pRipple class="bg-blue-500 text-white hover:bg-blue-400 p-4 w-full rounded-border text-center transition-colors duration-300 font-bold">Buy Now</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4">
                        <div class="p-4 h-full">
                            <div class="shadow p-8 h-full flex flex-col bg-surface-0 dark:bg-surface-900" style="border-radius: 6px">
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Team</div>
                                <div class="text-surface-600 dark:text-surface-200 font-medium">For small teams</div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <div class="flex gap-4 flex-wrap">
                                    <div class="flex gap-4 flex-wrap">
                                        <span class="text-2xl font-bold text-surface-900 dark:text-surface-0 line-through text-muted-color">$249</span>
                                        <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">$149</span>
                                    </div>
                                </div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <ul class="list-none p-0 m-0 grow text-lg">
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span class="font-bold">Up to 5 Designers</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Auto Layout & Variants</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Interactive Components</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Tokens Studio Support</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Lifetime Support</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Use on Unlimited Projects</span>
                                    </li>
                                </ul>
                                <hr class="mb-4 mx-0 border-t border-0 border-surface" />
                                <a href="https://www.primefaces.org/store/uikit.xhtml" pRipple class="bg-purple-500 text-white hover:bg-purple-400 p-4 w-full rounded-border text-center transition-colors duration-300 font-bold">Buy Now</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-4">
                        <div class="p-4 h-full">
                            <div class="shadow p-8 flex flex-col bg-surface-0 dark:bg-surface-900" style="border-radius: 6px">
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Enterprise</div>
                                <div class="text-surface-600 dark:text-surface-200 font-medium">For large teams</div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <div class="flex gap-4 flex-wrap">
                                    <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">EXCLUSIVE DEALS</span>
                                </div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <ul class="list-none p-0 m-0 grow text-lg">
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span class="font-bold">Unlimited Designers</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Auto Layout & Variants</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Interactive Components</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Tokens Studio Support</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Lifetime Support</span>
                                    </li>
                                    <li class="flex items-center mb-4">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Use on Unlimited Projects</span>
                                    </li>
                                </ul>
                                <hr class="mb-4 mx-0 border-t border-0 border-surface" />
                                <a href="mailto:contact@primetek.com.tr" pRipple class="bg-slate-500 text-white hover:bg-slate-400 p-4 w-full rounded-border text-center transition-colors duration-300 font-bold">Contact Us</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card" style="border-radius: 50px">
                <span class="block font-bold text-5xl mb-8 text-center text-surface-900 dark:text-surface-0">Frequently Asked Questions</span>
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 lg:col-span-4 px-2 lg:px-8">
                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">What do I get when I purchase a license?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">You'll be able to download two Figma files for light and dark themes.</p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">Is there a recurring fee or is the license perpetual?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">UI Kit license is perpetual so requires one time payment, not subscription based.</p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">Can I use UI Kit license for commercial projects?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">Yes, your license allows you to sell your projects that utilize the UI Kit implementations.</p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">Can I create multiple projects for multiple clients?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">There is no limit, you are able to use UI Kit in multiple projects for multiple clients.</p>
                    </div>
                    <div class="col-span-12 lg:col-span-4 px-2 lg:px-8">
                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 text-surface-900 dark:text-surface-0">We're a reseller, are we able to purchase a license on behalf of our client?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">
                            Yes, after the purchase, please
                            <a href="mailto:contact@primetek.com.tr" class="text-primary font-medium hover:underline">contact us</a> so we can transfer the license to your client.
                        </p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">Does the enterprise license include contractors within the organization?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">Yes, contractors are also able to use the UI Kit within your company.</p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">Can subsidiary company of a larger organization share the enterprise license?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">No, enterprise license is per company so each subsidiary company needs to purchase a separate license.</p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">What does "free updates" mean?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">All updates will be totally free of charge for existing customers for an unlimited period.</p>
                    </div>
                    <div class="col-span-12 lg:col-span-4 px-2 lg:px-8">
                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">How can I get support?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">
                            Support is provided by PrimeTek via
                            <a href="https://github.com/orgs/primefaces/discussions/categories/figma-ui-kit" class="text-primary font-medium hover:underline">a dedicated forum channel monitored</a>
                            by PrimeTek support staff.
                        </p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">What does lifetime support mean?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">Support service at the forum does not have a time limit.</p>

                        <div class="text-xl text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium text-surface-900 dark:text-surface-0">Can I include UI Kit in an open source project?</div>
                        <p class="mt-0 mb-12 p-0 leading-normal text-lg text-surface-800 dark:text-surface-50">Due to the license, it is not possible to use the UI Kit in an open source project where the design files are publicly available.</p>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class UIKitDemo {
    subscription: Subscription;

    constructor(
        private configService: AppConfigService,
        private titleService: Title,
        private metaService: Meta
    ) {
        this.titleService.setTitle('UI Kit - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'PrimeNG Angular UI Kit' });
    }

    get isDarkMode(): boolean {
        return this.configService.appState().darkTheme;
    }
}
