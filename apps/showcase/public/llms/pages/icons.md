# Icons

PrimeIcons is the default icon library of PrimeNG with over 250 open source icons.

## Basic-

PrimeIcons use the pi pi-&#123;icon&#125; syntax such as pi pi-check . A standalone icon can be displayed using an element such as i or span

```html
<i class="pi pi-check"></i>
<i class="pi pi-times"></i>
<span class="pi pi-search"></span>
<span class="pi pi-user"></span>
```

## Color-

Icon color is defined with the color property which is inherited from parent by default.

```html
<i class="pi pi-check" style="color: slateblue"></i>
<i class="pi pi-times" style="color: green"></i>
<i class="pi pi-search" style="color: var(--primary-color)"></i>
<i class="pi pi-user" style="color: #708090"></i>
```

## Constants-

Constants API is available to reference icons easily when used programmatically.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { PrimeIcons, MenuItem } from 'primeng/api';

@Component({
    selector: 'prime-icons-constants-demo',
    templateUrl: './prime-icons-constants-demo.html'
})
export class PrimeIconsConstantsDemo {
    items: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'New',
                icon: PrimeIcons.PLUS,
            },
            {
                label: 'Delete',
                icon: PrimeIcons.TRASH
            }
        ];
    }
}
```
</details>

## Download-

PrimeIcons is available at npm, run the following command to download it to your project.

```bash
npm install primeicons
```

## Figma-

PrimeIcons library is now available on Figma Community . By adding them as a library, you can easily use these icons in your designs.

## Import-

CSS file of the icon library needs to be imported in styles.scss of your application.

## List-

Here is the full list of PrimeIcons. More icons will be added periodically and you may also request new icons at the issue tracker.

## Size-

Size of an icon is controlled with the font-size property of the element.

```html
<i class="pi pi-check" style="font-size: 1rem"></i>
<i class="pi pi-times" style="font-size: 1.5rem"></i>
<i class="pi pi-search" style="font-size: 2rem"></i>
<i class="pi pi-user" style="font-size: 2.5rem"></i>
```

## Spin-

Special pi-spin class applies infinite rotation to an icon.

```html
<i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
<i class="pi pi-spin pi-cog" style="font-size: 2rem"></i>
```

