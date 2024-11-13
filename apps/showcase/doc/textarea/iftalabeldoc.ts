import { Code } from '@/domain/code';
import { Component } from '@angular/core';

@Component({
    selector: 'iftalabel-doc',
    template: `
        <app-docsectiontext>
            <p>IftaLabel is used to create infield top aligned labels. Visit <a routerLink="/iftalabel">IftaLabel</a> documentation for more information.</p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-iftalabel>
                <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
                <label for="description">Description</label>
            </p-iftalabel>
        </div>
        <app-code [code]="code" selector="input-textarea-iftalabel-demo"></app-code>
    `
})
export class IftaLabelDoc {
    value: string = '';

    code: Code = {
        basic: `<p-iftalabel>
    <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
    <label for="description">Description</label>
</p-iftalabel>`,

        html: `<div class="card flex justify-center">
    <p-iftalabel>
        <textarea pTextarea id="description" [(ngModel)]="value" rows="5" cols="30" style="resize: none"></textarea>
        <label for="description">Description</label>
    </p-iftalabel>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';

@Component({
    selector: ': 'input-textarea-iftalabel-demo',
    templateUrl: './: 'input-textarea-iftalabel-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextareaModule, IftaLabelModule]
})
export class TextareaIftaLabelDemo {
    value: string = '';
}`
    };
}
