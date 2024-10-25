import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { AppState } from '@domain/appstate';

@Injectable({
    providedIn: 'root',
})
export class AppConfigService {
    state: AppState = {
        configActive: false,
        menuActive: false,
        newsActive: false,
    };

    appState = signal<any>({
        preset: 'Aura',
        primary: 'noir',
        surface: null,
        darkTheme: false,
    });

    document = inject(DOCUMENT);

    platformId = inject(PLATFORM_ID);

    theme = computed(() => (this.appState().darkTheme ? 'dark' : 'light'));

    constructor() {
        effect(() => {
            const state = this.appState();

            if (isPlatformBrowser(this.platformId)) {
                const toggleDarkTheme = (isDark: boolean) => {
                    if (isDark) {
                        this.document.documentElement.classList.add('p-dark');
                    } else {
                        this.document.documentElement.classList.remove('p-dark');
                    }
                };

                if (navigator.userAgent.includes('Firefox')) {
                    toggleDarkTheme(state.darkTheme);
                } else {
                    (document as any).startViewTransition(() => {
                        toggleDarkTheme(state.darkTheme);
                    });
                }
            }
        });
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
}
