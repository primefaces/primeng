import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-docstyledpreset',
    standalone: false,
    template: `<app-docsectiontext title="Built-in Presets" id="built-in-presets" [level]="3">
        <p>PrimeNG offers various preset options that allow you to customize the component's styling to match your application's design system. Below you'll find links to the implementation and type definitions for each preset.</p>
        <div class="doc-tablewrapper mt-4">
            <table class="doc-preset-table">
                <thead>
                    <tr>
                        <th *ngFor="let header of headers">
                            <ng-container *ngIf="header !== 'readonly' && header !== 'optional' && header !== 'deprecated'">
                                {{ header }}
                            </ng-container>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let preset of presets">
                        <td [class]="'doc-option-preset-name-{{preset.toLowerCase()}}'">{{ preset }}</td>
                        <td [class]="'doc-option-preset-implementation-{{preset.toLowerCase()}}'">
                            <a
                                href="https://github.com/primefaces/primeuix/blob/main/packages/themes/src/presets/{{ preset.toLowerCase() }}/{{ data }}/index.ts"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex rounded-full px-3 py-1 bg-surface-200 hover:bg-surface-300 transition-all duration-200 gap-2 items-center text-sm dark:bg-surface-800 dark:hover:bg-surface-700"
                            >
                                <span class="text-surface-900 dark:text-surface-50 font-medium">{{ preset }}</span>
                                <i class="pi pi-external-link !text-xs text-surface-900 dark:text-surface-50"></i>
                            </a>
                        </td>
                        <td [class]="'doc-option-preset-type-{{preset.toLowerCase()}}'">
                            <a
                                href="https://github.com/primefaces/primeuix/blob/main/packages/themes/src/presets/{{ preset.toLowerCase() }}/{{ data }}/index.d.ts"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex rounded-full px-3 py-1 bg-surface-200 hover:bg-surface-300 transition-all duration-200 gap-2 items-center text-sm dark:bg-surface-800 dark:hover:bg-surface-700"
                            >
                                <span class="text-surface-900 dark:text-surface-50 font-medium">{{ preset }}</span>
                                <i class="pi pi-external-link !text-xs text-surface-900 dark:text-surface-50"></i>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </app-docsectiontext>`
})
export class AppDocStyledPresetComponent {
    @Input() data: string;

    headers: string[] = ['Preset', 'Implementation', 'Types'];

    presets: string[] = ['Aura', 'Lara', 'Nora', 'Material'];
}
