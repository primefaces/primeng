import { Component, OnInit } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>Tabs can be generated dynamically using the standard <i>ngFor</i> directive.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabView>
                <p-tabPanel *ngFor="let tab of tabs" [header]="tab.title">
                    <p>
                        {{ tab.content }}
                    </p>
                </p-tabPanel>
            </p-tabView>
        </div>
        <app-code [code]="code" selector="tab-view-dynamic-demo"></app-code>
    `
})
export class DynamicDoc implements OnInit {
    tabs: { title: string; content: string }[] = [];

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', content: 'Tab 1 Content' },
            { title: 'Tab 2', content: 'Tab 2 Content' },
            { title: 'Tab 3', content: 'Tab 3 Content' }
        ];
    }

    code: Code = {
        basic: `<p-tabView>
    <p-tabPanel *ngFor="let tab of tabs" [header]="tab.title">
        <p>
            {{ tab.content }}
        </p>
    </p-tabPanel>
</p-tabView>`,

        html: `<div class="card">
<p-tabView>
<p-tabPanel *ngFor="let tab of tabs" [header]="tab.title">
    <p>
        {{ tab.content }}
    </p>
</p-tabPanel>
</p-tabView>
</div>`,

        typescript: `
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'tab-view-basic-demo',
    templateUrl: './tab-view-basic-demo.html'
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

}`
    };
}
