# Angular ToggleSwitch Component

ToggleSwitch is used to select a boolean value.

## Accessibility

Screen Reader InputSwitch component uses a hidden native checkbox element with switch role internally that is only visible to screen readers. Value to describe the component can either be provided via label tag combined with inputId prop or using ariaLabelledBy , ariaLabel props.

## Basic

Two-way value binding is defined using ngModel .

```html
<p-toggleswitch [(ngModel)]="checked" />
```

## Disabled

When disabled is present, the element cannot be edited and focused.

```html
<p-toggleswitch [(ngModel)]="checked" [disabled]="true" />
```

## Invalid

The invalid state is applied using the ⁠invalid property to indicate failed validation, which can be integrated with Angular Forms.

```html
<p-toggleswitch [(ngModel)]="checked" [invalid]="!checked" />
```

## Preselection

Enabling ngModel property displays the component as active initially.

```html
<p-toggleswitch [(ngModel)]="checked" />
```

## reactiveformsdoc

ToggleSwitch can also be used with reactive forms. In this case, the formControlName property is used to bind the component to a form control.

```html
<div class="card flex justify-center">
    <form [formGroup]="exampleForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4 w-48">
        <div class="flex flex-col items-center gap-2">
            <p-toggleswitch name="activation" formControlName="activation" [invalid]="isInvalid('activation')" />
            @if (isInvalid('activation')) {
                <p-message severity="error" size="small" variant="simple">Activation is required.</p-message>
            }
        </div>
        <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
    </form>
</div>
```

## Template

The handle template is available to display custom content.

```html
<p-toggleswitch [(ngModel)]="checked">
    <ng-template #handle let-checked="checked">
        <i [ngClass]="['!text-xs', 'pi', checked ? 'pi-check' : 'pi-times']"></i>
    </ng-template>
</p-toggleswitch>
```

## templatedrivenformsdoc

```html
<form #exampleForm="ngForm" (ngSubmit)="onSubmit(exampleForm)" class="flex flex-col gap-4 w-48">
    <div class="flex flex-col items-center gap-2">
        <p-toggleswitch #model="ngModel" [(ngModel)]="checked" name="activation" [invalid]="model.invalid && exampleForm.submitted" required />
        @if (model.invalid && exampleForm.submitted) {
            <p-message severity="error" size="small" variant="simple">Activation is required.</p-message>
        }
    </div>
    <button pButton severity="secondary" type="submit"><span pButtonLabel>Submit</span></button>
</form>
```

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| input | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the input's DOM element. |
| slider | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the slider's DOM element. |
| handle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the handle's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-toggleswitch | Class name of the root element |
| p-toggleswitch-input | Class name of the input element |
| p-toggleswitch-slider | Class name of the slider element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| toggleswitch.width | --p-toggleswitch-width | Width of root |
| toggleswitch.height | --p-toggleswitch-height | Height of root |
| toggleswitch.border.radius | --p-toggleswitch-border-radius | Border radius of root |
| toggleswitch.gap | --p-toggleswitch-gap | Gap of root |
| toggleswitch.shadow | --p-toggleswitch-shadow | Shadow of root |
| toggleswitch.focus.ring.width | --p-toggleswitch-focus-ring-width | Focus ring width of root |
| toggleswitch.focus.ring.style | --p-toggleswitch-focus-ring-style | Focus ring style of root |
| toggleswitch.focus.ring.color | --p-toggleswitch-focus-ring-color | Focus ring color of root |
| toggleswitch.focus.ring.offset | --p-toggleswitch-focus-ring-offset | Focus ring offset of root |
| toggleswitch.focus.ring.shadow | --p-toggleswitch-focus-ring-shadow | Focus ring shadow of root |
| toggleswitch.border.width | --p-toggleswitch-border-width | Border width of root |
| toggleswitch.border.color | --p-toggleswitch-border-color | Border color of root |
| toggleswitch.hover.border.color | --p-toggleswitch-hover-border-color | Hover border color of root |
| toggleswitch.checked.border.color | --p-toggleswitch-checked-border-color | Checked border color of root |
| toggleswitch.checked.hover.border.color | --p-toggleswitch-checked-hover-border-color | Checked hover border color of root |
| toggleswitch.invalid.border.color | --p-toggleswitch-invalid-border-color | Invalid border color of root |
| toggleswitch.transition.duration | --p-toggleswitch-transition-duration | Transition duration of root |
| toggleswitch.slide.duration | --p-toggleswitch-slide-duration | Slide duration of root |
| toggleswitch.background | --p-toggleswitch-background | Background of root |
| toggleswitch.disabled.background | --p-toggleswitch-disabled-background | Disabled background of root |
| toggleswitch.hover.background | --p-toggleswitch-hover-background | Hover background of root |
| toggleswitch.checked.background | --p-toggleswitch-checked-background | Checked background of root |
| toggleswitch.checked.hover.background | --p-toggleswitch-checked-hover-background | Checked hover background of root |
| toggleswitch.handle.border.radius | --p-toggleswitch-handle-border-radius | Border radius of handle |
| toggleswitch.handle.size | --p-toggleswitch-handle-size | Size of handle |
| toggleswitch.handle.background | --p-toggleswitch-handle-background | Background of handle |
| toggleswitch.handle.disabled.background | --p-toggleswitch-handle-disabled-background | Disabled background of handle |
| toggleswitch.handle.hover.background | --p-toggleswitch-handle-hover-background | Hover background of handle |
| toggleswitch.handle.checked.background | --p-toggleswitch-handle-checked-background | Checked background of handle |
| toggleswitch.handle.checked.hover.background | --p-toggleswitch-handle-checked-hover-background | Checked hover background of handle |
| toggleswitch.handle.color | --p-toggleswitch-handle-color | Color of handle |
| toggleswitch.handle.hover.color | --p-toggleswitch-handle-hover-color | Hover color of handle |
| toggleswitch.handle.checked.color | --p-toggleswitch-handle-checked-color | Checked color of handle |
| toggleswitch.handle.checked.hover.color | --p-toggleswitch-handle-checked-hover-color | Checked hover color of handle |

