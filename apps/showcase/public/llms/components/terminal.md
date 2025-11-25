# Angular Terminal Component



## Accessibility

Screen Reader Terminal component has an input element that can be described with aria-label or aria-labelledby props. The element that lists the previous commands has aria-live so that changes are received by the screen reader. Keyboard Support Key Function tab Moves focus through the input element. enter Executes the command when focus in on the input element.

## Basic

Commands are processed using observables via the TerminalService . Import this service into your component and subscribe to commandHandler to process commands by sending replies with sendResponse function.

```html
<p>Enter "<strong>date</strong>" to display the current date,
"<strong>greet &#123;0&#125;</strong>" for a message and "<strong>random</strong>"
to get a random number.</p>
<p-terminal welcomeMessage="Welcome to PrimeNG" prompt="primeng $" />
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Terminal

Terminal is a text based user interface.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| pt | InputSignal<TerminalPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| welcomeMessage | string | - | Initial text to display on terminal. |
| prompt | string | - | Prompt text for each command. |
| styleClass | string | - | Style class of the component. **(Deprecated)** |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| host | PassThroughOption<HTMLElement, I> | Used to pass attributes to the host's DOM element. |
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| welcomeMessage | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the welcome message's DOM element. |
| commandList | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the command list's DOM element. |
| command | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the command's DOM element. |
| promptLabel | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the prompt label's DOM element. |
| commandValue | PassThroughOption<HTMLSpanElement, I> | Used to pass attributes to the command value's DOM element. |
| commandResponse | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the command response's DOM element. |
| prompt | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the prompt's DOM element. |
| promptValue | PassThroughOption<HTMLInputElement, I> | Used to pass attributes to the prompt value's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-terminal | Class name of the root element |
| p-terminal-welcome-message | Class name of the welcome message element |
| p-terminal-command-list | Class name of the command list element |
| p-terminal-command | Class name of the command element |
| p-terminal-command-value | Class name of the command value element |
| p-terminal-command-response | Class name of the command response element |
| p-terminal-prompt | Class name of the prompt element |
| p-terminal-prompt-label | Class name of the prompt label element |
| p-terminal-prompt-value | Class name of the prompt value element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| terminal.background | --p-terminal-background | Background of root |
| terminal.border.color | --p-terminal-border-color | Border color of root |
| terminal.color | --p-terminal-color | Color of root |
| terminal.height | --p-terminal-height | Height of root |
| terminal.padding | --p-terminal-padding | Padding of root |
| terminal.border.radius | --p-terminal-border-radius | Border radius of root |
| terminal.prompt.gap | --p-terminal-prompt-gap | Gap of prompt |
| terminal.command.response.margin | --p-terminal-command-response-margin | Margin of command response |

