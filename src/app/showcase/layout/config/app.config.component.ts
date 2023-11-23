import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SidebarModule } from 'primeng/sidebar';

@Component({
    selector: 'app-config',
    standalone: true,
    templateUrl: './app.config.component.html',
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule]
})
export class AppConfigComponent implements OnInit, OnDestroy {
    scale: number = 14;

    scales: number[] = [12, 13, 14, 15, 16];

    outsideClickListener: VoidFunction | null;

    config: AppConfig;

    subscription: Subscription;

    sidebarSubscription: Subscription;

    active: boolean;

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private el: ElementRef, private router: Router, private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.sidebarSubscription = this.configService.configActive$.subscribe((value: boolean) => (this.active = value));
        this.subscription = this.configService.configUpdate$.subscribe((config) => {
            this.config = config;
            if (this.config.theme === 'nano') this.scale = 12;
            else this.scale = 14;

            this.applyScale();
        });

        if (this.config.theme === 'nano') this.scale = 12;
    }

    hideConfigurator() {
        this.unbindOutsideClickListener();
        this.configService.toggleConfig();
    }

    onConfigButtonClick(event: MouseEvent) {
        this.configService.toggleConfig();

        if (this.active) {
            this.bindOutsideClickListener();
        } else {
            this.unbindOutsideClickListener();
        }
        event.preventDefault();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        const linkElement = document.getElementById('theme-link');
        this.replaceLink(linkElement, theme, () => {
            this.configService.updateConfig({ ...this.config, theme: theme, dark: dark });
        });
    }

    replaceLink(linkElement, theme: string, onComplete: Function) {
        const id = linkElement.getAttribute('id');
        const cloneLinkElement = linkElement.cloneNode(true);

        cloneLinkElement.setAttribute('href', linkElement.getAttribute('href').replace(this.config.theme, theme));
        cloneLinkElement.setAttribute('id', id + '-clone');

        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    onInputStyleChange() {
        this.configService.updateConfig(this.config);

        if (this.config.inputStyle === 'filled') DomHandler.addClass(document.body, 'p-input-filled');
        else DomHandler.removeClass(document.body, 'p-input-filled');
    }

    onRippleChange() {
        this.configService.updateConfig(this.config);
        if (this.config.ripple) DomHandler.removeClass(document.body, 'p-ripple-disabled');
        else DomHandler.addClass(document.body, 'p-ripple-disabled');
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.active && this.isOutsideClicked(event)) {
                    this.active = false;
                }
            });
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            this.outsideClickListener();
            this.outsideClickListener = null;
        }
    }

    isOutsideClicked(event) {
        return !(this.el.nativeElement.isSameNode(event.target) || this.el.nativeElement.contains(event.target));
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        this.renderer.setStyle(this.document.documentElement, 'font-size', this.scale + 'px');
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.sidebarSubscription) {
            this.sidebarSubscription.unsubscribe();
        }
    }
}
