# Angular Speed Dial Component

SpeedDial is a floating button with a popup menu.

## accessibility-doc

Screen Reader SpeedDial component renders a native button element that implicitly includes any passed prop. Text to describe the button can be defined with the aria-labelledby or aria-label props. Addititonally the button includes includes aria-haspopup , aria-expanded for states along with aria-controls to define the relation between the popup and the button. The popup overlay uses menu role on the list and each action item has a menuitem role with an aria-label as the menuitem label. The id of the menu refers to the aria-controls of the button.

## circle-doc

Items can be displayed around the button when type is set to circle . Additional radius property defines the radius of the circle.

## linear-doc

SpeedDial items are defined with the model property based on MenuModel API. Default orientation of the items is linear and direction property is used to define the position of the items related to the button.

## mask-doc

Adding mask property displays a modal layer behind the popup items.

## quartercircle-doc

When type is defined as quarter-circle , items are displayed in a half-circle around the button.

## semicircle-doc

When type is defined as semi-circle , items are displayed in a half-circle around the button.

## template-doc

SpeedDial offers item customization with the item template that receives the menuitem instance from the model as a parameter. The button has its own button template, additional template named icon is provided to embed icon content for default button.

## tooltip-doc

Items display a tooltip on hover when a standalone Tooltip is present with a target that matches the items.

## Speed Dial

When pressed, a floating action button can display multiple primary actions that can be performed on a page.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<SpeedDialPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| id | string | - | List of items id. |
| model | MenuItem[] | null | MenuModel instance to define the action items. |
| visible | boolean | - | Specifies the visibility of the overlay. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| className | string | - | Style class of the element. |
| transitionDelay | number | 30 | Transition delay step for each action item. |
| type | "circle" \| "linear" \| "semi-circle" \| "quarter-circle" | linear | Specifies the opening type of actions. |
| radius | number | 0 | Radius for *circle types. |
| mask | boolean | false | Whether to show a mask element behind the speeddial. |
| disabled | boolean | false | Whether the component is disabled. |
| hideOnClickOutside | boolean | true | Whether the actions close when clicked outside. |
| buttonStyle | { [klass: string]: any } | - | Inline style of the button element. |
| buttonClassName | string | - | Style class of the button element. |
| maskStyle | { [klass: string]: any } | - | Inline style of the mask element. |
| maskClassName | string | - | Style class of the mask element. |
| showIcon | string | - | Show icon of the button element. |
| hideIcon | string | - | Hide icon of the button element. |
| rotateAnimation | boolean | true | Defined to rotate showIcon when hideIcon is not present. |
| ariaLabel | string | - | Defines a string value that labels an interactive element. |
| ariaLabelledBy | string | - | Identifier of the underlying input element. |
| tooltipOptions | TooltipOptions | - | Whether to display the tooltip on items. The modifiers of Tooltip can be used like an object in it. Valid keys are 'event' and 'position'. |
| buttonProps | ButtonProps | - | Used to pass all properties of the ButtonProps to the Button component. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onVisibleChange | value: boolean | Fired when the visibility of element changed. |
| visibleChange | value: boolean | Fired when the visibility of element changed. |
| onClick | event: MouseEvent | Fired when the button element clicked. |
| onShow | event: Event | Fired when the actions are visible. |
| onHide | event: Event | Fired when the actions are hidden. |

### Templates

| Name | Type | Description |
|------|------|-------------|
| button | TemplateRef<SpeedDialButtonTemplateContext> | Custom button template. |
| item | TemplateRef<SpeedDialItemTemplateContext> | Custom item template. |
| icon | TemplateRef<void> | Custom icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| pcButton | ButtonPassThrough | Used to pass attributes to the Button component. |
| list | PassThroughOption<HTMLUListElement, I> | Used to pass attributes to the list's DOM element. |
| item | PassThroughOption<HTMLLIElement, I> | Used to pass attributes to the item's DOM element. |
| pcAction | ButtonPassThrough | Used to pass attributes to the action's Button component. |
| actionIcon | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the action icon's DOM element. |
| mask | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the mask's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-speeddial | Class name of the root element |
| p-speeddial-button | Class name of the button element |
| p-speeddial-list | Class name of the list element |
| p-speeddial-item | Class name of the item element |
| p-speeddial-action | Class name of the action element |
| p-speeddial-action-icon | Class name of the action icon element |
| p-speeddial-mask | Class name of the mask element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| speeddial.gap | --p-speeddial-gap | Gap of root |
| speeddial.transition.duration | --p-speeddial-transition-duration | Transition duration of root |

