# Angular Timeline Component

Timeline visualizes a series of chained events.

## Accessibility

Screen Reader Timeline uses a semantic ordered list element to list the events. No specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the list element. Keyboard Support Component does not include any interactive elements.

## Alignment

Content location relative the line is defined with the align property.

```html
<p-timeline [value]="events" class="w-full md:w-80">
    <ng-template #content let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" class="w-full md:w-80" align="right">
    <ng-template #content let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" class="w-full md:w-80" align="alternate">
    <ng-template #content let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'timeline-alignment-demo',
    templateUrl: './timeline-alignment-demo.html',
    standalone: true,
    imports: [Timeline]
})
export class TimelineAlignmentDemo {
    events: EventItem[];

    constructor() {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }
}
```
</details>

## Basic

Timeline receives the events with the value property as a collection of arbitrary objects. In addition, content template is required to display the representation of an event. Example below is a sample events array that is used throughout the documentation.

```html
<p-timeline [value]="events">
    <ng-template #content let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>
```

## Horizontal

TimeLine orientation is controlled with the layout property, default is vertical having horizontal as the alternative.

```html
<p-timeline [value]="events" layout="horizontal" align="top">
    <ng-template #content let-event>
        {{ event }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" layout="horizontal" align="bottom">
    <ng-template #content let-event>
        {{ event }}
    </ng-template>
</p-timeline>

<p-timeline [value]="events" layout="horizontal" align="alternate">
    <ng-template #content let-event>
        {{ event }}
    </ng-template>
    <ng-template #opposite let-event>
        <span>&nbsp;</span>
    </ng-template>
</p-timeline>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';

@Component({
    selector: 'timeline-horizontal-demo',
    templateUrl: './timeline-horizontal-demo.html',
    standalone: true,
    imports: [Timeline]
})
export class TimelineHorizontalDemo {
    events: string[];

    constructor() {
        this.events = [
            "2020", "2021", "2022", "2023"
        ];
    }
}
```
</details>

## Opposite

Additional content at the other side of the line can be provided with the opposite property.

```html
<p-timeline [value]="events">
    <ng-template #opposite let-event>
        <small class="text-surface-500 dark:text-surface-400">{{ event.date }}</small>
    </ng-template>
    <ng-template #content let-event>
        {{ event.status }}
    </ng-template>
</p-timeline>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'timeline-opposite-demo',
    templateUrl: './timeline-opposite-demo.html',
    standalone: true,
    imports: [Timeline]
})
export class TimelineOppositeDemo {
    events: EventItem[];

    constructor() {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Template

Sample implementation with custom content and styled markers.

```html
<p-timeline [value]="events" align="alternate" class="customized-timeline">
    <ng-template #marker let-event>
        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" [style]="{ 'background-color': event.color }">
            <i [class]="event.icon"></i>
        </span>
    </ng-template>
    <ng-template #content let-event>
        <p-card [header]="event.status" [subheader]="event.date">
            <img *ngIf="event.image" [src]="'https://primefaces.org/cdn/primeng/images/demo/product/' + event.image" [alt]="event.name" width="200" class="shadow" />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate
                neque quas!
            </p>
            <p-button label="Read more" [text]="true" />
        </p-card>
    </ng-template>
</p-timeline>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { Timeline } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

interface EventItem {
    status?: string;
    date?: string;
    icon?: string;
    color?: string;
    image?: string;
}

@Component({
    selector: 'timeline-template-demo',
    templateUrl: './timeline-template-demo.html',
    standalone: true,
    imports: [Timeline, CardModule, ButtonModule]
})
export class TimelineTemplateDemo {
    events: EventItem[];

    constructor() {
        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];
    }
}
```
</details>

## Timeline

Timeline visualizes a series of chained events.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<TimelinePassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| value | any[] | - | An array of events to display. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |
| align | string | left | Position of the timeline bar relative to the content. Valid values are "left", "right" for vertical layout and "top", "bottom" for horizontal layout. |
| layout | "vertical" \| "horizontal" | vertical | Orientation of the timeline. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| content | TemplateRef<TimelineItemTemplateContext<any>> | Custom content template. |
| opposite | TemplateRef<TimelineItemTemplateContext<any>> | Custom opposite item template. |
| marker | TemplateRef<TimelineItemTemplateContext<any>> | Custom marker template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| event | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the event's DOM element. |
| eventOpposite | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the event opposite's DOM element. |
| eventSeparator | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the event separator's DOM element. |
| eventMarker | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the event marker's DOM element. |
| eventConnector | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the event connector's DOM element. |
| eventContent | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the event content's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-timeline | Class name of the root element |
| p-timeline-event | Class name of the event element |
| p-timeline-event-opposite | Class name of the event opposite element |
| p-timeline-event-separator | Class name of the event separator element |
| p-timeline-event-marker | Class name of the event marker element |
| p-timeline-event-connector | Class name of the event connector element |
| p-timeline-event-content | Class name of the event content element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| timeline.event.min.height | --p-timeline-event-min-height | Min height of event |
| timeline.horizontal.event.content.padding | --p-timeline-horizontal-event-content-padding | Event content padding of horizontal |
| timeline.vertical.event.content.padding | --p-timeline-vertical-event-content-padding | Event content padding of vertical |
| timeline.event.marker.size | --p-timeline-event-marker-size | Size of event marker |
| timeline.event.marker.border.radius | --p-timeline-event-marker-border-radius | Border radius of event marker |
| timeline.event.marker.border.width | --p-timeline-event-marker-border-width | Border width of event marker |
| timeline.event.marker.background | --p-timeline-event-marker-background | Background of event marker |
| timeline.event.marker.border.color | --p-timeline-event-marker-border-color | Border color of event marker |
| timeline.event.marker.content.border.radius | --p-timeline-event-marker-content-border-radius | Content border radius of event marker |
| timeline.event.marker.content.size | --p-timeline-event-marker-content-size | Content size of event marker |
| timeline.event.marker.content.background | --p-timeline-event-marker-content-background | Content background of event marker |
| timeline.event.marker.content.inset.shadow | --p-timeline-event-marker-content-inset-shadow | Content inset shadow of event marker |
| timeline.event.connector.color | --p-timeline-event-connector-color | Color of event connector |
| timeline.event.connector.size | --p-timeline-event-connector-size | Size of event connector |

