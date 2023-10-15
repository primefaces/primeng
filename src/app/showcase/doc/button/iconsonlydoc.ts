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
                <p-button icon="pi pi-bookmark" severity="secondary"></p-button>
                <p-button icon="pi pi-search" severity="success"></p-button>
                <p-button icon="pi pi-user" severity="info"></p-button>
                <p-button icon="pi pi-bell" severity="warning"></p-button>
                <p-button icon="pi pi-heart" severity="help"></p-button>
                <p-button icon="pi pi-times" severity="danger"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true"></p-button>
                <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary"></p-button>
                <p-button icon="pi pi-search" [rounded]="true" severity="success"></p-button>
                <p-button icon="pi pi-user" [rounded]="true" severity="info"></p-button>
                <p-button icon="pi pi-bell" [rounded]="true" severity="warning"></p-button>
                <p-button icon="pi pi-heart" [rounded]="true" severity="help"></p-button>
                <p-button icon="pi pi-times" [rounded]="true" severity="danger"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" [outlined]="true"></p-button>
                <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true"></p-button>
                <p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true"></p-button>
                <p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true"></p-button>
                <p-button icon="pi pi-bell" [rounded]="true" severity="warning" [outlined]="true"></p-button>
                <p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true"></p-button>
                <p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true"></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true"></p-button>
                <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary "></p-button>
                <p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success "></p-button>
                <p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info "></p-button>
                <p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warning "></p-button>
                <p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help "></p-button>
                <p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger "></p-button>
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" [text]="true"></p-button>
                <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary "></p-button>
                <p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success "></p-button>
                <p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info "></p-button>
                <p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning "></p-button>
                <p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help "></p-button>
                <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger "></p-button>
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
<p-button icon="pi pi-bookmark" severity="secondary"></p-button>
<p-button icon="pi pi-search" severity="success"></p-button>
<p-button icon="pi pi-user" severity="info"></p-button>
<p-button icon="pi pi-bell" severity="warning"></p-button>
<p-button icon="pi pi-heart" severity="help"></p-button>
<p-button icon="pi pi-times" severity="danger"></p-button>

<p-button icon="pi pi-check" [rounded]="true"></p-button>
<p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary"></p-button>
<p-button icon="pi pi-search" [rounded]="true" severity="success"></p-button>
<p-button icon="pi pi-user" [rounded]="true" severity="info"></p-button>
<p-button icon="pi pi-bell" [rounded]="true" severity="warning"></p-button>
<p-button icon="pi pi-heart" [rounded]="true" severity="help"></p-button>
<p-button icon="pi pi-times" [rounded]="true" severity="danger"></p-button>

<p-button icon="pi pi-check" [rounded]="true" [outlined]="true"></p-button>
<p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true"></p-button>
<p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true"></p-button>
<p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true"></p-button>
<p-button icon="pi pi-bell" [rounded]="true" severity="warning" [outlined]="true"></p-button>
<p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true"></p-button>
<p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true"></p-button>

<p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true"></p-button>
<p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary "></p-button>
<p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success "></p-button>
<p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info "></p-button>
<p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warning "></p-button>
<p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help "></p-button>
<p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger "></p-button>

<p-button icon="pi pi-check" [rounded]="true" [text]="true"></p-button>
<p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary "></p-button>
<p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success "></p-button>
<p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info "></p-button>
<p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning "></p-button>
<p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help "></p-button>
<p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger "></p-button>`,

        html: `
<div class="card">
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check"></p-button>
        <p-button icon="pi pi-bookmark" severity="secondary"></p-button>
        <p-button icon="pi pi-search" severity="success"></p-button>
        <p-button icon="pi pi-user" severity="info"></p-button>
        <p-button icon="pi pi-bell" severity="warning"></p-button>
        <p-button icon="pi pi-heart" severity="help"></p-button>
        <p-button icon="pi pi-times" severity="danger"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true"></p-button>
        <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary"></p-button>
        <p-button icon="pi pi-search" [rounded]="true" severity="success"></p-button>
        <p-button icon="pi pi-user" [rounded]="true" severity="info"></p-button>
        <p-button icon="pi pi-bell" [rounded]="true" severity="warning"></p-button>
        <p-button icon="pi pi-heart" [rounded]="true" severity="help"></p-button>
        <p-button icon="pi pi-times" [rounded]="true" severity="danger"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" [outlined]="true"></p-button>
        <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true"></p-button>
        <p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true"></p-button>
        <p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true"></p-button>
        <p-button icon="pi pi-bell" [rounded]="true" severity="warning" [outlined]="true"></p-button>
        <p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true"></p-button>
        <p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true"></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true"></p-button>
        <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary "></p-button>
        <p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success "></p-button>
        <p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info "></p-button>
        <p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warning "></p-button>
        <p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help "></p-button>
        <p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger "></p-button>
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" [text]="true"></p-button>
        <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary "></p-button>
        <p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success "></p-button>
        <p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info "></p-button>
        <p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning "></p-button>
        <p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help "></p-button>
        <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger "></p-button>
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
