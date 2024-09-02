import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'lazy-doc',
    template: `
        <app-docsectiontext>
            <p>
                Lazy loading helps initial load performance by only initializing the active tab, inactive tabs are not initialized until
                they get selected. A lazy loaded tabpanel contents are cached by default so that upon reselection, they are not created
                again. You may use cache property on TabPanel to configure this behavior. A TabPanel is specified as lazy when there is a
                ngTemplate with <i>pTemplate</i>="content" in it.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs>
                <p-tabpanel header="Header 1"> Content 1 </p-tabpanel>
                <p-tabpanel header="Header 2">
                    <ng-template pTemplate="content"> Complex Content to Lazy Load </ng-template>
                </p-tabpanel>
                <p-tabpanel header="Header 3">
                    <ng-template pTemplate="content"> Complex Content to Lazy Load </ng-template>
                </p-tabpanel>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-lazy-demo"></app-code>
    `,
})
export class LazyDoc {
    code: Code = {
        basic: `<p-tabs>
    <p-tabpanel header="Header 1"> Content 1 </p-tabpanel>
    <p-tabpanel header="Header 2">
        <ng-template pTemplate="content"> Complex Content to Lazy Load </ng-template>
    </p-tabpanel>
    <p-tabpanel header="Header 3">
        <ng-template pTemplate="content"> Complex Content to Lazy Load </ng-template>
    </p-tabpanel>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs>
    <p-tabpanel header="Header 1"> Content 1 </p-tabpanel>
    <p-tabpanel header="Header 2">
        <ng-template pTemplate="content"> Complex Content to Lazy Load </ng-template>
    </p-tabpanel>
    <p-tabpanel header="Header 3">
        <ng-template pTemplate="content"> Complex Content to Lazy Load </ng-template>
    </p-tabpanel>
    </p-tabs>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Tabs, TabPanel } from 'primeng/tabs';

@Component({
    selector: 'tabs-lazy-demo',
    templateUrl: './tabs-lazy-demo.html',
    standalone: true,
    imports: [Tabs, TabPanel]
})
export class TabViewLazyDemo {}`,
    };
}
