# Angular Card Component

Card is a flexible container component.

## Accessibility

Screen Reader A card can be utilized in many use cases as a result no role is enforced, in fact a role may not be necessary if the card is used for presentational purposes only. Any valid attribute is passed to the container element so if you require to use one of the landmark roles like region , you may use the role property. Keyboard Support Component does not include any interactive elements.

## Advanced

Card content can be customized further with subHeader , header and footer properties.

```html
<p-card [style]="{ width: '25rem', overflow: 'hidden' }">
    <ng-template #header>
        <img alt="Card" class="w-full" src="https://primefaces.org/cdn/primeng/images/card-ng.jpg" />
    </ng-template>
    <ng-template #title> Advanced Card </ng-template>
    <ng-template #subtitle> Card subtitle </ng-template>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
        quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
    </p>
    <ng-template #footer>
        <div class="flex gap-4 mt-1">
            <p-button label="Cancel" severity="secondary" class="w-full" [outlined]="true" styleClass="w-full" />
            <p-button label="Save" class="w-full" styleClass="w-full" />
        </div>
    </ng-template>
</p-card>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'card-advanced-demo',
    templateUrl: './card-advanced-demo.html',
    standalone: true,
    imports: [CardModule, ButtonModule]
})
export class CardAdvancedDemo {}
```
</details>

## Basic

A simple Card is created with a header property along with the content as children.

```html
<p-card header="Simple Card">
    <p class="m-0">
        Lorem ipsum dolor sit amet...
    </p>
</p-card>
```

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Card

Card is a flexible container component.

### Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| dt | InputSignal<Object> | undefined | Defines scoped design tokens of the component. |
| unstyled | InputSignal<boolean> | undefined | Indicates whether the component should be rendered without styles. |
| pt | InputSignal<CardPassThrough> | undefined | Used to pass attributes to DOM elements inside the component. |
| ptOptions | InputSignal<PassThroughOptions> | undefined | Used to configure passthrough(pt) options of the component. |
| header | string | - | Header of the card. |
| subheader | string | - | Subheader of the card. |
| style | { [klass: string]: any } | - | Inline style of the element. |
| styleClass | string | - | Class of the element. **(Deprecated)** |

### Templates

| Name | Type | Description |
|------|------|-------------|
| header | TemplateRef<void> | Custom header template. |
| title | TemplateRef<void> | Custom title template. |
| subtitle | TemplateRef<void> | Custom subtitle template. |
| content | TemplateRef<void> | Custom content template. |
| footer | TemplateRef<void> | Custom footer template. |

## Pass Through Options

| Name | Type | Description |
|------|------|-------------|
| root | PassThroughOption<HTMLElement, I> | Used to pass attributes to the root's DOM element. |
| header | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the header's DOM element. |
| body | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the body's DOM element. |
| subtitle | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the subtitle's DOM element. |
| title | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the title's DOM element. |
| content | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the content's DOM element. |
| footer | PassThroughOption<HTMLDivElement, I> | Used to pass attributes to the footer's DOM element. |

## Theming

### CSS Classes

| Class | Description |
|-------|-------------|
| p-card | Class name of the root element |
| p-card-header | Class name of the header element |
| p-card-body | Class name of the body element |
| p-card-caption | Class name of the caption element |
| p-card-title | Class name of the title element |
| p-card-subtitle | Class name of the subtitle element |
| p-card-content | Class name of the content element |
| p-card-footer | Class name of the footer element |

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| card.background | --p-card-background | Background of root |
| card.border.radius | --p-card-border-radius | Border radius of root |
| card.color | --p-card-color | Color of root |
| card.shadow | --p-card-shadow | Shadow of root |
| card.body.padding | --p-card-body-padding | Padding of body |
| card.body.gap | --p-card-body-gap | Gap of body |
| card.caption.gap | --p-card-caption-gap | Gap of caption |
| card.title.font.size | --p-card-title-font-size | Font size of title |
| card.title.font.weight | --p-card-title-font-weight | Font weight of title |
| card.subtitle.color | --p-card-subtitle-color | Color of subtitle |

