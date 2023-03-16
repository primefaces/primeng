import { Component } from '@angular/core';
import { ImportDoc } from 'src/app/showcase/doc/avatar/importdoc';
import { AvatarLabelDemo } from 'src/app/showcase/doc/avatar/labeldoc';
import { AvatarGroupDemo } from '../../doc/avatar/avatargroupdoc';
import { AvatarStyleDoc } from '../../doc/avatar/avatarstyledoc';
import { AvatarGroupStyleDoc } from '../../doc/avatar/avatargroupstyledoc';
import { AvatarIconDemo } from '../../doc/avatar/icondoc';
import { AvatarImageDemo } from '../../doc/avatar/imagedoc';
import { AvatarShapeDemo } from '../../doc/avatar/shapedoc';
import { AvatarSizeDemo } from '../../doc/avatar/sizedoc';
import { AvatarBadgeDemo } from '../../doc/avatar/badgedoc';
import { AvatarTemplatingDemo } from '../../doc/avatar/templatingdoc';
import { AvatarPropsDoc } from '../../doc/avatar/avatarpropsdoc';
import { AvatarGroupPropsDoc } from '../../doc/avatar/avatargrouppropsdoc';
import { EventsDoc } from '../../doc/avatar/eventsdoc';

@Component({
    templateUrl: './avatardemo.html'
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
            component: AvatarLabelDemo
        },
        {
            id: 'icon',
            label: 'Icon',
            component: AvatarIconDemo
        },
        {
            id: 'image',
            label: 'Image',
            component: AvatarImageDemo
        },
        {
            id: 'size',
            label: 'Sizes',
            component: AvatarSizeDemo
        },
        {
            id: 'avatargroup',
            label: 'AvatarGroup',
            component: AvatarGroupDemo
        },
        {
            id: 'shape',
            label: 'Shape',
            component: AvatarShapeDemo
        },
        {
            id: 'badge',
            label: 'Badge',
            component: AvatarBadgeDemo
        },
        {
            id: 'templating',
            label: 'Custom Content',
            component: AvatarTemplatingDemo
        },
        {
            id: 'stylingofavatar',
            label: 'Styling of Avatar',
            component: AvatarStyleDoc
        },
        {
            id: 'stylingofavatargroup',
            label: 'Styling of AvatarGroup',
            component: AvatarGroupStyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'avatarprops',
            label: 'Properties of Avatar',
            component: AvatarPropsDoc
        },
        {
            id: 'avatargroupprops',
            label: 'Properties of AvatarGroup',
            component: AvatarGroupPropsDoc
        },
        {
            id: 'events',
            label: 'Events',
            component: EventsDoc
        }
    ];
}
