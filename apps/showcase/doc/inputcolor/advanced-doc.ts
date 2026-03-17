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
    InputColorInput,
    InputColorEyeDropper
} from 'primeng/inputcolor';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { FloatLabel } from 'primeng/floatlabel';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { EyeDropper } from '@primeicons/angular/eye-dropper';

@Component({
    selector: 'advanced-doc',
    standalone: true,
    imports: [
        FormsModule,
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
        InputColorInput,
        InputColorEyeDropper,
        SelectModule,
        InputGroupModule,
        InputGroupAddon,
        FloatLabel,
        AppDocSectionText,
        AppCode,
        AppDemoWrapper,
        EyeDropper
    ],
    template: `
        <app-docsectiontext>
            <p>Advanced color picker with per-format channel sliders, input groups for RGBA, HSBA, HSLA, OKLCH channels, and a CSS output.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="w-80 mx-auto space-y-3">
                <p-select [(ngModel)]="format" [options]="formatOptions" optionLabel="label" optionValue="value" [fluid]="true" />
                <p-inputcolor [(ngModel)]="color" [format]="activeFormat" class="space-y-3">
                    <p-inputcolor-area>
                        <p-inputcolor-area-background />
                        <p-inputcolor-area-thumb />
                    </p-inputcolor-area>
                    <p-inputcolor-slider>
                        <p-inputcolor-transparency-grid />
                        <p-inputcolor-slider-track />
                        <p-inputcolor-slider-thumb />
                    </p-inputcolor-slider>
                    @if (format === 'rgba') {
                        <p-inputcolor-slider channel="red">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="green">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="blue">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                    }
                    @if (format === 'hsba') {
                        <p-inputcolor-slider channel="saturation">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="brightness">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                    }
                    @if (format === 'hsla') {
                        <p-inputcolor-slider channel="saturation">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="lightness">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                    }
                    <p-inputcolor-slider channel="alpha">
                        <p-inputcolor-transparency-grid />
                        <p-inputcolor-slider-track />
                        <p-inputcolor-slider-thumb />
                    </p-inputcolor-slider>
                    <div class="flex gap-2">
                        <p-inputcolor-swatch class="shrink-0">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-swatch-background />
                        </p-inputcolor-swatch>
                        <p-inputcolor-eyedropper [iconOnly]="true" [outlined]="true" severity="secondary">
                            <svg data-p-icon="eye-dropper" />
                        </p-inputcolor-eyedropper>
                        <input pInputColorInput [fluid]="true" channel="hex" />
                    </div>
                    <p-inputgroup>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="red" type="text" pSize="small" />
                            <label>Red</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="green" type="text" pSize="small" />
                            <label>Green</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="blue" type="text" pSize="small" />
                            <label>Blue</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="alpha" type="text" pSize="small" />
                            <label>Alpha</label>
                        </p-floatlabel>
                    </p-inputgroup>
                    <p-inputgroup>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="hue" type="text" pSize="small" />
                            <label>Hue</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="saturation" type="text" pSize="small" />
                            <label>Saturation</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="brightness" type="text" pSize="small" />
                            <label>Brightness</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="alpha" type="text" pSize="small" />
                            <label>Alpha</label>
                        </p-floatlabel>
                    </p-inputgroup>
                    <p-inputgroup>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="hue" type="text" pSize="small" />
                            <label>Hue</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="saturation" type="text" pSize="small" />
                            <label>Saturation</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="lightness" type="text" pSize="small" />
                            <label>Lightness</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="alpha" type="text" pSize="small" />
                            <label>Alpha</label>
                        </p-floatlabel>
                    </p-inputgroup>
                    <p-inputgroup>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="L" type="text" pSize="small" />
                            <label>Lightness</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="C" type="text" pSize="small" />
                            <label>Chroma</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="H" type="text" pSize="small" />
                            <label>Hue</label>
                        </p-floatlabel>
                        <p-floatlabel variant="in">
                            <input pInputColorInput channel="alpha" type="text" pSize="small" />
                            <label>Alpha</label>
                        </p-floatlabel>
                    </p-inputgroup>
                    <p-inputgroup>
                        <p-inputgroup-addon>CSS</p-inputgroup-addon>
                        <input pInputColorInput channel="css" type="text" [fluid]="true" />
                    </p-inputgroup>
                </p-inputcolor>
            </div>

            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class AdvancedDoc {
    color: string = '';
    format: string = 'hsla';
    formatOptions = [
        { label: 'RGBA', value: 'rgba' },
        { label: 'HSBA', value: 'hsba' },
        { label: 'HSLA', value: 'hsla' },
        { label: 'OKLCHA', value: 'oklcha' }
    ];

    get activeFormat(): string {
        return this.format === 'oklcha' ? 'oklch' : this.format;
    }
}
