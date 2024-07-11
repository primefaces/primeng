import { Injectable, effect, inject, signal, untracked } from '@angular/core';
import { Theme, ThemeService } from 'primeng/themes';
import { BaseStyle } from 'primeng/base';
import { DOCUMENT } from '@angular/common';
import { DomHandler } from 'primeng/dom';

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
            { allowSignalWrites: true }
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
        // @todo replace this later
        this.loadFont();
    }

    onThemeChange(value: any) {
        Theme.setTheme(value);
        if (this.document) {
            this.loadCommonTheme();
        }
    }

    loadCommonTheme() {
        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic } = this.baseStyle.getCommonTheme?.() || {};
            const styleOptions = { nonce: undefined };
            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...styleOptions });
            this.baseStyle.loadTheme({ name: 'global-style', ...styleOptions });

            Theme.setLoadedStyleName('common');
        }
    }

    loadFont() {
        const fontElement = this.document.createElement('link');
        DomHandler.setAttributes(fontElement, {
            rel: 'stylesheet',
            href: 'https://rsms.me/inter/inter.css'
        });
        this.document.head.appendChild(fontElement);
    }
}
