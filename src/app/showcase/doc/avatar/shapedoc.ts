import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'avatar-shape-demo',
    template: ` <section class="py-3">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Avatar comes in two different styles specified with the <i>shape</i> property, <i>square</i> is the default and <i>circle</i> is the alternative.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center gap-2">
            <p-avatar label="P" shape="circle"></p-avatar>
            <p-avatar label="T"></p-avatar>
        </div>
        <app-code [code]="code" selector="avatar-shape-demo"></app-code>
    </section>`
})
export class ShapeDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-avatar label="P" shape="circle"></p-avatar>
<p-avatar label="T"></p-avatar>`,
        html: `
<div class="card flex justify-content-center gap-2">
    <p-avatar label="P" shape="circle"></p-avatar>
    <p-avatar label="T"></p-avatar>
</div>`,
        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'avatar-shape-demo',
    templateUrl: './avatar-shape-demo.html'
})
export class AvatarShapeDemo {}`
    };
}
