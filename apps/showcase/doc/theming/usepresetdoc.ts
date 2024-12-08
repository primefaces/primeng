import { Component } from '@angular/core';

@Component({
    selector: 'use-preset-doc',
    template: `
        <app-docsectiontext>
            <p>Replaces the current presets entirely, common use case is changing the preset dynamically at runtime.</p>
        </app-docsectiontext>
        <app-code [code]="code1" selector="use-preset-demo" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code2" selector="use-preset-demo" [hideToggleCode]="true"></app-code>
    `
    standalone: false
})
export class UsePresetDoc {
    code1 = {
        typescript: `import { usePreset } from '@primeng/themes';`
    };

    code2 = {
        typescript: `onButtonClick() {
    usePreset(MyPreset);
}`
    };
}
