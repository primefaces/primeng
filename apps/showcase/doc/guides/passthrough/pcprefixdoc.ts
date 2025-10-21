import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { PanelModule } from 'primeng/panel';
import { AppCode } from '@/components/doc/app.code';
import { Code } from '@/domain/code';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'pc-prefix-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, PanelModule, ButtonModule],
    template: `
        <app-docsectiontext>
            <p>
                Section names prefixed with <i>pc</i> denote PrimeNG components, distinguishing them from standard DOM elements and indicating the necessity for a nested structure. For example, the "badge" section is identified as
                <i>pcBadge</i> because the button component incorporates the badge component internally.
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
        <app-code [code]="code" selector="pc-prefix-demo" />
    `
})
export class PcPrefixDoc {
    code: Code = {
        basic: `<p-button
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
/>`,
        html: `<div class="card flex justify-center">
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
</div>`,
        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'pc-prefix-demo',
    templateUrl: './pc-prefix-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class PcPrefixDemo {}`
    };
}
