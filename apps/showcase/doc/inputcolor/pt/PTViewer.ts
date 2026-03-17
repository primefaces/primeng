import { AppDocPtViewer, getPTOptions } from '@/components/doc/app.docptviewer';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    InputColor,
    InputColorArea,
    InputColorAreaBackground,
    InputColorAreaThumb,
    InputColorSlider,
    InputColorSliderThumb,
    InputColorSliderTrack,
    InputColorSwatch,
    InputColorSwatchBackground,
    InputColorTransparencyGrid,
    InputColorEyeDropper
} from 'primeng/inputcolor';
import { EyeDropper } from '@primeicons/angular/eye-dropper';

@Component({
    selector: 'inputcolor-pt-viewer',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        AppDocPtViewer,
        InputColor,
        InputColorArea,
        InputColorAreaBackground,
        InputColorAreaThumb,
        InputColorSlider,
        InputColorSliderThumb,
        InputColorSliderTrack,
        InputColorSwatch,
        InputColorSwatchBackground,
        InputColorTransparencyGrid,
        InputColorEyeDropper,
        EyeDropper
    ],
    template: `
        <app-docptviewer [docs]="docs">
            <p-inputcolor [(ngModel)]="color" class="w-80 mx-auto space-y-3">
                <p-inputcolor-area>
                    <p-inputcolor-area-background />
                    <p-inputcolor-area-thumb />
                </p-inputcolor-area>
                <div class="flex items-center gap-2">
                    <div class="flex-1 space-y-1 mr-1">
                        <p-inputcolor-slider>
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="alpha">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                    </div>
                    <p-inputcolor-swatch class="shrink-0">
                        <p-inputcolor-transparency-grid />
                        <p-inputcolor-swatch-background />
                    </p-inputcolor-swatch>
                    <p-inputcolor-eyedropper [iconOnly]="true" [outlined]="true" severity="secondary">
                        <svg data-p-icon="eye-dropper" />
                    </p-inputcolor-eyedropper>
                </div>
            </p-inputcolor>
        </app-docptviewer>
    `
})
export class PTViewer {
    color: string = '#276def';

    docs = [
        {
            data: getPTOptions('InputColor'),
            key: 'InputColor'
        },
        {
            data: getPTOptions('InputColorArea'),
            key: 'InputColorArea'
        },
        {
            data: getPTOptions('InputColorAreaBackground'),
            key: 'InputColorAreaBackground'
        },
        {
            data: getPTOptions('InputColorAreaThumb'),
            key: 'InputColorAreaThumb'
        },
        {
            data: getPTOptions('InputColorSlider'),
            key: 'InputColorSlider'
        },
        {
            data: getPTOptions('InputColorSliderTrack'),
            key: 'InputColorSliderTrack'
        },
        {
            data: getPTOptions('InputColorSliderThumb'),
            key: 'InputColorSliderThumb'
        },
        {
            data: getPTOptions('InputColorSwatch'),
            key: 'InputColorSwatch'
        },
        {
            data: getPTOptions('InputColorSwatchBackground'),
            key: 'InputColorSwatchBackground'
        },
        {
            data: getPTOptions('InputColorTransparencyGrid'),
            key: 'InputColorTransparencyGrid'
        },
        {
            data: getPTOptions('InputColorEyeDropper'),
            key: 'InputColorEyeDropper'
        }
    ];
}
