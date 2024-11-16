import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'dynamic-doc',
    template: `
        <app-docsectiontext>
            <p>AccordionPanel can be generated dynamically using the standard <i>&#64;for</i> block.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="card">
                <p-accordion [value]="['0']">
                    @for (tab of tabs; track tab.title) {
                        <p-accordion-panel [value]="tab.value">
                            <p-accordion-header>{{ tab.title }}</p-accordion-header>
                            <p-accordion-content>
                                <p class="m-0">{{ tab.content }}</p>
                            </p-accordion-content>
                        </p-accordion-panel>
                    }
                </p-accordion>
            </div>
        </div>
        <app-code [code]="code" selector="accordion-dynamic-demo"></app-code>
    `
})
export class DynamicDoc {
    tabs = [
        { title: 'Title 1', content: 'Content 1', value: '0' },
        { title: 'Title 2', content: 'Content 2', value: '1' },
        { title: 'Title 3', content: 'Content 3', value: '2' }
    ];

    code: Code = {
        basic: `<p-accordion [value]="0">
    @for (tab of tabs; track tab.title) {
        <p-accordion-panel [value]="tab.value">
            <p-accordion-header>{{ tab.title }}</p-accordion-header>
            <p-accordion-content>
                <p class="m-0">{{ tab.content }}</p>
            </p-accordion-content>
        </p-accordion-panel>
    }
</p-accordion>`,

        html: `<div class="card">
    <p-accordion [value]="0">
        @for (tab of tabs; track tab.title) {
            <p-accordion-panel [value]="tab.value">
                <p-accordion-header>{{ tab.title }}</p-accordion-header>
                <p-accordion-content>
                    <p class="m-0">{{ tab.content }}</p>
                </p-accordion-content>
            </p-accordion-panel>
        }
    </p-accordion>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'accordion-dynamic-demo',
    templateUrl: './accordion-dynamic-demo.html',
    standalone: true,
    imports: [AccordionModule, CommonModule]
})
export class AccordionDynamicDemo {
    tabs = [
        { title: 'Title 1', content: 'Content 1', value: '0' },
        { title: 'Title 2', content: 'Content 2', value: '1' },
        { title: 'Title 3', content: 'Content 3', value: '2' },
    ];
}`
    };
}
