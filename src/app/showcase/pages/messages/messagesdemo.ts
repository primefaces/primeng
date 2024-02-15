import { Component } from '@angular/core';
import { ImportDoc } from '../../doc/messages/importdoc';
import { BasicDoc } from '../../doc/messages/basicdoc';
import { MessagesStyleDoc } from '../../doc/messages/messagesstyledoc';
import { MessageStyleDoc } from '../../doc/messages/messagestyledoc';
import { ClosableDoc } from '../../doc/messages/closabledoc';
import { InlineDoc } from '../../doc/messages/inlinedoc';
import { DynamicDoc } from '../../doc/messages/dynamicdoc';
import { StaticDoc } from '../../doc/messages/staticdoc';
import { ServiceDoc } from '../../doc/messages/servicedoc';
import { AnimationDoc } from '../../doc/messages/animationdoc';
import { SeverityDoc } from '../../doc/messages/severitydoc';
import { AccessibilityDoc } from '../../doc/messages/accessibilitydoc';

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
            component: BasicDoc
        },
        {
            id: 'closable',
            label: 'Closable',
            component: ClosableDoc
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc
        },
        {
            id: 'service',
            label: 'Message Service',
            component: ServiceDoc
        },
        {
            id: 'static',
            label: 'Static Content',
            component: StaticDoc
        },
        {
            id: 'inline',
            label: 'Inline',
            component: InlineDoc
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc
        },
        {
            id: 'animation',
            label: 'Animation',
            component: AnimationDoc
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
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];
}
