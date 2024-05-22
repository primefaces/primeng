import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { InputTextModule } from 'primeng/inputtext';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { GroupDoc } from './avatargroupdoc';
import { IconDoc } from './icondoc';
import { ImageDoc } from './imagedoc';
import { ImportDoc } from './importdoc';
import { LabelDoc } from './labeldoc';
import { AvatarStyleDoc } from './avatarstyledoc';
import { ShapeDoc } from './shapedoc';
import { SizeDoc } from './sizedoc';
import { BadgeDoc } from './badgedoc';
import { TemplateDoc } from './templatedoc';
import { AvatarGroupStyleDoc } from './avatargroupstyledoc';
import { AccessibilityDoc } from './accessibilitydoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, InputTextModule, FormsModule, AppDocModule, AvatarModule, AvatarGroupModule, BadgeModule],
    declarations: [ImportDoc, LabelDoc, IconDoc, GroupDoc, ImageDoc, AvatarStyleDoc, AvatarGroupStyleDoc, ShapeDoc, SizeDoc, BadgeDoc, TemplateDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class AvatarDocModule {}
