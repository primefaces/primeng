import { Code } from '@/domain/code';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>Tabs can be generated dynamically using the standard <i>&#64;for</i> block.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs value="0">
                <p-tablist>
                    @for (tab of tabs; track tab.value) {
                        <p-tab [value]="tab.value">{{ tab.title }}</p-tab>
                    }
                </p-tablist>
                <p-tabpanels>
                    @for (tab of tabs; track tab.value) {
                        <p-tabpanel [value]="tab.value">
                            <p class="m-0">{{ tab.content }}</p>
                        </p-tabpanel>
                    }
                </p-tabpanels>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-dynamic-demo"></app-code>
    `
})
export class DynamicDoc implements OnInit {
    tabs: { title: string; value: string; content: string }[] = [];
    code: Code = {
        basic: `<p-tabs value="0">
    <p-tablist>
        @for (tab of tabs; track tab.value) {
            <p-tab [value]="tab.value">{{ tab.title }}</p-tab>
        }
    </p-tablist>
    <p-tabpanels>
        @for (tab of tabs; track tab.value) {
            <p-tabpanel [value]="tab.value">
                <p class="m-0">{{ tab.content }}</p>
            </p-tabpanel>
        }
    </p-tabpanels>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs value="0">
        <p-tablist>
            @for (tab of tabs; track tab.value) {
                <p-tab [value]="tab.value">{{ tab.title }}</p-tab>
            }
        </p-tablist>
        <p-tabpanels>
            @for (tab of tabs; track tab.value) {
                <p-tabpanel [value]="tab.value">
                    <p class="m-0">{{ tab.content }}</p>
                </p-tabpanel>
            }
        </p-tabpanels>
    </p-tabs>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabs-dynamic-demo',
    templateUrl: './tabs-dynamic-demo.html',
    standalone: true,
    imports: [TabsModule, CommonModule]
})
export class TabsDynamicDemo implements OnInit {
    tabs: { title: string; value: number; content: string }[] = [];

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', value: 0, content: 'Tab 1 Content' },
            { title: 'Tab 2', value: 1, content: 'Tab 2 Content' },
            { title: 'Tab 3', value: 2, content: 'Tab 3 Content' },
        ];
    }
}`
    };

    ngOnInit() {
        this.tabs = [
            { title: 'Tab 1', value: '0', content: 'Tab 1 Content' },
            { title: 'Tab 2', value: '1', content: 'Tab 2 Content' },
            { title: 'Tab 3', value: '2', content: 'Tab 3 Content' }
        ];
    }
}
