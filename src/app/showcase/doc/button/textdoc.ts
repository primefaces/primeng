import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-text-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Text buttons are displayed as textual elements.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <button pButton type="button" label="Primary" class="p-button-text"></button>
            <button pButton type="button" label="Secondary" class="p-button-secondary p-button-text"></button>
            <button pButton type="button" label="Success" class="p-button-success p-button-text"></button>
            <button pButton type="button" label="Info" class="p-button-info p-button-text"></button>
            <button pButton type="button" label="Warning" class="p-button-warning p-button-text"></button>
            <button pButton type="button" label="Help" class="p-button-help p-button-text"></button>
            <button pButton type="button" label="Danger" class="p-button-danger p-button-text"></button>
        </div>
        <app-code [code]="code" selector="button-text-demo"></app-code>
    </div>`
})
export class TextDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button pButton type="button" label="Primary" class="p-button-text"></button>
<button pButton type="button" label="Secondary" class="p-button-secondary p-button-text"></button>
<button pButton type="button" label="Success" class="p-button-success p-button-text"></button>
<button pButton type="button" label="Info" class="p-button-info p-button-text"></button>
<button pButton type="button" label="Warning" class="p-button-warning p-button-text"></button>
<button pButton type="button" label="Help" class="p-button-help p-button-text"></button>
<button pButton type="button" label="Danger" class="p-button-danger p-button-text"></button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <button pButton type="button" label="Primary" class="p-button-text"></button>
    <button pButton type="button" label="Secondary" class="p-button-secondary p-button-text"></button>
    <button pButton type="button" label="Success" class="p-button-success p-button-text"></button>
    <button pButton type="button" label="Info" class="p-button-info p-button-text"></button>
    <button pButton type="button" label="Warning" class="p-button-warning p-button-text"></button>
    <button pButton type="button" label="Help" class="p-button-help p-button-text"></button>
    <button pButton type="button" label="Danger" class="p-button-danger p-button-text"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-text-demo',
    templateUrl: './button-text-demo.html',
    styleUrls: ['./button-text-demo.scss']
})
export class ButtonTextDemo { }`
    };
}
