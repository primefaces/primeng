import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
    selector: 'divider-pt-viewer',
    standalone: true,
    imports: [CommonModule, AppDocPtViewer, DividerModule],
    template: `
        <app-docptviewer [docs]="docs">
            <div>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores debitis praesentium aliquam.</p>

                <p-divider align="left" type="solid">
                    <b>Left</b>
                </p-divider>

                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem doloremque laudantium.</p>

                <p-divider align="center" type="dotted">
                    <b>Center</b>
                </p-divider>

                <p>Temporibus autem quibusdam et aut officiis debitis aut rerum saepe eveniet ut et voluptates.</p>

                <p-divider align="right" type="dashed">
                    <b>Right</b>
                </p-divider>
            </div>
        </app-docptviewer>
    `
})
export class PTViewer {
    docs = [
        {
            data: getPTOptions('Divider'),
            key: 'Divider'
        }
    ];
}
