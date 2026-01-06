# Pass Through

Pass Through Props allow direct access to the underlying elements for complete customization.

## Basic

Each component has a special pt property to define an object with keys corresponding to the available DOM elements. Each value can either be a string, an object or a function that returns a string or an object to define the arbitrary properties to apply to the element such as styling, aria, data-* or custom attributes. If the value is a string or a function that returns a string, it is considered as a class definition and added to the class attribute of the element. Every component documentation has a dedicated section to document the available section names exposed via PT.

## Global

PassThrough object can also be defined at a global level to apply all components in an application using the providePrimeNG provider. For example, with the configuration here all panel headers have the bg-primary style class and all autocomplete components have a fixed width. These settings can be overridden by a particular component as components pt property has higher precedence over global pt by default.

## Instance

In cases where you need to access the UI Component instance, define a component passthrough type that exposes the component instance or a function that receives a PassThroughContext as parameter.

## Introduction

In traditional 3rd party UI libraries, users are limited to the API provided by component author. This API commonly consists of inputs, outputs, and content projection. Whenever a requirement emerges for a new customization option in the API, the component author needs to develop and publish it with a new release. Vision of PrimeTek is "Your Components, Not Ours" . The pass through feature is a key element to implement this vision by exposing the component internals in order to apply arbitrary attributes and listeners to the DOM elements. The primary advantage of this approach is that it frees you from being restricted by the main component API. We recommend considering the pass-through feature whenever you need to tailor a component that lacks a built-in feature for your specific requirement. Each component has a special pt property to define an object with keys corresponding to the available DOM elements. A value of a key can either be a string, an object or a function to define the arbitrary properties such as styling, aria, data-* or custom attributes for the element. If the value is a string or a function that returns a string, it serves as a shorthand for a style class definition. Every component documentation has a dedicated segment to document the available section names in the interactive PT Viewer. Panel Example In this example, a Panel is customized with various options through pt . The styling is overriden with Tailwind CSS and header receives custom attributes along with a click event. The attributes passed to the header are not available in the component API, thanks to PassThrough feature, this is no longer an issue as you are not limited to the component api. Note that, you may avoid the ! based overrides in Tailwind classes if you setup CSS Layers with PrimeNG. Visit the Override section at Tailwind integration for examples.

## Lifecycle

Lifecycle hooks of components are exposed as pass through using the hooks property so that callback functions can be registered. Available callbacks are onBeforeInit , onInit , onChanges , onDoCheck , onAfterContentInit , onAfterContentChecked , onAfterViewInit , onAfterViewChecked and onDestroy . Refer to the Angular documentation for detailed information about lifecycle hooks.

## Pcprefix

A UI component may also use other UI components, in this case section names are prefixed with pc (Prime Component) to denote the PrimeNG component begin used. This distinguishes components from standard DOM elements and indicating the necessity for a nested structure. For example, the badge section is identified as pcBadge because the button component incorporates the badge component internally.

## Ptoptions

The ⁠ptOptions property determines how a component's local PassThrough configuration merges with the global PT configuration, as demonstrated in the following examples using both global and component-level settings. The mergeSections defines whether the sections from the main configuration gets added and the mergeProps controls whether to override or merge the defined props. Defaults are true for mergeSections and false for mergeProps . Global Configuration mergeSections: true, mergeProps: false (default) mergeSections: true, mergeProps: true mergeSections: false, mergeProps: true mergeSections: false, mergeProps: false

