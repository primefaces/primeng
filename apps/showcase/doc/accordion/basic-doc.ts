import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'basic-doc',
    standalone: true,
    imports: [AccordionModule, AppCode, AppDocSectionText],
    template: `
        <app-docsectiontext>
            <p>Accordion is defined using <i>AccordionPanel</i>, <i>AccordionHeader</i> and <i>AccordionContent</i> components. Each AccordionPanel must contain a unique <i>value</i> property to specify the active item.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-accordion value="0">
                <p-accordion-panel value="0">
                    <p-accordion-header>Header I</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </p-accordion-content>
                </p-accordion-panel>

                <p-accordion-panel value="1">
                    <p-accordion-header>Header II</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </p-accordion-content>
                </p-accordion-panel>

                <p-accordion-panel value="2">
                    <p-accordion-header>Header III</p-accordion-header>
                    <p-accordion-content>
                        <p class="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </p-accordion-content>
                </p-accordion-panel>
            </p-accordion>
        </div>
        <app-code></app-code>
    `
})
export class BasicDoc {}
