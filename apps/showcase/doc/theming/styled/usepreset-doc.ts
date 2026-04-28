import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'usepreset-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Replaces the current presets entirely, common use case is changing the preset dynamically at runtime.</p>
        </app-docsectiontext>
        <app-code [code]="code1" [hideToggleCode]="true" class="block mb-4"></app-code>
        <app-code [code]="code2" [hideToggleCode]="true"></app-code>
    `
})
export class UsePresetDoc {
    code1 = {
        typescript: `import { usePreset } from '@primeuix/themes';`
    };

    code2 = {
        typescript: `onButtonClick() {
    usePreset(MyPreset);
}`
    };
}
