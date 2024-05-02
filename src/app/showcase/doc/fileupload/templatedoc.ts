import { Component } from '@angular/core';
import { Code } from '@domain/code';

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
        <div class="card">
            <p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000">
                <ng-template let-file pTemplate="header">
                    <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                        <div class="flex gap-2">
                            <p-button (click)="chooseCallback()" icon="pi pi-images" [rounded]="true" [outlined]="true" />
                            <p-button (click)="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" [rounded]="true" [outlined]="true" severity="success" [disabled]="!files || files.length === 0" />
                            <p-button (click)="clearCallback()" icon="pi pi-times" [rounded]="true" [outlined]="true" severity="danger" [disabled]="!files || files.length === 0" />
                        </div>
                        <p-progressBar [value]="totalSizePercent" [showValue]="false" styleClass="md:w-20rem h-1rem w-full md:ml-auto" [ngClass]="{ 'exceeded-progress-bar': totalSizePercent > 100 }">
                            <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
                        </p-progressBar>
                    </div>
                </ng-template>
                <ng-template pTemplate="content" let-files>
                    <div *ngIf="files.length > 0">
                        <h5>Pending</h5>
                        <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                            <div *ngFor="let file of files; let i = index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                <div>
                                    <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="font-semibold">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <p-badge value="Pending" severity="warning" />
                                <p-button icon="pi pi-times" (click)="onRemoveTemplatingFile(file, removeFileCallback, index)" [outlined]="true" [rounded]="true" severity="danger" />
                            </div>
                        </div>
                    </div>
                    <div *ngIf="uploadedFiles?.length > 0">
                        <h5>Completed</h5>
                        <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                            <div *ngFor="let file of uploadedFiles; let i = index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                <div>
                                    <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="font-semibold">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <p-badge value="Completed" class="mt-3" severity="success" />
                                <p-button icon="pi pi-times" (click)="removeUploadedFileCallback(index)" [outlined]="true" [rounded]="true" severity="danger" />
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="empty">
                    <div class="flex align-items-center justify-content-center flex-column">
                        <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"></i>
                        <p class="mt-4 mb-0">Drag and drop files to here to upload.</p>
                    </div>
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
