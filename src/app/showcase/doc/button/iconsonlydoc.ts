import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-icon-only-demo',
    template: ` <div>
        <app-docsectiontext [title]="title" [id]="id">
            <p>Buttons can have icons without labels.</p>
        </app-docsectiontext>
        <div class="card">
            <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
                <button pButton pRipple type="button" icon="pi pi-check"></button>
                <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-secondary"></button>
                <button pButton pRipple type="button" icon="pi pi-search" class="p-button-success"></button>
                <button pButton pRipple type="button" icon="pi pi-user" class="p-button-info"></button>
                <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-warning"></button>
                <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-help"></button>
                <button pButton pRipple type="button" icon="pi pi-times" class="p-button-danger"></button>
            </div>
            <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
                <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded"></button>
                <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary"></button>
                <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success"></button>
                <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info"></button>
                <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning"></button>
                <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help"></button>
                <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger"></button>
            </div>
            <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
                <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-outlined"></button>
                <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-outlined"></button>
                <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-outlined"></button>
                <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-outlined"></button>
                <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-outlined"></button>
                <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-outlined"></button>
                <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"></button>
            </div>
            <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
                <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text p-button-raised"></button>
                <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text p-button-raised"></button>
                <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-text p-button-raised"></button>
                <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-text p-button-raised"></button>
                <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text p-button-raised"></button>
                <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text p-button-raised"></button>
                <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text p-button-raised"></button>
            </div>
            <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
                <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text"></button>
                <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text"></button>
                <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-text"></button>
                <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-text"></button>
                <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text"></button>
                <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text"></button>
                <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"></button>
            </div>
        </div>
        <app-code [code]="code" selector="button-icon-only-demo"></app-code>
    </div>`
})
export class IconOnlyDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<button pButton pRipple type="button" icon="pi pi-check"></button>
<button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-secondary"></button>
<button pButton pRipple type="button" icon="pi pi-search" class="p-button-success"></button>
<button pButton pRipple type="button" icon="pi pi-user" class="p-button-info"></button>
<button pButton pRipple type="button" icon="pi pi-bell" class="p-button-warning"></button>
<button pButton pRipple type="button" icon="pi pi-heart" class="p-button-help"></button>
<button pButton pRipple type="button" icon="pi pi-times" class="p-button-danger"></button>

<button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded"></button>
<button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary"></button>
<button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success"></button>
<button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info"></button>
<button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning"></button>
<button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help"></button>
<button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger"></button>

<button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-outlined"></button>
<button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-outlined"></button>
<button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-outlined"></button>
<button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-outlined"></button>
<button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-outlined"></button>
<button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-outlined"></button>
<button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"></button>

<button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text p-button-raised"></button>
<button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text p-button-raised"></button>
<button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-text p-button-raised"></button>
<button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-text p-button-raised"></button>
<button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text p-button-raised"></button>
<button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text p-button-raised"></button>
<button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text p-button-raised"></button>

<button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text"></button>
<button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text"></button>
<button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-text"></button>
<button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-text"></button>
<button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text"></button>
<button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text"></button>
<button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"></button>`,

        html: `
<div class="card">
    <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
        <button pButton pRipple type="button" icon="pi pi-check"></button>
        <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-secondary"></button>
        <button pButton pRipple type="button" icon="pi pi-search" class="p-button-success"></button>
        <button pButton pRipple type="button" icon="pi pi-user" class="p-button-info"></button>
        <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-warning"></button>
        <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-help"></button>
        <button pButton pRipple type="button" icon="pi pi-times" class="p-button-danger"></button>
    </div>
    <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
        <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded"></button>
        <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary"></button>
        <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success"></button>
        <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info"></button>
        <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning"></button>
        <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help"></button>
        <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger"></button>
    </div>
    <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
        <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-outlined"></button>
        <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-outlined"></button>
        <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-outlined"></button>
        <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-outlined"></button>
        <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-outlined"></button>
        <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-outlined"></button>
        <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"></button>
    </div>
    <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
        <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text p-button-raised"></button>
        <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text p-button-raised"></button>
        <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-text p-button-raised"></button>
        <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-text p-button-raised"></button>
        <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text p-button-raised"></button>
        <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text p-button-raised"></button>
        <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text p-button-raised"></button>
    </div>
    <div class=" flex justify-content-center flex-wrap gap-3 mb-4">
        <button pButton pRipple type="button" icon="pi pi-check" class="p-button-rounded p-button-text"></button>
        <button pButton pRipple type="button" icon="pi pi-bookmark" class="p-button-rounded p-button-secondary p-button-text"></button>
        <button pButton pRipple type="button" icon="pi pi-search" class="p-button-rounded p-button-success p-button-text"></button>
        <button pButton pRipple type="button" icon="pi pi-user" class="p-button-rounded p-button-info p-button-text"></button>
        <button pButton pRipple type="button" icon="pi pi-bell" class="p-button-rounded p-button-warning p-button-text"></button>
        <button pButton pRipple type="button" icon="pi pi-heart" class="p-button-rounded p-button-help p-button-text"></button>
        <button pButton pRipple type="button" icon="pi pi-times" class="p-button-rounded p-button-danger p-button-text"></button>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-icon-only-demo',
    templateUrl: './button-icon-only-demo.html',
    styleUrls: ['./button-icon-only-demo.scss']
})
export class ButtonIconOnlyDemo { }`
    };
}
