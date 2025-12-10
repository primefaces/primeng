# Angular FileUpload Component

FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.

## Accessibility

Screen Reader FileUpload uses a hidden native input element with type="file" for screen readers. Keyboard Support Interactive elements of the uploader are buttons, visit the Button accessibility section for more information.

## Advanced

Advanced uploader provides dragdrop support, multi file uploads, auto uploading, progress tracking and validations.

```html
<p-fileupload name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" (onUpload)="onUpload($event)" [multiple]="true" accept="image/*" maxFileSize="1000000" mode="advanced">
    <ng-template #empty>
        <div>Drag and drop files to here to upload.</div>
    </ng-template>
</p-fileupload>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-advanced-demo',
    templateUrl: './file-upload-advanced-demo.html',
    standalone: true,
    imports: [FileUpload, ToastModule, CommonModule],
    providers: [MessageService]
})
export class FileUploadAdvancedDemo {
    uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {}

    onUpload(event:UploadEvent) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}
```
</details>

## Auto

When auto property is enabled, a file gets uploaded instantly after selection.

```html
<p-fileupload mode="basic" name="demo[]" chooseIcon="pi pi-upload" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onBasicUploadAuto($event)" [auto]="true" chooseLabel="Browse" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'file-upload-auto-demo',
    templateUrl: './file-upload-auto-demo.html',
    standalone: true,
    imports: [FileUpload, ToastModule],
    providers: [MessageService]
})
export class FileUploadAutoDemo {
    constructor(private messageService: MessageService) { }

    onBasicUploadAuto(event: UploadEvent) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Auto Mode' });
    }
}
```
</details>

## Basic

FileUpload basic mode provides a simpler UI as an alternative to default advanced mode.

```html
<p-fileupload #fu mode="basic" chooseLabel="Choose" chooseIcon="pi pi-upload" name="demo[]" url="https://www.primefaces.org/cdn/api/upload.php" accept="image/*" maxFileSize="1000000" (onUpload)="onUpload($event)" />
<p-button label="Upload" (onClick)="fu.upload()" severity="secondary" />
```

## customdoc

FileUpload basic mode provides a simpler UI as an alternative to default advanced mode.

```html
<p-fileupload name="myfile[]" [customUpload]="true" (uploadHandler)="customUploader($event)"></p-fileupload>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, Input } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'file-upload-custom-demo',
    templateUrl: './file-upload-custom-demo.html',
    providers: [MessageService]
})
export class CustomDoc {

    constructor(private messageService: MessageService) {}

    async customUploader(event) {
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };

        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

```html
<p-toast />
<p-fileupload name="myfile[]" url="https://www.primefaces.org/cdn/api/upload.php" [multiple]="true" accept="image/*" maxFileSize="1000000" (onUpload)="onTemplatedUpload()" (onSelect)="onSelectedFiles($event)">
    <ng-template #header let-files let-chooseCallback="chooseCallback" let-clearCallback="clearCallback" let-uploadCallback="uploadCallback">
        <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
            <div class="flex gap-2">
                <p-button (onClick)="choose($event, chooseCallback)" icon="pi pi-images" [rounded]="true" [outlined]="true" />
                <p-button (onClick)="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" [rounded]="true" [outlined]="true" severity="success" [disabled]="!files || files.length === 0" />
                <p-button (onClick)="clearCallback()" icon="pi pi-times" [rounded]="true" [outlined]="true" severity="danger" [disabled]="!files || files.length === 0" />
            </div>
            <p-progressbar [value]="totalSizePercent" [showValue]="false" class="w-full" class="md:w-20rem h-1 w-full md:ml-auto">
                <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
            </p-progressbar>
        </div>
    </ng-template>
    <ng-template #content let-files let-uploadedFiles="uploadedFiles" let-removeFileCallback="removeFileCallback" let-removeUploadedFileCallback="removeUploadedFileCallback">
        <div class="flex flex-col gap-8 pt-4">
            <div *ngIf="files?.length > 0">
                <h5>Pending</h5>
                <div class="flex flex-wrap gap-4">
                    <div *ngFor="let file of files; let i = index" class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                        <div>
                            <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <p-badge value="Pending" severity="warn" />
                        <p-button icon="pi pi-times" (click)="onRemoveTemplatingFile($event, file, removeFileCallback, index)" [outlined]="true" [rounded]="true" severity="danger" />
                    </div>
                </div>
            </div>
            <div *ngIf="uploadedFiles?.length > 0">
                <h5>Completed</h5>
                <div class="flex flex-wrap gap-4">
                    <div *ngFor="let file of uploadedFiles; let i = index" class="card m-0 px-12 flex flex-col border border-surface items-center gap-4">
                        <div>
                            <img role="presentation" [alt]="file.name" [src]="file.objectURL" width="100" height="50" />
                        </div>
                        <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name }}</span>
                        <div>{{ formatSize(file.size) }}</div>
                        <p-badge value="Completed" class="mt-4" severity="success" />
                        <p-button icon="pi pi-times" (onClick)="removeUploadedFileCallback(index)" [outlined]="true" [rounded]="true" severity="danger" />
                    </div>
                </div>
            </div>
        </div>
    </ng-template>
    <ng-template #file></ng-template>
    <ng-template #empty>
        <div class="flex items-center justify-center flex-col">
            <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"></i>
            <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
        </div>
    </ng-template>
</p-fileupload>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MessageService} from 'primeng/api';
import { PrimeNG } from 'primeng/config';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { HttpClientModule } from '@angular/common/http';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'file-upload-template-demo',
    templateUrl: './file-upload-template-demo.html',
    standalone: true,
    imports: [FileUpload, ButtonModule, BadgeModule, ProgressBar, ToastModule, HttpClientModule, CommonModule],
    providers: [MessageService]
})
export class FileUploadTemplateDemo {
    files = [];

    totalSize : number = 0;

    totalSizePercent : number = 0;

    constructor(private config: PrimeNG, private messageService: MessageService) {}

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
}
```
</details>

## File Upload

FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<FileUploadPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| name | string | - | Name of the request parameter to identify the files at backend. |
| url | string | - | Remote url to upload the files. |
| method | "post" \| "put" | post | HTTP method to send the files to the url such as "post" and "put". |
| multiple | boolean | false | Used to select multiple files at once from file dialog. |
| accept | string | - | Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg"). |
| disabled | boolean | false | Disables the upload functionality. |
| auto | boolean | false | When enabled, upload begins automatically after selection is completed. |
| withCredentials | boolean | false | Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates. |
| maxFileSize | number | - | Maximum file size allowed in bytes. |
| invalidFileSizeMessageSummary | string | {0}: Invalid file size,  | Summary message of the invalid file size. |
| invalidFileSizeMessageDetail | string | maximum upload size is {0}. | Detail message of the invalid file size. |
| invalidFileTypeMessageSummary | string | {0}: Invalid file type,  | Summary message of the invalid file type. |
| invalidFileTypeMessageDetail | string | allowed file types: {0}. | Detail message of the invalid file type. |
| invalidFileLimitMessageDetail | string | limit is {0} at most. | Detail message of the invalid file type. |
| invalidFileLimitMessageSummary | string | Maximum number of files exceeded,  | Summary message of the invalid file type. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| styleClass | string | - | Class of the element. |
| previewWidth | number | 50 | Width of the image thumbnail in pixels. |
| chooseLabel | string | - | Label of the choose button. Defaults to PrimeNG Locale configuration. |
| uploadLabel | string | - | Label of the upload button. Defaults to PrimeNG Locale configuration. |
| cancelLabel | string | - | Label of the cancel button. Defaults to PrimeNG Locale configuration. |
| chooseIcon | string | - | Icon of the choose button. |
| uploadIcon | string | - | Icon of the upload button. |
| cancelIcon | string | - | Icon of the cancel button. |
| showUploadButton | boolean | true | Whether to show the upload button. |
| showCancelButton | boolean | true | Whether to show the cancel button. |
| mode | "advanced" \| "basic" | advanced | Defines the UI of the component. |
| headers | HttpHeaders | - | HttpHeaders class represents the header configuration options for an HTTP request. |
| customUpload | boolean | false | Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration. |
| fileLimit | number | - | Maximum number of files that can be uploaded. |
| uploadStyleClass | string | - | Style class of the upload button. |
| cancelStyleClass | string | - | Style class of the cancel button. |
| removeStyleClass | string | - | Style class of the remove button. |
| chooseStyleClass | string | - | Style class of the choose button. |
| chooseButtonProps | ButtonProps | - | Used to pass all properties of the ButtonProps to the choose button inside the component. |
| uploadButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the upload button inside the component. |
| cancelButtonProps | ButtonProps | ... | Used to pass all properties of the ButtonProps to the cancel button inside the component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onBeforeUpload | event: FileBeforeUploadEvent | Callback to invoke before file upload is initialized. |
| onSend | event: FileSendEvent | An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream. |
| onUpload | event: FileUploadEvent | Callback to invoke when file upload is complete. |
| onError | event: FileUploadErrorEvent | Callback to invoke if file upload fails. |
| onClear | event: Event | Callback to invoke when files in queue are removed without uploading using clear all button. |
| onRemove | event: FileRemoveEvent | Callback to invoke when a file is removed without uploading using clear button of a file. |
| onSelect | event: FileSelectEvent | Callback to invoke when files are selected. |
| onProgress | event: FileProgressEvent | Callback to invoke when files are being uploaded. |
| uploadHandler | event: FileUploadHandlerEvent | Callback to invoke in custom upload mode to upload the files manually. |
| onImageError | event: Event | This event is triggered if an error occurs while loading an image file. |
| onRemoveUploadedFile | event: RemoveUploadedFileEvent | This event is triggered if an error occurs while loading an image file. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| file | TemplateRef<void> | Custom file template. |
| header | TemplateRef<FileUploadHeaderTemplateContext> | Custom header template. |
| content | TemplateRef<FileUploadContentTemplateContext> | Custom content template. |
| toolbar | TemplateRef<void> | Custom toolbar template. |
| chooseicon | TemplateRef<void> | Custom choose icon template. |
| filelabel | TemplateRef<FileUploadFileLabelTemplateContext> | Custom file label template. |
| uploadicon | TemplateRef<void> | Custom upload icon template. |
| cancelicon | TemplateRef<void> | Custom cancel icon template. |
| empty | TemplateRef<void> | Custom empty state template. |

### Methods

| Name | Parameters | Return Type | Description |
|------|------------|-------------|-------------|
| uploader |  | void | Uploads the selected files. |
| clear |  | void | Clears the files list. |
| remove | event: Event, index: number | void | Removes a single file. |
| removeUploadedFile | index: number | void | Removes uploaded file. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| input | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the input's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| pcChooseButton | ButtonPassThrough | Used to pass attributes to the choose button component. |
| pcUploadButton | ButtonPassThrough | Used to pass attributes to the upload button component. |
| pcCancelButton | ButtonPassThrough | Used to pass attributes to the cancel button component. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| pcProgressBar | ProgressBarPassThrough | Used to pass attributes to the progress bar component. |
| pcMessage | MessagePassThrough | Used to pass attributes to the message component. |
| fileList | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the file list's DOM element. |
| file | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the file's DOM element. |
| fileThumbnail | PassThroughOption<HTMLImageElement, I> | Used to pass attributes to the file thumbnail's DOM element. |
| fileInfo | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the file info's DOM element. |
| fileName | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the file name's DOM element. |
| fileSize | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the file size's DOM element. |
| pcFileBadge | BadgePassThrough | Used to pass attributes to the file badge component. |
| fileActions | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the file actions's DOM element. |
| pcFileRemoveButton | ButtonPassThrough | Used to pass attributes to the file remove button component. |
| basicContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the basic content's DOM element. |
| empty | PassThroughOption<HTMLElement, I> | Used to pass attributes to the empty's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-fileupload | Class name of the root element |
| p-fileupload-header | Class name of the header element |
| p-fileupload-choose-button | Class name of the choose button element |
| p-fileupload-upload-button | Class name of the upload button element |
| p-fileupload-cancel-button | Class name of the cancel button element |
| p-fileupload-content | Class name of the content element |
| p-fileupload-file-list | Class name of the file list element |
| p-fileupload-file | Class name of the file element |
| p-fileupload-file-thumbnail | Class name of the file thumbnail element |
| p-fileupload-file-info | Class name of the file info element |
| p-fileupload-file-name | Class name of the file name element |
| p-fileupload-file-size | Class name of the file size element |
| p-fileupload-file-badge | Class name of the file badge element |
| p-fileupload-file-actions | Class name of the file actions element |
| p-fileupload-file-remove-button | Class name of the file remove button element |
| p-fileupload-basic-content | Class name of the content in basic mode |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| fileupload.background | --p-fileupload-background | Background of root |
| fileupload.border.color | --p-fileupload-border-color | Border color of root |
| fileupload.color | --p-fileupload-color | Color of root |
| fileupload.border.radius | --p-fileupload-border-radius | Border radius of root |
| fileupload.transition.duration | --p-fileupload-transition-duration | Transition duration of root |
| fileupload.header.background | --p-fileupload-header-background | Background of header |
| fileupload.header.color | --p-fileupload-header-color | Color of header |
| fileupload.header.padding | --p-fileupload-header-padding | Padding of header |
| fileupload.header.border.color | --p-fileupload-header-border-color | Border color of header |
| fileupload.header.border.width | --p-fileupload-header-border-width | Border width of header |
| fileupload.header.border.radius | --p-fileupload-header-border-radius | Border radius of header |
| fileupload.header.gap | --p-fileupload-header-gap | Gap of header |
| fileupload.content.highlight.border.color | --p-fileupload-content-highlight-border-color | Highlight border color of content |
| fileupload.content.padding | --p-fileupload-content-padding | Padding of content |
| fileupload.content.gap | --p-fileupload-content-gap | Gap of content |
| fileupload.file.padding | --p-fileupload-file-padding | Padding of file |
| fileupload.file.gap | --p-fileupload-file-gap | Gap of file |
| fileupload.file.border.color | --p-fileupload-file-border-color | Border color of file |
| fileupload.file.info.gap | --p-fileupload-file-info-gap | Info gap of file |
| fileupload.file.list.gap | --p-fileupload-file-list-gap | Gap of file list |
| fileupload.progressbar.height | --p-fileupload-progressbar-height | Height of progressbar |
| fileupload.basic.gap | --p-fileupload-basic-gap | Gap of basic |

