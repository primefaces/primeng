# Angular ProgressBar Component

ProgressBar is a process status indicator.

## Accessibility

Screen Reader ProgressBar components uses progressbar role along with aria-valuemin , aria-valuemax and aria-valuenow attributes. Value to describe the component can be defined using aria-labelledby and aria-label props.

## Basic

ProgressBar is used with the value property.

```html
<p-progressbar [value]="50" />
```

## Dynamic

Value is reactive so updating it dynamically changes the bar as well.

```html
<p-progressbar [value]="value" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, NgZone, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'progress-bar-dynamic-demo',
    templateUrl: './progress-bar-dynamic-demo.html',
    standalone: true,
    imports: [ProgressBar, ToastModule],
    providers: [MessageService]
})
export class ProgressBarDynamicDemo implements OnInit {
    value: number = 0;

    interval: any;

    constructor(private messageService: MessageService, private ngZone: NgZone) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.interval = setInterval(() => {
                this.ngZone.run(() => {
                    this.value = this.value + Math.floor(Math.random() * 10) + 1;
                    if (this.value >= 100) {
                        this.value = 100;
                        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Process Completed' });
                        clearInterval(this.interval);
                    }
                });
            }, 2000);
        });
    }

    ngOnDestroy() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}
```
</details>

## Indeterminate

For progresses with no value to track, set the mode property to indeterminate .

```html
<p-progressbar mode="indeterminate" [style]="{ height: '6px' }" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'progress-bar-indeterminate-demo',
    templateUrl: './progress-bar-indeterminate-demo.html',
    standalone: true,
    imports: [ProgressBar],
    providers: [MessageService]
})
export class ProgressBarIndeterminateDemo {}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

content template allows displaying custom content inside the progressbar.

```html
<p-progressbar [value]="50">
    <ng-template #content let-value>
        <span>{{value}}/100</span>
    </ng-template>
</p-progressbar>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { ProgressBar } from 'primeng/progressbar';

@Component({
    selector: 'progress-bar-template-demo',
    templateUrl: './progress-bar-template-demo.html',
    standalone: true,
    imports: [ProgressBar]
})
export class ProgressBarTemplateDemo {}
```
</details>

## Progress Bar

ProgressBar is a process status indicator.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<ProgressBarPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| value | number | - | Current value of the progress. |
| showValue | boolean | true | Whether to display the progress bar value. |
| styleClass | string | - | Style class of the element. **(Deprecated)** |
| valueStyleClass | string | - | Style class of the value element. |
| unit | string | % | Unit sign appended to the value. |
| mode | "indeterminate" \| "determinate" | 'determinate' | Defines the mode of the progress |
| color | string | - | Color for the background of the progress. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<ProgressBarContentTemplateContext> | Template of the content. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| value | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the value's DOM element. |
| label | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the label's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-progressbar | Class name of the root element |
| p-progressbar-value | Class name of the value element |
| p-progressbar-label | Class name of the label element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| progressbar.background | --p-progressbar-background | Background of root |
| progressbar.border.radius | --p-progressbar-border-radius | Border radius of root |
| progressbar.height | --p-progressbar-height | Height of root |
| progressbar.value.background | --p-progressbar-value-background | Background of value |
| progressbar.label.color | --p-progressbar-label-color | Color of label |
| progressbar.label.font.size | --p-progressbar-label-font-size | Font size of label |
| progressbar.label.font.weight | --p-progressbar-label-font-weight | Font weight of label |

