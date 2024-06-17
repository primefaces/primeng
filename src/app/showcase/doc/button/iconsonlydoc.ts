import { Component } from '@angular/core';
import { Code } from '@domain/code';

@Component({
    selector: 'button-icon-only-demo',
    template: `
        <app-docsectiontext>
            <p>Buttons can have icons without labels.</p>
        </app-docsectiontext>
        <div class="card">
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" />
                <p-button icon="pi pi-bookmark" severity="secondary" />
                <p-button icon="pi pi-search" severity="success" />
                <p-button icon="pi pi-user" severity="info" />
                <p-button icon="pi pi-bell" severity="warning" />
                <p-button icon="pi pi-heart" severity="help" />
                <p-button icon="pi pi-times" severity="danger" />
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" />
                <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" />
                <p-button icon="pi pi-search" [rounded]="true" severity="success" />
                <p-button icon="pi pi-user" [rounded]="true" severity="info" />
                <p-button icon="pi pi-bell" [rounded]="true" severity="warning" />
                <p-button icon="pi pi-heart" [rounded]="true" severity="help" />
                <p-button icon="pi pi-times" [rounded]="true" severity="danger" />
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" [outlined]="true" />
                <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true" />
                <p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true" />
                <p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true" />
                <p-button icon="pi pi-bell" [rounded]="true" severity="warning" [outlined]="true" />
                <p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true" />
                <p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true" />
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true" />
                <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary " />
                <p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success " />
                <p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info " />
                <p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warning " />
                <p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help " />
                <p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger " />
            </div>
            <div class="flex justify-content-center flex-wrap gap-3 mb-4">
                <p-button icon="pi pi-check" [rounded]="true" [text]="true" />
                <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary " />
                <p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success " />
                <p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info " />
                <p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning " />
                <p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help " />
                <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger " />
            </div>
        </div>
        <app-code [code]="code" selector="button-icon-only-demo"></app-code>
    `
})
export class IconOnlyDoc {
    code: Code = {
        basic: `<p-button icon="pi pi-check" />
<p-button icon="pi pi-bookmark" severity="secondary" />
<p-button icon="pi pi-search" severity="success" />
<p-button icon="pi pi-user" severity="info" />
<p-button icon="pi pi-bell" severity="warning" />
<p-button icon="pi pi-heart" severity="help" />
<p-button icon="pi pi-times" severity="danger" />

<p-button icon="pi pi-check" [rounded]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" />
<p-button icon="pi pi-search" [rounded]="true" severity="success" />
<p-button icon="pi pi-user" [rounded]="true" severity="info" />
<p-button icon="pi pi-bell" [rounded]="true" severity="warning" />
<p-button icon="pi pi-heart" [rounded]="true" severity="help" />
<p-button icon="pi pi-times" [rounded]="true" severity="danger" />

<p-button icon="pi pi-check" [rounded]="true" [outlined]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true" />
<p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true" />
<p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true" />
<p-button icon="pi pi-bell" [rounded]="true" severity="warning" [outlined]="true" />
<p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true" />
<p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true" />

<p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary " />
<p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success " />
<p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info " />
<p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warning " />
<p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help " />
<p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger " />

<p-button icon="pi pi-check" [rounded]="true" [text]="true" />
<p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary " />
<p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success " />
<p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info " />
<p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning " />
<p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help " />
<p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger " />`,

        html: `<div class="card">
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" />
        <p-button icon="pi pi-bookmark" severity="secondary" />
        <p-button icon="pi pi-search" severity="success" />
        <p-button icon="pi pi-user" severity="info" />
        <p-button icon="pi pi-bell" severity="warning" />
        <p-button icon="pi pi-heart" severity="help" />
        <p-button icon="pi pi-times" severity="danger" />
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" />
        <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" />
        <p-button icon="pi pi-search" [rounded]="true" severity="success" />
        <p-button icon="pi pi-user" [rounded]="true" severity="info" />
        <p-button icon="pi pi-bell" [rounded]="true" severity="warning" />
        <p-button icon="pi pi-heart" [rounded]="true" severity="help" />
        <p-button icon="pi pi-times" [rounded]="true" severity="danger" />
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" [outlined]="true" />
        <p-button icon="pi pi-bookmark" [rounded]="true" severity="secondary" [outlined]="true" />
        <p-button icon="pi pi-search" [rounded]="true" severity="success" [outlined]="true" />
        <p-button icon="pi pi-user" [rounded]="true" severity="info" [outlined]="true" />
        <p-button icon="pi pi-bell" [rounded]="true" severity="warning" [outlined]="true" />
        <p-button icon="pi pi-heart" [rounded]="true" severity="help" [outlined]="true" />
        <p-button icon="pi pi-times" [rounded]="true" severity="danger" [outlined]="true" />
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" [text]="true" [raised]="true" />
        <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" [raised]="true" severity="secondary " />
        <p-button icon="pi pi-search" [rounded]="true" [text]="true" [raised]="true" severity="success " />
        <p-button icon="pi pi-user" [rounded]="true" [text]="true" [raised]="true" severity="info " />
        <p-button icon="pi pi-bell" [rounded]="true" [text]="true" [raised]="true" severity="warning " />
        <p-button icon="pi pi-heart" [rounded]="true" [text]="true" [raised]="true" severity="help " />
        <p-button icon="pi pi-times" [rounded]="true" [text]="true" [raised]="true" severity="danger " />
    </div>
    <div class="flex justify-content-center flex-wrap gap-3 mb-4">
        <p-button icon="pi pi-check" [rounded]="true" [text]="true" />
        <p-button icon="pi pi-bookmark" [rounded]="true" [text]="true" severity="secondary " />
        <p-button icon="pi pi-search" [rounded]="true" [text]="true" severity="success " />
        <p-button icon="pi pi-user" [rounded]="true" [text]="true" severity="info " />
        <p-button icon="pi pi-bell" [rounded]="true" [text]="true" severity="warning " />
        <p-button icon="pi pi-heart" [rounded]="true" [text]="true" severity="help " />
        <p-button icon="pi pi-times" [rounded]="true" [text]="true" severity="danger " />
    </div>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'button-icon-only-demo',
    templateUrl: './button-icon-only-demo.html',
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonIconOnlyDemo { }`
    };
}
