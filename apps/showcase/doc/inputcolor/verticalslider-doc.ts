import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputColor, InputColorArea, InputColorAreaBackground, InputColorAreaThumb, InputColorSlider, InputColorSliderThumb, InputColorSliderTrack, InputColorTransparencyGrid } from 'primeng/inputcolor';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';

@Component({
    selector: 'vertical-slider-doc',
    standalone: true,
    imports: [FormsModule, InputColor, InputColorArea, InputColorAreaBackground, InputColorAreaThumb, InputColorSlider, InputColorSliderThumb, InputColorSliderTrack, InputColorTransparencyGrid, AppDocSectionText, AppCode, AppDemoWrapper],
    template: `
        <app-docsectiontext>
            <p>Sliders support vertical orientation, displayed alongside the color area.</p>
        </app-docsectiontext>
        <app-demo-wrapper>
            <div class="flex justify-center">
                <p-inputcolor [(ngModel)]="color" format="hsba" class="w-full max-w-md">
                    <div class="flex gap-4 w-full">
                        <p-inputcolor-area class="flex-1">
                            <p-inputcolor-area-background />
                            <p-inputcolor-area-thumb />
                        </p-inputcolor-area>
                        <p-inputcolor-slider orientation="vertical">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="saturation" orientation="vertical">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="brightness" orientation="vertical">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                        <p-inputcolor-slider channel="alpha" orientation="vertical">
                            <p-inputcolor-transparency-grid />
                            <p-inputcolor-slider-track />
                            <p-inputcolor-slider-thumb />
                        </p-inputcolor-slider>
                    </div>
                </p-inputcolor>
            </div>

            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class VerticalSliderDoc {
    color: string = '';
}
