import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'semantic-html-doc',
    template: `
        <app-docsectiontext>
            <p>
                HTML offers various element to organize content on a web page that screen readers are aware of. Preferring Semantic HTML for good semantics provide out of the box support for reader which is not possible when regular
                <i>div</i> elements with classes are used. Consider the following example that do not mean too much for readers.
            </p>
            <app-code [code]="code1" [hideToggleCode]="true"></app-code>
            <p class="doc-section-description mt-3">Same layout can be achieved using the semantic elements with screen reader support built-in.</p>
            <app-code [code]="code2" [hideToggleCode]="true"></app-code>
        </app-docsectiontext>
    `
})
export class SemanticHTMLDoc {
    code1: Code = {
        html: `<div class="header"/>
    <div class="header-text">Header></div>
</div>

<div class="nav"></div>

<div class="main">
    <div class="content"></div>
    <div class="sidebar"></div>
</div>

<div class="footer"></div>`
    };

    code2: Code = {
        html: `<header>
    <h1>Header</h1>
</header>

<nav></nav>

<main>
    <article></article>
    <aside></aside>
</main>

<footer></footer>`
    };
}
