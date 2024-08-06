import { Component } from '@angular/core';
import { ImportDoc } from '@doc/messages/importdoc';
import { BasicDoc } from '@doc/messages/basicdoc';
import { MessagesStyleDoc } from '@doc/messages/messagesstyledoc';
import { MessageStyleDoc } from '@doc/messages/messagestyledoc';
import { ClosableDoc } from '@doc/messages/closabledoc';
import { DynamicDoc } from '@doc/messages/dynamicdoc';
import { StaticDoc } from '@doc/messages/staticdoc';
import { AnimationDoc } from '@doc/messages/animationdoc';
import { SeverityDoc } from '@doc/messages/severitydoc';
import { AccessibilityDoc } from '@doc/messages/accessibilitydoc';
import { ServiceDoc } from '@doc/messages/servicedoc';
import { InlineDoc } from '@doc/messages/inlinedoc';

@Component({
    templateUrl: './messagesdemo.html',
})
export class MessagesDemo {
    docs = [
        {
            id: 'import',
            label: 'Import',
            component: ImportDoc,
        },

        {
            id: 'basic',
            label: 'Basic',
            component: BasicDoc,
        },
        {
            id: 'severity',
            label: 'Severity',
            component: SeverityDoc,
        },
        {
            id: 'dynamic',
            label: 'Dynamic',
            component: DynamicDoc,
        },
        {
            id: 'inline',
            label: 'Inline',
            component: InlineDoc,
        },
        {
            id: 'closable',
            label: 'Closable',
            component: ClosableDoc,
        },
        {
            id: 'service',
            label: 'Message Service',
            component: ServiceDoc,
        },
        {
            id: 'static',
            label: 'Static Content',
            component: StaticDoc,
        },
        {
            id: 'animation',
            label: 'Animation',
            component: AnimationDoc,
        },
        {
            id: 'messagesstyle',
            label: 'Styling for Messages',
            component: MessagesStyleDoc,
        },
        {
            id: 'messagestyle',
            label: 'Styling for Message',
            component: MessageStyleDoc,
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc,
        },
    ];
}
