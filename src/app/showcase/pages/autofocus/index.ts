import { Component } from '@angular/core';
import { ImportDoc } from '@doc/autofocus/importdoc';
import { BasicDoc } from '@doc/autofocus/basicdoc';
import { AutoFocusDocModule } from '@doc/autofocus/autofocusdoc.module';

@Component({
    standalone: true,
    imports: [AutoFocusDocModule],
    template: ` <app-doc
        docTitle="Angular AutoFocus Directive"
        header="AutoFocus"
        description="AutoFocus manages focus on focusable element on load."
        [docs]="docs"
        [apiDocs]="['AutoFocus']"
    ></app-doc>`,
})
export class AutoFocusDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
    ];
}
