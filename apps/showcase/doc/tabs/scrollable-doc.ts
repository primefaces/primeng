import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'scrollable-doc',
    standalone: true,
    imports: [CommonModule, AppDocSectionText, AppCode, TabsModule],
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
        <app-code></app-code>
    `
})
export class ScrollableDoc {
    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({
        title: `Tab ${i + 1}`,
        content: `Tab ${i + 1} Content`,
        value: `${i}`
    }));
}
