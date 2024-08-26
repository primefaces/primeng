import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';
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

    constructor() {
        effect(() => {
            const state = this.appState();
            if (this.document) {
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
