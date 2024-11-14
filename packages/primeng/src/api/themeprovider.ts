import { DOCUMENT } from '@angular/common';
import { effect, inject, Inject, Injectable, Optional, signal, untracked } from '@angular/core';
import { Theme, ThemeService } from '@primeuix/styled';
import { BaseStyle } from 'primeng/base';
import { PRIME_NG_CONFIG, PrimeNGConfigType } from './provideprimengconfig';

@Injectable({ providedIn: 'root' })
export class ThemeProvider {
    // @todo define type for theme
    theme = signal<any>(undefined);

    isThemeChanged: boolean = false;

    public document: Document = inject(DOCUMENT);

    baseStyle: BaseStyle = inject(BaseStyle);

    constructor(@Inject(PRIME_NG_CONFIG) @Optional() private config: PrimeNGConfigType) {
        if (this.config?.theme) {
            this.theme.set(this.config.theme);
        }

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
            const { primitive, semantic } = this.baseStyle.getCommonTheme?.() || {};
            const styleOptions = { nonce: undefined };
            this.baseStyle.load(primitive?.css, { name: 'primitive-variables', ...styleOptions });
            this.baseStyle.load(semantic?.css, { name: 'semantic-variables', ...styleOptions });
            this.baseStyle.loadTheme({ name: 'global-style', ...styleOptions });

            Theme.setLoadedStyleName('common');
        }
    }
}
