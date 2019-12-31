import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { DomHandler } from '../components/dom/domhandler';
// import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <div class="layout-config" [ngClass]="{'layout-config-active': configActive}" (click)="onConfigClick()">
            <div class="layout-config-content-wrapper">
                <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
                    <i class="pi pi-cog"></i>
                </a>
                <a style="cursor: pointer" class="layout-config-close" (click)="onConfigCloseClick($event)">
                    <i class="pi pi-times"></i>
                </a>
                <div class="layout-config-content">
                    <div class="free-themes">
                        <h1 style="margin-top: 0">FREE THEMES</h1>
                        <p>Built-in component themes created by the <a href="https://www.primefaces.org/designer/primeng">PrimeNG Theme Designer</a>.</p>
                        <div class="p-grid">
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-nova-light.png" alt="Nova Light" (click)="changeTheme($event, 'nova-light', false)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'nova-light'"></i>
                                </a>
                                <span>Nova-Light</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-nova-dark.png" alt="Nova Dark" (click)="changeTheme($event, 'nova-dark', false)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'nova-dark'"></i>
                                </a>
                                <span>Nova-Dark</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-nova-colored.png" alt="Nova Colored" (click)="changeTheme($event, 'nova-colored', false)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'nova-colored'"></i>
                                </a>
                                <span>Nova-Colored</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-luna-blue.png" alt="Luna Blue" (click)="changeTheme($event, 'luna-blue', true)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'luna-blue'"></i>
                                </a>
                                <span>Luna-Blue</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-luna-green.png" alt="Luna Green" (click)="changeTheme($event, 'luna-green', true)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'luna-green'"></i>
                                </a>
                                <span>Luna-Green</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-luna-amber.png" alt="Luna Amber" (click)="changeTheme($event, 'luna-amber', true)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'luna-amber'"></i>
                                </a>
                                <span>Luna-Amber</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-luna-pink.png" alt="Luna Pink" (click)="changeTheme($event, 'luna-pink', true)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'luna-pink'"></i>
                                </a>
                                <span>Luna-Pink</span>
                            </div>
                            <div class="p-col-3">
                                <a style="cursor: pointer">
                                    <img src="./assets/showcase/images/layouts/themeswitcher-rhea.png" alt="Rhea" (click)="changeTheme($event, 'rhea', false)"/>
                                    <i class="pi pi-check" *ngIf="theme === 'rhea'"></i>
                                </a>
                                <span>Rhea</span>
                            </div>
                        </div>
                    </div>
                    <div class="premium-themes">
                        <h1>PREMIUM Angular CLI TEMPLATES</h1>
                        <p>Powered by Angular CLI, create awesome applications in no time using the premium templates of PrimeNG and impress your users.</p>
                        <div class="p-grid">
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/mirage-ng">
                                    <img alt="Mirage" src="./assets/showcase/images/layouts/mirage-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/prestige-ng">
                                    <img alt="Prestige" src="./assets/showcase/images/layouts/prestige-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/sapphire-ng">
                                    <img alt="Sapphire" src="./assets/showcase/images/layouts/sapphire-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/serenity-ng">
                                    <img alt="Serenity" src="./assets/showcase/images/layouts/serenity-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/ultima-ng">
                                    <img alt="Ultima" src="./assets/showcase/images/layouts/ultima-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/barcelona-ng">
                                    <img alt="Barcelona" src="./assets/showcase/images/layouts/barcelona-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/babylon-ng">
                                    <img alt="Babylon" src="./assets/showcase/images/layouts/babylon-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/roma-ng">
                                    <img alt="Roma" src="./assets/showcase/images/layouts/roma-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/olympia-ng">
                                    <img alt="Olympia" src="./assets/showcase/images/layouts/olympia-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/california-ng">
                                    <img alt="California" src="./assets/showcase/images/layouts/california-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/ecuador-ng">
                                    <img alt="Ecuador" src="./assets/showcase/images/layouts/ecuador-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/apollo-ng">
                                    <img alt="Apollo" src="./assets/showcase/images/layouts/apollo-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/manhattan-ng">
                                    <img alt="Manhattan" src="./assets/showcase/images/layouts/manhattan-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/manhattan-ng">
                                    <img alt="Harmony" src="./assets/showcase/images/layouts/harmony-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/verona-ng">
                                    <img alt="Verona" src="./assets/showcase/images/layouts/verona-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/paradise-ng">
                                    <img alt="Paradise" src="./assets/showcase/images/layouts/paradise-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/morpheus-ng">
                                    <img alt="Morpheus" src="./assets/showcase/images/layouts/morpheus-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/atlantis-ng">
                                    <img alt="Atlantis" src="./assets/showcase/images/layouts/atlantis-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/poseidon-ng">
                                    <img alt="Poseidon" src="./assets/showcase/images/layouts/poseidon-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12">
                                <a href="https://www.primefaces.org/layouts/omega-ng">
                                    <img alt="Omega" src="./assets/showcase/images/layouts/omega-ng.jpg">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent {

    theme = 'nova-light';

    outsideClickListener: any;

    configClick: boolean;

    configActive: boolean;

    changeTheme(event, theme: string, dark:boolean) {
        let themeElement = document.getElementById('theme-css');
            themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.theme, theme));
            this.theme = theme;
            const hasBodyDarkTheme = DomHandler.hasClass(document.body, 'dark-theme');

            if (dark) {
                if (!hasBodyDarkTheme) {
                    DomHandler.addClass(document.body, 'dark-theme');
                }
            }
            else if(hasBodyDarkTheme) {
                DomHandler.removeClass(document.body, 'dark-theme');
            }

            event.preventDefault();
    }

    onConfigButtonClick(event) {
        this.configActive = !this.configActive;
        
        if (this.configActive) {
            this.bindOutsideClickListener();
        }
        event.preventDefault();
    }

    onConfigCloseClick(event) {
        this.configActive = false;
        event.preventDefault();
    }


    onConfigClick() {
        this.configClick = true;
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (!this.configClick) {
                    this.configActive = false;
                    this.unbindOutsideClickListener();
                }

                this.configClick = false;
            };

            document.addEventListener('click', this.outsideClickListener);
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }
}
