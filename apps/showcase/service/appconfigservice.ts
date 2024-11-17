import { AppState } from '@/domain/appstate';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    state: AppState = {
        configActive: false,
        menuActive: false,
        newsActive: false
    };

    appState = signal<any>({
        preset: 'Aura',
        primary: 'noir',
        surface: 'slate',
        darkTheme: false
    });

    document = inject(DOCUMENT);

    platformId = inject(PLATFORM_ID);

    theme = computed(() => (this.appState().darkTheme ? 'dark' : 'light'));

    constructor() {
        effect(() => {
            const state = this.appState();

            if (isPlatformBrowser(this.platformId)) {
                if (state.darkTheme) {
                    this.document.documentElement.classList.add('p-dark');
                } else {
                    this.document.documentElement.classList.remove('p-dark');
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
