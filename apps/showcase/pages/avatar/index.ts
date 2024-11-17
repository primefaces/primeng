import { AccessibilityDoc } from '@/doc/avatar/accessibilitydoc';
import { AvatarDocModule } from '@/doc/avatar/avatardoc.module';
import { GroupDoc } from '@/doc/avatar/avatargroupdoc';
import { IconDoc } from '@/doc/avatar/icondoc';
import { ImageDoc } from '@/doc/avatar/imagedoc';
import { ImportDoc } from '@/doc/avatar/importdoc';
import { LabelDoc } from '@/doc/avatar/labeldoc';
import { ShapeDoc } from '@/doc/avatar/shapedoc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AvatarDocModule],
    template: ` <app-doc docTitle="Angular Avatar Component" header="Avatar" description="Avatar represents people using icons, labels and images." [docs]="docs" [apiDocs]="['Avatar', 'AvatarGroup']" [themeDocs]="'Avatar'"></app-doc>`
})
export class AvatarDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc
        },
        {
            id: 'avatargroup',
            label: 'AvatarGroup',
            component: GroupDoc
        },
        {
            id: 'shape',
            label: 'Shape',
            component: ShapeDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
