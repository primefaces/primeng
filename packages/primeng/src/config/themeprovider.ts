import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal, untracked } from '@angular/core';
import { Theme, ThemeService } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';

export type ThemeType = { preset?: any; options?: any } | 'none' | boolean | undefined;

export type ThemeConfigType = {
    theme?: ThemeType;
    csp?: {
        nonce: string | undefined;
    };
};

@Injectable({ providedIn: 'root' })
export class ThemeProvider {
    // @todo define type for theme
    theme = signal<any>(undefined);

    csp = signal<{ nonce: string | undefined }>({ nonce: undefined });

    isThemeChanged: boolean = false;

    public document: Document = inject(DOCUMENT);

    baseStyle: BaseStyle = inject(BaseStyle);

    constructor() {
        effect(() => {
            ThemeService.on('theme:change', (newTheme) => {
                untracked(() => {
                    this.isThemeChanged = true;
                    this.theme.set(newTheme);
                    // this.onThemeChange(this.theme());
                });
            });
        });
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

    ngOnDestroy() {
        Theme.clearLoadedStyleNames();
        ThemeService.clear();
    }

    onThemeChange(value: any) {
        Theme.setTheme(value);
        if (this.document) {
            this.loadCommonTheme();
        }
    }

    loadCommonTheme() {
        if (this.theme() === 'none') return;

        // common
        if (!Theme.isStyleNameLoaded('common')) {
            const { primitive, semantic, global, style } = this.baseStyle.getCommonTheme?.() || {};
            const styleOptions = { nonce: this.csp?.()?.nonce };

            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...styleOptions });
            this.baseStyle.load(global?.css, { name: 'global-variables', ...styleOptions });
            this.baseStyle.loadGlobalTheme({ name: 'global-style', ...styleOptions }, style);

            Theme.setLoadedStyleName('common');
        }
    }

    setThemeConfig(config: ThemeConfigType): void {
        const { theme, csp } = config || {};
        if (theme) this.theme.set(theme);
        if (csp) this.csp.set(csp);
    }
}
