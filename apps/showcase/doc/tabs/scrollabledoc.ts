import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'scrollable-doc',
    template: `
        <app-docsectiontext>
            <p>Adding <i>scrollable</i> property displays navigational buttons at each side to scroll between tabs.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs value="0" scrollable>
                <p-tablist>
                    @for (tab of scrollableTabs; track tab.value) {
                        <p-tab [value]="tab.value">
                            {{ tab.title }}
                        </p-tab>
                    }
                </p-tablist>
                <p-tabpanels>
                    @for (tab of scrollableTabs; track tab.value) {
                        <p-tabpanel [value]="tab.value">
                            <p class="m-0">{{ tab.content }}</p>
                        </p-tabpanel>
                    }
                </p-tabpanels>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-scrollable-demo"></app-code>
    `
})
export class ScrollableDoc {
    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({
        title: `Tab ${i + 1}`,
        content: `Tab ${i + 1} Content`,
        value: `${i}`
    }));

    code: Code = {
        basic: `<p-tabs value="0" scrollable>
    <p-tablist>
        @for(tab of scrollableTabs; track tab.value){
            <p-tab [value]="tab.value">
                {{ tab.title }}
            </p-tab>
        }
    </p-tablist>
    <p-tabpanels>
        @for(tab of scrollableTabs; track tab.value){
            <p-tabpanel [value]="tab.value">
                <p class="m-0">{{ tab.content }}</p>
            </p-tabpanel>
        }
    </p-tabpanels>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs value="0" scrollable>
        <p-tablist>
            @for(tab of scrollableTabs; track tab.value){
                <p-tab [value]="tab.value">
                    {{ tab.title }}
                </p-tab>
            }
        </p-tablist>
        <p-tabpanels>
            @for(tab of scrollableTabs; track tab.value){
                <p-tabpanel [value]="tab.value">
                    <p class="m-0">{{ tab.content }}</p>
                </p-tabpanel>
            }
        </p-tabpanels>
    </p-tabs>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabs-scrollable-demo',
    templateUrl: './tabs-scrollable-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule]
})
export class TabsScrollableDemo {
    activeIndex: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: "Title", content: "Content" }));
}`
    };
}
