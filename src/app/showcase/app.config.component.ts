import {Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from './service/appconfigservice';
import { AppConfig } from './domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-config',
    template: `
        <div class="layout-config" [ngClass]="{'layout-config-active': active}">
            <div class="layout-config-content-wrapper">
                <a tabindex="0" class="layout-config-button" (click)="toggleConfigurator($event)">
                    <i class="pi pi-cog"></i>
                </a>
                <a tabindex="0" class="layout-config-close" (click)="hideConfigurator($event)">
                    <i class="pi pi-times"></i>
                </a>

                <div class="layout-config-content">
                    <div>
                        <h4>Component Scale</h4>
                        <div class="config-scale">
                            <button icon="pi pi-minus" type="button" pButton (click)="decrementScale()" class="p-button-text" [disabled]="scale === scales[0]"></button>
                            <i class="pi pi-circle-on" *ngFor="let s of scales" [ngClass]="{'scale-active': s === scale}"></i>
                            <button icon="pi pi-plus"  type="button" pButton (click)="incrementScale()" class="p-button-text" [disabled]="scale === scales[scales.length - 1]"></button>
                        </div>

                        <app-inputStyleSwitch></app-inputStyleSwitch>

                        <h4>Ripple Effect</h4>
                        <p-inputSwitch [(ngModel)]="config.ripple" (onChange)="onRippleChange()"></p-inputSwitch>

                        <h4>Free Themes</h4>
                        <p>Built-in component themes created by the <a href="https://www.primefaces.org/designer/primeng">PrimeNG Theme Designer</a>.</p>

                        <h5>Bootstrap</h5>
                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'bootstrap4-light-blue', false)">
                                    <img src="assets/showcase/images/themes/bootstrap4-light-blue.svg" alt="Bootstrap Light Blue" />
                                </button>
                                <span>Blue</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'bootstrap4-light-purple', false)">
                                    <img src="assets/showcase/images/themes/bootstrap4-light-purple.svg" alt="Bootstrap Light Blue" />
                                </button>
                                <span>Purple</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'bootstrap4-dark-blue', true)">
                                    <img src="assets/showcase/images/themes/bootstrap4-dark-blue.svg" alt="Bootstrap Dark Blue" />
                                </button>
                                <span>Blue</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'bootstrap4-dark-purple', true)">
                                    <img src="assets/showcase/images/themes/bootstrap4-dark-purple.svg" alt="Bootstrap Dark Blue" />
                                </button>
                                <span>Purple</span>
                            </div>
                        </div>

                        <h5>Material Design</h5>
                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'md-light-indigo', false)">
                                    <img src="assets/showcase/images/themes/md-light-indigo.svg" alt="Material Light Indigo" />
                                </button>
                                <span>Indigo</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'md-light-deeppurple', false)">
                                    <img src="assets/showcase/images/themes/md-light-deeppurple.svg" alt="Material Light Deep Purple" />
                                </button>
                                <span>Deep Purple</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'md-dark-indigo', true)">
                                    <img src="assets/showcase/images/themes/md-dark-indigo.svg" alt="Material Dark Indigo" />
                                </button>
                                <span>Indigo</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'md-dark-deeppurple', true)">
                                    <img src="assets/showcase/images/themes/md-dark-deeppurple.svg" alt="Material Dark Deep Purple" />
                                </button>
                                <span>Deep Purple</span>
                            </div>
                        </div>

                        <h5>Material Design Compact</h5>
                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'mdc-light-indigo', false)">
                                    <img src="assets/showcase/images/themes/md-light-indigo.svg" alt="Material Compact Light Indigo"/>
                                </button>
                                <span>Indigo</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'mdc-light-deeppurple', false)">
                                    <img src="assets/showcase/images/themes/md-light-deeppurple.svg" alt="Material Compact Deep Purple" />
                                </button>
                                <span>Deep Purple</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'mdc-dark-indigo', true)">
                                    <img src="assets/showcase/images/themes/md-dark-indigo.svg" alt="Material Compact Dark Indigo" />
                                </button>
                                <span>Indigo</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'mdc-dark-deeppurple', true)">
                                    <img src="assets/showcase/images/themes/md-dark-deeppurple.svg" alt="Material Compact Dark Deep Purple" />
                                </button>
                                <span>Deep Purple</span>
                            </div>
                        </div>

                        <h5>Fluent UI</h5>
                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'fluent-light', false)">
                                    <img src="assets/showcase/images/themes/fluent-light.png" alt="Fluent Light"/>
                                </button>
                                <span>Light</span>
                            </div>
                        </div>

                        <h5>PrimeOne Design</h5>
                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'saga-blue', false)">
                                    <img src="assets/showcase/images/themes/saga-blue.png" alt="Saga Blue" />
                                </button>
                                <span>Saga Blue</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'saga-green', false)">
                                    <img src="assets/showcase/images/themes/saga-green.png" alt="Saga Green" />
                                </button>
                                <span>Saga Green</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'saga-orange', false)">
                                    <img src="assets/showcase/images/themes/saga-orange.png" alt="Saga Orange" />
                                </button>
                                <span>Saga Orange</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'saga-purple', false)">
                                    <img src="assets/showcase/images/themes/saga-purple.png" alt="Saga Purple" />
                                </button>
                                <span>Saga Purple</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'vela-blue', true)">
                                    <img src="assets/showcase/images/themes/vela-blue.png" alt="Vela Blue" />
                                </button>
                                <span>Vela Blue</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'vela-green', true)">
                                    <img src="assets/showcase/images/themes/vela-green.png" alt="Vela Green" />
                                </button>
                                <span>Vela Green</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'vela-orange', true)">
                                    <img src="assets/showcase/images/themes/vela-orange.png" alt="Vela Orange" />
                                </button>
                                <span>Vela Orange</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'vela-purple', true)">
                                    <img src="assets/showcase/images/themes/vela-purple.png" alt="Vela Purple" />
                                </button>
                                <span>Vela Purple</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'arya-blue', true)">
                                    <img src="assets/showcase/images/themes/arya-blue.png" alt="Arya Blue" />
                                </button>
                                <span>Arya Blue</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'arya-green', true)">
                                    <img src="assets/showcase/images/themes/arya-green.png" alt="Arya Green" />
                                </button>
                                <span>Arya Green</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'arya-orange', true)">
                                    <img src="assets/showcase/images/themes/arya-orange.png" alt="Arya Orange" />
                                </button>
                                <span>Arya Orange</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'arya-purple', true)">
                                    <img src="assets/showcase/images/themes/arya-purple.png" alt="Arya Purple" />
                                </button>
                                <span>Arya Purple</span>
                            </div>
                        </div>

                        <h4>Premium Themes</h4>
                        <p>Premium themes are only available exclusively for <a href="https://www.primefaces.org/designer/primeng">PrimeNG Theme Designer</a> subscribers and therefore not included in PrimeNG core.</p>

                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'soho-light', false)">
                                    <img src="assets/showcase/images/themes/soho-light.png" alt="Soho Light"/>
                                </button>
                                <span>Soho Light</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'soho-dark', true)">
                                <img src="assets/showcase/images/themes/soho-dark.png" alt="Soho Dark"/>
                                </button>
                                <span>Soho Dark</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'mira', false)">
                                    <img src="assets/showcase/images/themes/mira.jpg" alt="Mira"/>
                                </button>
                                <span>Mira</span>
                            </div>
                        </div>

                        <h4>Legacy Free Themes</h4>
                        <div class="p-grid free-themes">
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'nova', false)">
                                    <img src="assets/showcase/images/themes/nova.png" alt="Nova" />
                                </button>
                                <span>Nova</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'nova-alt', false)">
                                    <img src="assets/showcase/images/themes/nova-alt.png" alt="Nova Alt" />
                                </button>
                                <span>Nova Alt</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'nova-accent', false)">
                                    <img src="assets/showcase/images/themes/nova-accent.png" alt="Nova Accent" />
                                </button>
                                <span>Nova Accent</span>
                            </div>
                            <div class="p-col-3"></div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'luna-blue', true)">
                                    <img src="assets/showcase/images/themes/luna-blue.png" alt="Luna Blue" />
                                </button>
                                <span>Luna Blue</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'luna-green', true)">
                                    <img src="assets/showcase/images/themes/luna-green.png" alt="Luna Green" />
                                </button>
                                <span>Luna Green</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'luna-amber', true)">
                                    <img src="assets/showcase/images/themes/luna-amber.png" alt="Luna Amber" />
                                </button>
                                <span>Luna Amber</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'luna-pink', true)">
                                    <img src="assets/showcase/images/themes/luna-pink.png" alt="Luna Pink" />
                                </button>
                                <span>Luna Pink</span>
                            </div>
                            <div class="p-col-3">
                                <button class="p-link" (click)="changeTheme($event, 'rhea', false)">
                                    <img src="assets/showcase/images/themes/rhea.png" alt="Rhea" />
                                </button>
                                <span>Rhea</span>
                            </div>
                        </div>

                        <h4>Premium Angular-CLI Templates</h4>
                        <p>Beautifully crafted premium <a href="https://cli.angular.io/">Angular CLI</a> application templates by the PrimeTek design team.</p>
                        <div class="p-grid premium-themes">
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/diamond-ng">
                                    <img alt="Diamond" src="assets/showcase/images/layouts/diamond-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/mirage-ng">
                                    <img alt="Mirage" src="assets/showcase/images/layouts/mirage-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/prestige-ng">
                                    <img alt="Prestige" src="assets/showcase/images/layouts/prestige-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/sapphire-ng">
                                    <img alt="Sapphire" src="assets/showcase/images/layouts/sapphire-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/roma-ng">
                                    <img alt="Roma" src="assets/showcase/images/layouts/roma-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/babylon-ng">
                                    <img alt="Babylon" src="assets/showcase/images/layouts/babylon-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/olympia-ng">
                                    <img alt="Olympia" src="assets/showcase/images/layouts/olympia-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/california-ng">
                                    <img alt="California" src="assets/showcase/images/layouts/california-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/ecuador-ng">
                                    <img alt="Ecuador" src="assets/showcase/images/layouts/ecuador-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/harmony-ng">
                                    <img alt="Harmony" src="assets/showcase/images/layouts/harmony-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/apollo-ng">
                                    <img alt="Apollo" src="assets/showcase/images/layouts/apollo-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/serenity-ng">
                                    <img alt="Serenity" src="assets/showcase/images/layouts/serenity-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/avalon-ng">
                                    <img alt="Avalon" src="assets/showcase/images/layouts/avalon-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/verona-ng">
                                    <img alt="Verona" src="assets/showcase/images/layouts/verona-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/manhattan-ng">
                                    <img alt="Manhattan" src="assets/showcase/images/layouts/manhattan-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/paradise-ng">
                                    <img alt="Paradise" src="assets/showcase/images/layouts/paradise-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/ultima-ng">
                                    <img alt="Ultima" src="assets/showcase/images/layouts/ultima-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/barcelona-ng">
                                    <img alt="Barcelona" src="assets/showcase/images/layouts/barcelona-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/morpheus-ng">
                                    <img alt="Morpheus" src="assets/showcase/images/layouts/morpheus-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/atlantis-ng">
                                    <img alt="Atlantis" src="assets/showcase/images/layouts/atlantis-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/poseidon-ng">
                                    <img alt="Poseidon" src="assets/showcase/images/layouts/poseidon-ng.jpg">
                                </a>
                            </div>
                            <div class="p-col-12 p-md-4">
                                <a href="https://www.primefaces.org/layouts/omega-ng">
                                    <img alt="Omega" src="assets/showcase/images/layouts/omega-ng.jpg">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit, OnDestroy {

    active: boolean;

    scale: number = 14;;

    scales: number[] = [12,13,14,15,16];

    outsideClickListener: any;

    config: AppConfig;

    subscription: Subscription;

    constructor(private el: ElementRef, private router: Router, private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.active = false
             }
        });
    }

    toggleConfigurator(event: Event) {
        this.active = !this.active;
        event.preventDefault();

        if (this.active)
            this.bindOutsideClickListener();
        else
            this.unbindOutsideClickListener();
    }

    hideConfigurator(event) {
        this.active = false;
        this.unbindOutsideClickListener();
        event.preventDefault();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        let themeElement = document.getElementById('theme-link');
        themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.config.theme, theme));
        this.configService.updateConfig({...this.config, ...{theme, dark}});
        event.preventDefault();
    }

    onRippleChange() {
        this.configService.updateConfig(this.config);
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.active && this.isOutsideClicked(event)) {
                    this.active = false;
                }
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

    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
    }

    decrementScale() {
        this.scale--;
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    incrementScale() {
        this.scale++;
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
