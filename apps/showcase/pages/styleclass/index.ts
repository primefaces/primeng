import { AnimationDoc } from '@/doc/styleclass/animationdoc';
import { ImportDoc } from '@/doc/styleclass/importdoc';
import { StyleClassDocModule } from '@/doc/styleclass/styleclassdoc.module';
import { ToggleClassDoc } from '@/doc/styleclass/toggleclassdoc';
import { Component } from '@angular/core';

@Component({
    template: `<app-doc
        docTitle="Angular StyleClass Component"
        header="StyleClass"
        description="StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element."
        [docs]="docs"
        [apiDocs]="['StyleClass']"
    ></app-doc>`,
    standalone: true,
    imports: [StyleClassDocModule]
})
export class StyleClassDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'toggleclass',
            label: 'Toggle Class',
            component: ToggleClassDoc
        },
        {
            id: 'animation',
            label: 'Animation',
            component: AnimationDoc
        }
    ];
}
