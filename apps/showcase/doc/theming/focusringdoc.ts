import { Component } from '@angular/core';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'focusring-doc',
    standalone: true,
    imports: [AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Focus ring defines the outline width, style, color and offset. Let's use a thicker ring with the primary color for the outline.</p>
        </app-docsectiontext>
        <app-code [code]="code" selector="focusring-demo" [hideToggleCode]="true"></app-code>
    `
})
export class FocusRingDoc {
    code = {
        typescript: `const MyPreset = definePreset(Aura, {
    semantic: {
        focusRing: {
            width: '2px',
            style: 'dashed',
            color: '{primary.color}',
            offset: '1px'
        }
    }
});`
    };
}
