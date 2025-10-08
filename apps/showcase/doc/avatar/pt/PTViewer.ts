import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
    selector: 'avatar-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, AvatarModule, AvatarGroupModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div class="flex flex-wrap gap-8">
                <p-avatargroup>
                    <p-avatar label="P" size="xlarge" shape="circle"></p-avatar>
                    <p-avatar icon="pi pi-user" size="xlarge" shape="circle"></p-avatar>
                    <p-avatar image="https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp" styleClass="flex items-center justify-center" size="xlarge" shape="circle"></p-avatar>
                </p-avatargroup>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Avatar'),
            key: 'Avatar'
        },
        {
            data: getPTOptions('AvatarGroup'),
            key: 'AvatarGroup'
        }
    ];
}
