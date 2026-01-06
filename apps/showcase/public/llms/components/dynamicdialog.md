# Angular Dynamic Dialog Component

Dialogs can be created dynamically with any component as the content using a DialogService.

## Closing a Dialog

Most of the time, requirement is returning a value from the dialog. DialogRef's close method is used for this purpose where the parameter passed will be available at the onClose event at the caller. Here is an example on how to close the dialog from the ProductListDemo by passing a selected product.

## Customization

DynamicDialog uses the Dialog component internally, visit dialog for more information about the available props.

## Example

Dynamic dialogs require an instance of a DialogService that is responsible for displaying a dialog with a component as its content. Calling open method of DialogService will display dynamic dialog. First parameter of open method is the type of component to load and the second parameter is the configuration of the Dialog such as header , width and more.

```html
<p-toast />
<p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '@/service/productservice';
import { MessageService } from 'primeng/api';
import { Product } from '@/domain/product';
import { Dialog } from 'primeng/dialog';

@Component({
    template: `
        <div class="card flex justify-center">
            <p-toast />
            <p-button (click)="show()" icon="pi pi-search" label="Select a Product" />
        </div>
    `,
    standalone: true,
    imports: [ButtonModule, ToastModule],
    providers: [ProductService]
})
export class DynamicdialogExampleDemo implements OnInit {
    constructor(public dialogService: DialogService, public messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsSmall().then((products) => (this.products = products.slice(0, 5)));
    }

    show() {
        this.ref = this.dialogService.open(ProductListDemo, {
            header: 'Product List',
            modal: true,
            width: '50vw',
            closable: true,
            contentStyle: { overflow: 'auto' },
            breakpoints: {
                '960px': '75vw',
                '640px': '90vw'
            },
            templates: {
                footer: Footer
            }
        });
        
        this.ref.onClose.subscribe((data: any) => {
            let summary_and_detail;
            if (data) {
                const buttonType = data?.buttonType;
                summary_and_detail = buttonType ? { summary: 'No Product Selected', detail: `Pressed '${buttonType}' button` } : { summary: 'Product Selected', detail: data?.name };
            } else {
                summary_and_detail = { summary: 'No Product Selected', detail: 'Pressed Close button' };
            }
            this.messageService.add({ severity: 'info', ...summary_and_detail, life: 3000 });
        });
        
        this.ref.onMaximize.subscribe((value) => {
            this.messageService.add({
                severity: 'info',
                summary: 'Maximized',
                detail: `maximized: ${value.maximized}`
            });
        });
    }
}
```
</details>

## Opening a Dialog

The open method of the DialogService is used to open a Dialog. First parameter is the component to load and second one is the configuration object to customize the Dialog.

## Passing Data

To pass data to a dynamically loaded component, you can use either the data or inputValues property, depending on your requirements. The data property is ideal for passing generic information that is not directly tied to the component's inputs, while inputValues allows you to set specific input properties on the component in a more structured and type-safe way. Both properties can be used together or independently, offering flexibility to meet different use cases. Additionally, the loaded component can control the dialog using the DynamicDialogRef API, providing complete control over the dialog lifecycle. Both DynamicDialogConfig and DynamicDialogRef are injectable through the constructor.

## style-doc

Following is the list of structural style classes, for theming classes visit theming page.

## Usage

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

