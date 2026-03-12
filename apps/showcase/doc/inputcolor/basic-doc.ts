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
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { EyeDropper } from '@primeicons/angular/eye-dropper';

@Component({
    selector: 'basic-doc',
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
        AppDocSectionText,
        AppCode,
        AppDemoWrapper,
        EyeDropper
    ],
    template: `
        <app-docsectiontext>
            <p>InputColor is a composable color picker with area, slider, swatch, and input sub-components.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <p-inputcolor [(ngModel)]="color" [format]="activeFormat" class="max-w-xs mx-auto space-y-3">
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
                    <p-inputcolor-swatch>
                        <p-inputcolor-transparency-grid />
                        <p-inputcolor-swatch-background />
                    </p-inputcolor-swatch>
                    <p-inputcolor-eyedropper [iconOnly]="true" [outlined]="true" severity="secondary">
                        <svg data-p-icon="eye-dropper" />
                    </p-inputcolor-eyedropper>
                </div>
                <div class="flex items-center gap-2">
                    <p-select [(ngModel)]="format" [options]="formatOptions" optionLabel="label" optionValue="value" class="w-26 shrink-0" />
                    <div class="flex-1">
                        @if (format === 'hex') {
                            <p-inputcolor-input [fluid]="true" channel="hex" />
                        }
                        @if (format === 'rgba') {
                            <p-inputgroup>
                                <p-inputcolor-input [fluid]="true" channel="red" />
                                <p-inputcolor-input [fluid]="true" channel="green" />
                                <p-inputcolor-input [fluid]="true" channel="blue" />
                                <p-inputcolor-input [fluid]="true" channel="alpha" />
                            </p-inputgroup>
                        }
                        @if (format === 'hsba') {
                            <p-inputgroup>
                                <p-inputcolor-input [fluid]="true" channel="hue" />
                                <p-inputcolor-input [fluid]="true" channel="saturation" />
                                <p-inputcolor-input [fluid]="true" channel="brightness" />
                                <p-inputcolor-input [fluid]="true" channel="alpha" />
                            </p-inputgroup>
                        }
                        @if (format === 'hsla') {
                            <p-inputgroup>
                                <p-inputcolor-input [fluid]="true" channel="hue" />
                                <p-inputcolor-input [fluid]="true" channel="saturation" />
                                <p-inputcolor-input [fluid]="true" channel="lightness" />
                                <p-inputcolor-input [fluid]="true" channel="alpha" />
                            </p-inputgroup>
                        }
                        @if (format === 'oklcha') {
                            <p-inputcolor-input [fluid]="true" channel="css" />
                        }
                    </div>
                </div>
            </p-inputcolor>

            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class BasicDoc {
    color: string = 'rgba(39, 109, 239, 1)';
    format: string = 'hex';
    formatOptions = [
        { label: 'HEX', value: 'hex' },
        { label: 'RGBA', value: 'rgba' },
        { label: 'HSBA', value: 'hsba' },
        { label: 'HSLA', value: 'hsla' },
        { label: 'OKLCHA', value: 'oklcha' }
    ];

    get activeFormat(): string {
        return this.format === 'hex' ? 'rgba' : this.format === 'oklcha' ? 'oklch' : this.format;
    }
}
