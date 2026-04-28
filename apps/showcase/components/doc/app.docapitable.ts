import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule, Location } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, numberAttribute } from '@angular/core';
import { AppDocSectionText } from './app.docsectiontext';

@Component({
    selector: 'app-docapitable',
    standalone: true,
    imports: [CommonModule, AppDocSectionText],
    template: `
        @if (data()) {
            <!-- Parent Section Header -->
            @if (parentId()) {
                <div class="my-4 pt-4">
                    <app-docsectiontext [level]="2"></app-docsectiontext>
                </div>
            }

            <!-- Section Title and Description -->
            <app-docsectiontext [id]="id()" [title]="label()" [level]="3">
                <p>{{ description() || null }}</p>
            </app-docsectiontext>

            <!-- Main Table (when data has no nested data) -->
            @if (!hasNestedData()) {
                <div class="doc-tablewrapper mt-4">
                    <table class="doc-table">
                        <thead>
                            <tr>
                                @for (key of visibleKeys(); track key) {
                                    <th [style.min-width]="key === 'variable' ? '30rem' : null">
                                        {{ key }}
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            @for (prop of data(); track prop.name || $index) {
                                <tr>
                                    @for (entry of getVisibleEntries(prop); track entry[0]) {
                                        <td>
                                            <ng-container [ngTemplateOutlet]="cellContent" [ngTemplateOutletContext]="{ entry: entry, prop: prop }"></ng-container>
                                        </td>
                                    }
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            }

            <!-- Nested Data (recursive) -->
            @if (hasNestedData()) {
                @for (childData of data(); track childData.id || $index) {
                    <app-docapitable [id]="childData.id" [data]="childData.data" [label]="childData.label" [description]="childData.description" [relatedProp]="childData.relatedProp" />
                }
            }
        }

        <!-- Cell Content Template -->
        <ng-template #cellContent let-entry="entry" let-prop="prop">
            @switch (entry[0]) {
                @case ('name') {
                    <span [attr.id]="id() + '.' + entry[1]" class="doc-option-name" [class.line-through]="!!prop.deprecated" [class.cursor-pointer]="!!prop.deprecated" [attr.title]="prop.deprecated">
                        {{ entry[1] || '-' }}
                        <a (click)="navigate($event, entry[1])" class="doc-option-link">
                            <i class="pi pi-link"></i>
                        </a>
                    </span>
                }
                @case ('type') {
                    <span class="doc-option-type">{{ entry[1] || '-' }}</span>
                }
                @case ('options') {
                    <span class="doc-option-type">
                        @for (option of entry[1]; track option.name) {
                            <div>{{ option.name }}: {{ option.type }};</div>
                        }
                    </span>
                }
                @case ('parameters') {
                    <ng-container [ngTemplateOutlet]="parametersContent" [ngTemplateOutletContext]="{ parameters: entry[1], prop: prop }"></ng-container>
                }
                @default {
                    <div
                        [id]="id() + '.' + entry[0]"
                        style="display: inline"
                        [class.doc-option-dark]="isDarkMode() && entry[0] === 'default'"
                        [class.doc-option-light]="!isDarkMode() && entry[0] === 'default'"
                        [class.doc-option-default]="entry[0] === 'default'"
                        [class.doc-option-description]="entry[0] === 'description'"
                        [class.doc-option-return-type]="entry[0] === 'variable'"
                        [class.min-w-full]="entry[0] === 'variable'"
                    >
                        {{ entry[1] }}
                    </div>
                }
            }
        </ng-template>

        <!-- Parameters Content Template -->
        <ng-template #parametersContent let-parameters="parameters" let-prop="prop">
            @for (parameter of parameters; track parameter.name || $index) {
                @if (parameter.name) {
                    <div class="doc-option-params">
                        <span [class.doc-option-parameter-name]="isEmitters()" [class.text-primary-700]="isTemplates()"> {{ parameter.name }} : </span>
                        @for (value of parseType(parameter.type); track value; let i = $index) {
                            {{ i !== 0 ? ' |' : ' ' }}
                            @if (isLinkType(value)) {
                                <a (click)="scrollToLinkedElement($event, value)" [class.doc-option-parameter-type]="isEmitters()" [class.text-primary-700]="isTemplates()" class="doc-option-link">
                                    {{ value || '-' }}
                                </a>
                            } @else {
                                <span [class.doc-option-parameter-type]="isEmitters()" [class.text-primary-700]="isTemplates()">
                                    {{ value }}
                                </span>
                            }
                        }
                    </div>
                } @else {
                    <span>null</span>
                }
            }
        </ng-template>
    `,
    styles: `
        .parameter-bold {
            font-weight: bold;
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocApiTable {
    private configService = inject(AppConfigService);
    private location = inject(Location);

    id = input<string>('');
    label = input<string>('');
    data = input<any[]>([]);
    description = input<string>('');
    relatedProp = input<string>('');
    parentTitle = input<string>('');
    parentDescription = input<string>('');
    parentId = input<string>('');
    level = input(0, { transform: numberAttribute });
    isInterface = input(false, { transform: booleanAttribute });

    isDarkMode = computed(() => this.configService.appState().darkTheme);

    hasNestedData = computed(() => {
        const d = this.data();
        return d && d.length > 0 && d[0].data && d[0].data.length > 0;
    });

    isEmitters = computed(() => this.label() === 'Emitters');
    isTemplates = computed(() => this.label() === 'Templates');
    isMethods = computed(() => this.label() === 'Methods');

    hasParameters = computed(() => {
        const d = this.data();
        return d?.some((item) => item.parameters && item.parameters.length > 0) ?? false;
    });

    visibleKeys = computed(() => {
        const d = this.data();
        if (!d || d.length === 0) return [];

        const keys = Object.keys(d[0]);
        const hiddenKeys = ['readonly', 'optional', 'deprecated'];

        return keys.filter((key) => {
            if (hiddenKeys.includes(key)) return false;
            if (key === 'parameters' && !this.hasParameters()) return false;
            return true;
        });
    });

    getVisibleEntries(object: any): [string, any][] {
        const entries = Object.entries(object) as [string, any][];
        const hiddenKeys = ['readonly', 'optional', 'deprecated'];

        return entries.filter(([key]) => {
            if (hiddenKeys.includes(key)) return false;
            if (key === 'parameters' && !this.hasParameters()) return false;
            return true;
        });
    }

    parseType(value: string | null): string[] {
        if (this.isTemplates()) {
            return value?.split('|') ?? [];
        }
        if (this.isMethods() && !value) {
            return ['-'];
        }
        return value?.split('|').map((item) => item.replace(/(\[|\]|<|>).*$/gm, '').trim()) ?? [];
    }

    isLinkType(value: string): boolean {
        if (this.isTemplates()) return false;

        const validValues = ['confirmationoptions', 'toastmessageoptions'];
        const componentName = this.id().split('.')[1]?.toLowerCase() ?? '';

        return value.toLowerCase().includes(componentName) || validValues.includes(value.toLowerCase());
    }

    navigate(event: Event, param: string): void {
        if (typeof window !== 'undefined') {
            const parentElement = (event.currentTarget as HTMLElement).parentElement;
            this.location.go(this.location.path() + '#' + this.id() + '.' + param);

            setTimeout(() => {
                parentElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }, 1);
            event.preventDefault();
        }
    }

    scrollToLinkedElement(event: Event, value: string): void {
        if (typeof document !== 'undefined') {
            const section = this.isEmitters() ? 'Events' : this.label();
            const componentName = this.id().split('.')[1]?.toLowerCase() ?? '';
            const elementId = `api.${componentName}.${section.toLowerCase()}.${value}`;

            setTimeout(() => {
                this.scrollToLabelById(elementId);
            }, 1);

            event.preventDefault();
        }
    }

    private scrollToLabelById(id: string): void {
        if (typeof document !== 'undefined') {
            const label = document.getElementById(id);
            this.location.go(`${this.location.path()}/#${id}`);
            label?.parentElement?.scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }
}
