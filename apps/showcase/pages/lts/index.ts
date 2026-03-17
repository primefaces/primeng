import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { TagModule } from 'primeng/tag';

@Component({
    standalone: true,
    imports: [CommonModule, TagModule, AppCode, RouterModule, RippleModule],
    template: `
        <div>
            <div class="flex flex-col xl:flex-row mb-7 gap-7">
                <div class="card xl:w-3/12 m-0 relative overflow-hidden">
                    <i class="pi pi-github absolute text-surface-200 dark:text-surface-600" style="bottom: -50px; right: -50px; font-size: 200px; transform: rotateX(45deg) rotateY(0deg) rotateZ(-45deg)"></i>
                    <div class="text-xl text-surface-900 dark:text-surface-0 font-semibold mb-4 relative">Community Versions</div>
                    <p class="m-0 leading-normal relative text-surface-800 dark:text-surface-50">
                        Angular is a fast paced technology with a new major version every 6 months. PrimeNG release cycle is aligned with Angular and every 6 months a new major PrimeNG version is released as open source that is compatible with the
                        latest Angular core. The maintenance releases of the latest PrimeNG version are provided as free and open source for the following 6 months until the new major Angular version is ready.
                    </p>
                </div>
                <div class="card m-0 xl:w-9/12 text-white bg-cover" style="background-image: url('https://primefaces.org/cdn/primeng/images/lts/card-lts.jpg')">
                    <div class="text-xl font-semibold mb-4">LTS Versions</div>
                    <p class="m-0 leading-normal">
                        Majority of the existing applications prefer to remain at a previous version due to stability requirements instead of upgrading to the latest version immediately. PrimeNG LTS is a support service to provide a license for the
                        finest compatible version suited to you. LTS covers the prior two versions from the latest release, this means up to 18 months of almost bi-weekly releases to bring the latest defect fixes and security updates to your project.
                        As an example, when PrimeNG moves to Angular 20, v19 and v18 will move to LTS support whereas STS (short term support) versions of PrimeNG 20 will be open source under MIT license for at least 6 months until Angular/PrimeNG 21
                        is released.
                    </p>
                </div>
            </div>
            <div class="card mb-7">
                <div class="text-xl text-surface-900 dark:text-surface-0 font-semibold mb-4">Version Support</div>
                <p class="m-0 leading-normal mb-7 text-secondary text-surface-800 dark:text-surface-50">
                    <b>STS</b> means open source short term support whereas <b>LTS</b> stands for commercial long term support. Legacy versions are only supported by
                    <a [routerLink]="['/support']" class="text-primary font-medium hover:underline">PrimeNG PRO.</a>
                </p>

                <div class="doc-tablewrapper">
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th class="text-surface-900 dark:text-surface-0 font-semibold text-lg text-left p-2">Version</th>
                                <th class="text-surface-900 dark:text-surface-0 font-semibold text-lg text-left p-2">Status</th>
                                <th class="text-surface-900 dark:text-surface-0 font-semibold text-lg text-left p-2">End of STS</th>
                                <th class="text-surface-900 dark:text-surface-0 font-semibold text-lg text-left p-2">End of LTS</th>
                                <th class="text-surface-900 dark:text-surface-0 font-semibold text-lg text-left p-2">Changes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v20" class="px-3"></p-tag>
                                </td>
                                <td class="p-2">STS</td>
                                <td class="p-2">After v21 release</td>
                                <td class="p-2">After v23 release</td>
                                <td class="p-2"><a href="https://github.com/primefaces/primeng/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">Changelog</a></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v19" class="px-3" severity="success"></p-tag>
                                </td>
                                <td class="p-2">LTS</td>
                                <td class="p-2">After v20 release</td>
                                <td class="p-2">After v22 release</td>
                                <td class="p-2"><a href="https://github.com/primefaces/primeng/blob/master/changelog-lts/v19-LTS.md" target="_blank" rel="noopener noreferrer">Changelog</a></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v18" class="px-3" severity="success"></p-tag>
                                </td>
                                <td class="p-2">LTS</td>
                                <td class="p-2">After v19 release</td>
                                <td class="p-2">After v21 release</td>
                                <td class="p-2"><a href="https://github.com/primefaces/primeng/blob/master/changelog-lts/v18-LTS.md" target="_blank" rel="noopener noreferrer">Changelog</a></td>
                            </tr>

                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v17" class="px-3" severity="danger"></p-tag>
                                </td>
                                <td class="p-2">Legacy</td>
                                <td class="p-2">After v18 release</td>
                                <td class="p-2">After v20 release</td>
                                <td class="p-2"></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v16" class="px-3" severity="danger"></p-tag>
                                </td>
                                <td class="p-2">Legacy</td>
                                <td class="p-2">After v17 release</td>
                                <td class="p-2">After v19 release</td>
                                <td class="p-2"></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v15" class="px-3" severity="danger"></p-tag>
                                </td>
                                <td class="p-2">Legacy</td>
                                <td class="p-2">After v16 release</td>
                                <td class="p-2">After v18 release</td>
                                <td class="p-2"></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v14" class="px-3" severity="danger"></p-tag>
                                </td>
                                <td class="p-2">Legacy</td>
                                <td class="p-2">After v15 release</td>
                                <td class="p-2">After v17 release</td>
                                <td class="p-2"></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v13" class="px-3" severity="danger"></p-tag>
                                </td>
                                <td class="p-2">Legacy</td>
                                <td class="p-2">After v14 release</td>
                                <td class="p-2">After v16 release</td>
                                <td class="p-2"></td>
                            </tr>
                            <tr class="text-surface-800 dark:text-surface-50">
                                <td class="p-2">
                                    <p-tag value="v12" class="px-3" severity="danger"></p-tag>
                                </td>
                                <td class="p-2">Legacy</td>
                                <td class="p-2">After v13 release</td>
                                <td class="p-2">After v15 release</td>
                                <td class="p-2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card mb-7">
                <div class="text-xl text-surface-900 dark:text-surface-0 font-semibold mb-7">LTS License</div>

                <div class="flex flex-col md:flex-row gap-7">
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <i class="pi pi-check-circle mr-4 text-green-500"></i>
                            <span class="text-surface-900 dark:text-surface-0 font-semibold text-lg">Security</span>
                        </div>
                        <p class="m-0 leading-normal mb-4 text-secondary text-surface-800 dark:text-surface-50">
                            PrimeNG comes with a commitment to provide long-term support, including regular security updates to keep your system protected against emerging threats.
                        </p>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <i class="pi pi-check-circle mr-4 text-green-500"></i>
                            <span class="text-surface-900 dark:text-surface-0 font-semibold text-lg">Maintenance</span>
                        </div>
                        <p class="m-0 leading-normal mb-4 text-secondary text-surface-800 dark:text-surface-50">
                            We understand the importance of maintaining a stable and reliable software system. Our team will provide ongoing maintenance to ensure that the software continues to function seamlessly and efficiently.
                        </p>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center mb-2">
                            <i class="pi pi-check-circle mr-4 text-green-500"></i>
                            <span class="text-surface-900 dark:text-surface-0 font-semibold text-lg">Enhancements</span>
                        </div>
                        <p class="m-0 leading-normal mb-4 text-secondary text-surface-800 dark:text-surface-50">
                            We are dedicated to continuously improving PrimeNG to meet the evolving needs of our users. As part of our long-term support, we will provide regular updates and enhancements to add new features and functionality.
                        </p>
                    </div>
                </div>
            </div>
            <div class="card mb-7">
                <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl mb-5 text-center">Pricing</div>
                <div class="mb-2 text-center leading-normal text-sm">Choose the right plan for your business.</div>
                <a href="https://www.primefaces.org/lts/licenses" class="mb-11 text-primary font-medium hover:underline text-center block text-sm">View License Details</a>

                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-12 lg:col-span-6">
                        <div class="p-3 h-full">
                            <div class="shadow-sm p-7 h-full flex flex-col bg-surface-0 dark:bg-surface-900" style="border-radius: 6px">
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-lg mb-2">Basic License</div>
                                <div class="text-surface-600 dark:text-surface-200 font-medium text-sm">Annual</div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <div class="flex gap-4 flex-wrap">
                                    <div class="flex gap-4 flex-wrap">
                                        <span class="text-xl font-bold">$249</span>
                                    </div>
                                </div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <ul class="list-none p-0 m-0 grow">
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span class="font-bold">Expires After 1 Year</span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Warning Message at Runtime After Expiry</span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Eligible for <strong>1 Major Version</strong></span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Unlimited Developers</span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Unlimited Projects</span>
                                    </li>
                                </ul>
                                <hr class="mb-4 mx-0 border-t border-0 border-surface mt-auto" />
                                <a href="https://primeui.store/lts" pRipple class="bg-blue-500 text-white hover:bg-blue-400 p-3 w-full rounded-border text-center transition-colors duration-300 font-bold">Buy Now</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-12 lg:col-span-6">
                        <div class="p-3 h-full">
                            <div class="shadow-sm p-7 h-full flex flex-col bg-surface-0 dark:bg-surface-900" style="border-radius: 6px">
                                <div class="text-surface-900 dark:text-surface-0 font-medium text-lg mb-2">Extended License</div>
                                <div class="text-surface-600 dark:text-surface-200 font-medium text-sm">Perpetual</div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <div class="flex gap-4 flex-wrap">
                                    <div class="flex gap-4 flex-wrap">
                                        <span class="text-xl font-bold">$990</span>
                                    </div>
                                </div>
                                <hr class="my-4 mx-0 border-t border-0 border-surface" />
                                <ul class="list-none p-0 m-0 grow">
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span class="font-bold">No Expiry</span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>No Warning Message at Runtime</span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Eligible for <strong>1 Major Version</strong></span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Unlimited Developers</span>
                                    </li>
                                    <li class="flex items-center mb-3">
                                        <i class="pi pi-check-circle text-green-500 mr-2"></i>
                                        <span>Unlimited Projects</span>
                                    </li>
                                </ul>
                                <hr class="mb-4 mx-0 border-t border-0 border-surface" />
                                <a href="https://primeui.store/lts" pRipple class="bg-purple-500 text-white hover:bg-purple-400 p-3 w-full rounded-border text-center transition-colors duration-300 font-bold">Buy Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card mb-7">
                <div class="text-xl text-surface-900 dark:text-surface-0 font-semibold mb-4">Usage</div>
                <p class="m-0 leading-normal mb-7 text-secondary text-surface-800 dark:text-surface-50">
                    LTS versions require a license key and a pass key to be verified at your main app component or main.ts before bootstrap process. The keys would be available at
                    <a href="https://primeui.store/lts" class="text-primary font-medium hover:underline">PrimeStore</a>
                    under LTS Licenses section.
                </p>
                <app-code [code]="code" [hideToggleCode]="true"></app-code>
            </div>
            <div class="card m-0">
                <div class="text-xl text-surface-900 dark:text-surface-0 font-semibold mb-7">Frequently Asked Questions</div>
                <div class="flex flex-wrap -ml-7 -mt-7">
                    <div class="w-full lg:w-4/12 p-7">
                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Do I have to purchase a license for PrimeNG?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">No, only the versions that have the <b>-lts</b> suffix required a paid license. Any other version is open source under MIT license.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Is LTS License mandatory to use PrimeNG?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">No, LTS is totally optional if you cannot update to latest Angular immediately and still would like to receive updates for your version.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">How long is the duration of the LTS license?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">Duration is 1 year for Basic License, for Extended License there is no limit.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">What happens after the LTS license duration ends?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">
                            A message will be displayed at the application screen and license needs to be renewed at PrimeStore. This only applies to Basic License as Extended License has no time limit.
                        </p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Is a license bound to a specific major version?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">Yes, a license key is tied to the major version such as 15 and same license key cannot be used on another major version like 14.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">How can I assign my LTS license to a version?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">At PrimeStore, there is an "Assign" feature that activates your license by selecting a version.</p>
                    </div>
                    <div class="w-full lg:w-4/12 p-7">
                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Does the license renew automatically?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">No, renewal should be done manually at PrimeStore.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">How are LTS and Community versions differentiated at NPM?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">LTS releases have <span class="font-bold">-lts</span> suffix such as <span class="font-bold">14.2.4-lts</span>.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Is the license per organization, per developer or per cpu/server?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">LTS license is per organization, there is no limit on the number of developers, projects or hardware.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Can subsidiary companies share the license of a parent company?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">No, license owner needs to be a separate entity as a result each company requires a separate license.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Does LTS provide a support contact?</div>
                        <p class="mt-0 p-0 leading-normal text-surface-800 dark:text-surface-50">No, PrimeNG PRO is the service where response of PrimeTek engineers is secured within 1 business day.</p>
                    </div>
                    <div class="w-full lg:w-4/12 p-7">
                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Can LTS releases be used in open source projects?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">No, this means violation of the license as keys cannot be shared.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">Does PRO provide access to the LTS releases?</div>
                        <p class="mt-0 mb-7 p-0 leading-normal text-surface-800 dark:text-surface-50">Yes, PRO users are granted a basic license.</p>

                        <div class="text-surface-900 dark:text-surface-0 leading-normal mb-2 font-medium">What is the difference between LTS and PRO?</div>
                        <p class="mt-0 p-0 leading-normal text-surface-800 dark:text-surface-50">
                            PrimeNG PRO is a premium support service delivered via an exclusive JIRA instance where support engineers of PrimeTek provide assistance within 1 business day to the raised tickets. LTS on the other hand provides a license
                            to utilize the long term support versions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class LTSDemo {
    code: Code = {
        typescript: `import { Component } from '@angular/core';
import { LicenseManager } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    ngOnInit() {
        LicenseManager.verify('LICENSE_KEY', 'PASS_KEY');    
    }
        
}`
    };

    constructor(
        private titleService: Title,
        private metaService: Meta
    ) {
        this.titleService.setTitle('Long Term Support - PrimeNG');
        this.metaService.updateTag({ name: 'description', content: 'Long Term Support' });
    }
}
