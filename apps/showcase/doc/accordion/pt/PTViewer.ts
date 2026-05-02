import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';

@Component({
    selector: 'accordion-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, AccordionModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-accordion value="0">
                <p-accordion-panel value="0">
                    <p-accordion-header>Header I</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    </p-accordion-content>
                </p-accordion-panel>
                <p-accordion-panel value="1">
                    <p-accordion-header>Header II</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.</p>
                    </p-accordion-content>
                </p-accordion-panel>
                <p-accordion-panel value="2">
                    <p-accordion-header>Header III</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.</p>
                    </p-accordion-content>
                </p-accordion-panel>
            </p-accordion>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Accordion'),
            key: 'Accordion'
        },
        {
            data: getPTOptions('AccordionPanel'),
            key: 'AccordionPanel'
        },
        {
            data: getPTOptions('AccordionHeader'),
            key: 'AccordionHeader'
        },
        {
            data: getPTOptions('AccordionContent'),
            key: 'AccordionContent'
        }
    ];
}
