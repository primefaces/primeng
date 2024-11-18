import { Component } from '@angular/core';

@Component({
    selector: 'overview-doc',
    template: `
        <app-docsectiontext>
            <p>
                Tailwind CSS is a popular CSS framework based on a utility-first design. The core provides flexible CSS classes with predefined CSS rules to build your own UI elements. For example, instead of an opinionated <i>btn</i> class as in
                Bootstrap, Tailwind offers primitive classes like <i>bg-blue-500</i>, <i>rounded</i> and <i>p-4</i> to apply a button. A set of reusable classes can also be grouped as a Tailwind CSS component and there are even a couple of libraries
                that take this approach to build components specifically for Tailwind.
            </p>
            <p>
                Tailwind is an outstanding CSS library, however it lacks a true comprehensive UI suite when combined with Angular, this is where PrimeNG comes in by providing a wide range of highly accessible and feature rich UI component library.
                The core of PrimeNG does not depend on Tailwind CSS.
            </p>
        </app-docsectiontext>
    `
})
export class OverviewDoc {}
