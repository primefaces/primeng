import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
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
    InputColorInput
} from 'primeng/inputcolor';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { AppCode } from '@/components/doc/app.code';
import { AppDemoWrapper } from '@/components/doc/app.demowrapper';
import { AppDocSectionText } from '@/components/doc/app.docsectiontext';

@Component({
    selector: 'templatedrivenforms-doc',
    standalone: true,
    imports: [
        CommonModule,
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
        ButtonModule,
        MessageModule,
        ToastModule,
        AppCode,
        AppDemoWrapper,
        AppDocSectionText
    ],
    template: `
        <app-docsectiontext> </app-docsectiontext>
        <p-toast />
        <app-demo-wrapper>
            <div class="flex justify-center">
                <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
                    <div class="flex flex-col items-center gap-2">
                        <p-inputcolor name="color" [(ngModel)]="color" #colorModel="ngModel" required defaultValue="#276def" class="w-80 space-y-3">
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
                                </div>
                                <p-inputcolor-swatch class="shrink-0">
                                    <p-inputcolor-transparency-grid />
                                    <p-inputcolor-swatch-background />
                                </p-inputcolor-swatch>
                            </div>
                        </p-inputcolor>
                        @if (colorModel.invalid && (colorModel.touched || exampleForm.submitted)) {
                            <p-message severity="error" size="small" variant="simple">Color is required.</p-message>
                        }
                    </div>
                    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
                </form>
            </div>
            <app-code></app-code>
        </app-demo-wrapper>
    `
})
export class TemplateDrivenFormsDoc {
    messageService = inject(MessageService);

    color: string | undefined;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            form.resetForm();
        }
    }
}
