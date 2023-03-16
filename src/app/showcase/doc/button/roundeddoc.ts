import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-rounded-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Rounded buttons have a circular border radius.</p>
        </app-docsectiontext>
        <div class="card flex flex-wrap gap-3 justify-content-center">
            <button pButton type="button" label="Primary" class="p-button-rounded"></button>
            <button pButton type="button" label="Secondary" class="p-button-rounded p-button-secondary"></button>
            <button pButton type="button" label="Success" class="p-button-rounded p-button-success"></button>
            <button pButton type="button" label="Info" class="p-button-rounded p-button-info"></button>
            <button pButton type="button" label="Warning" class="p-button-rounded p-button-warning"></button>
            <button pButton type="button" label="Help" class="p-button-rounded p-button-help"></button>
            <button pButton type="button" label="Danger" class="p-button-rounded p-button-danger"></button>
        </div>
        <app-code [code]="code" selector="button-rounded-demo"></app-code>
    </div>`
})
export class RoundedDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button pButton type="button" label="Primary" class="p-button-rounded"></button>
<button pButton type="button" label="Secondary" class="p-button-rounded p-button-secondary"></button>
<button pButton type="button" label="Success" class="p-button-rounded p-button-success"></button>
<button pButton type="button" label="Info" class="p-button-rounded p-button-info"></button>
<button pButton type="button" label="Warning" class="p-button-rounded p-button-warning"></button>
<button pButton type="button" label="Help" class="p-button-rounded p-button-help"></button>
<button pButton type="button" label="Danger" class="p-button-rounded p-button-danger"></button>`,

        html: `
<div class="card flex flex-wrap gap-3 justify-content-center">
    <button pButton type="button" label="Primary" class="p-button-rounded"></button>
    <button pButton type="button" label="Secondary" class="p-button-rounded p-button-secondary"></button>
    <button pButton type="button" label="Success" class="p-button-rounded p-button-success"></button>
    <button pButton type="button" label="Info" class="p-button-rounded p-button-info"></button>
    <button pButton type="button" label="Warning" class="p-button-rounded p-button-warning"></button>
    <button pButton type="button" label="Help" class="p-button-rounded p-button-help"></button>
    <button pButton type="button" label="Danger" class="p-button-rounded p-button-danger"></button>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-rounded-demo',
    templateUrl: './button-rounded-demo.html',
    styleUrls: ['./button-rounded-demo.scss']
})
export class ButtonRoundedDemo { }`
    };
}
