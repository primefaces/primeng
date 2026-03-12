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
            <div class="max-w-xs mx-auto space-y-3">
                <div class="text-center font-mono text-sm text-surface-500 mb-4">ngModelChange: {{ currentValue }}</div>
                <div class="text-center font-mono text-sm text-surface-500 mb-4">onValueChangeEnd: {{ endValue }}</div>
                <p-inputcolor [(ngModel)]="color" (ngModelChange)="onColorChange($event)" (onValueChangeEnd)="onColorChangeEnd($event)" class="space-y-3">
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
                    <p-inputcolor-input [fluid]="true" channel="hex" />
                </p-inputcolor>
            </div>

            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class ControlledDoc {
    color: string = '#000000';
    currentValue: string = '#000000';
    endValue: string = '#000000';

    onColorChange(value: string) {
        this.currentValue = value;
    }

    onColorChangeEnd(event: any) {
        this.endValue = event.color?.toString('hex') ?? this.currentValue;
    }
}
