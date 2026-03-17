import { AppDocPtTable } from '@/components/doc/app.docpttable';
import { getPTOptions } from '@/components/doc/app.docptviewer';
import { AppDocSection } from '@/components/doc/app.docsection';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PTViewer } from './PTViewer';

@Component({
    selector: 'inputcolor-pt-component',
    standalone: true,
    imports: [CommonModule, AppDocSection],
    template: `<div class="doc-main">
        <div class="doc-intro">
            <h1>InputColor Pass Through</h1>
        </div>
        <app-docsection [docs]="docs" />
    </div>`
})
export class PTComponent {
    docs = [
        {
            id: 'pt.viewer',
            label: 'Viewer',
            component: PTViewer
        },
        {
            id: 'pt.doc.inputcolor',
            label: 'InputColor PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColor')
        },
        {
            id: 'pt.doc.inputcolorarea',
            label: 'InputColorArea PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorArea')
        },
        {
            id: 'pt.doc.inputcolorareabackground',
            label: 'InputColorAreaBackground PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorAreaBackground')
        },
        {
            id: 'pt.doc.inputcolorareathumb',
            label: 'InputColorAreaThumb PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorAreaThumb')
        },
        {
            id: 'pt.doc.inputcolorslider',
            label: 'InputColorSlider PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorSlider')
        },
        {
            id: 'pt.doc.inputcolorslidertrack',
            label: 'InputColorSliderTrack PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorSliderTrack')
        },
        {
            id: 'pt.doc.inputcolorsliderthumb',
            label: 'InputColorSliderThumb PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorSliderThumb')
        },
        {
            id: 'pt.doc.inputcolorswatch',
            label: 'InputColorSwatch PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorSwatch')
        },
        {
            id: 'pt.doc.inputcolorswatchbackground',
            label: 'InputColorSwatchBackground PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorSwatchBackground')
        },
        {
            id: 'pt.doc.inputcolortransparencygrid',
            label: 'InputColorTransparencyGrid PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorTransparencyGrid')
        },
        {
            id: 'pt.doc.inputcoloreyedropper',
            label: 'InputColorEyeDropper PT Options',
            component: AppDocPtTable,
            data: getPTOptions('InputColorEyeDropper')
        }
    ];
}
