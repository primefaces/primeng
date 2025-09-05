import { AnimationDoc } from '@/doc/styleclass/animationdoc';
import { HideOnResizeDoc } from '@/doc/styleclass/hideonresizedoc';
import { ImportDoc } from '@/doc/styleclass/importdoc';
import { ToggleClassDoc } from '@/doc/styleclass/toggleclassdoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    template: `<app-doc
        docTitle="Angular StyleClass Component"
        header="StyleClass"
        description="StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element."
        [docs]="docs"
        [apiDocs]="['StyleClass']"
    ></app-doc>`,
    standalone: true,
    imports: [AppDoc]
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
        },
        {
            id: 'hideonresize',
            label: 'Hide On Resize',
            component: HideOnResizeDoc
        }
    ];
}
