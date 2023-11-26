import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule, InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonChangeEvent, SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { AppConfigService } from '../../service/appconfigservice';

@Component({
    selector: 'app-config',
    standalone: true,
    templateUrl: './app.config.component.html',
    imports: [CommonModule, FormsModule, SidebarModule, InputSwitchModule, ButtonModule, RadioButtonModule, SelectButtonModule]
})
export class AppConfigComponent {
    scale: number = 14;
    inputStyles = [
        { label: 'Outlined', value: 'outlined' },
        { label: 'Filled', value: 'filled' }
    ];
    scales: number[] = [12, 13, 14, 15, 16];

    compactMaterial: boolean = false;

    lightOnlyThemes = ['fluent-light', 'mira', 'nano'];

    @Output() onDarkModeSwitch = new EventEmitter<any>();

    constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2, private configService: AppConfigService) {}

    get isActive(): boolean {
        return this.configService.state.configActive;
    }

    get isDarkToggleDisabled(): boolean {
        return this.lightOnlyThemes.includes(this.configService.config.theme);
    }

    get isDarkMode(): boolean {
        return this.configService.config.darkMode;
    }

    get inputStyle(): string {
        return this.configService.config.inputStyle;
    }

    get ripple(): boolean {
        return this.configService.config.ripple;
    }

    onVisibleChange(value: boolean) {
        if (value === false) {
            this.configService.hideConfig();
        }
    }

    onCompactMaterialChange() {
        const theme = this.configService.config.theme;
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

        return this.configService.config.theme === themeName;
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

        this.configService.changeTheme({ name: newTheme, dark: darkMode });
    }

    onInputStyleChange(event: SelectButtonChangeEvent) {
        this.configService.setInputStyle(event.value);
    }

    onRippleChange(event: InputSwitchOnChangeEvent) {
        this.configService.setRipple(event.checked);
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
}
