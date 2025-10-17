import { AppState } from '@/domain/appstate';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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

    constructor() {
        effect(() => {
            const isDarkMode = this.darkMode();

            this.handleDarkModeTransition(isDarkMode);
        });
    }

    private handleDarkModeTransition(darkMode: boolean): void {
        if (isPlatformBrowser(this.platformId)) {
            if ((document as any).startViewTransition) {
                this.startViewTransition(darkMode);
            } else {
                this.toggleDarkMode(darkMode);
                this.onTransitionEnd();
            }
        }
    }

    private startViewTransition(darkMode: boolean): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(darkMode);
        });

        transition.ready.then(() => this.onTransitionEnd());
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
