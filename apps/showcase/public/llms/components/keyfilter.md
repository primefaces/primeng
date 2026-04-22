# Angular KeyFilter Component

KeyFilter is a directive to restrict individual key strokes. In order to restrict the whole input, use InputNumber or InputMask instead.

## Accessibility

Refer to InputText for accessibility as KeyFilter is a built-in add-on of the InputText.

## Presets

KeyFilter provides various presets configured with the pKeyFilter property.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card">
            <div class="flex flex-wrap gap-4 mb-6">
                <div class="flex-auto">
                    <label for="integer" class="font-bold block mb-2"> Integer </label>
                    <input pInputText id="integer" pKeyFilter="int" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="number" class="font-bold block mb-2"> Number </label>
                    <input pInputText id="number" pKeyFilter="num" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="money" class="font-bold block mb-2"> Money </label>
                    <input pInputText id="money" pKeyFilter="money" class="w-full" />
                </div>
            </div>
            <div class="flex flex-wrap gap-4">
                <div class="flex-auto">
                    <label for="hex" class="font-bold block mb-2"> Hex </label>
                    <input pInputText id="hex" pKeyFilter="hex" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="alphabetic" class="font-bold block mb-2"> Alphabetic </label>
                    <input pInputText id="alphabetic" pKeyFilter="alpha" class="w-full" />
                </div>
                <div class="flex-auto">
                    <label for="alphanumeric" class="font-bold block mb-2"> Alphanumeric </label>
                    <input pInputText id="alphanumeric" pKeyFilter="alphanum" class="w-full" />
                </div>
            </div>
        </div>
    `,
    standalone: true,
    imports: [InputTextModule]
})
export class KeyfilterPresetsDemo {}
```
</details>

## Regex

In addition to the presets, a regular expression can be configured for customization.

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    template: `
        <div class="card flex flex-wrap gap-4">
            <div class="flex-auto">
                <label for="blockspace" class="font-bold block mb-2"> Block Space </label>
                <input pInputText id="blockspace" [pKeyFilter]="blockSpace" class="w-full" />
            </div>
            <div class="flex-auto">
                <label for="block" class="font-bold block mb-2"> Block < > * ! </label>
                <input pInputText id="block" [pKeyFilter]="blockChars" class="w-full" />
            </div>
        </div>
    `,
    standalone: true,
    imports: [InputTextModule]
})
export class KeyfilterRegexDemo {
    blockSpace: RegExp = /^[^\s]+$/;
    blockChars: RegExp = /^[^<>*!]+$/;
}
```
</details>

