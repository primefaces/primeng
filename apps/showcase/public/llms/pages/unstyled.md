# Unstyled Mode

Theming PrimeNG with alternative styling approaches.

## Architecture

The term unstyled is used to define an alternative styling approach instead of the default theming with design tokens. In unstyled mode the css variables of the design tokens and the css rule sets that utilize them are not included. Here is an example of an Unstyled Select, the core functionality and accessibility is provided whereas styling is not included.

## Example

Unstyled components require styling using your preferred approach. We recommend using Tailwind CSS with PassThrough attributes, a combination that works seamlessly together. The tailwindcss-primeui even provides special variants such as p-outlined: , p-vertical for the PrimeNG components. The example below demonstrates how to style a button component with Tailwind CSS using PassThrough attributes. Before you begin, refer to the pass through section in the button documentation to familiarize yourself with the component's internal structure and PassThrough attributes. In this example, we'll target the root , label and icon elements to apply custom styles.

## Global

A global configuration can be created at application level to avoid repetition via the global pt option so that the styles can be shared from a single location. A particular component can still override a global configuration with its own pt property.

## Setup

Unstyled mode is enabled for the whole suite by enabling unstyled option during PrimeNG installation. Alternatively even in the default styled mode, a particular component can still be used as unstyled by adding the unstyled prop of the component.

## Voltui

Tailwind CSS is perfect fit for the unstyled mode, PrimeTek has even initiated a new UI library called Volt UI based on the unstyled PrimeVue and Tailwind CSS v4. Volt follows the code ownership model where the components are located in the application codebase rather than node_modules. All components within Volt are essentially wrapped versions of the unstyled equivalents, with an added layer of theming through Tailwind CSS v4. This approach, along with the templating features, offers complete control over the theming and presentation. Volt will also be available for PrimeReact. In the future, PrimeTek may bring Volt to Angular via PrimeNG if there is significant community demand. Currently, Volt-Vue can serve as a reference when styling your unstyled PrimeNG components with Tailwind CSS.

