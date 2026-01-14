import { ChangeDetectionStrategy, Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignTokenField } from '@/components/layout/designer/editor/designtokenfield';
import { DesignerService } from '@/service/designerservice';

@Component({
    selector: 'design-semantic-section',
    standalone: true,
    imports: [CommonModule, DesignTokenField],
    template: `
        <section>
            <div *ngIf="!root" class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0 capitalize">{{ sectionName() }}</div>
            <div *ngIf="hasPrimitiveTokens()" class="grid grid-cols-4 gap-x-2 gap-y-3">
                <ng-container *ngFor="let item of primitiveTokensArray()">
                    <design-token-field [(modelValue)]="tokens()[item.key]" [label]="camelCaseToSpaces(item.key)" [path]="path + '.' + item.key" [switchable]="switchable" />
                </ng-container>
            </div>
            <ng-container *ngIf="hasNestedTokens()">
                <design-semantic-section *ngFor="let item of nestedTokensArray()" [path]="path + '.' + item.key" [switchable]="switchable" class="block mt-3" />
            </ng-container>
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
