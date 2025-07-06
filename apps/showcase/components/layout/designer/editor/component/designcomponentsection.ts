import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignerService } from '@/service/designerservice';
import { DesignTokenField } from '../designtokenfield';

@Component({
    selector: 'design-component-section',
    standalone: true,
    imports: [CommonModule, DesignTokenField],
    template: `<section>
        <div class="text-sm mb-1 font-semibold text-surface-950 dark:text-surface-0 capitalize">{{ sectionName() }}</div>
        <div class="grid grid-cols-4 gap-x-2 gap-y-3">
            @for (entry of objectKeys(tokens()); track entry) {
                <design-token-field
                    *ngIf="!isObject(tokens()[entry])"
                    [(modelValue)]="tokens()[entry]"
                    [label]="camelCaseToSpaces(entry)"
                    [componentKey]="componentKey()"
                    [path]="path() + '.' + entry"
                    [type]="isColor(entry) ? 'color' : null"
                    [switchable]="true"
                />
            }
        </div>
        @if (hasNestedTokens()) {
            @for (entry of objectKeys(nestedTokens()); track entry) {
                <design-component-section [componentKey]="componentKey()" [path]="path() + '.' + entry" class="block mt-3" />
            }
        }
    </section>`
})
export class DesignComponentSection {
    objectKeys = Object.keys;

    designerService: DesignerService = inject(DesignerService);

    componentKey = input<string>();

    path = input<any>();

    sectionName = computed(() => {
        const names = this.path().split('.');

        return names
            .filter((n) => n !== 'colorScheme' && n !== 'light' && n !== 'dark')
            .map((n) => this.capitalize(this.camelCaseToSpaces(n)))
            .join(' ');
    });

    tokens = computed(() => {
        const designer = this.designerService.designer();
        const source = designer.theme.preset.components[this.componentKey()];
        return this.getObjectProperty(source, this.path());
    });

    nestedTokens = computed(() => {
        const groups = {};
        const obj = this.tokens();

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];

                if (this.isObject(value)) {
                    groups[key] = value;
                }
            }
        }

        return groups;
    });

    hasNestedTokens = computed(() => {
        return Object.keys(this.nestedTokens()).length > 0;
    });

    camelCaseToSpaces(val) {
        return val.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    isColor(val) {
        return val.toLowerCase().includes('color') || val.toLowerCase().includes('background');
    }

    isObject(val) {
        return val !== null && typeof val === 'object';
    }

    getObjectProperty(obj, path) {
        const keys = path.split('.');
        let current = obj;

        for (const key of keys) {
            if (current[key] !== undefined) {
                current = current[key];
            } else {
                return undefined;
            }
        }

        return current;
    }

    capitalize(str) {
        if (typeof str !== 'string' || str.length === 0) {
            return str;
        }

        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
