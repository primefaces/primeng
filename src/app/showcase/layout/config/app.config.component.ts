import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule, InputSwitchChangeEvent } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { AppConfigService } from '@service/appconfigservice';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-config',
    standalone: true,
    templateUrl: './app.config.component.html',
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule, SelectButtonModule]
})
export class AppConfigComponent {
    inputStyles = [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' }
    ];
    scales: number[] = [12, 13, 14, 15, 16];

    compactMaterial: boolean = false;

    lightOnlyThemes = ['fluent-light', 'mira', 'nano'];

    @Output() onDarkModeSwitch = new EventEmitter<any>();

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private configService: AppConfigService, private config: PrimeNGConfig) {}

    get isActive(): boolean {
        return this.configService.state.configActive;
    }

    get isDarkToggleDisabled(): boolean {
        return this.lightOnlyThemes.includes(this.configService.config().theme);
    }

    get isDarkMode(): boolean {
        return this.configService.config().darkMode;
    }

    get inputStyle(): string {
        return this.config.inputStyle();
    }
    set inputStyle(val: 'outlined' | 'filled') {
        this.config.inputStyle.set(val);
    }

    get ripple(): boolean {
        return this.configService.config().ripple;
    }
    set ripple(val: boolean) {
        this.configService.config.update((config) => ({ ...config, ripple: val }));
    }

    get scale(): number {
        return this.configService.config().scale;
    }
    set scale(val: number) {
        this.configService.config.update((config) => ({ ...config, scale: val }));
    }

    onVisibleChange(value: boolean) {
        if (value === false) {
            this.configService.hideConfig();
        }
    }

    onCompactMaterialChange() {
        const theme = this.configService.config().theme;
        if (theme.startsWith('md')) {
            let tokens = theme.split('-');

            this.changeTheme(tokens[0].substring(0, 2), tokens[2]);
        }
    }

    toggleDarkMode() {
        this.onDarkModeSwitch.emit(null);
    }

    isThemeActive(themeFamily: string, color?: string) {
        let themeName: string;
        let themePrefix = themeFamily === 'md' && this.compactMaterial ? 'mdc' : themeFamily;

        if (this.lightOnlyThemes.includes(themePrefix)) {
            themeName = themePrefix;
        } else {
            themeName = themePrefix + (this.isDarkMode ? '-dark' : '-light');
        }

        if (color) {
            themeName += '-' + color;
        }

        return this.configService.config().theme === themeName;
    }

    changeTheme(theme: string, color?: string) {
        let newTheme: string, darkMode: boolean;

        if (this.lightOnlyThemes.includes(theme)) {
            newTheme = theme;
            darkMode = false;
        } else {
            newTheme = theme + '-' + (this.isDarkMode ? 'dark' : 'light');

            if (color) {
                newTheme += '-' + color;
            }

            if (newTheme.startsWith('md-') && this.compactMaterial) {
                newTheme = newTheme.replace('md-', 'mdc-');
            }

            darkMode = this.isDarkMode;
        }

        this.configService.config.update((config) => ({ ...config, dark: darkMode, theme: newTheme }));
    }

    decrementScale() {
        this.scale--;
    }

    onRippleChange(event) {
        this.ripple = event.checked;
    }

    onInputStyleChange(event) {
        this.inputStyle = event.value;
    }

    incrementScale() {
        this.scale++;
    }
}
