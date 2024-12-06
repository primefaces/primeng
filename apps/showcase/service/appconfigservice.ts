import { AppState } from '@/domain/appstate';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    private readonly STORAGE_KEY = 'appConfigState';

    appState = signal<any>(null);
    designerActive = signal(false);
    newsActive = signal(false);
    document = inject(DOCUMENT);
    platformId = inject(PLATFORM_ID);

    theme = computed(() => (this.appState()?.darkTheme ? 'dark' : 'light'));

    constructor() {
        this.appState.set(this.loadAppState());
        effect(() => {
            const state = this.appState();
            if (state) {
                this.saveAppState(state);

                if (isPlatformBrowser(this.platformId)) {
                    if (state.darkTheme) {
                        this.document.documentElement.classList.add('p-dark');
                    } else {
                        this.document.documentElement.classList.remove('p-dark');
                    }
                }
            }
        });
    }

    hideMenu() {
        this.appState.update((state) => ({
            ...state,
            menuActive: false
        }));
    }

    showMenu() {
        this.appState.update((state) => ({
            ...state,
            menuActive: true
        }));
    }

    hideNews() {
        this.newsActive.set(false);
    }

    showNews() {
        this.newsActive.set(true);
    }

    showDesigner() {
        this.designerActive.set(true);
    }

    hideDesigner() {
        this.designerActive.set(false);
    }

    private loadAppState(): any {
        if (isPlatformBrowser(this.platformId)) {
            const storedState = localStorage.getItem(this.STORAGE_KEY);
            if (storedState) {
                return JSON.parse(storedState);
            }
        }
        return {
            preset: 'Aura',
            primary: 'noir',
            surface: 'slate',
            darkTheme: false,
            menuActive: false,
            designerKey: 'primeng-designer-theme',
            RTL: false
        };
    }

    private saveAppState(state: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        }
    }
}
