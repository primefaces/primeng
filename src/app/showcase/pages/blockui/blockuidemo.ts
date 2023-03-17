import { Component } from '@angular/core';
import { AccessibilityDoc } from '../../doc/blockui/accessibilitydoc';
import { BasicDoc } from '../../doc/blockui/basicdoc';
import { DocumentDoc } from '../../doc/blockui/documentdoc';
import { ImportDoc } from '../../doc/blockui/importdoc';
import { PropsDoc } from '../../doc/blockui/propsdoc';
import { StyleDoc } from '../../doc/blockui/styledoc';

@Component({
    templateUrl: './blockuidemo.html',
    styles: [
        `
            :host ::ng-deep button {
                margin-right: 0.25em;
            }

            :host ::ng-deep .p-component-overlay-enter .pi.pi-lock {
                animation: enter 150ms forwards;
            }

            :host ::ng-deep .p-component-overlay-leave .pi.pi-lock {
                animation: leave 150ms forwards;
            }

            @keyframes enter {
                from {
                    color: transparent;
                }
                to {
                    color: var(--text-color);
                }
            }

            @keyframes leave {
                from {
                    color: var(--text-color);
                }
                to {
                    color: transparent;
                }
            }
        `
    ]
})
export class BlockUIDemo {
    blockedPanel: boolean = false;

    blockedDocument: boolean = false;

    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
        }, 3000);
    }

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
            id: 'document',
            label: 'Document',
            component: DocumentDoc
        },
        {
            id: 'style',
            label: 'Style',
            component: StyleDoc
        },
        {
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    apiDocs = [
        {
            id: 'props',
            label: 'Properties',
            component: PropsDoc
        }
    ];
}
