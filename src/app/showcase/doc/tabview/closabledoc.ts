import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'closable-doc',
    template: `
        <app-docsectiontext>
            <p>When <i>closable</i> is enabled, a close icon is displayed to hide the tab.</p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs id="closableTabView">
                <p-tabpanel header="Header I" [selected]="true">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </p-tabpanel>
                <p-tabpanel header="Header II" [closable]="true">
                    <p>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                        eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                        voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                        voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                    </p>
                </p-tabpanel>
                <p-tabpanel header="Header III" [closable]="true">
                    <p>
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque
                        corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                        qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
                        distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </p-tabpanel>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-closable-demo"></app-code>
    `,
})
export class ClosableDoc {
    code: Code = {
        basic: `<p-tabs id="closableTabView">
    <p-tabpanel header="Header I" [selected]="true">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>
    </p-tabpanel>
    <p-tabpanel header="Header II" [closable]="true">
        <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium...
        </p>
    </p-tabpanel>
    <p-tabpanel header="Header III" [closable]="true">
        <p>
            At vero eos et accusamus et iusto odio dignissimos...
        </p>
    </p-tabpanel>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs id="closableTabView">
        <p-tabpanel header="Header I" [selected]="true">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </p-tabpanel>
        <p-tabpanel header="Header II" [closable]="true">
            <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
            </p>
        </p-tabpanel>
        <p-tabpanel header="Header III" [closable]="true">
            <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
                qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
            </p>
        </p-tabpanel>
    </p-tabs>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Tabs, TabPanel } from 'primeng/tabs';

@Component({
    selector: 'tabs-closable-demo',
    templateUrl: './tabs-closable-demo.html',
    standalone: true,
    imports: [Tabs, TabPanel]
})
export class TabsClosableDemo {}`,
    };
}
