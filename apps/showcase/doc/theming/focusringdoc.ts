import { Component } from '@angular/core';

@Component({
    selector: 'focusring-doc',
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
