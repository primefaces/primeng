import { Component } from '@angular/core';

@Component({
    selector: 'overview-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Tailwind CSS is a popular CSS framework based on a utility-first design. The core provides flexible CSS classes with predefined CSS rules to build your own UI elements. For example, instead of an opinionated <i>btn</i> class as in
                Bootstrap, Tailwind offers primitive classes like <i>bg-blue-500</i>, <i>rounded</i> and <i>p-4</i> to apply a button.
            </p>
            <p>
                Tailwind is an outstanding CSS library, however it lacks a true comprehensive UI suite when combined with Vue.js, this is where PrimeNG comes in by providing a wide range of highly accessible and feature rich UI component library. The
                core of PrimeNG does not depend on Tailwind CSS, instead we provide the necessary integration points such as the primeui tailwind plugin.
            </p>
        </app-docsectiontext>
    `
})
export class OverviewDoc {}
