import { Component } from '@angular/core';
import { Code } from '../../domain/code';

@Component({
    selector: 'file-upload-template-demo',
    template: `
        <app-docsectiontext>
            <p>
                Uploader UI is customizable using a ng-template called <i>file</i> that gets the <a href="https://www.w3.org/TR/FileAPI/">File</a> instance as the implicit variable. Second ng-template named <i>content</i> can be used to place custom
                content inside the content section which would be useful to implement a user interface to manage the uploaded files such as removing them. This template gets the selected files as the implicit variable. Third and final ng-template
                option is <i>toolbar</i> to display custom content at toolbar.
            </p></app-docsectiontext
        >
        <div class="card flex justify-content-center">
            <p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000">
                <ng-template pTemplate="toolbar">
                    <div class="py-3">Upload 3 Files</div>
                </ng-template>
                <ng-template let-file pTemplate="file">
                    <div>Custom UI to display a file</div>
                </ng-template>
                <ng-template pTemplate="content" let-files>
                    <div>Additional content.</div>
                </ng-template>
            </p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-template-demo"></app-code>
    `
})
export class TemplateDoc {
    code: Code = {
        basic: `<p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000">
    <ng-template pTemplate="toolbar">
        <div class="py-3">Upload 3 Files</div>
    </ng-template>
    <ng-template let-file pTemplate="file">
        <div>Custom UI to display a file</div>
    </ng-template>
    <ng-template pTemplate="content" let-files>
        <div>Additional content.</div>
    </ng-template>
</p-fileUpload>`,
        html: `
<div class="card flex justify-content-center">
    <p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000">
        <ng-template pTemplate="toolbar">
            <div class="py-3">Upload 3 Files</div>
        </ng-template>
        <ng-template let-file pTemplate="file">
            <div>Custom UI to display a file</div>
        </ng-template>
        <ng-template pTemplate="content" let-files>
            <div>Additional content.</div>
        </ng-template>
    </p-fileUpload>
</div>`,

        typescript: `
import { Component, Input } from '@angular/core';

@Component({
    selector: 'file-upload-template-demo',
    templateUrl: './file-upload-template-demo.html',
})
export class FileUploadTemplateDemo {}`
    };
}
