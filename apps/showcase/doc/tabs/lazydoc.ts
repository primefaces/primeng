import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'lazy-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                By default, projected content in <i>TabPanel</i> component is initialized, even if tab is not active. You can get around this rule by encapsulating the projected content in an <i>ng-template</i>. Lazy content will not be initialized
                again upon reselection.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-tabs value="0">
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
                        <ng-template>Complex content to lazy load</ng-template>
                    </p-tabpanel>
                    <p-tabpanel value="2">
                        <ng-template>Complex content to lazy load</ng-template>
                    </p-tabpanel>
                </p-tabpanels>
            </p-tabs>
        </div>
        <app-code [code]="code" selector="tabs-lazy-demo"></app-code>
    `
})
export class LazyDoc {
    code: Code = {
        basic: `<p-tabs value="0">
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
            <ng-template>Complex content to lazy load</ng-template>
        </p-tabpanel>
        <p-tabpanel value="2">
              <ng-template>Complex content to lazy load</ng-template>
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
                <ng-template>Complex content to lazy load</ng-template>
            </p-tabpanel>
            <p-tabpanel value="2">
                <ng-template>Complex content to lazy load</ng-template>
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
