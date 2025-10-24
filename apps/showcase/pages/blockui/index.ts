import { AccessibilityDoc } from '@/doc/blockui/accessibilitydoc';
import { BasicDoc } from '@/doc/blockui/basicdoc';
import { DocumentDoc } from '@/doc/blockui/documentdoc';
import { ImportDoc } from '@/doc/blockui/importdoc';
import { PTComponent } from '@/doc/blockui/pt/PTComponent';
import { AppDoc } from '@/components/doc/app.doc';
import { Component } from '@angular/core';

@Component({
    standalone: true,
    imports: [AppDoc],
    template: ` <app-doc docTitle="Angular BlockUI Component" header="BlockUI" description="BlockUI can either block other components or the whole page." [docs]="docs" [apiDocs]="['BlockUI']" [ptDocs]="ptComponent" themeDocs="BlockUI"></app-doc>`,
    styles: [
        `
            :host ::ng-deep button {
                margin-right: 0.25em;
            }

            :host ::ng-deep .p-overlay-mask-enter .pi.pi-lock {
                animation: enter 150ms forwards;
            }

            :host ::ng-deep .p-overlay-mask-leave .pi.pi-lock {
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
    ptComponent = PTComponent;

    blockedPanel: boolean = false;

    blockedDocument: boolean = false;
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
            id: 'accessibility',
            label: 'Accessibility',
            component: AccessibilityDoc
        }
    ];

    blockDocument() {
        this.blockedDocument = true;
        setTimeout(() => {
            this.blockedDocument = false;
        }, 3000);
    }
}
