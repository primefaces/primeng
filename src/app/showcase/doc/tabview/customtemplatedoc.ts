import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'template-doc',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Header of a tab supports templating to place custom html content instead of strings as well.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabView styleClass="tabview-custom">
                <p-tabPanel>
                    <ng-template pTemplate="header">
                        <i class="pi pi-calendar"></i>
                        <span>Header I</span>
                    </ng-template>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p-tabPanel>
                <p-tabPanel header="Header II">
                    <ng-template pTemplate="header">
                        <i class="pi pi-user"></i>
                        <span>Header II</span>
                    </ng-template>
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </p-tabPanel>
                <p-tabPanel header="Header III">
                    <ng-template pTemplate="header">
                        <i class="pi pi-search"></i>
                        <span>Header III</span>
                        <i class="pi pi-cog"></i>
                    </ng-template>
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </p-tabPanel>
            </p-tabView>
        </div>
        <app-code [code]="code" selector="tab-view-template-demo"></app-code>
    </section>`
})
export class TemplateDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-tabView styleClass="tabview-custom">
    <p-tabPanel>
        <ng-template pTemplate="header">
            <i class="pi pi-calendar"></i>
            <span>Header I</span>
        </ng-template>
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-tabPanel>
    <p-tabPanel header="Header II">
        <ng-template pTemplate="header">
            <i class="pi pi-user"></i>
            <span>Header II</span>
        </ng-template>
        <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
    </p-tabPanel>
    <p-tabPanel header="Header III">
        <ng-template pTemplate="header">
            <i class="pi pi-search"></i>
            <span>Header III</span>
            <i class="pi pi-cog"></i>
        </ng-template>
        <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
    </p-tabPanel>
</p-tabView>`,

        html: `
<div class="card">
    <p-tabView styleClass="tabview-custom">
        <p-tabPanel>
            <ng-template pTemplate="header">
                <i class="pi pi-calendar"></i>
                <span>Header I</span>
            </ng-template>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </p-tabPanel>
        <p-tabPanel header="Header II">
            <ng-template pTemplate="header">
                <i class="pi pi-user"></i>
                <span>Header II</span>
            </ng-template>
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-tabPanel>
        <p-tabPanel header="Header III">
            <ng-template pTemplate="header">
                <i class="pi pi-search"></i>
                <span>Header III</span>
                <i class="pi pi-cog"></i>
            </ng-template>
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </p-tabPanel>
    </p-tabView>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'tab-view-template-demo',
    templateUrl: './tab-view-template-demo.html'
})
export class TabViewTemplateDemo {}`
    };
}
