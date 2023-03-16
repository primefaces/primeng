import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { AvatarGroupDemo } from './avatargroupdoc';
import { AvatarIconDemo } from './icondoc';
import { AvatarImageDemo } from './imagedoc';
import { ImportDoc } from './importdoc';
import { AvatarLabelDemo } from './labeldoc';
import { AvatarStyleDoc } from './avatarstyledoc';
import { AvatarShapeDemo } from './shapedoc';
import { AvatarSizeDemo } from './sizedoc';
import { AvatarBadgeDemo } from './badgedoc';
import { AvatarTemplatingDemo } from './templatingdoc';
import { AvatarGroupStyleDoc } from './avatargroupstyledoc';
import { AvatarPropsDoc } from './avatarpropsdoc';
import { AvatarGroupPropsDoc } from './avatargrouppropsdoc';
import { EventsDoc } from './eventsdoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, InputTextModule, FormsModule, AppDocModule, AvatarModule, AvatarGroupModule, BadgeModule],
    declarations: [
        ImportDoc,
        AvatarLabelDemo,
        AvatarIconDemo,
        AvatarGroupDemo,
        AvatarImageDemo,
        AvatarStyleDoc,
        AvatarGroupStyleDoc,
        AvatarShapeDemo,
        AvatarSizeDemo,
        AvatarBadgeDemo,
        AvatarTemplatingDemo,
        AvatarPropsDoc,
        AvatarGroupPropsDoc,
        EventsDoc
    ],
    exports: [AppDocModule]
})
export class AvatarDocModule {}
