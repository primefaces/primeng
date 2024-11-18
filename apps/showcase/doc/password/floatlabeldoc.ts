import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'floatlabel-doc',
    template: `
        <app-docsectiontext>
            <p>
                A floating label appears on top of the input field when focused. Visit
                <a routerLink="/floatlabel">FloatLabel</a> documentation for more information.
            </p>
        </app-docsectiontext>
        <div class="card flex flex-wrap justify-center items-end gap-4">
            <p-floatlabel>
                <p-password [(ngModel)]="value1" inputId="over_label" autocomplete="off" />
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <p-password [(ngModel)]="value2" inputId="in_label" autocomplete="off" />
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <p-password [(ngModel)]="value3" inputId="on_label" autocomplete="off" />
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="password-floatlabel-demo"></app-code>
    `
})
export class FloatLabelDoc {
    value1!: string;

    value2!: string;

    value3!: string;

    code: Code = {
        basic: `<p-floatlabel>
    <p-password [(ngModel)]="value1" inputId="over_label" />
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <p-password [(ngModel)]="value2" inputId="in_label" />
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <p-password [(ngModel)]="value3" inputId="on_label" />
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-end gap-4">
    <p-floatlabel>
        <p-password [(ngModel)]="value1" inputId="over_label" />
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
        <p-password [(ngModel)]="value2" inputId="in_label" />
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <p-password [(ngModel)]="value3" inputId="on_label" />
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
    selector: 'password-floatlabel-demo',
    templateUrl: './password-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, PasswordModule, FloatLabelModule]
})
export class PasswordFloatlabelDemo {
    value1!: string;

    value2!: string;

    value3!: string;
}`
    };
}
