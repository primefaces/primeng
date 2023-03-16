import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AppDocModule } from '../../layout/doc/app.doc.module';
import { AppCodeModule } from '../../layout/doc/code/app.code.component';
import { ImportDoc } from './importdoc';
import { MessagesBasicDemo } from './basicdoc';
import { MessagesStyleDoc } from './messagesstyledoc';
import { MessageStyleDoc } from './messagestyledoc';
import { MessagesPropsDoc } from './messagespropsdoc';
import { MessagePropsDoc } from './messagepropsdoc';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesSeverityDemo } from './severitydoc';
import { MessagesClosableDemo } from './closabledoc';
import { MessagesStaticDemo } from './staticdoc';
import { MessagesDynamicDemo } from './dynamicdoc';
import { MessagesServiceDemo } from './servicedoc';
import { MessagesInlineDemo } from './inlinedoc';
import { MessagesAnimationDemo } from './animationdoc';
import { TemplatesDoc } from './templatesdoc';

@NgModule({
    imports: [CommonModule, AppCodeModule, FormsModule, RouterModule, MessagesModule, ButtonModule, MessageModule, InputTextModule, AppDocModule],
    declarations: [
        MessagesBasicDemo,
        ImportDoc,
        MessagesClosableDemo,
        MessagesStaticDemo,
        MessagesDynamicDemo,
        MessagesServiceDemo,
        MessagesSeverityDemo,
        MessagesInlineDemo,
        MessagesStyleDoc,
        MessagesAnimationDemo,
        MessageStyleDoc,
        MessagesPropsDoc,
        MessagePropsDoc,
        TemplatesDoc
    ],
    exports: [AppDocModule]
})
export class MessagesDocModule {}
