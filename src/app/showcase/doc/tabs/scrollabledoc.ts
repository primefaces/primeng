import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'scrollable-doc',
    template: `
        <app-docsectiontext>
            <p>Adding <i>scrollable</i> property displays navigational buttons at each side to scroll between tabs.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs [(activeIndex)]="activeIndex" [scrollable]="true">
                <p-tabpanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
                    <p>{{ tab.content }}</p>
                </p-tabpanel>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-scrollable-demo"></app-code>
    `,
})
export class ScrollableDoc {
    activeIndex: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));

    code: Code = {
        basic: `<p-tabs [(activeIndex)]="activeIndex" [scrollable]="true">
    <p-tabpanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
        <p>{{ tab.content }}</p>
    </p-tabpanel>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs [(activeIndex)]="activeIndex" [scrollable]="true">
        <p-tabpanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
            <p>{{ tab.content }}</p>
        </p-tabpanel>
    </p-tabs>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Tabs, TabPanel } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabs-scrollable-demo',
    templateUrl: './tabs-scrollable-demo.html',
    standalone: true,
    imports: [Tabs, TabPanel, CommonModule]
})
export class TabViewScrollableDemo {
    activeIndex: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: "Title", content: "Content" }));
}`,
    };
}
