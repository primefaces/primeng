import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomHandler } from 'primeng/dom';
import { Subscription } from 'rxjs';
import { AppConfig } from '../../domain/appconfig';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit, OnDestroy {
    scale: number = 14;

    scales: number[] = [12, 13, 14, 15, 16];

    outsideClickListener: any;

    config: AppConfig;

    subscription: Subscription;

    sidebarSubscription: Subscription;

    active: boolean;

    constructor(private el: ElementRef, private router: Router, private configService: AppConfigService) {}

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
        this.configService.updateConfig({ ...this.config, ...{ theme, dark } });
        event.preventDefault();
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
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
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
