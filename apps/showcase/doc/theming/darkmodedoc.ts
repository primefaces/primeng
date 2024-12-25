import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'darkmode-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG uses the <i>system</i> as the default <i>darkModeSelector</i> in theme configuration. If you have a dark mode switch in your application, set the <i>darkModeSelector</i> to the selector you utilize such as
                <i>.my-app-dark</i> so that PrimeNG can fit in seamlessly with your color scheme.
            </p>
            <app-code [code]="code1" selector="darkmode-demo1" [hideToggleCode]="true"></app-code>
            <p class="mt-4">
                Following is a very basic example implementation of a dark mode switch, you may extend it further by involving
                <i>prefers-color-scheme</i> to retrieve it from the system initially and use <i>localStorage</i> to make it stateful. See this
                <a href="https://dev.to/abbeyperini/dark-mode-toggle-and-prefers-color-scheme-4f3m" target="_blank" rel="noopener noreferrer">article</a>
                for more information.
            </p>
            <div class="mb-4">
                <app-code [code]="code2" selector="darkmode-demo2" [hideToggleCode]="true"></app-code>
            </div>
            <div class="mb-4">
                <app-code [code]="code3" selector="darkmode-demo3" [hideToggleCode]="true"></app-code>
            </div>
            <p>In case you prefer to use dark mode all the time, apply the <i>darkModeSelector</i> initially and never change it.</p>
            <div class="mb-4">
                <app-code [code]="code4" selector="darkmode-demo4" [hideToggleCode]="true"></app-code>
            </div>
            <p>It is also possible to disable dark mode completely using <i>false</i> or <i>none</i> as the value of the selector.</p>
            <div class="mb-4">
                <app-code [code]="code5" selector="darkmode-demo4" [hideToggleCode]="true"></app-code>
            </div>
        </app-docsectiontext>
    `
})
export class DarkModeDoc {
    code1: Code = {
        typescript: `providePrimeNG({
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.my-app-dark'
        }
    }
})`
    };

    code2 = {
        basic: `<p-button label="Toggle Dark Mode" (onClick)="toggleDarkMode()"/>`
    };

    code3 = {
        typescript: `toggleDarkMode() {
    const element = document.querySelector('html');
    element.classList.toggle('my-app-dark');
}`
    };

    code4 = {
        html: `<html class="my-app-dark">`
    };

    code5: Code = {
        typescript: `providePrimeNG({
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none'
        }
    }
})`
    };
}
