import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';

@Component({
    selector: 'splitter-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, SplitterModule],
    template: `
        <app-docptviewer [docs]="docs">
            <p-splitter [style]="{ height: '300px' }">
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 1</div>
                </ng-template>
                <ng-template #panel>
                    <div class="flex items-center justify-center h-full">Panel 2</div>
                </ng-template>
            </p-splitter>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Splitter'),
            key: 'Splitter'
        }
    ];
}
