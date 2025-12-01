# Angular KeyFilter Component

KeyFilter is a directive to restrict individual key strokes. In order to restrict the whole input, use InputNumber or InputMask instead.

## Accessibility

Refer to InputText for accessibility as KeyFilter is a built-in add-on of the InputText.

## Presets

KeyFilter provides various presets configured with the pKeyFilter property.

```html
<input pInputText pKeyFilter="int" />
<input pInputText pKeyFilter="num" />
<input pInputText pKeyFilter="money" />
<input pInputText pKeyFilter="hex" />
<input pInputText pKeyFilter="alpha" />
<input pInputText pKeyFilter="alphanum" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
    selector: 'key-filter-presets-demo',
    templateUrl: './key-filter-presets-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule, KeyFilterModule]
})
export class KeyFilterPresetsDemo {}
```
</details>

## Regex

In addition to the presets, a regular expression can be configured for customization.

```html
<input pInputText [pKeyFilter]="blockSpace" />
<input pInputText [pKeyFilter]="blockChars" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
    selector: 'key-filter-reg-exp-demo',
    templateUrl: './key-filter-reg-exp-demo.html',
    standalone: true,
    imports: [FormsModule, InputTextModule, KeyFilterModule]
})
export class KeyFilterRegExpDemo {
     blockSpace: RegExp = /^[^\\s]+$/;
     blockChars: RegExp = /^[^<>*!]+$/;
}
```
</details>

