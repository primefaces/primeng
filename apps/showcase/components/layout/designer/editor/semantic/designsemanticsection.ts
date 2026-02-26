import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { DesignTokenField } from '@/components/layout/designer/editor/designtokenfield';
import { DesignerService } from '@/service/designerservice';

@Component({
    selector: 'design-semantic-section',
    standalone: true,
    imports: [DesignTokenField],
    template: `
        <section>
            @if (!root) {
                <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0 capitalize">{{ sectionName() }}</div>
            }
            @if (hasPrimitiveTokens()) {
                <div class="grid grid-cols-4 gap-x-2 gap-y-3">
                    @for (item of primitiveTokensArray(); track item.key) {
                        <design-token-field [(modelValue)]="tokens()[item.key]" [label]="camelCaseToSpaces(item.key)" [path]="path + '.' + item.key" [switchable]="switchable" />
                    }
                </div>
            }
            @if (hasNestedTokens()) {
                @for (item of nestedTokensArray(); track item.key) {
                    <design-semantic-section [path]="path + '.' + item.key" [switchable]="switchable" class="block mt-3" />
                }
            }
        </section>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DesignSemanticSection {
    @Input() path: string = '';
    @Input() root: boolean = false;
    @Input() switchable: boolean = false;

    designerService = inject(DesignerService);

    sectionName = computed(() => {
        const names = this.path.split('.');
        const filtered = names.filter((n) => n !== 'colorScheme' && n !== 'light' && n !== 'dark');
        const lastPart = filtered[filtered.length - 1];
        return this.capitalize(this.camelCaseToSpaces(lastPart));
    });

    tokens = computed(() => {
        const source = this.designerService.designer().theme.preset.semantic;
        return this.getObjectProperty(source, this.path);
    });

    primitiveTokensArray = computed(() => {
        const obj = this.tokens();
        if (!obj) return [];
        return Object.keys(obj)
            .filter((key) => !this.isObject(obj[key]))
            .map((key) => ({ key, value: obj[key] }));
    });

    hasPrimitiveTokens = computed(() => this.primitiveTokensArray().length > 0);

    nestedTokensArray = computed(() => {
        const obj = this.tokens();
        if (!obj) return [];
        return Object.keys(obj)
            .filter((key) => this.isObject(obj[key]))
            .map((key) => ({ key, value: obj[key] }));
    });

    hasNestedTokens = computed(() => this.nestedTokensArray().length > 0);

    camelCaseToSpaces(val: string): string {
        return val.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    isObject(val: any): boolean {
        return val !== null && typeof val === 'object';
    }

    getObjectProperty(obj: any, path: string): any {
        const keys = path.split('.');
        let current = obj;

        for (const key of keys) {
            if (current && current[key] !== undefined) {
                current = current[key];
            } else {
                return undefined;
            }
        }

        return current;
    }

    capitalize(str: string): string {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
