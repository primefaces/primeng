import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCodeModule } from '@/components/doc/app.code.component';
import { AppDocModule } from '@/components/doc/app.doc.module';

@Component({
    selector: 'custom-tokens-doc',
    standalone: true,
    imports: [CommonModule, AppCodeModule, AppDocModule],
    template: `<app-docsectiontext>
        <p>
            Custom tokens allow bringing in your own design tokens to the theme to go beyond the built-in ones. A design token requires a name and a value where the value can be a static value like a color or another token. The name of the token
            should be a dot seperated lowercase value e.g. <i>accent.color</i>. For example, a custom token name can be defined as <i>accent.color</i> and the value can either be a value like <i>#eab308</i> or another token such as
            <i>&#123;yellow.50&#125;</i>. Custom tokens can also refer to each other, e.g. <i>selection.background</i> custom token can define <i>&#123;accent.color&#125;</i> as a value.
        </p>
    </app-docsectiontext>`
})
export class CustomTokensDoc {}
