import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'indroduction-doc',
    template: `
        <app-docsectiontext>
            <p>
                PrimeNG is a popular Angular UI library maintained by PrimeTek, a company renowned for its comprehensive set of UI components for various frameworks. PrimeTek is dedicated to providing high-quality, versatile, and accessible UI
                components that help developers build better applications faster.
            </p>
            <h3>Development Setup</h3>
            <p>To begin with, clone the PrimeNG repository from GitHub:</p>
            <app-code [code]="code1" [hideToggleCode]="true" [hideStackBlitz]="true"></app-code>
            <p style="margin-top: 1rem;">Then run the showcase in your local environment at <i>http://localhost:3000/</i>.</p>
            <app-code [code]="code2" [hideToggleCode]="true" [hideStackBlitz]="true"></app-code>
            <h3>Project Structure</h3>
            <p>PrimeNG's project structure is organized as follows:</p>
            <app-code [code]="code3" [hideToggleCode]="true" [hideStackBlitz]="true"></app-code>
        </app-docsectiontext>
    `
})
export class IntroductionDoc {
    code1: Code = {
        basic: `git clone https://github.com/primefaces/primeng.git
cd primeng`
    };
    code2: Code = {
        basic: `npm install
ng serve`
    };
    code3: Code = {
        basic: `- app
  - showcase                // website
  - components              // main directory of components and directives`
    };
}
