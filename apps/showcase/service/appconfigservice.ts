import { AppState } from '@/domain/appstate';
import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
    appState = signal<AppState>({
        preset: 'Aura',
        primary: 'noir',
        surface: null,
        darkTheme: false,
        menuActive: false,
        RTL: false
    });

    designerActive = signal(false);

    newsActive = signal(false);

    document = inject(DOCUMENT);

    platformId = inject(PLATFORM_ID);

    transitionComplete = signal<boolean>(false);

    darkMode = computed(() => this.appState().darkTheme);

    primaryPalette = computed(() => this.appState().primary);

    surfacePalette = computed(() => this.appState().surface);

    constructor() {
        effect(() => {
            const isDarkMode = this.darkMode();
            const currentPrimaryPalette = this.primaryPalette();
            const currentSurfacePalette = this.surfacePalette();

            this.toggleDarkMode(isDarkMode);
            this.onTransitionEnd();
        });
    }

    private toggleDarkMode(darkMode: boolean): void {
        if (darkMode) {
            this.document.documentElement.classList.add('p-dark');
        } else {
            this.document.documentElement.classList.remove('p-dark');
        }
    }

    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
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
}
