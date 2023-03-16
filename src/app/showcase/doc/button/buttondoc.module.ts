import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { BadgesDoc } from './badgesdoc';
import { BasicDoc } from './basicdoc';
import { ButtonsetDoc } from './buttonsetdoc';
import { DisabledDoc } from './disableddoc';
import { IconsDoc } from './iconsdoc';
import { IconOnlyDoc } from './iconsonlydoc';
import { ImportDoc } from './importdoc';
import { LinkDoc } from './linkdoc';
import { LoadingDoc } from './loadingdoc';
import { OutlinedDoc } from './outlineddoc';
import { PropsDoc } from './propsdoc';
import { RaisedDoc } from './raiseddoc';
import { RaisedTextDoc } from './raisedtextdoc';
import { RoundedDoc } from './roundeddoc';
import { SeverityDoc } from './severitydoc';
import { SizesDoc } from './sizesdoc';
import { StyleDoc } from './styledoc';
import { TemplateDoc } from './templatedoc';
import { TemplatesDoc } from './templatesdoc';
import { TextDoc } from './textdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, AppDocModule, ButtonModule, RouterModule],
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
        BadgesDoc,
        ButtonsetDoc,
        SizesDoc,
        TemplateDoc,
        StyleDoc,
        PropsDoc,
        TemplatesDoc
    ]
})
export class ButtonDocModule {}
