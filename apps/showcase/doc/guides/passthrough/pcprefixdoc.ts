import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'pc-prefix-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, PanelModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                A UI component may also use other UI components, in this case section names are prefixed with <i>pc</i> (Prime Component) to denote the PrimeNG component begin used. This distinguishes components from standard DOM elements and
                indicating the necessity for a nested structure. For example, the <i>badge</i> section is identified as <i>pcBadge</i> because the button component incorporates the badge component internally.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-button
                type="button"
                label="Messages"
                icon="pi pi-inbox"
                badge="2"
                variant="outlined"
                severity="secondary"
                [pt]="{
                    root: '!px-4 !py-3',
                    icon: '!text-xl !text-violet-500 dark:!text-violet-400',
                    label: '!text-lg !text-violet-500 dark:!text-violet-400',
                    pcBadge: {
                        root: '!bg-violet-500 dark:!bg-violet-400 !text-white dark:!text-black'
                    }
                }"
            />
        </div>
        <app-code selector="pc-prefix-demo" />
    `
})
export class PcPrefixDoc {}
