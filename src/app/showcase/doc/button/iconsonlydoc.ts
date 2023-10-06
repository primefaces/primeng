import { Component, Input } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'button-icon-only-demo',
    template: ` <section class="py-4">
        <app-docsectiontext [title]="title" [id]="id">
            <p>Buttons can have icons without labels.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check"></p-button>
                <p-button icon="pi pi-bookmark" styleClass="p-button-secondary"></p-button>
                <p-button icon="pi pi-search" styleClass="p-button-success"></p-button>
                <p-button icon="pi pi-user" styleClass="p-button-info"></p-button>
                <p-button icon="pi pi-bell" styleClass="p-button-warning"></p-button>
                <p-button icon="pi pi-heart" styleClass="p-button-help"></p-button>
                <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" styleClass="p-button-rounded"></p-button>
                <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary"></p-button>
                <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success"></p-button>
                <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info"></p-button>
                <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning"></p-button>
                <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help"></p-button>
                <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" styleClass="p-button-rounded p-button-outlined"></p-button>
                <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-outlined"></p-button>
                <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-outlined"></p-button>
                <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-outlined"></p-button>
                <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-outlined"></p-button>
                <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-outlined"></p-button>
                <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-outlined"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" styleClass="p-button-rounded p-button-text p-button-raised"></p-button>
                <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-text p-button-raised"></p-button>
                <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-text p-button-raised"></p-button>
                <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-text p-button-raised"></p-button>
                <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-text p-button-raised"></p-button>
                <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-text p-button-raised"></p-button>
                <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-text p-button-raised"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" styleClass="p-button-rounded p-button-text"></p-button>
                <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-text"></p-button>
                <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-text"></p-button>
                <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-text"></p-button>
                <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-text"></p-button>
                <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-text"></p-button>
                <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-text"></p-button>
            </div>
        </div>
        <app-code [code]="code" selector="button-icon-only-demo"></app-code>
    </section>`
})
export class IconOnlyDoc {
    @Input() id: string;

    @Input() title: string;

    code: Code = {
        basic: `
<p-button icon="pi pi-check"></p-button>
<p-button icon="pi pi-bookmark" styleClass="p-button-secondary"></p-button>
<p-button icon="pi pi-search" styleClass="p-button-success"></p-button>
<p-button icon="pi pi-user" styleClass="p-button-info"></p-button>
<p-button icon="pi pi-bell" styleClass="p-button-warning"></p-button>
<p-button icon="pi pi-heart" styleClass="p-button-help"></p-button>
<p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>

<p-button icon="pi pi-check" styleClass="p-button-rounded"></p-button>
<p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary"></p-button>
<p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success"></p-button>
<p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info"></p-button>
<p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning"></p-button>
<p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help"></p-button>
<p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger"></p-button>

<p-button icon="pi pi-check" styleClass="p-button-rounded p-button-outlined"></p-button>
<p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-outlined"></p-button>
<p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-outlined"></p-button>
<p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-outlined"></p-button>
<p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-outlined"></p-button>
<p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-outlined"></p-button>
<p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-outlined"></p-button>

<p-button icon="pi pi-check" styleClass="p-button-rounded p-button-text p-button-raised"></p-button>
<p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-text p-button-raised"></p-button>
<p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-text p-button-raised"></p-button>
<p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-text p-button-raised"></p-button>
<p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-text p-button-raised"></p-button>
<p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-text p-button-raised"></p-button>
<p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-text p-button-raised"></p-button>

<p-button icon="pi pi-check" styleClass="p-button-rounded p-button-text"></p-button>
<p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-text"></p-button>
<p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-text"></p-button>
<p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-text"></p-button>
<p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-text"></p-button>
<p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-text"></p-button>
<p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-text"></p-button>`,

        html: `
<div class="card">
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check"></p-button>
        <p-button icon="pi pi-bookmark" styleClass="p-button-secondary"></p-button>
        <p-button icon="pi pi-search" styleClass="p-button-success"></p-button>
        <p-button icon="pi pi-user" styleClass="p-button-info"></p-button>
        <p-button icon="pi pi-bell" styleClass="p-button-warning"></p-button>
        <p-button icon="pi pi-heart" styleClass="p-button-help"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-danger"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" styleClass="p-button-rounded"></p-button>
        <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary"></p-button>
        <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success"></p-button>
        <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info"></p-button>
        <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning"></p-button>
        <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" styleClass="p-button-rounded p-button-outlined"></p-button>
        <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-outlined"></p-button>
        <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-outlined"></p-button>
        <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-outlined"></p-button>
        <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-outlined"></p-button>
        <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-outlined"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-outlined"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" styleClass="p-button-rounded p-button-text p-button-raised"></p-button>
        <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-text p-button-raised"></p-button>
        <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-text p-button-raised"></p-button>
        <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-text p-button-raised"></p-button>
        <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-text p-button-raised"></p-button>
        <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-text p-button-raised"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-text p-button-raised"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" styleClass="p-button-rounded p-button-text"></p-button>
        <p-button icon="pi pi-bookmark" styleClass="p-button-rounded p-button-secondary p-button-text"></p-button>
        <p-button icon="pi pi-search" styleClass="p-button-rounded p-button-success p-button-text"></p-button>
        <p-button icon="pi pi-user" styleClass="p-button-rounded p-button-info p-button-text"></p-button>
        <p-button icon="pi pi-bell" styleClass="p-button-rounded p-button-warning p-button-text"></p-button>
        <p-button icon="pi pi-heart" styleClass="p-button-rounded p-button-help p-button-text"></p-button>
        <p-button icon="pi pi-times" styleClass="p-button-rounded p-button-danger p-button-text"></p-button>
    </div>
</div>`,

        typescript: `
import { Component } from '@angular/core';

@Component({
    selector: 'button-icon-only-demo',
    templateUrl: './button-icon-only-demo.html'
})
export class ButtonIconOnlyDemo { }`
    };
}
