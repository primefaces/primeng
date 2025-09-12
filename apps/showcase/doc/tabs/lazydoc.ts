import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'lazy-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, TabsModule],
    template: `
        <app-docsectiontext>
            <p>
                By default, inactive tab's content is rendered (but hidden). You can use the lazy input (either globally on <i>Tabs</i> or individually on a <i>TabPanel</i>) to change this behavior so that content is only rendered when the tab
                becomes active. If a lazy tab contains complex components that should only be initialized when the tab is activated, you should wrap the content inside: <i>&lt;ng-template #content&gt;your content&lt;/ng-template&gt;</i>.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs lazy value="0">
                <p-tablist>
                    <p-tab value="0">Header I</p-tab>
                    <p-tab value="1">Header II</p-tab>
                    <p-tab value="2">Header III</p-tab>
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
                        <ng-template #content>Complex components that should only be initialized when the tab becomes active</ng-template>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-lazy-demo"></app-code>
    `
})
export class LazyDoc {
    code: Code = {
        basic: `<p-tabs lazy value="0">
    <p-tablist>
        <p-tab value="0">Header I</p-tab>
        <p-tab value="1">Header II</p-tab>
        <p-tab value="2">Header III</p-tab>
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
            <ng-template #content>Complex components that should only be initialized when the tab becomes active</ng-template>
        </p-tabpanel>
    </p-tabpanels>
</p-tabs>`,

        html: `<div class="card">
    <p-tabs value="0">
        <p-tablist>
            <p-tab value="0">Header I</p-tab>
            <p-tab value="1">Header II</p-tab>
            <p-tab value="2">Header III</p-tab>
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
            <ng-template #content>Complex components that should only be initialized when the tab becomes active</ng-template>
        </p-tabpanel>
        </p-tabpanels>
    </p-tabs>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'tabs-lazy-demo',
    templateUrl: './tabs-lazy-demo.html',
    standalone: true,
    imports: [CommonModule, TabsModule]
})
export class TabsLazyDemo {}`
    };
}
