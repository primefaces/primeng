import { AppCode } from '@/components/doc/app.code';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'introduction-doc',
    standalone: true,
    imports: [AppDocSectionText, AppCode, PanelModule, RouterLink],
    template: `
        <app-docsectiontext>
            <p>
                In traditional 3rd party UI libraries, users are limited to the API provided by component author. This API commonly consists of inputs, outputs, and content projection. Whenever a requirement emerges for a new customization option in
                the API, the component author needs to develop and publish it with a new release.
            </p>
            <p>
                Vision of PrimeTek is <i>Your components, not ours</i>. The pass through feature is a key element to implement this vision by exposing the component internals in order to apply arbitrary attributes and listeners to the DOM elements.
                The primary advantage of this approach is that it frees you from being restricted by the main component API. We recommend considering the pass-through feature whenever you need to tailor a component that lacks a built-in feature for
                your specific requirement.
            </p>
            <p>
                Each component has a special <i>pt</i> property to define an object with keys corresponding to the available DOM elements. A value of a key can either be a string, an object or a function to define the arbitrary properties such as
                styling, aria, data-* or custom attributes for the element. If the value is a string or a function that returns a string, it serves as a shorthand for a style class definition. Every component documentation has a dedicated section to
                document the available section names exposed via PT.
            </p>
            <div class="video-container mb-4">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/ehHZ2ip8RXQ?si=wwA09dwLdQ1DNl7I" frameborder="0" allowfullscreen></iframe>
            </div>
            <p>
                In this example, a Panel is customized with various options through <i>pt</i>. The styling is overriden with Tailwind CSS and header receives custom attributes that are not available in the component api. Note that, you may avoid the
                <i>!</i> based overrides in Tailwind classes if you setup CSS Layers with PrimeNG. Visit the <a [routerLink]="'/tailwind'">Override</a> section at Tailwind integration for examples.
            </p>
        </app-docsectiontext>
        <div class="card">
            <p-panel header="PT Panel" [pt]="pt">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </p-panel>
        </div>
        <app-code [code]="code" selector="panel-pt-demo" />
    `
})
export class IntroductionDoc {
    pt = {
        root: '!border !border-indigo !rounded-2xl !p-4 !bg-gradient-to-br !from-indigo-600 !to-indigo-400',
        header: {
            id: 'myPanelHeader',
            'data-custom': 'prime',
            style: {
                'user-select': 'none'
            },
            class: ['!text-white font-bold !p-0 !bg-transparent !border-none']
        },
        content: { class: '!text-white dark:text-primary-200 !p-0 mt-2 !font-medium' },
        title: 'text-xl'
    };

    code: Code = {
        basic: `<p-panel header="Header" [pt]="pt">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
</p-panel>`,
        html: `<div class="card">
    <p-panel header="Header" [pt]="pt">
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
    </p-panel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PanelModule } from 'primeng/panel';

@Component({
    selector: 'panel-pt-demo',
    templateUrl: './panel-pt-demo.html',
    standalone: true,
    imports: [PanelModule]
})
export class PanelPtDemo {
    pt = {
        root: '!border !border-indigo !rounded-2xl !p-4 !bg-gradient-to-br !from-indigo-600 !to-indigo-400',
        header: {
            id: 'myPanelHeader',
            'data-custom': 'prime',
            style: {
                'user-select': 'none'
            },
            class: ['!text-white font-bold !p-0 !bg-transparent !border-none']
        },
        content: { class: '!text-white dark:text-primary-200 !p-0 mt-2 !font-medium' },
        title: 'text-xl'
    };
}`
    };
}
