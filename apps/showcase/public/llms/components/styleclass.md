# Angular StyleClass Component

StyleClass manages css classes declaratively to during enter/leave animations or just to toggle classes on an element.

## Animation

Classes to apply during enter and leave animations are specified using the enterFromClass , enterActiveClass , enterToClass , leaveFromClass , leaveActiveClass , leaveToClass properties. In addition in case the target is an overlay, hideOnOutsideClick would be handy to hide the target if outside of the popup is clicked, or enable hideOnEscape to close the popup by listening escape key.

## Hide On Resize

When hideOnResize is enabled, the leave animation is triggered automatically when resizing occurs. Use the resizeSelector property to specify whether to listen to window resize events or element-specific resize events. Set resizeSelector to "window" (default) or "document" for browser resize, or a CSS selector to observe the target element's dimensions.

## Toggle Class

StyleClass has two modes, toggleClass to simply add-remove a class and enter/leave animations. The target element to change the styling is defined with the selector property that accepts any valid CSS selector or keywords including &#64;next , prev , parent , grandparent

