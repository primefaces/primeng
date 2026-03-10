# Angular PickList Component

PickList is used to reorder items between different lists.

## Accessibility

Screen Reader Value to describe the source listbox and target listbox can be provided with ariaLabelledBy or ariaLabel props. The list elements has a listbox role with the aria-multiselectable attribute. Each list item has an option role with aria-selected and aria-disabled as their attributes. Controls buttons are button elements with an aria-label that refers to the aria.moveTop , aria.moveUp , aria.moveDown , aria.moveBottom , aria.moveTo , aria.moveAllTo , aria.moveFrom and aria.moveAllFrom properties of the locale API by default, alternatively you may use moveTopButtonProps , moveUpButtonProps , moveDownButtonProps , moveToButtonProps , moveAllToButtonProps , moveFromButtonProps , moveFromButtonProps and moveAllFromButtonProps to customize the buttons like overriding the default aria-label attributes. PickList Keyboard Support Key Function tab Moves focus to the first selected option, if there is none then first option receives the focus. up arrow Moves focus to the previous option. down arrow Moves focus to the next option. enter Toggles the selected state of the focused option. space Toggles the selected state of the focused option. home Moves focus to the first option. end Moves focus to the last option. shift + down arrow Moves focus to the next option and toggles the selection state. shift + up arrow Moves focus to the previous option and toggles the selection state. shift + space Selects the items between the most recently selected option and the focused option. control + shift + home Selects the focused options and all the options up to the first one. control + shift + end Selects the focused options and all the options down to the first one. control + a Selects all options. Buttons Keyboard Support Key Function enter Executes button action. space Executes button action.

## Basic

PickList is used as a controlled input with source and target properties. Content of a list item needs to be defined with the item template that receives an object in the list as parameter. Drag & drop functionality depends on &#64;angular/cdk package.

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <app-demo-wrapper>
            <p-picklist [source]="sourceProducts()" [target]="targetProducts()" [dragdrop]="true" [responsive]="true" breakpoint="1400px">
                <ng-template let-item #item>
                    {{ item.name }}
                </ng-template>
            </p-picklist>
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [PickListModule],
    providers: [ProductService]
})
export class PicklistBasicDemo implements OnInit {
    private productService = inject(ProductService);
    sourceProducts = signal<Product[]>([]);
    targetProducts = signal<Product[]>([]);

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts.set(products);
        });
    }
}
```

## Filter

Filter value is checked against the property of an object configured with the filterBy property.

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <app-demo-wrapper>
            <p-picklist
                [source]="sourceProducts()"
                [target]="targetProducts()"
                [dragdrop]="true"
                [responsive]="true"
                filterBy="name"
                sourceFilterPlaceholder="Search by name"
                targetFilterPlaceholder="Search by name"
                breakpoint="1400px"
                scrollHeight="20rem"
            >
                <ng-template let-option let-selected="selected" #option>
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}" [alt]="option.name" />
                        <div class="flex-1 flex flex-col">
                            <span class="font-medium text-sm">{{ option.name }}</span>
                            <span
                                [ngClass]="{
                                    'text-surface-500': !selected,
                                    'dark:text-surface-400': !selected,
                                    'text-inherit': selected
                                }"
                                >{{ option.category }}</span
                            >
                        </div>
                        <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
                    </div>
                </ng-template>
            </p-picklist>
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [PickListModule],
    providers: [ProductService]
})
export class PicklistFilterDemo implements OnInit {
    private productService = inject(ProductService);
    sourceProducts = signal<Product[]>([]);
    targetProducts = signal<Product[]>([]);

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts.set(products);
        });
    }
}
```

## Template

For custom content support define an item template that gets the item instance as a parameter. In addition sourceheader and targetheader templates are provided for further customization.

```typescript
import { Component, OnInit, inject, signal } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { ProductService } from '@/service/productservice';
import { Product } from '@/domain/product';

@Component({
    template: `
        <app-demo-wrapper>
            <p-picklist [source]="sourceProducts()" [target]="targetProducts()" [dragdrop]="true" [responsive]="true" sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" breakpoint="1400px" scrollHeight="20rem">
                <ng-template let-option let-selected="selected" #item>
                    <div class="flex flex-wrap p-1 items-center gap-4 w-full">
                        <img class="w-12 shrink-0 rounded" src="https://primefaces.org/cdn/primeng/images/demo/product/{{ option.image }}" [alt]="option.name" />
                        <div class="flex-1 flex flex-col">
                            <span class="font-medium text-sm">{{ option.name }}</span>
                            <span
                                [ngClass]="{
                                    'text-surface-500': !selected,
                                    'dark:text-surface-400': !selected,
                                    'text-inherit': selected
                                }"
                                >{{ option.category }}</span
                            >
                        </div>
                        <span class="font-bold sm:ml-8">{{ '$' + option.price }}</span>
                    </div>
                </ng-template>
            </p-picklist>
        </app-demo-wrapper>
    `,
    standalone: true,
    imports: [PickListModule],
    providers: [ProductService]
})
export class PicklistTemplateDemo implements OnInit {
    private productService = inject(ProductService);
    sourceProducts = signal<Product[]>([]);
    targetProducts = signal<Product[]>([]);

    ngOnInit() {
        this.carService.getProductsSmall().then((products) => {
            this.sourceProducts.set(products);
        });
    }
}
```

## templates-doc

```typescript
import { Component } from '@angular/core';

@Component({
    template: `
        <div class="doc-tablewrapper">
            <table class="doc-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Parameters</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>item</td>
                        <td>
                            $implicit: Data of the item<br />
                            index: Index of the item
                        </td>
                    </tr>
                    <tr>
                        <td>sourceHeader</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>targetHeader</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>sourceFilter</td>
                        <td>
                            options.filter: Callback to filter data by the value param<br />
                            options.reset: Resets the filters.
                        </td>
                    </tr>
                    <tr>
                        <td>targetFilter</td>
                        <td>
                            options.filter: Callback to filter data by the value param<br />
                            options.reset: Resets the filters
                        </td>
                    </tr>
                    <tr>
                        <td>emptymessagesource</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptyfiltermessagesource</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptymessagetarget</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>emptyfiltermessagetarget</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>moveupicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>movetopicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>movedownicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>movebottomicon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>movetotargeticon</td>
                        <td>$implicit: viewChanged</td>
                    </tr>
                    <tr>
                        <td>movealltotargeticon</td>
                        <td>$implicit: viewChanged</td>
                    </tr>
                    <tr>
                        <td>movetosourceicon</td>
                        <td>$implicit: viewChanged</td>
                    </tr>
                    <tr>
                        <td>movealltosourceicon</td>
                        <td>$implicit: viewChanged</td>
                    </tr>
                    <tr>
                        <td>targetfiltericon</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>sourcefiltericon</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,
    standalone: true,
    imports: []
})
export class PicklistTemplatesDemo {}
```

## Pick List

PickList is used to reorder items between different lists.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<PickListPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| source | ModelSignal<any[]> | ... | An array of objects for the source list. |
| target | ModelSignal<any[]> | ... | An array of objects for the target list. |
| dataKey | InputSignal<string> | ... | Name of the field that uniquely identifies the options. |
| sourceHeader | InputSignal<string> | ... | Text for the source list caption |
| tabindex | InputSignalWithTransform<number, unknown> | ... | Index of the element in tabbing order. |
| rightButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to right button for accessibility. |
| leftButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to left button for accessibility. |
| allRightButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to all right button for accessibility. |
| allLeftButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to all left button for accessibility. |
| upButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to up button for accessibility. |
| downButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to down button for accessibility. |
| topButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to top button for accessibility. |
| bottomButtonAriaLabel | InputSignal<string> | ... | Defines a string that labels the move to bottom button for accessibility. |
| sourceAriaLabel | InputSignal<string> | ... | Defines a string that labels the source list. |
| targetAriaLabel | InputSignal<string> | ... | Defines a string that labels the target list. |
| targetHeader | InputSignal<string> | ... | Text for the target list caption |
| responsive | InputSignalWithTransform<boolean, unknown> | ... | When enabled orderlist adjusts its controls based on screen size. |
| filterBy | InputSignal<string> | ... | When specified displays an input field to filter the items on keyup and decides which field to search (Accepts multiple fields with a comma). |
| filterLocale | InputSignal<string> | ... | Locale to use in filtering. The default locale is the host environment's current locale. |
| trackBy | InputSignal<Function> | ... | Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity. Use sourceTrackBy or targetTrackBy in case different algorithms are needed per list. |
| sourceTrackBy | InputSignal<Function> | ... | Function to optimize the dom operations by delegating to ngForTrackBy in source list, default algorithm checks for object identity. |
| targetTrackBy | InputSignal<Function> | ... | Function to optimize the dom operations by delegating to ngForTrackBy in target list, default algorithm checks for object identity. |
| showSourceFilter | InputSignalWithTransform<boolean, unknown> | ... | Whether to show filter input for source list when filterBy is enabled. |
| showTargetFilter | InputSignalWithTransform<boolean, unknown> | ... | Whether to show filter input for target list when filterBy is enabled. |
| metaKeySelection | InputSignalWithTransform<boolean, unknown> | ... | Defines how multiple items can be selected, when true metaKey needs to be pressed to select or unselect an item and when set to false selection of each item can be toggled individually. On touch enabled devices, metaKeySelection is turned off automatically. |
| dragdrop | InputSignalWithTransform<boolean, unknown> | ... | Whether to enable dragdrop based reordering. |
| style | InputSignal<Partial<CSSStyleDeclaration>> | ... | Inline style of the component. |
| sourceStyle | InputSignal<Partial<CSSStyleDeclaration>> | ... | Inline style of the source list element. |
| targetStyle | InputSignal<Partial<CSSStyleDeclaration>> | ... | Inline style of the target list element. |
| showSourceControls | InputSignalWithTransform<boolean, unknown> | ... | Whether to show buttons of source list. |
| showTargetControls | InputSignalWithTransform<boolean, unknown> | ... | Whether to show buttons of target list. |
| sourceFilterPlaceholder | InputSignal<string> | ... | Placeholder text on source filter input. |
| targetFilterPlaceholder | InputSignal<string> | ... | Placeholder text on target filter input. |
| disabled | InputSignalWithTransform<boolean, unknown> | ... | When present, it specifies that the component should be disabled. |
| sourceOptionDisabled | InputSignal<string \| ((item: any) => boolean)> | ... | Name of the disabled field of a target option or function to determine disabled state. |
| targetOptionDisabled | InputSignal<string \| ((item: any) => boolean)> | ... | Name of the disabled field of a target option or function to determine disabled state. |
| ariaSourceFilterLabel | InputSignal<string> | ... | Defines a string that labels the filter input of source list. |
| ariaTargetFilterLabel | InputSignal<string> | ... | Defines a string that labels the filter input of target list. |
| filterMatchMode | InputSignal<FilterMatchModeType> | ... | Defines how the items are filtered. |
| stripedRows | InputSignalWithTransform<boolean, unknown> | ... | Whether to displays rows with alternating colors. |
| keepSelection | InputSignalWithTransform<boolean, unknown> | ... | Keeps selection on the transfer list. |
| scrollHeight | InputSignal<string> | ... | Height of the viewport, a scrollbar is defined if height of list exceeds this value. |
| autoOptionFocus | InputSignalWithTransform<boolean, unknown> | ... | Whether to focus on the first visible or selected element. |
| buttonProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the Button component. |
| moveUpButtonProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move up button inside the component. |
| moveTopButtonProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move top button inside the component. |
| moveDownButtonProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move down button inside the component. |
| moveBottomButtonProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move bottom button inside the component. |
| moveToTargetProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move to target button inside the component. |
| moveAllToTargetProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move all to target button inside the component. |
| moveToSourceProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move to source button inside the component. |
| moveAllToSourceProps | InputSignal<ButtonProps> | ... | Used to pass all properties of the ButtonProps to the move all to source button inside the component. |
| breakpoint | InputSignal<string> | ... | Indicates the width of the screen at which the component should change its behavior. |

### Emits

| Name | Parameters | Description |
|------|------------|-------------|
| onMoveToSource | event: PickListMoveToSourceEvent | Callback to invoke when items are moved from target to source. |
| onMoveAllToSource | event: PickListMoveAllToSourceEvent | Callback to invoke when all items are moved from target to source. |
| onMoveAllToTarget | event: PickListMoveAllToTargetEvent | Callback to invoke when all items are moved from source to target. |
| onMoveToTarget | event: PickListMoveToTargetEvent | Callback to invoke when items are moved from source to target. |
| onSourceReorder | event: PickListSourceReorderEvent | Callback to invoke when items are reordered within source list. |
| onTargetReorder | event: PickListTargetReorderEvent | Callback to invoke when items are reordered within target list. |
| onSourceSelect | event: PickListSourceSelectEvent | Callback to invoke when items are selected within source list. |
| onTargetSelect | event: PickListTargetSelectEvent | Callback to invoke when items are selected within target list. |
| onSourceFilter | event: PickListSourceFilterEvent | Callback to invoke when the source list is filtered |
| onTargetFilter | event: PickListTargetFilterEvent | Callback to invoke when the target list is filtered |
| onFocus | event: Event | Callback to invoke when the list is focused |
| onBlur | event: Event | Callback to invoke when the list is blurred |

### Templates

| Name | Type | Description |
|------|------|-------------|
| item | Signal<TemplateRef<PickListItemTemplateContext>> | Custom item template. |
| sourceheader | Signal<TemplateRef<void>> | Custom source header template. |
| targetheader | Signal<TemplateRef<void>> | Custom target header template. |
| sourcefilter | Signal<TemplateRef<PickListFilterTemplateContext>> | Custom source filter template. |
| targetfilter | Signal<TemplateRef<PickListFilterTemplateContext>> | Custom target filter template. |
| emptymessagesource | Signal<TemplateRef<void>> | Custom empty message when source is empty template. |
| emptyfiltermessagesource | Signal<TemplateRef<void>> | Custom empty filter message when source is empty template. |
| emptymessagetarget | Signal<TemplateRef<void>> | Custom empty message when target is empty template. |
| emptyfiltermessagetarget | Signal<TemplateRef<void>> | Custom empty filter message when target is empty template. |
| moveupicon | Signal<TemplateRef<void>> | Custom move up icon template. |
| movetopicon | Signal<TemplateRef<void>> | Custom move top icon template. |
| movedownicon | Signal<TemplateRef<void>> | Custom move down icon template. |
| movebottomicon | Signal<TemplateRef<void>> | Custom move bottom icon template. |
| movetotargeticon | Signal<TemplateRef<PickListTransferIconTemplateContext>> | Custom move to target icon template. |
| movealltotargeticon | Signal<TemplateRef<PickListTransferIconTemplateContext>> | Custom move all to target icon template. |
| movetosourceicon | Signal<TemplateRef<PickListTransferIconTemplateContext>> | Custom move to source icon template. |
| movealltosourceicon | Signal<TemplateRef<PickListTransferIconTemplateContext>> | Custom move all to source icon template. |
| targetfiltericon | Signal<TemplateRef<void>> | Custom target filter icon template. |
| sourcefiltericon | Signal<TemplateRef<void>> | Custom source filter icon template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the root's DOM element. |
| sourceControls | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the source controls' DOM element. |
| sourceListContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the source list container's DOM element. |
| transferControls | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the transfer controls' DOM element. |
| targetListContainer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the target list container's DOM element. |
| targetControls | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the target controls' DOM element. |
| pcSourceMoveUpButton | ButtonPassThrough | Used to pass attributes to the source move up Button component. |
| pcSourceMoveTopButton | ButtonPassThrough | Used to pass attributes to the source move top Button component. |
| pcSourceMoveDownButton | ButtonPassThrough | Used to pass attributes to the source move down Button component. |
| pcSourceMoveBottomButton | ButtonPassThrough | Used to pass attributes to the source move bottom Button component. |
| pcMoveToTargetButton | ButtonPassThrough | Used to pass attributes to the move to target Button component. |
| pcMoveAllToTargetButton | ButtonPassThrough | Used to pass attributes to the move all to target Button component. |
| pcMoveToSourceButton | ButtonPassThrough | Used to pass attributes to the move to source Button component. |
| pcMoveAllToSourceButton | ButtonPassThrough | Used to pass attributes to the move all to source Button component. |
| pcTargetMoveUpButton | ButtonPassThrough | Used to pass attributes to the target move up Button component. |
| pcTargetMoveTopButton | ButtonPassThrough | Used to pass attributes to the target move top Button component. |
| pcTargetMoveDownButton | ButtonPassThrough | Used to pass attributes to the target move down Button component. |
| pcTargetMoveBottomButton | ButtonPassThrough | Used to pass attributes to the target move bottom Button component. |
| pcListbox | ListBoxPassThrough | Used to pass attributes to the Listbox component. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-picklist | Class name of the root element |
| p-picklist-source-controls | Class name of the source controls element |
| p-picklist-source-list-container | Class name of the source list container element |
| p-picklist-transfer-controls | Class name of the transfer controls element |
| p-picklist-target-list-container | Class name of the target list container element |
| p-picklist-target-controls | Class name of the target controls element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| picklist.gap | --p-picklist-gap | Gap of root |
| picklist.controls.gap | --p-picklist-controls-gap | Gap of controls |

