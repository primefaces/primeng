import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AppConfigService } from '@service/appconfigservice';

@Component({
    selector: 'templates-section',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="landing-templates theme-dark py-20">
            <div class="section-header relative z-30">Templates</div>
            <p class="section-detail relative z-30">Professionally designed highly customizable application templates to get started in style.</p>
            <div class="flex justify-center mt-12 relative z-30">
                <a href="https://www.primefaces.org/store" class="linkbox linkbox-primary">
                    <span>Explore All</span>
                    <i class="pi pi-arrow-right ml-2"></i>
                </a>
            </div>
            <section class="templates templates-animation flex justify-center items-center flex-col mt-16">
                <div class="flex md:flex-row flex-col gap-12 lg:gap-0">
                    <div
                        class="template-block block-5 mr-2 lg:mb-0 flex justify-center items-center"
                        [ngStyle]="{ 'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/templates/verona-dark-v17.jpg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/templates/verona-light-v17.jpg)' }"

                    >
                        <a class="templates-btn" href="https://www.primefaces.org/verona-ng" target="_blank">Verona Preview</a>
                    </div>
                    <div
                        class="template-block block-2 ml-2 flex justify-center items-center"
                        [ngStyle]="{ 'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/templates/freya-dark-v17.jpg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/templates/freya-light-v17.jpg)' }"
                
                    >
                        <a class="templates-btn" href="https://www.primefaces.org/freya-ng/" target="_blank">Freya Preview</a>
                    </div>
                </div>
                <div class="flex my-12 md:flex-row flex-col gap-12 lg:gap-0">
                    <div
                        class="template-block block-3 mr-2 lg:mb-0 flex justify-center items-center"
                        [ngStyle]="{
                            'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/templates/atlantis-dark-v17.jpg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/templates/atlantis-light-v17.jpg)'
                        }"
                
                    >
                        <a class="templates-btn" href="https://www.primefaces.org/atlantis-ng/" target="_blank">Atlantis Preview</a>
                    </div>
                    <div   class="template-block block-middle mr-2 hidden lg:flex justify-center items-center flex-col">

                        <img
                        height="110" 
                            [src]="isDarkMode ? 'https://primefaces.org/cdn/primeng/images/landing/templates/templates-text-dark-v17.png' : 'https://primefaces.org/cdn/primeng/images/landing/templates/templates-text-light-v17.png'"
                        />
                    </div>
                    <div
                        class="template-block block-4 ml-2 flex justify-center items-center"
                        [ngStyle]="{ 'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/templates/apollo-dark-v17.jpg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/templates/apollo-light-v17.jpg)' }"
                
                    >
                        <a class="templates-btn" href="https://www.primefaces.org/apollo-ng/" target="_blank">Apollo Preview</a>
                    </div>
                </div>
                <div class="flex md:flex-row flex-col gap-12 lg:gap-0">
                    <div
                        class="template-block block-1 mr-2 lg:mb-0 flex justify-center items-center"
                        [ngStyle]="{
                            'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/templates/diamond-dark-v17.jpg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/templates/diamond-light-v17.jpg)'
                        }"
                
                    >
                        <a class="templates-btn" href="https://www.primefaces.org/diamond-ng/" target="_blank">Diamond Preview</a>
                    </div>
                    <div
                        class="template-block block-6 ml-2 flex justify-center items-center"
                        [ngStyle]="{ 'background-image': isDarkMode ? 'url(https://primefaces.org/cdn/primeng/images/landing/templates/ultima-dark-v17.jpg)' : 'url(https://primefaces.org/cdn/primeng/images/landing/templates/ultima-light-v17.jpg)' }"
                
                    >
                        <a class="templates-btn" href="https://www.primefaces.org/ultima-ng/" target="_blank">Ultima Preview</a>
                    </div>
                </div>
                <div class="lines">
                    <div class="top">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div class="left">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
        </section>
    `
})
export class TemplateSectionComponent {
    constructor(private configService: AppConfigService) {}

    get isDarkMode() {
        return this.configService.config().darkMode;
    }
}
