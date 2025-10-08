import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
    selector: 'avatar-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, AvatarModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="flex flex-wrap gap-8">
                <div class="flex flex-col items-center gap-2">
                    <h3 class="text-sm font-medium">Label</h3>
                    <p-avatar label="P" size="xlarge"></p-avatar>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <h3 class="text-sm font-medium">Icon</h3>
                    <p-avatar icon="pi pi-user" size="xlarge"></p-avatar>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <h3 class="text-sm font-medium">Image</h3>
                    <p-avatar image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png" size="xlarge"></p-avatar>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <h3 class="text-sm font-medium">Circle</h3>
                    <p-avatar label="V" size="xlarge" shape="circle"></p-avatar>
                </div>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Avatar'),
            key: 'Avatar'
        }
    ];
}
