import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>Tabs can be generated dynamically using the standard <i>ngFor</i> directive.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs>
                <p-tabpanel *ngFor="let tab of tabs" [header]="tab.title">
                    <p>
                        {{ tab.content }}
                    </p>
                </p-tabpanel>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-dynamic-demo"></app-code>
    `,
})
export class DynamicDoc implements OnInit {
    tabs: { title: string; content: string }[] = [];

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', content: 'Tab 1 Content' },
            { title: 'Tab 2', content: 'Tab 2 Content' },
            { title: 'Tab 3', content: 'Tab 3 Content' },
        ];
    }

    code: Code = {
        basic: `<p-tabs>
    <p-tabpanel *ngFor="let tab of tabs" [header]="tab.title">
        <p>
            {{ tab.content }}
        </p>
    </p-tabpanel>
</p-tabs>`,

        html: `<div class="card">
<p-tabs>
<p-tabpanel *ngFor="let tab of tabs" [header]="tab.title">
    <p>
        {{ tab.content }}
    </p>
</p-tabpanel>
</p-tabs>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { Tabs, TabPanel } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabs-basic-demo',
    templateUrl: './tabs-basic-demo.html',
    standalone: true,
    imports: [Tabs, TabPanel, CommonModule]
})
export class TabViewBasicDemo imlements onInit {
    tabs: { title: string, content: string }[] = [];

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', content: 'Tab 1 Content' },
            { title: 'Tab 2', content: 'Tab 2 Content' },
            { title: 'Tab 3', content: 'Tab 3 Content' }
        ];
    }

}`,
    };
}
