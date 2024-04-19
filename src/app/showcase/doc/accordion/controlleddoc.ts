import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'controlled-doc',
    template: `
        <app-docsectiontext>
            <p>Tabs can be controlled programmatically using the <i>activeIndex</i> property of the accordion in general or the <i>selected</i> property of p-accordionTab individually.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex mb-3 gap-2 justify-content-end">
                <p-button (click)="activeIndex = 0" rounded="true" label="1" styleClass="w-2rem h-2rem p-0" [outlined]="activeIndex !== 0" />
                <p-button (click)="activeIndex = 1" rounded="true" label="2" styleClass="w-2rem h-2rem p-0" [outlined]="activeIndex !== 1" />
                <p-button (click)="activeIndex = 2" rounded="true" label="3" styleClass="w-2rem h-2rem p-0" [outlined]="activeIndex !== 2" />
            </div>
            <p-accordion (activeIndexChange)="activeIndexChange($event)" [activeIndex]="activeIndex">
                <p-accordionTab header="Header I">
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p-accordionTab>
                <p-accordionTab header="Header II">
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </p-accordionTab>
                <p-accordionTab header="Header III">
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </p-accordionTab>
            </p-accordion>
        </div>
        <app-code [code]="code" selector="accordion-controlled-demo"></app-code>
    `
})
export class ControlledDoc {
    activeIndex: number | undefined = 0;

    activeIndexChange(index: number) {
        this.activeIndex = index;
    }

    code: Code = {
        basic: `<div class="flex mb-3 gap-2 justify-content-end">
    <p-button 
        (click)="activeIndex = 0" 
        rounded="true" 
        label="1" 
        styleClass="w-2rem h-2rem p-0" 
        [outlined]="activeIndex !== 0" />
    <p-button 
        (click)="activeIndex = 1" 
        rounded="true" 
        label="2" 
        styleClass="w-2rem h-2rem p-0" 
        [outlined]="activeIndex !== 1" />
    <p-button 
        (click)="activeIndex = 2" 
        rounded="true" 
        label="3" 
        styleClass="w-2rem h-2rem p-0" 
        [outlined]="activeIndex !== 2" />
    </div>
    <p-accordion (activeIndexChange)="activeIndexChange($event)" [activeIndex]="activeIndex">
        <p-accordionTab header="Header I">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </p-accordionTab>
        <p-accordionTab header="Header II">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-accordionTab>
        <p-accordionTab header="Header III">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </p-accordionTab>
    </p-accordion>`,

        html: `<div class="card">
    <div class="flex mb-3 gap-2 justify-content-end">
        <p-button 
            (click)="activeIndex = 0" 
            rounded="true" 
            label="1" 
            styleClass="w-2rem h-2rem p-0" 
            [outlined]="activeIndex !== 0" />
        <p-button 
            (click)="activeIndex = 1" 
            rounded="true" 
            label="2" 
            styleClass="w-2rem h-2rem p-0" 
            [outlined]="activeIndex !== 1" />
        <p-button 
            (click)="activeIndex = 2" 
            rounded="true" 
            label="3" 
            styleClass="w-2rem h-2rem p-0" 
            [outlined]="activeIndex !== 2" />
    </div>
    <p-accordion (activeIndexChange)="activeIndexChange($event)" [activeIndex]="activeIndex">
        <p-accordionTab header="Header I">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </p-accordionTab>
        <p-accordionTab header="Header II">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-accordionTab>
        <p-accordionTab header="Header III">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </p-accordionTab>
    </p-accordion>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'accordion-controlled-demo',
    templateUrl: './accordion-controlled-demo.html',
    standalone: true,
    imports: [AccordionModule, ButtonModule]
})
export class AccordionControlledDemo {
    activeIndex: number | undefined = 0;

    activeIndexChange(index : number){
        this.activeIndex = index
    }
}`
    };
}
