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
        <div class="card flex flex-wrap justify-center items-stretch gap-4">
            <p-floatlabel>
                <textarea pTextarea id="over_label" [(ngModel)]="value1" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
                <label for="over_label">Over Label</label>
            </p-floatlabel>

            <p-floatlabel variant="in">
                <textarea pTextarea id="over_label" [(ngModel)]="value2" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
                <label for="in_label">In Label</label>
            </p-floatlabel>

            <p-floatlabel variant="on">
                <textarea pTextarea id="over_label" [(ngModel)]="value3" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
                <label for="on_label">On Label</label>
            </p-floatlabel>
        </div>
        <app-code [code]="code" selector="input-textarea-floatlabel-demo"></app-code>
    `
})
export class FloatlabelDoc {
    value1: string = '';

    value2: string = '';

    value3: string = '';

    code: Code = {
        basic: `<p-floatlabel>
    <textarea pTextarea id="over_label" [(ngModel)]="value1" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
    <label for="over_label">Over Label</label>
</p-floatlabel>

<p-floatlabel variant="in">
    <textarea pTextarea id="over_label" [(ngModel)]="value2" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
    <label for="in_label">In Label</label>
</p-floatlabel>

<p-floatlabel variant="on">
    <textarea pTextarea id="over_label" [(ngModel)]="value3" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
    <label for="on_label">On Label</label>
</p-floatlabel>`,

        html: `<div class="card flex flex-wrap justify-center items-stretch gap-4">
    <p-floatlabel>
        <textarea pTextarea id="over_label" [(ngModel)]="value1" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
        <label for="over_label">Over Label</label>
    </p-floatlabel>

    <p-floatlabel variant="in">
        <textarea pTextarea id="over_label" [(ngModel)]="value2" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
        <label for="in_label">In Label</label>
    </p-floatlabel>

    <p-floatlabel variant="on">
        <textarea pTextarea id="over_label" [(ngModel)]="value3" rows="5" cols="30" style="resize: none" class="h-full"></textarea>
        <label for="on_label">On Label</label>
    </p-floatlabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { Textarea } from 'primeng/textearea';;
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
    selector: ': 'input-textarea-floatlabel-demo',
    templateUrl: './: 'input-textarea-floatlabel-demo.html',
    standalone: true,
    imports: [FormsModule, Textarea, FloatLabel]
})
export class TextareaFloatlabelDemo {
    value1: string = '';

    value2: string = '';

    value3: string = '';
}`
    };
}
