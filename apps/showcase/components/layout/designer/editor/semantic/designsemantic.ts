import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { TabsModule } from 'primeng/tabs';
import { FieldsetModule } from 'primeng/fieldset';
import { DesignTokenField } from '@/components/layout/designer/editor/designtokenfield';
import { DesignSemanticSection } from './designsemanticsection';
import { DesignerService } from '@/service/designerservice';
import { AppConfigService } from '@/service/appconfigservice';

const SEMANTIC_ORDER = ['primary', 'surface', 'focusRing', 'formField', 'list', 'navigation', 'overlay', 'content', 'mask'];

@Component({
    selector: 'design-semantic',
    standalone: true,
    imports: [CommonModule, FormsModule, AccordionModule, TabsModule, FieldsetModule, DesignTokenField, DesignSemanticSection],
    template: `
        <section>
            <p-accordion [value]="['0', '1']" [multiple]="true">
                <p-accordion-panel value="0">
                    <p-accordion-header>Common</p-accordion-header>
                    <p-accordion-content>
                        <div>
                            <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                                <p-fieldset *ngIf="hasCommonPrimitives()" legend="General" [toggleable]="true">
                                    <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                                        <ng-container *ngFor="let item of commonPrimitivesArray()">
                                            <design-token-field [(modelValue)]="tokens()[item.key]" [label]="camelCaseToSpaces(item.key)" />
                                        </ng-container>
                                    </div>
                                </p-fieldset>
                                <p-fieldset *ngFor="let item of commonObjectsArray()" [legend]="capitalize(camelCaseToSpaces(item.key))" [toggleable]="true">
                                    <design-semantic-section [path]="item.key" [root]="true" />
                                </p-fieldset>
                            </form>
                        </div>
                    </p-accordion-content>
                </p-accordion-panel>

                <p-accordion-panel value="1">
                    <p-accordion-header>Color Scheme</p-accordion-header>
                    <p-accordion-content>
                        <p-tabs [value]="activeColorScheme()" (valueChange)="onColorSchemeChange($event)">
                            <p-tablist>
                                <p-tab value="cs-0">Light</p-tab>
                                <p-tab value="cs-1">Dark</p-tab>
                            </p-tablist>
                            <p-tabpanels class="!px-0">
                                <p-tabpanel value="cs-0">
                                    <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                                        <p-fieldset *ngIf="hasLightPrimitives()" legend="General" [toggleable]="true">
                                            <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                                                <ng-container *ngFor="let item of lightPrimitivesArray()">
                                                    <design-token-field [(modelValue)]="lightTokens()[item.key]" [label]="camelCaseToSpaces(item.key)" />
                                                </ng-container>
                                            </div>
                                        </p-fieldset>
                                        <p-fieldset *ngFor="let item of lightObjectsArray()" [legend]="capitalize(camelCaseToSpaces(item.key))" [toggleable]="true">
                                            <design-semantic-section [path]="'colorScheme.light.' + item.key" [root]="true" [switchable]="true" />
                                        </p-fieldset>
                                    </form>
                                </p-tabpanel>
                                <p-tabpanel value="cs-1">
                                    <form (keydown)="onKeyDown($event)" class="flex flex-col gap-3">
                                        <p-fieldset *ngIf="hasDarkPrimitives()" legend="General" [toggleable]="true">
                                            <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                                                <ng-container *ngFor="let item of darkPrimitivesArray()">
                                                    <design-token-field [(modelValue)]="darkTokens()[item.key]" [label]="camelCaseToSpaces(item.key)" />
                                                </ng-container>
                                            </div>
                                        </p-fieldset>
                                        <p-fieldset *ngFor="let item of darkObjectsArray()" [legend]="capitalize(camelCaseToSpaces(item.key))" [toggleable]="true">
                                            <design-semantic-section [path]="'colorScheme.dark.' + item.key" [root]="true" [switchable]="true" />
                                        </p-fieldset>
                                    </form>
                                </p-tabpanel>
                            </p-tabpanels>
                        </p-tabs>
                    </p-accordion-content>
                </p-accordion-panel>
            </p-accordion>
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignSemantic {
    designerService = inject(DesignerService);
    configService = inject(AppConfigService);

    tokens = computed(() => this.designerService.designer().theme.preset.semantic);

    commonTokens = computed(() => {
        const result: any = {};
        const tokens = this.tokens();
        if (!tokens) return result;

        for (const key in tokens) {
            if (tokens.hasOwnProperty(key) && key !== 'colorScheme') {
                result[key] = tokens[key];
            }
        }
        return result;
    });

    commonPrimitivesArray = computed(() => {
        const obj = this.commonTokens();
        return Object.keys(obj)
            .filter((key) => !this.isObject(obj[key]))
            .map((key) => ({ key, value: obj[key] }));
    });

    hasCommonPrimitives = computed(() => this.commonPrimitivesArray().length > 0);

    commonObjectsArray = computed(() => {
        const obj = this.commonTokens();
        const keys = Object.keys(obj).filter((key) => this.isObject(obj[key]));

        keys.sort((a, b) => {
            const indexA = SEMANTIC_ORDER.indexOf(a);
            const indexB = SEMANTIC_ORDER.indexOf(b);
            const orderA = indexA === -1 ? SEMANTIC_ORDER.length : indexA;
            const orderB = indexB === -1 ? SEMANTIC_ORDER.length : indexB;
            return orderA - orderB;
        });

        return keys.map((key) => ({ key, value: obj[key] }));
    });

    lightTokens = computed(() => this.tokens()?.colorScheme?.light || {});

    lightPrimitivesArray = computed(() => {
        const obj = this.lightTokens();
        return Object.keys(obj)
            .filter((key) => !this.isObject(obj[key]))
            .map((key) => ({ key, value: obj[key] }));
    });

    hasLightPrimitives = computed(() => this.lightPrimitivesArray().length > 0);

    lightObjectsArray = computed(() => {
        const obj = this.lightTokens();
        const keys = Object.keys(obj).filter((key) => this.isObject(obj[key]));

        keys.sort((a, b) => {
            const indexA = SEMANTIC_ORDER.indexOf(a);
            const indexB = SEMANTIC_ORDER.indexOf(b);
            const orderA = indexA === -1 ? SEMANTIC_ORDER.length : indexA;
            const orderB = indexB === -1 ? SEMANTIC_ORDER.length : indexB;
            return orderA - orderB;
        });

        return keys.map((key) => ({ key, value: obj[key] }));
    });

    darkTokens = computed(() => this.tokens()?.colorScheme?.dark || {});

    darkPrimitivesArray = computed(() => {
        const obj = this.darkTokens();
        return Object.keys(obj)
            .filter((key) => !this.isObject(obj[key]))
            .map((key) => ({ key, value: obj[key] }));
    });

    hasDarkPrimitives = computed(() => this.darkPrimitivesArray().length > 0);

    darkObjectsArray = computed(() => {
        const obj = this.darkTokens();
        const keys = Object.keys(obj).filter((key) => this.isObject(obj[key]));

        keys.sort((a, b) => {
            const indexA = SEMANTIC_ORDER.indexOf(a);
            const indexB = SEMANTIC_ORDER.indexOf(b);
            const orderA = indexA === -1 ? SEMANTIC_ORDER.length : indexA;
            const orderB = indexB === -1 ? SEMANTIC_ORDER.length : indexB;
            return orderA - orderB;
        });

        return keys.map((key) => ({ key, value: obj[key] }));
    });

    activeColorScheme = computed(() => (this.configService.appState().darkTheme ? 'cs-1' : 'cs-0'));

    onKeyDown(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'NumpadEnter') {
            this.designerService.applyTheme(this.designerService.designer().theme);
            event.preventDefault();
        }
    }

    onColorSchemeChange(value: string) {
        if (value === 'cs-0') {
            this.configService.appState.update((state) => ({ ...state, darkTheme: false }));
        } else if (value === 'cs-1') {
            this.configService.appState.update((state) => ({ ...state, darkTheme: true }));
        }
    }

    camelCaseToSpaces(val: string): string {
        return val.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    capitalize(str: string): string {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    isObject(val: any): boolean {
        return val !== null && typeof val === 'object';
    }
}
