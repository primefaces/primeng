import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'scrollable-doc',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Adding <i>scrollable</i> property displays navigational buttons at each side to scroll between tabs.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabView [(activeIndex)]="activeIndex" [scrollable]="true">
                <p-tabPanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
                    <p>{{ tab.content }}</p>
                </p-tabPanel>
            </p-tabView>
        </div>
        <app-code [code]="code" selector="tab-view-scrollable-demo"></app-code>
    </section>`
})
export class ScrollableDoc {
    @Input() id: string;

    @Input() title: string;

    activeIndex: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));

    code: Code = {
        basic: `
<p-tabView [(activeIndex)]="activeIndex" [scrollable]="true">
    <p-tabPanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
        <p>{{ tab.content }}</p>
    </p-tabPanel>
</p-tabView>`,

        html: `
<div class="card">
    <p-tabView [(activeIndex)]="activeIndex" [scrollable]="true">
        <p-tabPanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
            <p>{{ tab.content }}</p>
        </p-tabPanel>
    </p-tabView>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tab-view-scrollable-demo',
    templateUrl: './tab-view-scrollable-demo.html'
})
export class TabViewScrollableDemo {
    activeIndex: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: "Title", content: "Content" }));
}`
    };
}
