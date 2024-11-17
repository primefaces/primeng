import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'template-doc',
    template: `
        <app-docsectiontext>
            <p>Custom content for a tab is defined with the default ng-content.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs value="0" scrollable>
                <p-tablist>
                    <ng-template #previcon>
                        <i class="pi pi-minus"></i>
                    </ng-template>
                    <p-tab value="0">
                        <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold whitespace-nowrap">Amy Elsner</span>
                    </p-tab>
                    <p-tab value="1">
                        <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                        <span class="font-bold whitespace-nowrap">Onyama Limba</span>
                    </p-tab>
                    <p-tab value="2">
                        <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                        <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
                        <p-badge value="2" />
                    </p-tab>
                    <ng-template #nexticon>
                        <i class="pi pi-plus"></i>
                    </ng-template>
                </p-tablist>
                <p-tabpanels>
                    <p-tabpanel value="0">
                        <p class="m-0">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                            laborum.
                        </p>
                    </p-tabpanel>
                    <p-tabpanel value="1">
                        <p class="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </p-tabpanel>
                    <p-tabpanel value="2">
                        <p class="m-0">
                            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                            culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                        </p>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-tabs value="0" scrollable>
    <p-tablist>
        <ng-template #previcon>
            <i class="pi pi-minus"></i>
        </ng-template>
        <p-tab value="0">
            <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"/>
            <span class="font-bold whitespace-nowrap">Amy Elsner</span>
        </p-tab>
        <p-tab value="1">
            <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Onyama Limba</span>
        </p-tab>
        <p-tab value="2">
            <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
            <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
            <p-badge value="2" />
        </p-tab>
        <ng-template #nexticon>
            <i class="pi pi-plus"></i>
        </ng-template>
    </p-tablist>
    <p-tabpanels>
        <p-tabpanel value="0">
            <p class="m-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel value="1">
            <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
            </p>
        </p-tabpanel>
        <p-tabpanel value="2">
            <p class="m-0">
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                impedit quo minus.
            </p>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs value="0" scrollable>
        <p-tablist>
            <ng-template #previcon>
                <i class="pi pi-minus"></i>
            </ng-template>
            <p-tab value="0">
                <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"/>
                <span class="font-bold whitespace-nowrap">Amy Elsner</span>
            </p-tab>
            <p-tab value="1">
                <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" />
                <span class="font-bold whitespace-nowrap">Onyama Limba</span>
            </p-tab>
            <p-tab value="2">
                <p-avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" />
                <span class="font-bold whitespace-nowrap">Ioni Bowcher</span>
                <p-badge value="2" />
            </p-tab>
            <ng-template #nexticon>
                <i class="pi pi-plus"></i>
            </ng-template>
        </p-tablist>
        <p-tabpanels>
            <p-tabpanel value="0">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                    nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                    anim id est laborum.
                </p>
            </p-tabpanel>
            <p-tabpanel value="1">
                <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
                    dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                    modi.
                </p>
            </p-tabpanel>
            <p-tabpanel value="2">
                <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
                    atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                    sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
                    facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
                    impedit quo minus.
                </p>
            </p-tabpanel>
        </p-tabpanels>
    </p-tabs>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'tabs-template-demo',
    templateUrl: './tabs-template-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule, BadgeModule, AvatarModule]
})
export class TabsTemplateDemo {}`
    };
}
