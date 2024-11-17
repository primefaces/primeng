import { AutoFocusDocModule } from '@/doc/autofocus/autofocusdoc.module';
import { BasicDoc } from '@/doc/autofocus/basicdoc';
import { ImportDoc } from '@/doc/autofocus/importdoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AutoFocusDocModule],
    template: ` <app-doc docTitle="Angular AutoFocus Directive" header="AutoFocus" description="AutoFocus manages focus on focusable element on load." [docs]="docs" [apiDocs]="['AutoFocus']"></app-doc>`
})
export class AutoFocusDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc
        }
    ];
}
