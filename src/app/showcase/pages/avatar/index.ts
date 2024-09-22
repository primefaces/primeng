import { Component } from '@angular/core';
import { ImportDoc } from 'src/app/showcase/doc/avatar/importdoc';
import { LabelDoc } from 'src/app/showcase/doc/avatar/labeldoc';
import { GroupDoc } from '@doc/avatar/avatargroupdoc';
import { AvatarStyleDoc } from '@doc/avatar/avatarstyledoc';
import { AvatarGroupStyleDoc } from '@doc/avatar/avatargroupstyledoc';
import { IconDoc } from '@doc/avatar/icondoc';
import { ImageDoc } from '@doc/avatar/imagedoc';
import { ShapeDoc } from '@doc/avatar/shapedoc';
import { SizeDoc } from '@doc/avatar/sizedoc';
import { BadgeDoc } from '@doc/avatar/badgedoc';
import { TemplateDoc } from '@doc/avatar/templatedoc';
import { AccessibilityDoc } from '@doc/avatar/accessibilitydoc';
import { AvatarDocModule } from '@doc/avatar/avatardoc.module';

@Component({
    standalone: true,
    imports: [AvatarDocModule],
    template: ` <app-doc
        docTitle="Angular Avatar Component"
        header="Avatar"
        description="Avatar represents people using icons, labels and images."
        [docs]="docs"
        [apiDocs]="['Avatar', 'AvatarGroup']"
        [themeDocs]="'Avatar'"
    ></app-doc>`,
})
export class AvatarDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },
        {
            id: 'label',
            label: 'Label',
            component: LabelDoc,
        },
        {
            id: 'icon',
            label: 'Icon',
            component: IconDoc,
        },
        {
            id: 'image',
            label: 'Image',
            component: ImageDoc,
        },
        {
            id: 'size',
            label: 'Sizes',
            component: SizeDoc,
        },
        {
            id: 'avatargroup',
            label: 'AvatarGroup',
            component: GroupDoc,
        },
        {
            id: 'shape',
            label: 'Shape',
            component: ShapeDoc,
        },
        {
            id: 'badge',
            label: 'Badge',
            component: BadgeDoc,
        },
        {
            id: 'templating',
            label: 'Custom Content',
            component: TemplateDoc,
        },
        {
            id: 'stylingofavatar',
            label: 'Styling of Avatar',
            component: AvatarStyleDoc,
        },
        {
            id: 'stylingofavatargroup',
            label: 'Styling of AvatarGroup',
            component: AvatarGroupStyleDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
