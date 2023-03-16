import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/messages/importdoc';
import { MessagesBasicDemo } from '../../doc/messages/basicdoc';
import { MessagesPropsDoc } from '../../doc/messages/messagespropsdoc';
import { MessagePropsDoc } from '../../doc/messages/messagepropsdoc';
import { MessagesStyleDoc } from '../../doc/messages/messagesstyledoc';
import { MessageStyleDoc } from '../../doc/messages/messagestyledoc';
import { MessagesClosableDemo } from '../../doc/messages/closabledoc';
import { MessagesInlineDemo } from '../../doc/messages/inlinedoc';
import { MessagesDynamicDemo } from '../../doc/messages/dynamicdoc';
import { MessagesStaticDemo } from '../../doc/messages/staticdoc';
import { MessagesServiceDemo } from '../../doc/messages/servicedoc';
import { MessagesAnimationDemo } from '../../doc/messages/animationdoc';
import { TemplatesDoc } from '../../doc/messages/templatesdoc';
import { MessagesSeverityDemo } from '../../doc/messages/severitydoc';

@Component({
    templateUrl: './messagesdemo.html'
})
export class MessagesDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc
        },
        {
            id: 'basic',
            label: 'Basic',
            component: MessagesBasicDemo
        },
        {
            id: 'closable',
            label: 'Closable',
            component: MessagesClosableDemo
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: MessagesDynamicDemo
        },
        {
            id: 'service',
            label: 'Message Service',
            component: MessagesServiceDemo
        },
        {
            id: 'static',
            label: 'Static Content',
            component: MessagesStaticDemo
        },
        {
            id: 'inline',
            label: 'Inline',
            component: MessagesInlineDemo
        },
        {
            id: 'severity',
            label: 'Severity',
            component: MessagesSeverityDemo
        },
        {
            id: 'animation',
            label: 'Animation',
            component: MessagesAnimationDemo
        },
        {
            id: 'messagesstyle',
            label: 'Styling for Messages',
            component: MessagesStyleDoc
        },
        {
            id: 'messagestyle',
            label: 'Styling for Message',
            component: MessageStyleDoc
        }
    ];

    apiDocs = [
        {
            id: 'messagesprops',
            label: 'Properties of Messages',
            component: MessagesPropsDoc
        },
        {
            id: 'messageprops',
            label: 'Properties of Message',
            component: MessagePropsDoc
        },
        {
            id: 'templates',
            label: 'Templates',
            component: TemplatesDoc
        }
    ];
}
