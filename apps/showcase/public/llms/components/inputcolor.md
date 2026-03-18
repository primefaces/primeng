# Angular InputColor Component

InputColor is a composable color picker component.

## Accessibility

InputColorArea Screen Reader Support aria-label is used to describe the component. aria-roledescription is used to describe the role of the component. aria-valuemin , aria-valuemax , aria-valuenow , aria-valuetext are used to describe the value of the component. Keyboard Support Key Function tab Moves focus to the area thumb. right arrow Moves the area thumb to the right. left arrow Moves the area thumb to the left. up arrow Moves the area thumb to the up. down arrow Moves the area thumb to the down. InputColorSlider Screen Reader Support aria-label is used to describe the component. aria-valuemin , aria-valuemax , aria-valuenow , aria-valuetext are used to describe the value of the component. Keyboard Support Key Function tab Moves focus to the slider thumb. up arrow || left arrow Decrements the slider thumb. down arrow || right arrow Increments the slider thumb.

## Advanced

Advanced color picker with per-format channel sliders, input groups for RGBA, HSBA, HSLA, OKLCH channels, and a CSS output.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
    template: `
        <div class="max-w-xs mx-auto space-y-3">
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
    `,
    standalone: true,
    imports: [SelectModule, FloatLabelModule, InputGroupModule, FormsModule]
})
export class InputColorAdvancedDemo {
    color: string = '';
    format: string = 'hsla';
    formatOptions: any[] = [
        { label: 'RGBA', value: 'rgba' },
        { label: 'HSBA', value: 'hsba' },
        { label: 'HSLA', value: 'hsla' },
        { label: 'OKLCHA', value: 'oklcha' }
    ];
}
```

## Basic

InputColor is a composable color picker with area, slider, swatch, and input sub-components.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputGroupModule } from 'primeng/inputgroup';

@Component({
    template: `
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
                <p-inputcolor-swatch class="shrink-0">
                    <p-inputcolor-transparency-grid />
                    <p-inputcolor-swatch-background />
                </p-inputcolor-swatch>
                <p-inputcolor-eyedropper [iconOnly]="true" [outlined]="true" severity="secondary">
                    <svg data-p-icon="eye-dropper" />
                </p-inputcolor-eyedropper>
            </div>
            <div class="flex items-center gap-2">
                <p-select [(ngModel)]="format" [options]="formatOptions" optionLabel="label" optionValue="value" class="w-full md:w-26" />
                <div class="flex-1">
                    @if (format === 'hex') {
                        <input pInputColorInput [fluid]="true" channel="hex" />
                    }
                    @if (format === 'rgba') {
                        <p-inputgroup>
                            <input pInputColorInput [fluid]="true" channel="red" />
                            <input pInputColorInput [fluid]="true" channel="green" />
                            <input pInputColorInput [fluid]="true" channel="blue" />
                            <input pInputColorInput [fluid]="true" channel="alpha" />
                        </p-inputgroup>
                    }
                    @if (format === 'hsba') {
                        <p-inputgroup>
                            <input pInputColorInput [fluid]="true" channel="hue" />
                            <input pInputColorInput [fluid]="true" channel="saturation" />
                            <input pInputColorInput [fluid]="true" channel="brightness" />
                            <input pInputColorInput [fluid]="true" channel="alpha" />
                        </p-inputgroup>
                    }
                    @if (format === 'hsla') {
                        <p-inputgroup>
                            <input pInputColorInput [fluid]="true" channel="hue" />
                            <input pInputColorInput [fluid]="true" channel="saturation" />
                            <input pInputColorInput [fluid]="true" channel="lightness" />
                            <input pInputColorInput [fluid]="true" channel="alpha" />
                        </p-inputgroup>
                    }
                    @if (format === 'oklcha') {
                        <input pInputColorInput [fluid]="true" channel="css" />
                    }
                </div>
            </div>
        </p-inputcolor>
    `,
    standalone: true,
    imports: [SelectModule, InputGroupModule, FormsModule]
})
export class InputColorBasicDemo {
    color: string = '#276def';
    format: string = 'hex';
    formatOptions: any[] = [
        { label: 'HEX', value: 'hex' },
        { label: 'RGBA', value: 'rgba' },
        { label: 'HSBA', value: 'hsba' },
        { label: 'HSLA', value: 'hsla' },
        { label: 'OKLCHA', value: 'oklcha' }
    ];
}
```

## Color Manager

The colorManager module provides utilities for programmatic color manipulation. It exports the Color class and helper functions for working with colors outside of the InputColor component. The Color class is the base class for all color classes. It provides the basic functionality for all color classes. clone() : Clones the color. toString(format) : Converts the color to a string. toFormat(format) : Converts the color to a specific format. toJSON() : Converts the color to a JSON object. getChannelRange(channel) : Returns the range of the channel. getFormat() : Returns the format of the color. getChannels() : Returns the channels of the color. getChannelValue(channel) : Returns the value of the channel. getSpaceAxes(xyChannels) : Returns the axes of the color. incChannelValue(channel, step) : Increments the value of the channel by the step. decChannelValue(channel, step) : Decrements the value of the channel by the step. setChannelValue(channel, value) : Returns a new color with the value of the channel changed.

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="doc-section-description font-bold mb-4">Color class</div>
    `,
    standalone: true,
    imports: []
})
export class InputColorColorManagerDemo {}
```

## Controlled

Demonstrates tracking color value changes during interaction and when interaction ends.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <div class="max-w-xs mx-auto space-y-3">
            <div class="text-center font-mono text-sm text-surface-500">onValueChange: {{ value.toString('hex') }}</div>
            <div class="text-center font-mono text-sm text-surface-500">onValueChangeEnd: {{ endValue.toString('hex') }}</div>
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
    `,
    standalone: true,
    imports: [FormsModule]
})
export class InputColorControlledDemo {
    value: ColorInstance = parseColor('#000000')!;
    endValue: ColorInstance = parseColor('#000000')!;

    onColorChange(event: any) {
        this.value = event.color;
    }

    onColorChangeEnd(event: any) {
        this.endValue = event.color;
    }
}
```

## With Popover

InputColor can be used inside a Popover, with a color swatch as the trigger.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Popover, PopoverModule } from 'primeng/popover';

@Component({
    template: `
        <div class="flex items-center justify-center">
            <p-inputcolor [(ngModel)]="color">
                <p-inputcolor-swatch (click)="op.toggle($event)" style="cursor: pointer">
                    <p-inputcolor-transparency-grid />
                    <p-inputcolor-swatch-background />
                </p-inputcolor-swatch>
                <p-popover #op>
                    <div class="w-72 p-3 space-y-3">
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
    `,
    standalone: true,
    imports: [PopoverModule, FormsModule]
})
export class InputColorPopoverDemo {
    color: string = '#0099ff';
}
```

## reactiveforms-doc

InputColor can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```typescript
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center">
            <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
                <div class="flex flex-col items-center gap-2">
                    <p-inputcolor formControlName="color" class="w-80 space-y-3">
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
                        <input pInputColorInput [fluid]="true" channel="hex" />
                    </p-inputcolor>
                    @if (isInvalid('color')) {
                        <p-message severity="error" size="small" variant="simple">Color is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ButtonModule, ReactiveFormsModule]
})
export class InputColorReactiveFormsDemo {
    messageService = inject(MessageService);
    exampleForm: FormGroup;
    formSubmitted: boolean = false;

    constructor() {
        this.exampleForm = this.fb.group({
                    color: ['', Validators.required]
                });
    }

    onSubmit() {
        this.formSubmitted = true;
        if (this.exampleForm.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            this.exampleForm.reset();
            this.formSubmitted = false;
        }
    }

    isInvalid(controlName: string) {
        const control = this.exampleForm.get(controlName);
        return control?.invalid && this.formSubmitted;
    }
}
```

## templatedrivenforms-doc

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
    template: `
        <div class="flex justify-center">
            <form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4">
                <div class="flex flex-col items-center gap-2">
                    <p-inputcolor name="color" [(ngModel)]="color" #colorModel="ngModel" required class="w-80 space-y-3">
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
                        <input pInputColorInput [fluid]="true" channel="hex" />
                    </p-inputcolor>
                    @if (colorModel.invalid && (colorModel.touched || exampleForm.submitted)) {
                        <p-message severity="error" size="small" variant="simple">Color is required.</p-message>
                    }
                </div>
                <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
            </form>
        </div>
    `,
    standalone: true,
    imports: [MessageModule, ButtonModule, FormsModule]
})
export class InputColorTemplateDrivenFormsDemo {
    messageService = inject(MessageService);
    color: string | undefined;

    onSubmit(form: any) {
        if (form.valid) {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form is submitted', life: 3000 });
            form.resetForm();
        }
    }
}
```

## verticalslider-doc

Sliders support vertical orientation, displayed alongside the color area.

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    template: `
        <div class="flex items-center justify-center">
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
    `,
    standalone: true,
    imports: [FormsModule]
})
export class InputColorVerticalSliderDemo {
    color: string = '';
}
```

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-inputcolor | Class name of the root element |
| p-inputcolor-area | Class name of the area element |
| p-inputcolor-area-background | Class name of the area background element |
| p-inputcolor-area-thumb | Class name of the area thumb element |
| p-inputcolor-slider | Class name of the slider element |
| p-inputcolor-slider-track | Class name of the slider track element |
| p-inputcolor-slider-thumb | Class name of the slider thumb element |
| p-inputcolor-swatch | Class name of the swatch element |
| p-inputcolor-swatch-background | Class name of the swatch background element |
| p-inputcolor-transparency-grid | Class name of the transparency grid element |
| p-inputcolor-input | Class name of the input element |
| p-inputcolor-eyedropper | Class name of the eye dropper element |

