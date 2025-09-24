import { AccessibilityDoc } from '@/doc/avatar/accessibilitydoc';
import { GroupDoc } from '@/doc/avatar/avatargroupdoc';
import { AvatarGroupStyleDoc } from '@/doc/avatar/avatargroupstyledoc';
import { AvatarStyleDoc } from '@/doc/avatar/avatarstyledoc';
import { BadgeDoc } from '@/doc/avatar/badgedoc';
import { IconDoc } from '@/doc/avatar/icondoc';
import { ImageDoc } from '@/doc/avatar/imagedoc';
import { ImportDoc } from '@/doc/avatar/importdoc';
import { LabelDoc } from '@/doc/avatar/labeldoc';
import { ShapeDoc } from '@/doc/avatar/shapedoc';
import { SizeDoc } from '@/doc/avatar/sizedoc';
import { TemplateDoc } from '@/doc/avatar/templatedoc';
import { Component } from '@angular/core';
import { AppDoc } from '@/components/doc/app.doc';

@Component({
    standalone: true,
    imports: [AppDoc],
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
            id: 'style',
            label: 'Style',
            component: AvatarStyleDoc
        },
        {
            id: 'avatargroup-style',
            label: 'AvatarGroup Style',
            component: AvatarGroupStyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
