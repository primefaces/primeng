# Angular Dynamic Dialog Component

Dialogs can be created dynamically with any component as the content using a DialogService.

## close-doc

Most of the time, requirement is returning a value from the dialog. DialogRef's close method is used for this purpose where the parameter passed will be available at the onClose event at the caller. Here is an example on how to close the dialog from the ProductListDemo by passing a selected product.

## customization-doc

DynamicDialog uses the Dialog component internally, visit dialog for more information about the available props.

## example-doc

Dynamic dialogs require an instance of a DialogService that is responsible for displaying a dialog with a component as its content. Calling open method of DialogService will display dynamic dialog. First parameter of open method is the type of component to load and the second parameter is the configuration of the Dialog such as header , width and more.

## open-doc

The open method of the DialogService is used to open a Dialog. First parameter is the component to load and second one is the configuration object to customize the Dialog.

## passingdata-doc

To pass data to a dynamically loaded component, you can use either the data or inputValues property, depending on your requirements. The data property is ideal for passing generic information that is not directly tied to the component's inputs, while inputValues allows you to set specific input properties on the component in a more structured and type-safe way. Both properties can be used together or independently, offering flexibility to meet different use cases. Additionally, the loaded component can control the dialog using the DynamicDialogRef API, providing complete control over the dialog lifecycle. Both DynamicDialogConfig and DynamicDialogRef are injectable through the constructor.

## style-doc

Following is the list of structural style classes, for theming classes visit theming page.

## usage-doc

To use dynamic dialog, a reference should be declared as DynamicDialogRef after the DialogService injected into the component.

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-dialog-mask | Class name of the mask element |
| p-dialog | Class name of the root element |
| p-dialog-header | Class name of the header element |
| p-dialog-title | Class name of the title element |
| p-dialog-header-actions | Class name of the header actions element |
| p-dialog-maximize-button | Class name of the maximize button element |
| p-dialog-close-button | Class name of the close button element |
| p-dialog-content | Class name of the content element |
| p-dialog-footer | Class name of the footer element |

