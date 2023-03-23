import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'controlled-doc',
    template: ` <section>
        <app-docsectiontext [title]="title" [id]="id">
            <p>TabView can be controlled programmatically using a binding to <i>activeIndex</i> update the active index.</p>
        </app-docsectiontext>
        <div class="card">
            <div style="padding: .5em 0 1em 0">
                <p-button (click)="activeIndex = 0" styleClass="p-button-text" label="Activate 1rd"></p-button>
                <p-button (click)="activeIndex = 1" styleClass="p-button-text" label="Activate 2rd"></p-button>
                <p-button (click)="activeIndex = 2" styleClass="p-button-text" label="Activate 3rd"></p-button>
            </div>
            <p-tabView [(activeIndex)]="activeIndex">
                <p-tabPanel header="Header I">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p-tabPanel>
                <p-tabPanel header="Header II">
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                        ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </p-tabPanel>
                <p-tabPanel header="Header III">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </p-tabPanel>
            </p-tabView>
        </div>
        <app-code [code]="code" selector="tab-view-controlled-demo"></app-code>
    </section>`
})
export class ControlledDoc {
    @Input() id: string;

    @Input() title: string;

    activeIndex: number = 0;

    code: Code = {
        basic: `
<div style="padding: .5em 0 1em 0">
    <p-button (click)="activeIndex = 0" styleClass="p-button-text" label="Activate 1rd"></p-button>
    <p-button (click)="activeIndex = 1" styleClass="p-button-text" label="Activate 2rd" style="{'margin-left': '.5em'}"></p-button>
    <p-button (click)="activeIndex = 2" styleClass="p-button-text" label="Activate 3rd" style="{'margin-left': '.5em'}"></p-button>
</div>
<p-tabView [(activeIndex)]="activeIndex">
    <p-tabPanel header="Header I">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-tabPanel>
    <p-tabPanel header="Header II">
        <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
            ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
        </p>
    </p-tabPanel>
    <p-tabPanel header="Header III">
        <p>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
            qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
        </p>
    </p-tabPanel>
</p-tabView>`,

        html: `
<div class="card">
    <div style="padding: .5em 0 1em 0">
        <p-button (click)="activeIndex = 0" styleClass="p-button-text" label="Activate 1rd"></p-button>
        <p-button (click)="activeIndex = 1" styleClass="p-button-text" label="Activate 2rd" style="{'margin-left': '.5em'}"></p-button>
        <p-button (click)="activeIndex = 2" styleClass="p-button-text" label="Activate 3rd" style="{'margin-left': '.5em'}"></p-button>
    </div>
    <p-tabView [(activeIndex)]="activeIndex">
        <p-tabPanel header="Header I">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </p-tabPanel>
        <p-tabPanel header="Header II">
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-tabPanel>
        <p-tabPanel header="Header III">
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
    selector: 'tab-view-controlled-demo',
    templateUrl: './tab-view-controlled-demo.html'
})
export class TabViewControlledDemo {
    activeIndex: number = 0;
}`
    };
}
