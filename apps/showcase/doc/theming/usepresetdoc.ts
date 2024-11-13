import { Component } from '@angular/core';

@Component({
    selector: 'use-preset-doc',
    template: `
        <app-docsectiontext>
            <p>Replaces the current presets entirely, common use case is changing the preset dynamically at runtime.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="use-preset-demo" [hideToggleCode]="true"></app-code>
    `
})
export class UsePresetDoc {
    code = {
        typescript: `import { usePreset } from 'primeng/themes';
...
onButtonClick() {
    usePreset(MyPreset);
}`
    };
}
