import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal, untracked } from '@angular/core';
import { BaseStyle } from 'primeng/base';
import { Theme, ThemeService } from 'primeng/themes';

@Injectable({ providedIn: 'root' })
export class ThemeProvider {
    // @todo define type for theme
    theme = signal<any>(undefined);

    isThemeChanged: boolean = false;

    public document: Document = inject(DOCUMENT);

    baseStyle: BaseStyle = inject(BaseStyle);

    constructor() {
        effect(
            () => {
                ThemeService.on('theme:change', (newTheme) => {
                    untracked(() => {
                        this.isThemeChanged = true;
                        this.theme.set(newTheme);
                        // this.onThemeChange(this.theme());
                    });
                });
            },
            { allowSignalWrites: true },
        );
        effect(() => {
            const themeValue = this.theme();
            if (this.document && themeValue) {
                if (!this.isThemeChanged) {
                    this.onThemeChange(themeValue);
                }
                this.isThemeChanged = false;
            }
        });
    }

    onThemeChange(value: any) {
        Theme.setTheme(value);
        if (this.document) {
            this.loadCommonTheme();
        }
    }

    loadCommonTheme() {
        // common
        //if (!Theme.isStyleNameLoaded('common')) {
        const { primitive, semantic } = this.baseStyle.getCommonTheme?.() || {};
        const styleOptions = { nonce: undefined };
        this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...styleOptions });
        this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...styleOptions });
        this.baseStyle.loadTheme({ name: 'global-style', ...styleOptions });

        Theme.setLoadedStyleName('common');
        //}
    }
}
