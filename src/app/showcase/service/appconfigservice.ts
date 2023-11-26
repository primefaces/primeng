import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    private themeChange = new Subject<Theme>();

    themeChange$ = this.themeChange.asObservable();

    private configActive = new BehaviorSubject<boolean>(false);

    configActive$ = this.configActive.asObservable();

    changeTheme(theme: Theme) {
        this.themeChange.next(theme);
    }

    updateConfig(config: AppConfig) {
        this.config = { ...this.config, ...config };
        this.configUpdate.next(config);
    }

    getConfig() {
        return this.config;
    }

    toggleConfig() {
        this.configActive.next(!this.configActive.value);
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
