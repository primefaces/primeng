import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    template: ` <div>
        <div class="doc-intro">
            <h1>Partners</h1>
            <p>
                PrimeTek proudly collaborates with a diverse range of partners, each bringing their unique expertise and contributions to the table. These partnerships play a pivotal role in our pursuit of delivering exceptional software solutions
                and driving innovation in the industry.
            </p>
        </div>

        <div class="card">
            <ul class="list-none p-0 m-0">
                <li class="flex flex-col md:flex-row items-center gap-8 border-b border-surface pb-8">
                    <div class="w-80 text-center">
                        <a href="https://fiyu.app/fiyu-pricing?utm_medium=referral&utm_source=primetek&utm_campaign=primetek">
                            <img src="https://primefaces.org/cdn/primeng/images/partners/fiyu.png" alt="Fiyu" class="w-full" />
                        </a>
                    </div>
                    <div class="flex flex-col flex-1 gap-2">
                        <span class="text-4xl font-bold">FIYU</span>
                        <span class="text-lg leading-normal">Full code RAD platform with predefined modules and all around infrastructure to launch your high quality products to market in no time.</span>
                    </div>
                </li>
                <li class="flex flex-col md:flex-row items-center gap-8 mb-8 border-b border-surface py-8">
                    <div class="w-80 text-center">
                        <a href="https://www.t2.com.tr">
                            <img src="https://primefaces.org/cdn/primeng/images/partners/t2.svg" alt="T2" class="w-56" />
                        </a>
                    </div>
                    <div class="flex flex-col flex-1 gap-2">
                        <span class="text-4xl font-bold">T2 Software</span>
                        <span class="text-lg leading-normal">PrimeTek is now partnering with T2 Software to connect you with experienced development teams that can build feature-rich, end-to-end custom applications.</span>
                    </div>
                </li>
                <li class="flex flex-col md:flex-row items-center gap-8 mb-8 pt-8">
                    <div class="w-80">
                        <a href="https://virtua.tech" class="block w-full text-center bg-gray-900 py-8 rounded-border">
                            <img src="https://primefaces.org/cdn/primeng/images/partners/virtua.svg" alt="Virtua" class="w-40" />
                        </a>
                    </div>
                    <div class="flex flex-col flex-1 gap-2">
                        <span class="text-4xl font-bold">Virtua Tech</span>
                        <span class="text-lg leading-normal"
                            >Virtua.tech is a PrimeTek reseller and also provides expert assistance with architecture, development, mentoring, and training for PrimeTek products as well as Capacitor, Jakarta EE, MicroProfile, and other
                            technologies.</span
                        >
                    </div>
                </li>
            </ul>
        </div>
    </div>`
})
export class PartnersDemo {}
