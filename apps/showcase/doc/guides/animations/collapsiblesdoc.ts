import { Component } from '@angular/core';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AccordionModule } from 'primeng/accordion';
import { AppCodeModule } from '@/components/doc/app.code';
import { Code } from '@/domain/code';

@Component({
    selector: 'collapsibles-doc',
    standalone: true,
    imports: [AppDocSectionText, AccordionModule, AppCodeModule],
    template: `
        <app-docsectiontext>
            <p>
                Collapsible components have a content that is toggleable including Accordion, Panel, Fieldset, Stepper and PanelMenu. The enter and leave animations are defined with the <i>.p-collapsible-enter-active</i> and
                <i>.p-collapsible-leave-active</i>
                classes.
            </p>
            <div class="card">
                <p-accordion value="0">
                    <p-accordion-panel value="0">
                        <p-accordion-header>Header I</p-accordion-header>
                        <p-accordion-content>
                            <p class="m-0">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                                id est laborum.
                            </p>
                        </p-accordion-content>
                    </p-accordion-panel>

                    <p-accordion-panel value="1">
                        <p-accordion-header>Header II</p-accordion-header>
                        <p-accordion-content>
                            <p class="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </p-accordion-content>
                    </p-accordion-panel>

                    <p-accordion-panel value="2">
                        <p-accordion-header>Header III</p-accordion-header>
                        <p-accordion-content>
                            <p class="m-0">
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                            </p>
                        </p-accordion-content>
                    </p-accordion-panel>
                </p-accordion>
            </div>
            <app-code [code]="code" hideToggleCode hideStackBlitz></app-code>
        </app-docsectiontext>
    `,
    styles: [
        `
            .demo-select-overlay.p-anchored-overlay-enter-active {
                animation: demo-overlay-in 300ms ease-out;
            }

            .demo-select-overlay.p-anchored-overlay-leave-active {
                animation: demo-overlay-out 250ms ease-in;
            }

            @keyframes demo-overlay-in {
                from {
                    opacity: 0;
                    transform: translateY(10%);
                }
            }

            @keyframes demo-overlay-out {
                to {
                    opacity: 0;
                    transform: translateY(10%);
                }
            }
        `
    ]
})
export class CollapsiblesDoc {
    code: Code = {
        scss: `
.p-collapsible-enter-active {
    animation: demo-collapsible-expand 500ms cubic-bezier(0.65, 0, 0.35, 1);
}

.p-collapsible-leave-active {
    animation: demo-collapsible-collapse 500ms cubic-bezier(0.65, 0, 0.35, 1);
}

@keyframes demo-collapsible-expand {
    from {
        opacity: 0;
        grid-template-rows: 0fr;
        transform: scale(0.93);
    }
    to {
        opacity: 1;
        grid-template-rows: 1fr;
    }
}

@keyframes demo-collapsible-collapse {
    from {
        opacity: 1;
        grid-template-rows: 1fr;
    }
    to {
        opacity: 0;
        grid-template-rows: 0fr;
        transform: scale(0.93);
    }
}
`
    };
}
