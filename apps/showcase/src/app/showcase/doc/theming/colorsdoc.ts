import { Component } from '@angular/core';

@Component({
    selector: 'colors-doc',
    template: `
        <app-docsectiontext>
            <p>
                Color palette of a preset is defined by the <i>primitive</i> design token group. The default colors are derived from the Tailwind colors with some extensions to make it consistent with the Tailwind Presets projects of the unstyled
                mode.
            </p>
            <p>Colors can be accessed at CSS as a variable and programmatically using the <i>$dt</i> utility.</p>
            <app-code [code]="code" selector="colors-demo" [hideToggleCode]="true"></app-code>
            <div class="card mt-4">
                <ul class="p-0 m-0 list-none flex sm:flex-col gap-4 flex-wrap sm:flex-nowrap">
                    @for (color of colors; track color) {
                        <li class="flex-auto" style="min-width: 6rem">
                            <span class="font-medium capitalize block mb-2 text-center sm:text-left">{{ color }}</span>
                            <div class="flex gap-4 flex-auto flex-col sm:flex-row">
                                @for (shade of shades; track shade) {
                                    <div class="flex flex-col items-center gap-1 flex-1">
                                        <div class="rounded h-8 w-full" [style]="'background-color: var(--p-' + color + '-' + shade + ')'"></div>
                                        <span class="text-sm text-surface-500 dark:text-surface-400 font-medium">{{ shades[j] }}</span>
                                    </div>
                                }
                            </div>
                        </li>
                    }
                </ul>
            </div>
        </app-docsectiontext>
    `
})
export class ColorsDoc {
    shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

    colors = ['emerald', 'green', 'lime', 'red', 'orange', 'amber', 'yellow', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone'];

    code = {
        basic: `// With CSS
var(--p-blue-500)

// With JS
$dt('blue.500').value`
    };
}
