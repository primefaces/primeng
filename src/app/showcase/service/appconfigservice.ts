import { Inject, Injectable, PLATFORM_ID, effect, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConfig } from '../domain/appconfig';
import { AppState } from '../domain/appstate';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    _config: AppConfig = {
        theme: 'aura-light-green',
        darkMode: false,
        inputStyle: 'outlined',
        ripple: true,
        scale: 14,
        tableTheme: 'lara-light-blue'
    };

    state: AppState = {
        configActive: false,
        menuActive: false,
        newsActive: false
    };

    config = signal<AppConfig>(this._config);

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    constructor(@Inject(PLATFORM_ID) private platformId: any) {
        effect(() => {
            const config = this.config();
            if (isPlatformBrowser(this.platformId)) {
                if (this.updateStyle(config)) {
                    this.changeTheme();
                    const newTableTheme = !config.darkMode ? config.tableTheme.replace('dark', 'light') : config.tableTheme.replace('light', 'dark');
                    this.replaceTableTheme(newTableTheme);
                }
                this.changeScale(config.scale);
                this.onConfigUpdate();
            }
        });
    }

    updateStyle(config: AppConfig) {
        return config.theme !== this._config.theme || config.darkMode !== this._config.darkMode || config.tableTheme !== this._config.tableTheme;
    }

    onConfigUpdate() {
        const config = this.config();
        config.tableTheme = !config.darkMode ? config.tableTheme.replace('light', 'dark') : config.tableTheme.replace('dark', 'light');
        this._config = { ...config };
        this.configUpdate.next(this.config());
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

    showNews() {
        this.state.newsActive = true;
    }

    hideNews() {
        this.state.newsActive = false;
    }

    changeTheme() {
        const config = this.config();
        const themeLink = <HTMLLinkElement>document.getElementById('theme-link');
        const themeLinkHref = themeLink.getAttribute('href')!;
        const newHref = themeLinkHref
            .split('/')
            .map((el) => (el == this._config.theme ? (el = config.theme) : el == `theme-${this._config.darkMode}` ? (el = `theme-${config.darkMode}`) : el))
            .join('/');

        this.replaceThemeLink(newHref);
    }

    replaceThemeLink(href: string) {
        const id = 'theme-link';
        let themeLink = <HTMLLinkElement>document.getElementById(id);
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);
        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
        });
    }

    replaceTableTheme(newTheme: string) {
        const elementId = 'home-table-link';
        const linkElement = <HTMLLinkElement>document.getElementById(elementId);
        const tableThemeTokens = linkElement?.getAttribute('href').split('/') || null;
        const currentTableTheme = tableThemeTokens ? tableThemeTokens[tableThemeTokens.length - 2] : null;
        if (currentTableTheme !== newTheme && tableThemeTokens) {
            const newThemeUrl = linkElement.getAttribute('href').replace(currentTableTheme, newTheme);

            const cloneLinkElement = <HTMLLinkElement>linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('id', elementId + '-clone');
            cloneLinkElement.setAttribute('href', newThemeUrl);
            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', elementId);
            });
            linkElement.parentNode?.insertBefore(cloneLinkElement, linkElement.nextSibling);
        }
    }

    changeScale(value: number) {
        if (isPlatformBrowser(this.platformId)) {
            document.documentElement.style.fontSize = `${value}px`;
        }
    }
}
