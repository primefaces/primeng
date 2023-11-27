import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'basic-doc',
    template: `
        <app-docsectiontext>
            <p>TabView consists of one or more <i>TabPanel</i> elements.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="h-full w-full pt-5">
                <div class="flex h-full overflow-y-hidden p-0 w-full">
                    <div class="h-full p-2 w-1/3 overflow-auto flex-auto">
                        <p-tabView [scrollable]="true" styleClass="h-full overflow-hidden">
                            <p-tabPanel *ngFor="let tab of scrollableTabs" [header]="tab.title">
                                <p>{{ tab.content }}</p>
                            </p-tabPanel>
                        </p-tabView>
                    </div>

                    <div class="h-full p-2 w-1/3 overflow-auto flex-auto">
                        <p-tabView [scrollable]="true" styleClass="h-full overflow-hidden grow">
                            <p-tabPanel *ngFor="let tab of scrollableTabs2" [header]="tab.title">
                                <p>{{ tab.content }}</p>
                            </p-tabPanel>
                        </p-tabView>
                    </div>
                    <div class="h-full p-2 w-1/3 overflow-auto flex-auto">
                        <p-tabView [scrollable]="true" styleClass="h-full overflow-hidden grow">
                            <p-tabPanel *ngFor="let tab of scrollableTabs3" [header]="tab.title">
                                <p>{{ tab.content }}</p>
                            </p-tabPanel>
                        </p-tabView>
                    </div>
                </div>
            </div>
        </div>
        <app-code [code]="code" selector="tab-view-basic-demo"></app-code>
    `
})
export class BasicDoc {
    activeIndex: number = 0;

    scrollableTabs: any[];

    scrollableTabs2: any[];

    scrollableTabs3: any[];

    scrollableTabs4: any[];

    ngOnInit() {
        this.scrollableTabs = Array.from({ length: 3 }, (_, i) => ({
            title: 'Title',
            content: 'Content'
        }));

        this.scrollableTabs2 = Array.from({ length: 5 }, (_, i) => ({
            title: 'Title',
            content: 'Content'
        }));

        this.scrollableTabs3 = Array.from({ length: 2 }, (_, i) => ({
            title: 'Title',
            content: 'Content'
        }));

        this.scrollableTabs4 = Array.from({ length: 30 }, (_, i) => ({
            title: 'Title',
            content: 'Content'
        }));
    }
    code: Code = {
        basic: `<p-tabView>
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
    <p-tabView>
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
    selector: 'tab-view-basic-demo',
    templateUrl: './tab-view-basic-demo.html'
})
export class TabViewBasicDemo {}`
    };
}
