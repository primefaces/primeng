import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';
import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'v20-backward-compatible-doc',
    imports: [AppDocModule, AppCodeModule],
    template: `
        <app-docsectiontext>
            <h4>Form Enhancements</h4>
            <p>
                In this iteration, all form components have been reviewed and new demos for template-driven and reactive forms have been added. During this work, limitations have been identified and resolved as well. In addition, we've introduced a
                new property named <i>invalid</i> to the form components that you may use style a component as invalid. In previous versions, form components style themselves as invalid using a built-in style like the following.
            </p>
            <app-code [code]="code1" [hideToggleCode]="true" lang="scss"></app-code>
            <p class="mt-4">
                This style is opinionated as it is specifally for invalid and dirty states ignoring other potential UX requirements like touched/untouched or form submit. In v20, the new <i>invalid</i>
                provides full control to highlight a component a invalid.
            </p>
            <app-code [code]="code2" [hideToggleCode]="true" lang="html"></app-code>
            <p class="mt-4">This styling change is backward compatible, meaning the opinionated <i>ng-invalid.ng-dirty</i> class is still included however in future versions, it will be removed.</p>

            <h4>PrimeUIX Themes</h4>
            <p>
                PrimeUIX is a shared package between all Prime libraries, this shared approach allows PrimeTek teams to share theming and the Design team who is responsible for the Figma UI Kit to work on a single design file, which is the single
                source of truth. Prior to v20, PrimeNG has its own fork in default styles and for the design tokens <i>{{ '@' }}primeng/themes</i> package is required. With v20, PrimeNG receives the styles from <i>{{ '@' }}primeuix/styles</i> under
                the hood and the design tokens as theme presets are loaded from <i>{{ '@' }}primeuix/themes</i>.
            </p>
            <p>
                The components need to be adjusted to fit in the PrimeUIX theming by using the <i>host</i> element where applicable, as a result for the components that use host element (&lt;p-* /&gt;) as their main container, the
                <i>styleClass</i> became obselete since native <i>class</i> attribute is already available on the custom element. Refer to the documentation of a particular component to find out if <i>styleClass</i> is deprecated.
            </p>
            <app-code [code]="code3" [hideToggleCode]="true"></app-code>
            <p class="mt-4">
                All of these changes are backward compatible, <i>{{ '@' }}primeng/themes</i> use <i>{{ '@' }}primeuix/themes</i> internally, and migration is easy as replacing the dependency <i>{{ '@' }}primeng/themes</i> with
                <i>{{ '@' }}primeuix/themes</i> in your application.
            </p>
        </app-docsectiontext>
    `
})
export class BackwardCompatibleDoc {
    code1: Code = {
        command: `.p-inputtext.ng-invalid.ng-dirty {
    border-color: \${dt('inputtext.invalid.border.color')};
}`
    };

    code2: Code = {
        html: `<input type="text" pattern="email" [invalid]="email.invalid && (email.touched || sampleForm.submitted)" />`
    };

    code3: Code = {
        html: `<!-- Deprecated -->
<p-select styleClass="mx-auto" />

<!-- New -->
<p-select class="mx-auto" />`
    };
}
