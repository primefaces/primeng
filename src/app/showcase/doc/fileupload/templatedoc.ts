import { Component } from '@angular/core';
import { Code } from '@domain/code';
import { MessageService, PrimeNGConfig } from 'primeng/api';

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
            <p-toast />
            <p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000" (onUpload)="onTemplatedUpload()" (onSelect)="onSelectedFiles($event)">
                <ng-template pTemplate="header" let-files let-chooseCallback="chooseCallback" let-clearCallback="clearCallback" let-uploadCallback="uploadCallback">
                    <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                        <div class="flex gap-2">
                            <p-button (onClick)="choose($event, chooseCallback)" icon="pi pi-images" [rounded]="true" [outlined]="true" />
                            <p-button (onClick)="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" [rounded]="true" [outlined]="true" severity="success" [disabled]="!files || files.length === 0" />
                            <p-button (onClick)="clearCallback()" icon="pi pi-times" [rounded]="true" [outlined]="true" severity="danger" [disabled]="!files || files.length === 0" />
                        </div>
                        <p-progressBar [value]="totalSizePercent" [showValue]="false" styleClass="md:w-20rem h-1rem w-full md:ml-auto" [ngClass]="{ 'exceeded-progress-bar': totalSizePercent > 100 }">
                            <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
                        </p-progressBar>
                    </div>
                </ng-template>
                <ng-template pTemplate="content" let-files let-uploadedFiles="uploadedFiles" let-removeFileCallback="removeFileCallback" let-removeUploadedFileCallback="removeUploadedFileCallback">
                    <div *ngIf="files?.length > 0">
                        <h5>Pending</h5>
                        <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                            <div *ngFor="let file of files; let i = index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                                <div>
                                    <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="font-semibold">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <p-badge value="Pending" severity="warning" />
                                <p-button icon="pi pi-times" (onClick)="onRemoveTemplatingFile($event, file, removeFileCallback, index)" [outlined]="true" [rounded]="true" severity="danger" />
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
                                <p-button icon="pi pi-times" (onClick)="removeUploadedFileCallback(index)" [outlined]="true" [rounded]="true" severity="danger" />
                            </div>
                        </div>
                    </div>
                </ng-template>
                <ng-template pTemplate="file"> </ng-template>
                <ng-template pTemplate="empty">
                    <div class="flex align-items-center justify-content-center flex-column">
                        <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"></i>
                        <p class="mt-4 mb-0">Drag and drop files here to upload.</p>
                    </div>
                </ng-template>
            </p-fileUpload>
        </div>
        <app-code [code]="code" selector="file-upload-template-demo"></app-code>
    `,
    providers: [MessageService]
})
export class TemplateDoc {
    files = [];

    totalSize: number = 0;

    totalSizePercent: number = 0;

    constructor(
        private config: PrimeNGConfig,
        private messageService: MessageService
    ) {}

    choose(event, callback) {
        callback();
    }

    onRemoveTemplatingFile(event, file, removeFileCallback, index) {
        removeFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalSizePercent = this.totalSize / 10;
    }

    onClearTemplatingUpload(clear) {
        clear();
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }

    onTemplatedUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    onSelectedFiles(event) {
        this.files = event.currentFiles;
        this.files.forEach((file) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalSizePercent = this.totalSize / 10;
    }

    uploadEvent(callback) {
        callback();
    }

    formatSize(bytes) {
        const k = 1024;
        const dm = 3;
        const sizes = this.config.translation.fileSizeTypes;
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }

    code: Code = {
        basic: `<p-toast />
<p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000" (onUpload)="onTemplatedUpload()" (onSelect)="onSelectedFiles($event)">
    <ng-template pTemplate="header" let-files let-chooseCallback="chooseCallback" let-clearCallback="clearCallback" let-uploadCallback="uploadCallback">
        <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
            <div class="flex gap-2">
                <p-button (onClick)="choose($event, chooseCallback)" icon="pi pi-images" [rounded]="true" [outlined]="true" />
                <p-button (onClick)="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" [rounded]="true" [outlined]="true" severity="success" [disabled]="!files || files.length === 0" />
                <p-button (onClick)="clearCallback()" icon="pi pi-times" [rounded]="true" [outlined]="true" severity="danger" [disabled]="!files || files.length === 0" />
            </div>
            <p-progressBar [value]="totalSizePercent" [showValue]="false" styleClass="md:w-20rem h-1rem w-full md:ml-auto" [ngClass]="{ 'exceeded-progress-bar': totalSizePercent > 100 }">
                <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
            </p-progressBar>
        </div>
    </ng-template>
    <ng-template pTemplate="content" let-files let-uploadedFiles="uploadedFiles" let-removeFileCallback="removeFileCallback" let-removeUploadedFileCallback="removeUploadedFileCallback">
        <div *ngIf="files?.length > 0">
            <h5>Pending</h5>
            <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                <div *ngFor="let file of files; let i = index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                    <div>
                        <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                    </div>
                    <span class="font-semibold">{{ file.name }}</span>
                    <div>{{ formatSize(file.size) }}</div>
                    <p-badge value="Pending" severity="warning" />
                    <p-button icon="pi pi-times" (onClick)="onRemoveTemplatingFile($event, file, removeFileCallback, index)" [outlined]="true" [rounded]="true" severity="danger" />
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
                    <p-button icon="pi pi-times" (onClick)="removeUploadedFileCallback(index)" [outlined]="true" [rounded]="true" severity="danger" />
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template pTemplate="file"> </ng-template>
    <ng-template pTemplate="empty">
        <div class="flex align-items-center justify-content-center flex-column">
            <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"></i>
            <p class="mt-4 mb-0">Drag and drop files here to upload.</p>
        </div>
    </ng-template>
</p-fileUpload>`,
        html: `<div class="card">
    <p-toast />
    <p-fileUpload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000" (onUpload)="onTemplatedUpload()" (onSelect)="onSelectedFiles($event)">
        <ng-template pTemplate="header" let-files let-chooseCallback="chooseCallback" let-clearCallback="clearCallback" let-uploadCallback="uploadCallback">
            <div class="flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
                <div class="flex gap-2">
                    <p-button (onClick)="choose($event, chooseCallback)" icon="pi pi-images" [rounded]="true" [outlined]="true" />
                    <p-button (onClick)="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" [rounded]="true" [outlined]="true" severity="success" [disabled]="!files || files.length === 0" />
                    <p-button (onClick)="clearCallback()" icon="pi pi-times" [rounded]="true" [outlined]="true" severity="danger" [disabled]="!files || files.length === 0" />
                </div>
                <p-progressBar [value]="totalSizePercent" [showValue]="false" styleClass="md:w-20rem h-1rem w-full md:ml-auto" [ngClass]="{ 'exceeded-progress-bar': totalSizePercent > 100 }">
                    <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
                </p-progressBar>
            </div>
        </ng-template>
        <ng-template pTemplate="content" let-files let-uploadedFiles="uploadedFiles" let-removeFileCallback="removeFileCallback" let-removeUploadedFileCallback="removeUploadedFileCallback">
            <div *ngIf="files?.length > 0">
                <h5>Pending</h5>
                <div class="flex flex-wrap p-0 sm:p-5 gap-5">
                    <div *ngFor="let file of files; let i = index" class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
                        <div>
                            <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <p-badge value="Pending" severity="warning" />
                        <p-button icon="pi pi-times" (onClick)="onRemoveTemplatingFile($event, file, removeFileCallback, index)" [outlined]="true" [rounded]="true" severity="danger" />
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
                        <p-button icon="pi pi-times" (onClick)="removeUploadedFileCallback(index)" [outlined]="true" [rounded]="true" severity="danger" />
                    </div>
                </div>
            </div>
        </ng-template>
        <ng-template pTemplate="file"> </ng-template>
        <ng-template pTemplate="empty">
            <div class="flex align-items-center justify-content-center flex-column">
                <i class="pi pi-cloud-upload border-2 border-circle p-5 text-8xl text-400 border-400"></i>
                <p class="mt-4 mb-0">Drag and drop files here to upload.</p>
            </div>
        </ng-template>
    </p-fileUpload>
</div>`,

        typescript: `import { Component } from '@angular/core';
import { MessageService, PrimeNGConfig} from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'file-upload-template-demo',
    templateUrl: './file-upload-template-demo.html',
    standalone: true,
    imports: [FileUploadModule, ButtonModule, BadgeModule, ProgressBarModule, ToastModule, HttpClientModule, CommonModule],
    providers: [MessageService]
})
export class FileUploadTemplateDemo {
    files = [];

    totalSize : number = 0;

    totalSizePercent : number = 0;

    constructor(private config: PrimeNGConfig, private messageService: MessageService) {}

    choose(event, callback) {
        callback();
    }

    onRemoveTemplatingFile(event, file, removeFileCallback, index) {
        removeFileCallback(event, index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalSizePercent = this.totalSize / 10;
    }

    onClearTemplatingUpload(clear) {
        clear();
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }

    onTemplatedUpload() {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    onSelectedFiles(event) {
        this.files = event.currentFiles;
        this.files.forEach((file) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
        this.totalSizePercent = this.totalSize / 10;
    }

    uploadEvent(callback) {
        callback();
    }

    formatSize(bytes) {
        const k = 1024;
        const dm = 3;
        const sizes = this.config.translation.fileSizeTypes;
        if (bytes === 0) {
            return \`0 \${sizes[0]}\`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return \`\${formattedSize} \${sizes[i]}\`;
    }
}`
    };
}
