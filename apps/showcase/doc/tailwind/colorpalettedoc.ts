import { Component } from '@angular/core';

@Component({
    selector: 'color-palette-doc',
    template: `
        <app-docsectiontext> <p>PrimeNG color palette as utility classes.</p></app-docsectiontext>
        <div class="card">
            <div class="flex flex-col gap-12">
                <ul class="p-0 m-0 list-none flex sm:flex-col gap-4 flex-wrap sm:flex-nowrap">
                    <li *ngFor="let color of colors; let i = index" [ngStyle]="{ 'min-width': '6rem' }" class="flex-auto">
                        <span class="font-medium capitalize block mb-2 text-center sm:text-left">{{ color }}</span>
                        <div class="flex gap-4 flex-auto flex-col sm:flex-row">
                            <div *ngFor="let shade of shades" [ngClass]="{ invisible: color === 'primary' && shade === 0 }" class="flex flex-col items-center gap-1 flex-1">
                                <div class="rounded h-8 w-full" [ngStyle]="{ 'background-color': 'var(--p-' + color + '-' + shade + ')' }"></div>
                                <span class="text-sm text-surface-500 dark:text-surface-400 font-medium">{{ shade }}</span>
                            </div>
                        </div>
                    </li>
                </ul>

                <div class="flex gap-6 flex-wrap">
                    <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">primary</div>
                    <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">highlight</div>
                    <div class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">box</div>
                </div>
            </div>
        </div>
    `
})
export class ColorPaletteDoc {
    shades: number[] = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    colors: string[] = ['primary', 'surface'];
}
