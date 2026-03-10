# Icons

PrimeIcons is the default icon library of PrimeNG with over 250 open source icons.

## Basic-

PrimeIcons use the pi pi-&#123;icon&#125; syntax such as pi pi-check . A standalone icon can be displayed using an element such as i or span

## Color-

Icon color is defined with the color property which is inherited from parent by default.

## Constants-

Constants API is available to reference icons easily when used programmatically.

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

## Download-

PrimeIcons is available at npm, run the following command to download it to your project.

```bash
npm install primeicons
```

## Figma-

PrimeIcons library is now available on Figma Community . By adding them as a library, you can easily use these icons in your designs.

## List-

Here is the full list of PrimeIcons. More icons will be added periodically and you may also request new icons at the issue tracker.

## Size-

Size of an icon is controlled with the font-size property of the element.

## Spin-

Special pi-spin class applies infinite rotation to an icon.

