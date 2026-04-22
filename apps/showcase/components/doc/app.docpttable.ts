import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addClass, find, removeClass } from '@primeuix/utils/dom';
import { AppConfigService } from '../../service/appconfigservice';
import { AppDocSectionText } from './app.docsectiontext';

export interface PtOptionItem {
    value: number;
    label: string;
    type: string;
    options?: PtMethodOption[];
}

export interface PtMethodOption {
    name: string;
    type: string;
    description?: string;
}

export interface DocData {
    key: string;
    data: PtOptionItem[];
}

// Union type for flexible data input
type PtTableData = PtOptionItem[] | DocData[];

@Component({
    selector: 'app-docpttable',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, RouterModule],
    template: `
        @if (normalizedData().length > 0) {
            <!-- Section Title and Description -->
            @if (label()) {
                <app-docsectiontext [id]="id()" [title]="label()" [level]="3">
                    @if (description()) {
                        <p>{{ description() }}</p>
                    }
                </app-docsectiontext>
            }

            <!-- Interactive PT Viewer (only when showViewer is true and has nested data) -->
            @if (showViewer() && isNestedData()) {
                <app-docsectiontext>
                    <p>
                        Some sections may not be visible due to the availability of the particular feature. Section names that start with the <i>pc</i> prefix indicate that the element is a PrimeNG component not a DOM element. Visit the
                        <a routerLink="/passthrough">pass-through</a> documentation for more information.
                    </p>
                </app-docsectiontext>
                <div #container class="doc-ptviewerwrapper card">
                    <div id="doc-ptviewer" class="doc-ptviewer">
                        <ng-content />
                    </div>
                    <div class="doc-ptoptions">
                        @for (doc of nestedData(); track doc.key) {
                            @for (item of filterVisibleItems(doc.data); track item.label) {
                                <div class="doc-ptoption" (mouseenter)="enterSection(item, doc.key)" (mouseleave)="leaveSection()">
                                    <span class="doc-ptoption-text">
                                        {{ item.label }}
                                        @if (nestedData().length > 1) {
                                            <span> | {{ doc.key }}</span>
                                        }
                                    </span>
                                </div>
                            }
                        }
                    </div>
                </div>
            }

            <!-- PT Options Table -->
            @if (showTable()) {
                <div class="doc-tablewrapper mt-4">
                    <table class="doc-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Type</th>
                                @if (hasOptions()) {
                                    <th>Method Options</th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            @for (item of normalizedData(); track item.label) {
                                <tr>
                                    <td>
                                        <span class="doc-option-type">{{ item.value }}</span>
                                    </td>
                                    <td>
                                        <span [attr.id]="id() + '.' + item.label" class="doc-option-name">
                                            {{ item.label }}
                                            <a (click)="navigate($event, item.label)" class="doc-option-link">
                                                <i class="pi pi-link"></i>
                                            </a>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="doc-option-type">{{ item.type }}</span>
                                    </td>
                                    @if (hasOptions()) {
                                        <td>
                                            @if (item.options && item.options.length > 0) {
                                                @for (option of item.options; track option.name) {
                                                    <div class="doc-option-params">
                                                        <span class="doc-option-parameter-name">{{ option.name }}</span>
                                                        <span class="doc-option-parameter-type">: {{ option.type }}</span>
                                                    </div>
                                                }
                                            } @else {
                                                <span>-</span>
                                            }
                                        </td>
                                    }
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            }
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppDocPtTable {
    private configService: AppConfigService = inject(AppConfigService);
    private location = inject(Location);

    container = viewChild<ElementRef>('container');

    id = input<string>('');
    label = input<string>('');
    data = input<PtTableData>([]);
    description = input<string>('');
    componentName = input<string>('');
    showViewer = input<boolean>(false);
    showTable = input<boolean>(true);

    private hoveredElements: HTMLElement[] = [];

    isDarkMode = computed(() => this.configService.appState().darkTheme);

    isNestedData = computed(() => {
        const d = this.data();
        if (!d || d.length === 0) return false;
        return 'key' in d[0] && 'data' in d[0];
    });

    nestedData = computed((): DocData[] => {
        if (!this.isNestedData()) return [];
        return this.data() as DocData[];
    });

    // Normalize data to flat array for table display
    normalizedData = computed((): PtOptionItem[] => {
        const d = this.data();
        if (!d || d.length === 0) return [];

        // If nested data (DocData[]), flatten it
        if (this.isNestedData()) {
            return (d as DocData[]).flatMap((doc) => doc.data);
        }

        // Already flat data (PtOptionItem[])
        return d as PtOptionItem[];
    });

    hasOptions = computed(() => {
        return this.normalizedData().some((item) => item.options && item.options.length > 0);
    });

    filterVisibleItems(items: PtOptionItem[]): PtOptionItem[] {
        return items.filter((item) => item.label !== 'hooks' && item.label !== 'transition' && !item.label.includes('hidden'));
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

    enterSection(item: PtOptionItem, componentName: string): void {
        if (typeof document === 'undefined') return;

        let selector: string;
        let cmpName = componentName;

        if (componentName === 'ConfirmDialog') cmpName = 'Dialog';

        if (componentName === 'ScrollTop') {
            selector = `[data-pc-extend="button"][data-pc-section="root"]`;
        } else if (item.label === 'host') {
            selector = `p-${cmpName.toLowerCase()}[data-pc-section="host"]`;
        } else if (item.label === 'root') {
            selector = `[data-pc-name="${cmpName.toLowerCase()}"][data-pc-section="root"]`;
        } else if (item.label.startsWith('pc')) {
            selector = `[data-pc-name="${item.label.toLowerCase()}"][data-pc-section="root"]`;
        } else if (componentName === 'InputMask') {
            selector = `[data-pc-name="inputtext"][data-pc-section="root"]`;
        } else {
            selector = `[data-pc-section="${item.label.toLowerCase()}"]`;
        }

        if (this.hoveredElements.length === 0) {
            const body = document.querySelector('body');
            if (body) {
                this.hoveredElements = find(body, selector) as HTMLElement[];
            }
        }

        this.hoveredElements.forEach((el) => {
            addClass(el, '!ring !ring-blue-500 !z-10');
        });
    }

    leaveSection(): void {
        this.hoveredElements.forEach((el) => {
            removeClass(el, '!ring !ring-blue-500 !z-10');
        });
        this.hoveredElements = [];
    }
}
