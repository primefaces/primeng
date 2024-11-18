import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { AccessibilityDoc } from './accessibilitydoc';
import { GroupDoc } from './avatargroupdoc';
import { AvatarGroupStyleDoc } from './avatargroupstyledoc';
import { AvatarStyleDoc } from './avatarstyledoc';
import { BadgeDoc } from './badgedoc';
import { IconDoc } from './icondoc';
import { ImageDoc } from './imagedoc';
import { ImportDoc } from './importdoc';
import { LabelDoc } from './labeldoc';
import { ShapeDoc } from './shapedoc';
import { SizeDoc } from './sizedoc';
import { TemplateDoc } from './templatedoc';

@NgModule({
    imports: [CommonModule, RouterModule, AppCodeModule, InputTextModule, FormsModule, AppDocModule, AvatarModule, AvatarGroupModule, BadgeModule, OverlayBadgeModule],
    declarations: [ImportDoc, LabelDoc, IconDoc, GroupDoc, ImageDoc, AvatarStyleDoc, AvatarGroupStyleDoc, ShapeDoc, SizeDoc, BadgeDoc, TemplateDoc, AccessibilityDoc],
    exports: [AppDocModule]
})
export class AvatarDocModule {}
