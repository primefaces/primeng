import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-outlined-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Outlined buttons display a border without a background initially.</p>
        </app-docsectiontext>
        <div class="card flex justify-content-center">
            <button pButton type="button" label="Primary" class="p-button-outlined"></button>
            <button pButton type="button" label="Secondary" class="p-button-outlined p-button-secondary"></button>
            <button pButton type="button" label="Success" class="p-button-outlined p-button-success"></button>
            <button pButton type="button" label="Info" class="p-button-outlined p-button-info"></button>
            <button pButton type="button" label="Warning" class="p-button-outlined p-button-warning"></button>
            <button pButton type="button" label="Help" class="p-button-outlined p-button-help"></button>
            <button pButton type="button" label="Danger" class="p-button-outlined p-button-danger"></button>
        </div>
        <app-code [code]="code" selector="button-outlined-demo"></app-code>
    </div>`
})
export class OutlinedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button pButton type="button" label="Primary" class="p-button-outlined"></button>
<button pButton type="button" label="Secondary" class="p-button-outlined p-button-secondary"></button>
<button pButton type="button" label="Success" class="p-button-outlined p-button-success"></button>
<button pButton type="button" label="Info" class="p-button-outlined p-button-info"></button>
<button pButton type="button" label="Warning" class="p-button-outlined p-button-warning"></button>
<button pButton type="button" label="Help" class="p-button-outlined p-button-help"></button>
<button pButton type="button" label="Danger" class="p-button-outlined p-button-danger"></button>`,

        html: `
<div class="card flex justify-content-center">
    <button pButton type="button" label="Primary" class="p-button-outlined"></button>
    <button pButton type="button" label="Secondary" class="p-button-outlined p-button-secondary"></button>
    <button pButton type="button" label="Success" class="p-button-outlined p-button-success"></button>
    <button pButton type="button" label="Info" class="p-button-outlined p-button-info"></button>
    <button pButton type="button" label="Warning" class="p-button-outlined p-button-warning"></button>
    <button pButton type="button" label="Help" class="p-button-outlined p-button-help"></button>
    <button pButton type="button" label="Danger" class="p-button-outlined p-button-danger"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-outlined-demo',
    templateUrl: './button-outlined-demo.html',
    styleUrls: ['./button-outlined-demo.scss']
})
export class ButtonOutlinedDemo { }`
    };
}
