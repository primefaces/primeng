import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { $t, updatePreset, updateSurfacePalette } from '@primeng/themes';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

const presets = {
    Aura,
    Material,
    Lara,
    Nora
};

@Component({
    selector: 'app-configurator',
    standalone: true,
    template: `
        <div class="config-panel-content">
            <div class="config-panel-colors">
                <span class="config-panel-label">Primary</span>
                <div>
                    @for (primaryColor of primaryColors(); track primaryColor) {
                        <button
                            type="button"
                            [title]="primaryColor.name"
                            (click)="updateColors($event, 'primary', primaryColor)"
                            [ngClass]="{ 'active-color': primaryColor.name === selectedPrimaryColor() }"
                            [style]="{
                                'background-color': primaryColor.name === 'noir' ? 'var(--text-color)' : primaryColor?.palette['500']
                            }"
                        ></button>
                    }
                </div>
            </div>

            <div class="config-panel-colors">
                <span class="config-panel-label">Surface</span>
                <div>
                    @for (surface of surfaces; track surface) {
                        <button
                            type="button"
                            [title]="surface.name"
                            (click)="updateColors($event, 'surface', surface)"
                            [ngClass]="{ 'active-color': surface.name === selectedSurfaceColor() }"
                            [style]="{
                                'background-color': surface.name === 'noir' ? 'var(--text-color)' : surface?.palette['500']
                            }"
                        ></button>
                    }
                </div>
            </div>

            <div class="config-panel-settings">
                <span class="config-panel-label">Presets</span>
                <p-selectbutton [options]="presets" [(ngModel)]="selectedPreset" (ngModelChange)="onPresetChange($event)" [allowEmpty]="false" size="small" />
            </div>
            <div class="config-panel-settings">
                <span class="config-panel-label">Ripple</span>
                <p-toggleSwitch [(ngModel)]="ripple" />
            </div>
        </div>
    `,
    host: {
        class: 'config-panel hidden'
    },
    imports: [CommonModule, FormsModule, InputSwitchModule, ButtonModule, RadioButtonModule, SelectButton, ToggleSwitchModule]
})
export class AppConfiguratorComponent {
    get ripple() {
        return this.config.ripple();
    }

    set ripple(value: boolean) {
        this.config.ripple.set(value);
    }

    selectedPreset: string = 'Aura';

    config: PrimeNGConfig = inject(PrimeNGConfig);

    configService: AppConfigService = inject(AppConfigService);

    presets = Object.keys(presets);

    surfaces = [
        {
            name: 'slate',
            palette: {
                0: '#ffffff',
                50: '#f8fafc',
                100: '#f1f5f9',
                200: '#e2e8f0',
                300: '#cbd5e1',
                400: '#94a3b8',
                500: '#64748b',
                600: '#475569',
                700: '#334155',
                800: '#1e293b',
                900: '#0f172a',
                950: '#020617'
            }
        },
        {
            name: 'gray',
            palette: {
                0: '#ffffff',
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
                950: '#030712'
            }
        },
        {
            name: 'zinc',
            palette: {
                0: '#ffffff',
                50: '#fafafa',
                100: '#f4f4f5',
                200: '#e4e4e7',
                300: '#d4d4d8',
                400: '#a1a1aa',
                500: '#71717a',
                600: '#52525b',
                700: '#3f3f46',
                800: '#27272a',
                900: '#18181b',
                950: '#09090b'
            }
        },
        {
            name: 'neutral',
            palette: {
                0: '#ffffff',
                50: '#fafafa',
                100: '#f5f5f5',
                200: '#e5e5e5',
                300: '#d4d4d4',
                400: '#a3a3a3',
                500: '#737373',
                600: '#525252',
                700: '#404040',
                800: '#262626',
                900: '#171717',
                950: '#0a0a0a'
            }
        },
        {
            name: 'stone',
            palette: {
                0: '#ffffff',
                50: '#fafaf9',
                100: '#f5f5f4',
                200: '#e7e5e4',
                300: '#d6d3d1',
                400: '#a8a29e',
                500: '#78716c',
                600: '#57534e',
                700: '#44403c',
                800: '#292524',
                900: '#1c1917',
                950: '#0c0a09'
            }
        },
        {
            name: 'soho',
            palette: {
                0: '#ffffff',
                50: '#f4f4f4',
                100: '#e8e9e9',
                200: '#d2d2d4',
                300: '#bbbcbe',
                400: '#a5a5a9',
                500: '#8e8f93',
                600: '#77787d',
                700: '#616268',
                800: '#4a4b52',
                900: '#34343d',
                950: '#1d1e27'
            }
        },
        {
            name: 'viva',
            palette: {
                0: '#ffffff',
                50: '#f3f3f3',
                100: '#e7e7e8',
                200: '#cfd0d0',
                300: '#b7b8b9',
                400: '#9fa1a1',
                500: '#87898a',
                600: '#6e7173',
                700: '#565a5b',
                800: '#3e4244',
                900: '#262b2c',
                950: '#0e1315'
            }
        },
        {
            name: 'ocean',
            palette: {
                0: '#ffffff',
                50: '#fbfcfc',
                100: '#F7F9F8',
                200: '#EFF3F2',
                300: '#DADEDD',
                400: '#B1B7B6',
                500: '#828787',
                600: '#5F7274',
                700: '#415B61',
                800: '#29444E',
                900: '#183240',
                950: '#0c1920'
            }
        }
    ];

    selectedPrimaryColor = computed(() => {
        return this.configService.appState().primary;
    });

    selectedSurfaceColor = computed(() => this.configService.appState().surface);

    primaryColors = computed(() => {
        const presetPalette = presets[this.configService.appState().preset].primitive;
        const colors = ['emerald', 'green', 'lime', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'];
        const palettes = [{ name: 'noir', palette: {} }];

        colors.forEach((color) => {
            palettes.push({
                name: color,
                palette: presetPalette[color]
            });
        });

        return palettes;
    });

    getPresetExt() {
        const color = this.primaryColors().find((c) => c.name === this.selectedPrimaryColor());

        if (color.name === 'noir') {
            return {
                semantic: {
                    primary: {
                        50: '{surface.50}',
                        100: '{surface.100}',
                        200: '{surface.200}',
                        300: '{surface.300}',
                        400: '{surface.400}',
                        500: '{surface.500}',
                        600: '{surface.600}',
                        700: '{surface.700}',
                        800: '{surface.800}',
                        900: '{surface.900}',
                        950: '{surface.950}'
                    },
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.950}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.800}',
                                activeColor: '{primary.700}'
                            },
                            highlight: {
                                background: '{primary.950}',
                                focusBackground: '{primary.700}',
                                color: '#ffffff',
                                focusColor: '#ffffff'
                            }
                        },
                        dark: {
                            primary: {
                                color: '{primary.50}',
                                contrastColor: '{primary.950}',
                                hoverColor: '{primary.200}',
                                activeColor: '{primary.300}'
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.300}',
                                color: '{primary.950}',
                                focusColor: '{primary.950}'
                            }
                        }
                    }
                }
            };
        } else {
            if (this.configService.appState().preset === 'Nora') {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.600}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.700}',
                                    activeColor: '{primary.800}'
                                },
                                highlight: {
                                    background: '{primary.600}',
                                    focusBackground: '{primary.700}',
                                    color: '#ffffff',
                                    focusColor: '#ffffff'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.400}',
                                    activeColor: '{primary.300}'
                                },
                                highlight: {
                                    background: '{primary.500}',
                                    focusBackground: '{primary.400}',
                                    color: '{surface.900}',
                                    focusColor: '{surface.900}'
                                }
                            }
                        }
                    }
                };
            } else if (this.configService.appState().preset === 'Material') {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.400}',
                                    activeColor: '{primary.300}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                                    focusBackground: 'color-mix(in srgb, {primary.color}, transparent 76%)',
                                    color: '{primary.700}',
                                    focusColor: '{primary.800}'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.400}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.300}',
                                    activeColor: '{primary.200}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                    color: 'rgba(255,255,255,.87)',
                                    focusColor: 'rgba(255,255,255,.87)'
                                }
                            }
                        }
                    }
                };
            } else {
                return {
                    semantic: {
                        primary: color.palette,
                        colorScheme: {
                            light: {
                                primary: {
                                    color: '{primary.500}',
                                    contrastColor: '#ffffff',
                                    hoverColor: '{primary.600}',
                                    activeColor: '{primary.700}'
                                },
                                highlight: {
                                    background: '{primary.50}',
                                    focusBackground: '{primary.100}',
                                    color: '{primary.700}',
                                    focusColor: '{primary.800}'
                                }
                            },
                            dark: {
                                primary: {
                                    color: '{primary.400}',
                                    contrastColor: '{surface.900}',
                                    hoverColor: '{primary.300}',
                                    activeColor: '{primary.200}'
                                },
                                highlight: {
                                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                                    color: 'rgba(255,255,255,.87)',
                                    focusColor: 'rgba(255,255,255,.87)'
                                }
                            }
                        }
                    }
                };
            }
        }
    }

    updateColors(event: any, type: string, color: any) {
        if (type === 'primary') {
            this.configService.appState.update((state) => ({ ...state, primary: color.name }));
        } else if (type === 'surface') {
            this.configService.appState.update((state) => ({ ...state, surface: color.name }));
        }
        this.applyTheme(type, color);

        event.stopPropagation();
    }

    applyTheme(type: string, color: any) {
        if (type === 'primary') {
            updatePreset(this.getPresetExt());
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }
    }

    onPresetChange(event: any) {
        this.configService.appState.update((state) => ({ ...state, preset: event }));
        const preset = presets[event];
        const surfacePalette = this.surfaces.find((s) => s.name === this.selectedSurfaceColor())?.palette;
        if (this.configService.appState().preset === 'Material') {
            document.body.classList.add('material');
            this.config.ripple.set(true);
        } else {
            document.body.classList.remove('material');
        }
        $t().preset(preset).preset(this.getPresetExt()).surfacePalette(surfacePalette).use({ useDefaultOptions: true });
    }
}
