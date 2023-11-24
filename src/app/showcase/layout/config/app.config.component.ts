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
    inputStyles = [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' }
    ];
    scales: number[] = [12, 13, 14, 15, 16];

    outsideClickListener: VoidFunction | null;

    config: AppConfig;

    subscription: Subscription;

    sidebarSubscription: Subscription;

    active: boolean;

    compactMaterial: boolean = false;

    lightOnlyThemes = ['fluent-light', 'mira', 'nano'];

    get darkToggleDisabled() {
        return this.lightOnlyThemes.includes(this.config.theme);
    }

    get isMaterial() {
        return this.config.theme.startsWith('md') || this.config.theme.startsWith('mdc');
    }

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

    onCompactMaterialChange(event) {
        const theme = this.config.theme.startsWith('md') ? this.config.theme.replace('md', 'mdc') : this.config.theme.startsWith('mdc') ? this.config.theme.replace('mdc', 'md') : this.config.theme;

        this.changeTheme(event, theme, false);
    }

    onDarkModeChange(event) {
        let newTheme = null;
        let { theme, dark } = this.config;

        if (!dark) {
            newTheme = theme.replace('dark', 'light');
        } else {
            if (theme.includes('light') && theme !== 'fluent-light') newTheme = theme.replace('light', 'dark');
            else newTheme = 'lara-dark-teal'; //fallback
        }

        this.configService.changeTheme(event, newTheme, dark);
    }

    isThemeActive(theme: string, color: string) {
        let themeName;
        let themePrefix = this.compactMaterial ? 'mdc' : theme;

        if (this.lightOnlyThemes.includes(themePrefix)) {
            themeName = themePrefix;
        } else {
            themeName = themePrefix + (this.config.dark ? '-dark' : '-light');
        }

        if (color) {
            themeName += '-' + color;
        }

        return this.config.theme === themeName;
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

    changeTheme(event: Event, theme: string, darkModePreference?: boolean) {
        const isThemeInLightOnlyList = this.lightOnlyThemes.indexOf(theme) === -1;

        let newTheme = theme;
        let useDarkMode = darkModePreference;

        if (isThemeInLightOnlyList && !darkModePreference) {
            useDarkMode = this.config.dark;
        }

        if (isThemeInLightOnlyList) {
            newTheme = useDarkMode ? theme.replace('light', 'dark') : theme.replace('dark', 'light');
        }

        this.configService.changeTheme(event, newTheme, useDarkMode);
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
