import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { RippleModule } from 'primeng/ripple';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BadgeDoc } from './badgedoc';
import { BasicDoc } from './basicdoc';
import { ButtonsetDoc } from './buttonsetdoc';
import { DirectiveDoc } from './directivedoc';
import { DisabledDoc } from './disableddoc';
import { IconsDoc } from './iconsdoc';
import { IconOnlyDoc } from './iconsonlydoc';
import { ImportDoc } from './importdoc';
import { LinkDoc } from './linkdoc';
import { LoadingDoc } from './loadingdoc';
import { OutlinedDoc } from './outlineddoc';
import { RaisedDoc } from './raiseddoc';
import { RaisedTextDoc } from './raisedtextdoc';
import { RoundedDoc } from './roundeddoc';
import { SeverityDoc } from './severitydoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TextDoc } from './textdoc';
import { ButtonGroupDoc } from './buttongroupdoc';


@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ButtonModule, ButtonGroupModule, RippleModule, RouterModule],
    exports: [AppDocModule],
    declarations: [
        ImportDoc,
        BasicDoc,
        LinkDoc,
        IconsDoc,
        LoadingDoc,
        SeverityDoc,
        DisabledDoc,
        RaisedDoc,
        RoundedDoc,
        TextDoc,
        RaisedTextDoc,
        OutlinedDoc,
        IconOnlyDoc,
        BadgeDoc,
        ButtonGroupDoc,
        ButtonsetDoc,
        SizesDoc,
        TemplateDoc,
        StyleDoc,
        AccessibilityDoc,
        DirectiveDoc,
    ]
})
export class ButtonDocModule {}
