# Angular Steps Component

Steps also known as Stepper, is an indicator for the steps in a workflow. Layout of steps component is optimized for responsive design.

## accessibility-doc

Screen Reader Steps component uses the nav element and since any attribute is passed to the root implicitly aria-labelledby or aria-label can be used to describe the component. Inside an ordered list is used where the current step item defines aria-current as "step". Keyboard Support Key Function tab Adds focus to the active step when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence. enter Activates the focused step if readonly is not enabled. space Activates the focused step if readonly is not enabled. right arrow Moves focus to the next step if readonly is not enabled. left arrow Moves focus to the previous step if readonly is not enabled. home Moves focus to the first step if readonly is not enabled. end Moves focus to the last step if readonly is not enabled.

## basic-doc

Steps requires a collection of menuitems as its model .

## controlled-doc

Steps can be controlled programmatically using activeIndex property.

## interactive-doc

In order to add interactivity to the component, disable readonly and use a binding to activeIndex along with activeIndexChange to control the Steps.

## routing-doc

Example below uses nested routes with Steps.

## Theming

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| steps.transition.duration | --p-steps-transition-duration | Transition duration of root |
| steps.separator.background | --p-steps-separator-background | Background of separator |
| steps.item.link.border.radius | --p-steps-item-link-border-radius | Border radius of item link |
| steps.item.link.focus.ring.width | --p-steps-item-link-focus-ring-width | Focus ring width of item link |
| steps.item.link.focus.ring.style | --p-steps-item-link-focus-ring-style | Focus ring style of item link |
| steps.item.link.focus.ring.color | --p-steps-item-link-focus-ring-color | Focus ring color of item link |
| steps.item.link.focus.ring.offset | --p-steps-item-link-focus-ring-offset | Focus ring offset of item link |
| steps.item.link.focus.ring.shadow | --p-steps-item-link-focus-ring-shadow | Focus ring shadow of item link |
| steps.item.link.gap | --p-steps-item-link-gap | Gap of item link |
| steps.item.label.color | --p-steps-item-label-color | Color of item label |
| steps.item.label.active.color | --p-steps-item-label-active-color | Active color of item label |
| steps.item.label.font.weight | --p-steps-item-label-font-weight | Font weight of item label |
| steps.item.number.background | --p-steps-item-number-background | Background of item number |
| steps.item.number.active.background | --p-steps-item-number-active-background | Active background of item number |
| steps.item.number.border.color | --p-steps-item-number-border-color | Border color of item number |
| steps.item.number.active.border.color | --p-steps-item-number-active-border-color | Active border color of item number |
| steps.item.number.color | --p-steps-item-number-color | Color of item number |
| steps.item.number.active.color | --p-steps-item-number-active-color | Active color of item number |
| steps.item.number.size | --p-steps-item-number-size | Size of item number |
| steps.item.number.font.size | --p-steps-item-number-font-size | Font size of item number |
| steps.item.number.font.weight | --p-steps-item-number-font-weight | Font weight of item number |
| steps.item.number.border.radius | --p-steps-item-number-border-radius | Border radius of item number |
| steps.item.number.shadow | --p-steps-item-number-shadow | Shadow of item number |

