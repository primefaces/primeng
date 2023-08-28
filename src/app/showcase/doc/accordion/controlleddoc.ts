import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'controlled-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Tabs can be controlled programmatically using the <i>activeIndex</i> property of the accordion in general or the <i>selected</i> property of p-accordionTab individually.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex flex-wrap gap-2 mb-3">
                <p-button [icon]="activeIndex === 0 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 0" styleClass="p-button-text" label="Toggle 1st"></p-button>
                <p-button [icon]="activeIndex === 1 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 1" styleClass="p-button-text ml-2" label="Toggle 2st"></p-button>
                <p-button [icon]="activeIndex === 2 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 2" styleClass="p-button-text ml-2" label="Toggle 3st"></p-button>
            </div>
            <p-accordion [activeIndex]="activeIndex">
                <p-accordionTab header="Header I">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p-accordionTab>
                <p-accordionTab header="Header II">
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </p-accordionTab>
                <p-accordionTab header="Header III">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </p-accordionTab>
            </p-accordion>
        </div>
        <app-code [code]="code" selector="accordion-controlled-demo"></app-code>
    </section>`
})
export class ControlledDoc {
    @Input() id: string;

    @Input() title: string;

    activeIndex: number | undefined;

    code: Code = {
        basic: `
<div class="flex flex-wrap gap-2 mb-3">
    <p-button [icon]="activeIndex === 0 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 0" styleClass="p-button-text" label="Toggle 1st"></p-button>
    <p-button [icon]="activeIndex === 1 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 1" styleClass="p-button-text ml-2" label="Toggle 2st"></p-button>
    <p-button [icon]="activeIndex === 2 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 2" styleClass="p-button-text ml-2" label="Toggle 3st"></p-button>
</div>
<p-accordion [activeIndex]="activeIndex">
    <p-accordionTab header="Header I">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-accordionTab>
    <p-accordionTab header="Header II">
        <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
    </p-accordionTab>
    <p-accordionTab header="Header III">
        <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
    </p-accordionTab>
</p-accordion>`,

        html: `
<div class="card">
    <div class="flex flex-wrap gap-2 mb-3">
        <p-button [icon]="activeIndex === 0 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 0" styleClass="p-button-text" label="Toggle 1st"></p-button>
        <p-button [icon]="activeIndex === 1 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 1" styleClass="p-button-text ml-2" label="Toggle 2st"></p-button>
        <p-button [icon]="activeIndex === 2 ? 'pi pi-minus' : 'pi pi-plus'" (click)="activeIndex = 2" styleClass="p-button-text ml-2" label="Toggle 3st"></p-button>
    </div>
    <p-accordion [activeIndex]="activeIndex">
        <p-accordionTab header="Header I">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </p-accordionTab>
        <p-accordionTab header="Header II">
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-accordionTab>
        <p-accordionTab header="Header III">
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </p-accordionTab>
    </p-accordion>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'accordion-controlled-demo',
    templateUrl: './accordion-controlled-demo.html'
})
export class AccordionControlledDemo {
    activeIndex: number | undefined;
}`
    };
}
