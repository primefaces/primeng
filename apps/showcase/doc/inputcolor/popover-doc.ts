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
import { Popover } from 'primeng/popover';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { EyeDropper } from '@primeicons/angular/eye-dropper';

@Component({
    selector: 'popover-doc',
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
        Popover,
        AppDocSectionText,
        AppCode,
        AppDemoWrapper,
        EyeDropper
    ],
    template: `
        <app-docsectiontext>
            <p>InputColor can be used inside a Popover, with a color swatch as the trigger.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex items-center justify-center">
                <p-inputcolor [(ngModel)]="color" defaultValue="#0099ff">
                    <p-inputcolor-swatch (click)="op.toggle($event)" style="cursor: pointer">
                        <p-inputcolor-transparency-grid />
                        <p-inputcolor-swatch-background />
                    </p-inputcolor-swatch>
                    <p-popover #op>
                        <div class="w-72 space-y-3">
                            <p-inputcolor-area>
                                <p-inputcolor-area-background />
                                <p-inputcolor-area-thumb />
                            </p-inputcolor-area>
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
                            <div class="flex items-center gap-2">
                                <input pInputColorInput channel="hex" class="flex-1" />
                                <p-inputcolor-eyedropper [iconOnly]="true" [outlined]="true" severity="secondary">
                                    <svg data-p-icon="eye-dropper" />
                                </p-inputcolor-eyedropper>
                            </div>
                        </div>
                    </p-popover>
                </p-inputcolor>
            </div>

            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class PopoverDoc {
    color: string = '';
}
