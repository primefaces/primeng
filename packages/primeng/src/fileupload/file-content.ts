import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output, TemplateRef } from '@angular/core';
import { TranslationKeys } from 'primeng/api';
import { Badge } from 'primeng/badge';
import { BaseComponent } from 'primeng/basecomponent';
import { Bind } from 'primeng/bind';
import { Button } from 'primeng/button';
import { Times as TimesIcon } from '@primeicons/angular/times';
import { FileContentRemoveEvent, FileRemoveIconTemplateContext } from 'primeng/types/fileupload';
import type { FileUpload } from './fileupload';
import { FILEUPLOAD_INSTANCE } from './fileupload-token';
import { FileUploadStyle } from './style/fileuploadstyle';
import { BadgeSeverity } from 'primeng/types/badge';

@Component({
    selector: '[pFileContent]',
    standalone: true,
    template: `@for (file of files(); track file?.name + '-' + $index; let index = $index) {
        <div [class]="cx('file')" [pBind]="$pcFileUpload.ptm('file')">
            <img role="presentation" [class]="cx('fileThumbnail')" [attr.alt]="file.name" [src]="file.objectURL" [width]="previewWidth()" [pBind]="$pcFileUpload.ptm('fileThumbnail')" />
            <div [class]="cx('fileInfo')" [pBind]="$pcFileUpload.ptm('fileInfo')">
                <div [class]="cx('fileName')" [pBind]="$pcFileUpload.ptm('fileName')">{{ file.name }}</div>
                <span [class]="cx('fileSize')" [pBind]="$pcFileUpload.ptm('fileSize')">{{ formatSize(file.size) }}</span>
            </div>
            <p-badge [value]="badgeValue()" [severity]="badgeSeverity()" [class]="cx('pcFileBadge')" [pt]="$pcFileUpload.ptm('pcFileBadge')" [unstyled]="unstyled()" />
            <div [class]="cx('fileActions')" [pBind]="$pcFileUpload.ptm('fileActions')">
                <p-button (onClick)="onRemoveClick($event, index)" [styleClass]="cx('pcFileRemoveButton')" text rounded severity="danger" [pt]="$pcFileUpload.ptm('pcFileRemoveButton')" [unstyled]="unstyled()">
                    <ng-template #icon let-iconClass="class">
                        @if (fileRemoveIconTemplate()) {
                            <ng-template *ngTemplateOutlet="fileRemoveIconTemplate(); context: getRemoveIconContext(iconClass, file, index)"></ng-template>
                        } @else {
                            <svg data-p-icon="times" [class]="iconClass" [attr.aria-hidden]="true" />
                        }
                    </ng-template>
                </p-button>
            </div>
        </div>
    }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [FileUploadStyle],
    imports: [NgTemplateOutlet, Badge, Button, TimesIcon, Bind]
})
export class FileContent extends BaseComponent {
    _componentStyle = inject(FileUploadStyle);

    $pcFileUpload = inject<FileUpload>(FILEUPLOAD_INSTANCE);

    onRemove = output<FileContentRemoveEvent>();

    files = input<File[]>();

    badgeSeverity = input<BadgeSeverity>('warn');

    badgeValue = input<string>();

    previewWidth = input<number>(50);

    fileRemoveIconTemplate = input<TemplateRef<unknown>>();

    onRemoveClick(event: Event, index: number) {
        this.onRemove.emit({ event, index });
    }

    getRemoveIconContext(iconClass: string, file: File, index: number): FileRemoveIconTemplateContext {
        return { class: iconClass, file, index };
    }

    formatSize(bytes: number) {
        const k = 1024;
        const dm = 3;
        const sizes = this.translate(TranslationKeys.FILE_SIZE_TYPES);

        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = (bytes / Math.pow(k, i)).toFixed(dm);

        return `${formattedSize} ${sizes[i]}`;
    }
}
