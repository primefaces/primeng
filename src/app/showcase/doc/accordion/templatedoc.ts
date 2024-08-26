import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>AccordionTab is customized <i>header</i> and <i>content</i> templates.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-accordion class="w-full" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
                <p-accordionTab>
                    <ng-template pTemplate="header">
                        <span class="flex items-center gap-2 w-full">
                            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" shape="circle" />
                            <span class="font-bold whitespace-nowrap">Amy Elsner</span>
                            <p-badge value="3" class="ml-auto mr-2" />
                        </span>
                    </ng-template>
                    <p class="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p-accordionTab>
                <p-accordionTab>
                    <ng-template pTemplate="header">
                        <span class="flex items-center gap-2 w-full">
                            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" shape="circle" />
                            <span class="font-bold whitespace-nowrap">Onyama Limba</span>
                            <p-badge value="4" class="ml-auto mr-2" />
                        </span>
                    </ng-template>
                    <p class="m-0">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </p-accordionTab>
                <p-accordionTab>
                    <ng-template pTemplate="header">
                        <span class="flex items-center gap-2 w-full">
                            <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" shape="circle" />
                            <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
                            <p-badge value="2" class="ml-auto mr-2" />
                        </span>
                    </ng-template>
                    <p class="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </p-accordionTab>
            </p-accordion>
        </div>
        <app-code [code]="code" selector="accordion-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-accordion class="w-full" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
        <p-accordionTab>
            <ng-template pTemplate="header">
                <span class="flex items-center gap-2 w-full">
                    <p-avatar 
                        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                        shape="circle" />
                    <span class="font-bold whitespace-nowrap">
                        Amy Elsner
                    </span>
                    <p-badge value="3" class="ml-auto mr-2" />
                </span>
            </ng-template>
            <p class="m-0">
                Lorem ipsum dolor sit amet...
            </p>
        </p-accordionTab>
        <p-accordionTab>
            <ng-template pTemplate="header">
                <span class="flex items-center gap-2 w-full">
                    <p-avatar 
                        image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" 
                        shape="circle" />
                    <span class="font-bold whitespace-nowrap">
                        Onyama Limba
                    </span>
                    <p-badge value="4" class="ml-auto mr-2" />
                </span>
            </ng-template>
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
            </p>
        </p-accordionTab>
        <p-accordionTab>
            <ng-template pTemplate="header">
                <span class="flex items-center gap-2 w-full">
                    <p-avatar 
                        image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" 
                        shape="circle" />
                    <span class="font-bold whitespace-nowrap">
                        Ioni Bowcher
                    </span>
                    <p-badge value="2" class="ml-auto mr-2" />
                </span>
            </ng-template>
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos...
            </p>
        </p-accordionTab>
</p-accordion>`,

        html: `<div class="card flex justify-center">
    <p-accordion class="w-full" expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
    <p-accordionTab>
        <ng-template pTemplate="header">
            <span class="flex items-center gap-2 w-full">
                <p-avatar 
                    image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" 
                    shape="circle" />
                <span class="font-bold whitespace-nowrap">
                    Amy Elsner
                </span>
                <p-badge value="3" class="ml-auto mr-2" />
            </span>
        </ng-template>
        <p class="m-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-accordionTab>
    <p-accordionTab>
        <ng-template pTemplate="header">
            <span class="flex items-center gap-2 w-full">
                <p-avatar 
                    image="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png" 
                    shape="circle" />
                <span class="font-bold whitespace-nowrap">
                    Onyama Limba
                </span>
                <p-badge value="4" class="ml-auto mr-2" />
            </span>
        </ng-template>
        <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
</p-accordionTab>
<p-accordionTab>
    <ng-template pTemplate="header">
        <span class="flex items-center gap-2 w-full">
            <p-avatar 
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png" 
                shape="circle" />
            <span class="font-bold whitespace-nowrap">
                Ioni Bowcher
            </span>
            <p-badge value="2" class="ml-auto mr-2" />
        </span>
    </ng-template>
    <p class="m-0">
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
    </p>
</p-accordionTab>
</p-accordion>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'accordion-template-demo',
    templateUrl: './accordion-template-demo.html',
    standalone: true,
    imports: [AccordionModule, AvatarModule, BadgeModule]
})
export class AccordionTemplateDemo {}`
    };
}
