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
    InputColorEyeDropper,
    parseColor,
    ColorInstance
} from 'primeng/inputcolor';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { EyeDropper } from '@primeicons/angular/eye-dropper';

@Component({
    selector: 'controlled-doc',
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
        AppDocSectionText,
        AppCode,
        AppDemoWrapper,
        EyeDropper
    ],
    template: `
        <app-docsectiontext>
            <p>Demonstrates tracking color value changes during interaction and when interaction ends.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="w-80 mx-auto">
                <div class="text-center font-mono text-sm text-surface-500 mb-4">onValueChange: {{ value.toString('hex') }}</div>
                <div class="text-center font-mono text-sm text-surface-500 mb-4">onValueChangeEnd: {{ endValue.toString('hex') }}</div>
                <p-inputcolor [(ngModel)]="value" (onValueChange)="onColorChange($event)" (onValueChangeEnd)="onColorChangeEnd($event)" class="space-y-3">
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
                    <input pInputColorInput [fluid]="true" channel="hex" />
                </p-inputcolor>
            </div>

            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ControlledDoc {
    value: ColorInstance = parseColor('#000000')!;
    endValue: ColorInstance = parseColor('#000000')!;

    onColorChange(event: any) {
        this.value = event.color;
    }

    onColorChangeEnd(event: any) {
        this.endValue = event.color;
    }
}
