import { AccessibilityDoc } from '@/doc/avatar/accessibility-doc';
import { GroupDoc } from '@/doc/avatar/avatargroup-doc';
import { BadgeDoc } from '@/doc/avatar/badge-doc';
import { IconDoc } from '@/doc/avatar/icon-doc';
import { ImageDoc } from '@/doc/avatar/image-doc';
import { ImportDoc } from '@/doc/avatar/import-doc';
import { LabelDoc } from '@/doc/avatar/label-doc';
import { ShapeDoc } from '@/doc/avatar/shape-doc';
import { SizeDoc } from '@/doc/avatar/size-doc';
import { TemplateDoc } from '@/doc/avatar/template-doc';
import { PTComponent } from '@/doc/avatar/pt/PTComponent';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc
        docTitle="Angular Avatar Component"
        header="Avatar"
        description="Avatar represents people using icons, labels and images."
        [docs]="docs"
        [apiDocs]="['Avatar', 'AvatarGroup']"
        [ptDocs]="ptComponent"
        [themeDocs]="'Avatar'"
    ></app-doc>`
})
export class AvatarDemo {
    ptComponent = PTComponent;
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
            id: 'size',
            label: 'Size',
            component: SizeDoc
        },
        {
            id: 'shape',
            label: 'Shape',
            component: ShapeDoc
        },
        {
            id: 'badge',
            label: 'Badge',
            component: BadgeDoc
        },
        {
            id: 'template',
            label: 'Template',
            component: TemplateDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
