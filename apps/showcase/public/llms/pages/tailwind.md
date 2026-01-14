# Tailwind CSS

Integration between PrimeNG and Tailwind CSS.

## Animations-

The plugin also adds extended animation utilities that can be used with the styleclass and animateonscroll directives.

```html
<p-select [(ngModel)]="animation" [options]="animations" placeholder="Select One" class="w-full sm:w-44" />
<div class="py-8 overflow-hidden">
   <div [ngClass]="dynamicAnimationClasses"></div>
</div>
```

## Colorpalette-

PrimeNG color palette as utility classes.

## Darkmode-

In styled mode, PrimeNG uses the system as the default darkModeSelector in theme configuration. If you have a dark mode switch in your application, ensure that darkModeSelector is aligned with the Tailwind dark variant for seamless integration. Note that, this particular configuration isn't required if you're utilizing the default system color scheme. Suppose that, the darkModeSelector is set as my-app-dark in PrimeNG. Tailwind v4 Add a custom variant for dark with a custom selector. Tailwind v3 Use the plugins option in your Tailwind config file to configure the plugin.

## Extensions-

The plugin extends the default configuration with a new set of utilities. All variants and breakpoints are supported e.g. dark:sm:hover:bg-primary . Color Palette Class Property primary-[50-950] Primary color palette. surface-[0-950] Surface color palette. primary Default primary color. primary-contrast Default primary contrast color. primary-emphasis Default primary emphasis color. border-surface Default primary emphasis color. bg-emphasis Emphasis background e.g. hovered element. bg-highlight Highlight background. bg-highlight-emphasis Highlight background with emphasis. rounded-border Border radius. text-color Text color with emphasis. text-color-emphasis Default primary emphasis color. text-muted-color Secondary text color. text-muted-color-emphasis Secondary text color with emphasis.

## Form-

Using Tailwind utilities for the responsive layout of a form with PrimeNG components.

## Headless-

A headless PrimeNG dialog with a custom UI.

## Override-

Tailwind utilities may not be able to override the default styling of components due to css specificity, there are two possible solutions; Import and CSS Layer. Important Use the ! as a prefix to enforce the styling. This is not the recommend approach, and should be used as last resort to avoid adding unnecessary style classes to your bundle. Tailwind v4 Tailwind v3 CSS Layer CSS Layer provides control over the css specificity so that Tailwind utilities can safely override components. Tailwind v4 Ensure primeng layer is after theme and base , but before the other Tailwind layers such as utilities . No change in the CSS configuration is required. Tailwind v3 The primeng layer should be between base and utilities. Tailwind v3 does not use native layer so needs to be defined with CSS.

## Overview-

Tailwind CSS is a popular CSS framework based on a utility-first design. The core provides flexible CSS classes with predefined CSS rules to build your own UI elements. For example, instead of an opinionated btn class as in Bootstrap, Tailwind offers primitive classes like bg-blue-500 , rounded and p-4 to apply a button. A set of reusable classes can also be grouped as a Tailwind CSS component and there are even a couple of libraries that take this approach to build components specifically for Tailwind. Tailwind is an outstanding CSS library, however it lacks a true comprehensive UI suite when combined with Angular, this is where PrimeNG comes in by providing a wide range of highly accessible and feature rich UI component library. The core of PrimeNG does not depend on Tailwind CSS.

## Plugin-

The tailwindcss-primeui is an official plugin by PrimeTek to provide first class integration between a Prime UI library like PrimeNG and Tailwind CSS. It is designed to work both in styled and unstyled modes. In styled mode, for instance the semantic colors such as primary and surfaces are provided as Tailwind utilities e.g. bg-primary , text-surface-500 , text-muted-color . If you haven't already done so, start by integrating Tailwind into your project. Detailed steps for this process can be found in the Tailwind documentation . After successfully installing Tailwind, proceed with the installation of the PrimeUI plugin. This single npm package comes with two libraries: the CSS version is compatible with Tailwind v4, while the JS version is designed for Tailwind v3. Tailwind v4 In the CSS file that contains the tailwindcss import, add the tailwindcss-primeui import as well. For a comprehensive starter guide, review the primeng-quickstart-tailwind repository which demonstrates the integration. Tailwind v3 Use the plugins option in your Tailwind config file to configure the plugin.

