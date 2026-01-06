# Angular Timeline Component

Timeline visualizes a series of chained events.

## accessibility-doc

Screen Reader Timeline uses a semantic ordered list element to list the events. No specific role is enforced, still you may use any aria role and attributes as any valid attribute is passed to the list element. Keyboard Support Component does not include any interactive elements.

## alignment-doc

Content location relative the line is defined with the align property.

## basic-doc

Timeline receives the events with the value property as a collection of arbitrary objects. In addition, content template is required to display the representation of an event. Example below is a sample events array that is used throughout the documentation.

## horizontal-doc

TimeLine orientation is controlled with the layout property, default is vertical having horizontal as the alternative.

## opposite-doc

Additional content at the other side of the line can be provided with the opposite property.

## template-doc

Sample implementation with custom content and styled markers.

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

