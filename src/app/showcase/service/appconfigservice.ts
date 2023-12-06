import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../domain/appconfig';
import { AppState } from '../domain/appstate';
import { Theme } from '../domain/theme';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    config: AppConfig = {
        theme: 'lara-light-blue',
        darkMode: false,
        inputStyle: 'outlined',
        ripple: true
    };

    state: AppState = {
        configActive: false,
        menuActive: false,
        newsActive: false
    };

    private themeChange = new Subject<Theme>();

    themeChange$ = this.themeChange.asObservable();

    private themeChangeComplete = new Subject<Theme>();

    themeChangeComplete$ = this.themeChangeComplete.asObservable();

    changeTheme(theme: Theme) {
        this.themeChange.next(theme);
    }

    completeThemeChange(theme: Theme) {
        this.themeChangeComplete.next(theme);
    }

    updateConfig(config: AppConfig) {
        this.config = { ...this.config, ...config };
    }

    getConfig() {
        return this.config;
    }

    showMenu() {
        this.state.menuActive = true;
    }

    hideMenu() {
        this.state.menuActive = false;
    }

    showConfig() {
        this.state.configActive = true;
    }

    hideConfig() {
        this.state.configActive = false;
    }

    setRipple(value: boolean) {
        this.config.ripple = value;
    }

    setInputStyle(value: string) {
        this.config.inputStyle = value;
    }

    showNews() {
        this.state.newsActive = true;
    }

    hideNews() {
        this.state.newsActive = false;
    }
}
