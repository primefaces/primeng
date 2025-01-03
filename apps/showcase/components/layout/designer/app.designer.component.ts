import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { AppConfigService } from '@/service/appconfigservice';
import { DesignerService } from '@/service/designerservice';
import { TabsModule } from 'primeng/tabs';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Material from '@primeng/themes/material';
import Nora from '@primeng/themes/nora';
import { PrimeNG } from 'primeng/config';
import { FormsModule } from '@angular/forms';
import { $dt, updatePreset, usePreset } from '@primeng/themes';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { DesignBorderRadius } from './primitive/designborderradius';
import { DesignColors } from './primitive/designcolors';
import { DesignGeneral } from './semantic/designgeneral';
import { DesignFormField } from './semantic/designformfield';
import { DesignList } from './semantic/designlist';
import { DesignNavigation } from './semantic/designnavigation';
import { DesignOverlay } from './semantic/designoverlay';
import { DesignCS } from './semantic/colorscheme/designcs';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';

const presets = {
    Aura,
    Material,
    Lara,
    Nora
};
@Component({
    selector: 'app-designer',
    standalone: true,
    imports: [
        CommonModule,
        DrawerModule,
        TabsModule,
        SelectButtonModule,
        DividerModule,
        ButtonModule,
        TagModule,
        AccordionModule,
        FormsModule,
        FileUploadModule,
        DesignBorderRadius,
        DesignColors,
        DesignGeneral,
        DesignFormField,
        DesignList,
        DesignNavigation,
        DesignOverlay,
        DesignCS,
        ToastModule,
        SkeletonModule
    ],
    template: `<p-drawer [visible]="visible()" (visibleChange)="hide($event)" header="Drawer" header="Theme Designer" position="right" styleClass="designer !w-screen md:!w-[48rem]" [modal]="false" [dismissible]="false">
            <p-tabs [(value)]="activeTab">
                <p-tablist>
                    <p-tab value="0">Base</p-tab>
                    <p-tab value="1">Primitive</p-tab>
                    <p-tab value="2">Semantic</p-tab>
                    <p-tab value="3">Component</p-tab>
                    <p-tab value="4">Custom</p-tab>
                </p-tablist>

                <p-tabpanels>
                    @defer (when activeTab == '0') {
                        <p-tabpanel value="0">
                            <div class="text-lg font-semibold mb-2">Choose a Theme to Get Started</div>
                            <span class="block text-muted-color leading-6 mb-4">Begin by selecting a built-in theme as a foundation, continue editing your current theme, or import a Figma tokens file.</span>
                            <div class="flex flex-col">
                                <div class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                    <span class="font-semibold">Base Theme</span>
                                    <span class="text-muted-color">Variety of built-in themes with distinct characteristics.</span>
                                    <p-selectbutton [ngModel]="selectedPreset()" (ngModelChange)="onPresetChange($event)" [options]="presetOptions" optionLabel="label" optionValue="value" [allowEmpty]="false" />
                                </div>
                                <p-divider>OR</p-divider>
                                <div class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4 items-start">
                                    <span class="font-semibold">Load Theme</span>
                                    <span class="text-muted-color">Continue editing the theme files stored locally.</span>
                                    <p-button label="Restore from local storage" styleClass="!px-3 !py-2" severity="secondary" (click)="loadFromLocalStorage()" />
                                </div>
                                <p-divider>OR</p-divider>
                                <div class="flex flex-col gap-4 border border-surface-200 dark:border-surface-700 rounded-md p-4">
                                    <div class="flex items-center gap-4">
                                        <span class="font-semibold">Import Figma Tokens </span>
                                        <p-tag value="PRO" severity="contrast"></p-tag>
                                    </div>
                                    <span class="text-muted-color leading-6">Export the token studio json file and import to the Visual Editor. This feature is currently under development.</span>
                                    <p-fileupload mode="basic" disabled styleClass="!justify-start" />
                                </div>
                            </div>
                        </p-tabpanel>
                    } @loading {
                        <p-skeleton width="40%" styleClass="my-2" />
                        <p-skeleton width="100%" styleClass="my-2" />
                        <p-skeleton width="25%" styleClass="my-2" />
                        <p-skeleton width="100%" height="8rem" styleClass="mt-4" />
                        <p-skeleton width="100%" styleClass="my-4" />
                        <p-skeleton width="100%" height="8rem" styleClass="mt-4" />
                        <p-skeleton width="100%" styleClass="my-4" />
                        <p-skeleton width="100%" height="8rem" styleClass="mt-4" />
                    }
                    @defer (when activeTab == '1') {
                        <p-tabpanel value="1">
                            <div class="flex flex-col gap-3">
                                <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                                    <design-border-radius />
                                    <design-colors />
                                </form>
                            </div>
                        </p-tabpanel>
                    } @loading {
                        <p-skeleton width="100%" height="15rem" styleClass="mt-4" />
                        <p-skeleton width="100%" height="15rem" styleClass="mt-4" />
                    }
                    @defer (when activeTab == '2') {
                        <p-tabpanel value="2">
                            <p-accordion [value]="['0', '1']" [multiple]="true" *ngIf="visible()">
                                <p-accordion-panel value="0">
                                    <p-accordion-header>Common</p-accordion-header>
                                    <p-accordion-content>
                                        <div class="flex flex-col gap-3">
                                            <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                                                <design-general />
                                                <design-form-field />
                                                <design-list />
                                                <design-navigation />
                                                <design-overlay />
                                            </form>
                                        </div>
                                    </p-accordion-content>
                                </p-accordion-panel>

                                <p-accordion-panel value="1">
                                    <p-accordion-header>Color Scheme</p-accordion-header>
                                    <p-accordion-content>
                                        <p-tabs value="cs-0">
                                            <p-tablist>
                                                <p-tab value="cs-0">Light</p-tab>
                                                <p-tab value="cs-1">Dark</p-tab>
                                            </p-tablist>
                                            <p-tabpanels class="!px-0">
                                                <p-tabpanel value="cs-0">
                                                    <form (keydown)="onKeyDown($event)">
                                                        <design-cs [value]="designerService.preset().semantic.colorScheme.light" />
                                                    </form>
                                                </p-tabpanel>
                                                <p-tabpanel value="cs-1">
                                                    <form (keydown)="onKeyDown($event)">
                                                        <design-cs [value]="designerService.preset().semantic.colorScheme.dark" />
                                                    </form>
                                                </p-tabpanel>
                                            </p-tabpanels>
                                        </p-tabs>
                                    </p-accordion-content>
                                </p-accordion-panel>
                            </p-accordion>
                        </p-tabpanel>
                    } @loading {
                        <p-skeleton width="100%" height="8rem" styleClass="mt-4" />
                        <p-skeleton width="100%" height="30rem" styleClass="mt-4" />
                    }
                    @defer (when activeTab == '3') {
                        <p-tabpanel value="3">
                            <span class="leading-6 text-muted-color">Component tokens are not supported by the Visual Editor at the moment and will be available with a future update. </span>
                        </p-tabpanel>
                    } @loading {
                        <p-skeleton width="100%" styleClass="mt-2" />
                        <p-skeleton width="10%" styleClass="mt-4" />
                    }
                    @defer (when activeTab == '4') {
                        <p-tabpanel value="4">
                            <span class="leading-6 text-muted-color">Extend the theming system with your own design tokens e.g. <span class="font-medium">accent.color</span>. Do not use curly braces in the name field.</span>
                            <ul class="flex flex-col gap-4 list-none p-0 mx-0 my-4">
                                <li *ngFor="let token of customTokens" class="first:border-t border-b border-surface-200 dark:border-surface-300 py-2">
                                    <div class="flex items-center gap-4">
                                        <label class="flex items-center gap-2 flex-auto">
                                            <span class="text-sm">Name</span>
                                            <input [(ngModel)]="token['name']" type="text" class="border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full" />
                                        </label>
                                        <label class="flex items-center gap-2 flex-auto">
                                            <span class="text-sm">Value</span>
                                            <input [(ngModel)]="token['value']" type="text" class="border border-surface-300 dark:border-surface-600 rounded-lg py-2 px-2 w-full" />
                                        </label>
                                        <button
                                            type="button"
                                            (click)="removeToken(index)"
                                            class="cursor-pointer inline-flex items-center justify-center ms-auto w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-400/10 dark:hover:bg-red-400/20 dark:text-red-400 transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-red-600 focus:dark:outline-red-400"
                                        >
                                            <i class="pi pi-times"> </i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                            <div class="flex justify-between">
                                <button
                                    type="button"
                                    (click)="addToken()"
                                    class="px-3 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black rounded-md font-medium cursor-pointer transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-zinc-950 focus:dark:outline-white"
                                >
                                    Add New
                                </button>
                                <button
                                    *ngIf="customTokens?.length"
                                    type="button"
                                    (click)="saveTokens()"
                                    class="px-3 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black rounded-md font-medium cursor-pointer transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-zinc-950 focus:dark:outline-white"
                                >
                                    Save
                                </button>
                            </div>
                        </p-tabpanel>
                    } @loading {
                        <p-skeleton width="100%" styleClass="mt-2" />
                        <p-skeleton width="10%" styleClass="mt-4" />
                        <p-skeleton width="6rem" height="2rem" styleClass="mt-6" />
                    }
                </p-tabpanels>
            </p-tabs>

            <ng-template #footer>
                <div class="flex justify-between gap-2">
                    <button
                        type="button"
                        (click)="download()"
                        icon="pi pi-download"
                        class="px-3 py-2 bg-transparent border border-gray-200 dark:border-gray-700 hover:border-gray-800 dark:hover:border-gray-500 text-black dark:text-white rounded-md font-medium cursor-pointer transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-zinc-950 focus:dark:outline-white"
                    >
                        Download
                    </button>
                    <button
                        *ngIf="activeTab !== '0'"
                        type="button"
                        (click)="apply()"
                        class="px-3 py-2 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black rounded-md font-medium cursor-pointer transition-colors duration-200 focus:outline focus:outline-offset-2 focus:outline-zinc-950 focus:dark:outline-white"
                    >
                        Apply
                    </button>
                </div>
            </ng-template>
        </p-drawer>
        <p-toast />`,
    providers: [MessageService]
})
export class AppDesignerComponent {
    private configService = inject(AppConfigService);

    public designerService = inject(DesignerService);

    private messageService = inject(MessageService);

    config: PrimeNG = inject(PrimeNG);

    selectedSurfaceColor = computed(() => this.configService.appState().surface);

    selectedPreset = computed(() => this.configService.appState().preset);

    presets = Object.keys(presets);

    preset;

    customTokens = [];

    acTokens = [];

    activeTab = '0';

    ngOnInit() {
        this.preset = {
            primitive: presets['Aura'].primitive,
            semantic: presets['Aura'].semantic
        };
        this.generateACTokens(null, this.preset);
        this.replaceColorPalette();
        this.designerService.setPreset(this.preset);
        this.designerService.setAcTokens(this.acTokens);
    }

    presetOptions = [
        { label: 'Aura', value: 'Aura' },
        { label: 'Material', value: 'Material' },
        { label: 'Lara', value: 'Lara' },
        { label: 'Nora', value: 'Nora' }
    ];

    visible = computed(() => {
        return this.configService.designerActive();
    });

    selectedPrimaryColor = computed(() => {
        return this.configService.appState().primary;
    });

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

    hide(event) {
        !event && this.configService.hideDesigner();
    }

    apply() {
        this.saveTheme();
        updatePreset(this.preset);
        this.designerService.preset.update((state) => ({ ...state, ...this.preset }));
        this.configService.appState.update((state) => ({ ...state }));
    }

    saveTheme() {
        const localState = {
            themes: {
                defaultTheme: {
                    name: this.selectedPreset(),
                    preset: this.preset,
                    customTokens: this.customTokens
                }
            }
        };

        localStorage.setItem(this.configService.appState().designerKey, JSON.stringify(localState));
    }

    onPresetChange(value: any) {
        this.configService.appState.update((state) => ({ ...state, preset: value }));
        const newPreset = presets[value];

        if (this.configService.appState().preset === 'Material') {
            document.body.classList.add('material');
            this.config.ripple.set(true);
        } else {
            document.body.classList.remove('material');
            this.config.ripple.set(false);
        }

        this.preset = {
            ...newPreset,
            primitive: newPreset.primitive,
            semantic: newPreset.semantic
        };

        this.preset.semantic.primary = this.preset.primitive.emerald;
        this.preset.semantic.colorScheme.light.surface = { ...{ 0: '#ffffff' }, ...this.preset.primitive.slate };
        this.preset.semantic.colorScheme.dark.surface = { ...{ 0: '#ffffff' }, ...this.preset.primitive.zinc };
        usePreset(this.preset);
        this.designerService.setPreset(this.preset);
    }

    loadFromLocalStorage() {
        const localState = localStorage.getItem(this.configService.appState().designerKey);

        if (localState) {
            const parsedLocalState = JSON.parse(localState);

            if (parsedLocalState?.themes?.defaultTheme) {
                const defaultTheme = parsedLocalState.themes.defaultTheme;

                if (defaultTheme.preset) {
                    this.preset = defaultTheme.preset;
                    const mergedPreset = { ...this.preset, components: { ...presets[defaultTheme.name].components } };
                    this.configService.appState.update((state) => ({ ...state, preset: defaultTheme.name }));

                    usePreset(mergedPreset);
                    this.designerService.setPreset(mergedPreset);
                }

                if (defaultTheme.customTokens) {
                    this.customTokens = defaultTheme.customTokens;
                    this.refreshACTokens();
                }
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Theme loaded to Designer', life: 3000 });
            }
        }
    }

    generateACTokens(parentPath, obj) {
        for (let key in obj) {
            if (key === 'dark') {
                continue;
            }

            if (key === 'primitive' || key === 'semantic' || key === 'colorScheme' || key === 'light' || key === 'extend') {
                this.generateACTokens(null, obj[key]);
            } else {
                if (typeof obj[key] === 'object') {
                    this.generateACTokens(parentPath ? parentPath + '.' + key : key, obj[key]);
                } else {
                    const regex = /\.\d+$/;
                    const tokenName = this.camelCaseToDotCase(parentPath ? parentPath + '.' + key : key);
                    const tokenValue = $dt(tokenName).value;
                    const isColor = tokenName.includes('color') || tokenName.includes('background') || regex.test(tokenName);

                    this.acTokens.push({ token: tokenName, label: '{' + tokenName + '}', variable: $dt(tokenName).variable, value: tokenValue, isColor: isColor });
                    this.designerService.setAcTokens(this.acTokens);
                }
            }
        }
    }

    addToken() {
        this.customTokens = [...this.customTokens, ...[{}]];
    }

    removeToken(index) {
        this.customTokens.splice(index, 1);
    }

    saveTokens() {
        this.preset.extend = {};
        this.customTokens.forEach((token) => {
            this.preset.extend[this.transformTokenName(token.name)] = token.value;
        });
        this.refreshACTokens();
        this.saveTheme();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tokens saved', life: 3000 });
    }

    replaceColorPalette() {
        this.preset.semantic.primary = this.preset.primitive.emerald;
        this.preset.semantic.colorScheme.light.surface = { ...{ 0: '#ffffff' }, ...this.preset.primitive.slate };
        this.preset.semantic.colorScheme.dark.surface = { ...{ 0: '#ffffff' }, ...this.preset.primitive.zinc };
    }

    transformTokenName(name) {
        if (name && name.trim().length) {
            let tokenNameSections = name.split('.');
            let transformedName = '';

            tokenNameSections.forEach((section, index) => {
                transformedName += index === 0 ? section : section.charAt(0).toUpperCase() + section.substring(1);
            });

            return transformedName;
        } else {
            return name;
        }
    }

    camelCaseToDotCase(name) {
        return name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
    }

    refreshACTokens() {
        this.acTokens = [];
        this.generateACTokens(null, this.preset);
    }

    onKeyDown(event) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.apply();
            event.preventDefault();
        }
    }
    download() {
        const basePreset = this.configService.appState().preset;
        const theme = JSON.stringify(this.preset, null, 4).replace(/"((?!\w+\.\d+)[^"]+)":/g, '$1:');
        const textContent = `import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import ${basePreset} from "@primeng/themes/${basePreset.toLowerCase()}";
import { definePreset } from "@primeng/themes";

const MyPreset = definePreset(${basePreset}, ${theme});

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
               preset: MyPreset,
            }
        })
    ]
};
`;
        const blob = new Blob([textContent], { type: 'text/plain' });

        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');

        a.href = url;
        a.download = 'mytheme.ts';
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
