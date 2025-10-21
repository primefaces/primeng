#### PASSTHROUGH IMPLEMENTATION

- Bilesenlerdeki data-pc-section ve data-pc-name kisimlari silinecek. Bunlari [pBind]="ptm('xxx')" verince dinamik olarak alacak.

- bilesenlere PARENT_INSTANCE import edilecek:
    import { PARENT_INSTANCE } from 'primeng/basecomponent';

- bilesenlere instance token tanimlanacak:

    const COMPONENTNAME_INSTANCE = new InjectionToken<Component>('COMPONENTNAME_INSTANCE');

    const BUTTON_INSTANCE = new InjectionToken<Button>('BUTTON_INSTANCE');

- Bilesen token'i providers'a eklenecek, ornegin:
    providers: [ButtonStyle, { provide: BUTTON_INSTANCE, useExisting: Button }, { provide: PARENT_INSTANCE, useExisting: Button }]

- Root'u host eleman olan bilesenler icin:
  1. hostDirectives: [Bind] eklenecek
  2. Bind directive'i inject edilecek:

    2.1- Eger host ve root elemanlar farkli ise asagidaki gibi kullanilacak:
    Ornegin button.ts'te p-button host eleman ancak icinde bir button var ve bu root eleman.

    ```
        @Component({
        selector: 'p-button',
        standalone: true,
        imports: [CommonModule, Ripple, AutoFocus, SpinnerIcon, BadgeModule, SharedModule, BindModule],
        template: `
            <button
                [class]="cn(cx('root'), styleClass, buttonProps?.styleClass)"
                [pBind]="ptm('root')"
            ></button>
        `,
        providers: [ButtonStyle, { provide: BUTTON_INSTANCE, useExisting: Button }, { provide: PARENT_INSTANCE, useExisting: Button }],
        hostDirectives: [Bind]
    })
    ```

    Bu durumda injection su sekilde olacak:

    ```
        bindDirectiveInstance = inject(Bind, { self: true });

        ngAfterViewChecked(): void {
            this.bindDirectiveInstance.setAttrs(this.ptm('host'));
        }
    ```

    2.2- Eger host ve root elemanlar ayni ise asagidaki gibi kullanilacak:
    Ornegin panel.ts'te p-panel ayni zamanda hem host hem de root eleman.

    ```
        @Component({
            selector: 'p-panel',
            standalone: true,
            imports: [CommonModule, PlusIcon, MinusIcon, ButtonModule, SharedModule, BindModule],
            template: ` <div [pBind]="ptm('header')" [class]="cx('header')" *ngIf="showHeader" (click)="onHeaderClick($event)" [attr.id]="id + '-titlebar'"></div> `,
            providers: [PanelStyle, { provide: PANEL_INSTANCE, useExisting: Panel }, { provide: PARENT_INSTANCE, useExisting: Panel }],
            host: {
                '[id]': 'id',
                '[class]': "cn(cx('root'), styleClass)",
                '[attr.data-p]': 'dataP()'
            },
            hostDirectives: [Bind]
        })
    ```

    Bu durumda kullanim asagidaki gibi olacak:

    ```
        bindDirectiveInstance = inject(Bind, { self: true });

        ngAfterViewChecked(): void {
            this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
        }
    ```

    ÖNEMLI: Host element'in kendisi root ise (host'ta [class]="cn(cx('root'), styleClass)" varsa),
    template'e ekstra div EKLENMEYECEK! Sadece ptms(['host', 'root']) kullanılacak.

    Örnek YANLIŞ kullanım (ekstra div eklenmemeli):

    ```
    template: `
        <div [pBind]="ptm('root')">  <!-- YANLIŞ! -->
            <button pButton [pt]="ptm('pcButton')"></button>
        </div>
    `
    ```

    Örnek DOĞRU kullanım (host zaten root):

    ```
    host: {
        '[class]': "cn(cx('root'), styleClass)"
    }
    template: `
        <button pButton [pt]="ptm('pcButton')"></button>
    `
    // Ve class'ta:
    onAfterViewChecked(): void {
        this.bindDirectiveInstance.setAttrs(this.ptms(['host', 'root']));
    }
    ```

- Tum bilesenlere instance token inject edilecek:
   $pcButton: Button | undefined = inject(BUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

- Tum bilesenlere sectionlarina gore pBind baglanacak:
    cx('root') => [pBind]="ptm('root')"
    cx('header') => [pBind]="ptm('header')"

#### TYPES KLASORU YAPISI

- Her bileşen için `/packages/primeng/src/types/[component-name]/` klasörü oluşturulacak
- Bu klasörde 3 dosya bulunacak:
  1. `[component-name].types.ts` - PassThrough type tanımları
  2. `ng-package.json` - Build konfigürasyonu
  3. `public_api.ts` - Export dosyası

Örnek yapı:

```
/types/button/
├── button.types.ts
├── ng-package.json
└── public_api.ts
```

#### TYPES DOSYASI YAPISI

PrimeVue'daki PassThrough yapısına uygun olarak Angular için type'lar oluşturulacak:

```typescript
import type { PassThrough, PassThroughOption } from 'primeng/api';

/**
 * Custom pass-through(pt) options.
 * @template I Type of instance.
 *
 * @see {@link ComponentProps.pt}
 * @group Interface
 */
export interface ComponentPassThroughOptions<I = unknown> {
    /**
     * Used to pass attributes to the root's DOM element.
     */
    root?: PassThroughOption<HTMLElement, I>;
    /**
     * Used to pass attributes to the header's DOM element.
     */
    header?: PassThroughOption<HTMLDivElement, I>;
    // ... diğer elementler
}

/**
 * Defines valid pass-through options in Component.
 * @see {@link ComponentPassThroughOptions}
 *
 * @template I Type of instance.
 */
export type ComponentPassThrough<I = unknown> = PassThrough<I, ComponentPassThroughOptions<I>>;
```

#### NG-PACKAGE.JSON YAPISI

```json
{
    "$schema": "../../../../node_modules/ng-packagr/ng-package.schema.json",
    "lib": {
        "entryFile": "public_api.ts"
    }
}
```

#### PUBLIC_API.TS YAPISI

```typescript
export * from './[component-name].types';
```

#### BILEŞEN SINIFI GÜNCELLEME

BaseComponent'e generic type parametre olarak PassThrough type'ı verilecek:

```typescript
import { ComponentPassThrough } from 'primeng/types/component';

export class Component extends BaseComponent<ComponentPassThrough> {
    // ...
}
```

#### GLOBAL PASSTHROUGH

Her yeni bileşen için GlobalPassThrough interface'ine ekleme yapılacak:

`/packages/primeng/src/config/primeng.types.ts`:

```typescript
import type { ComponentPassThrough } from 'primeng/types/component';

export interface GlobalPassThrough {
    component?: ComponentPassThrough;
    // ... diğer bileşenler
}
```

#### CHILD COMPONENT PASSTHROUGH

Eğer bileşende child Button, Menu gibi PrimeNG componentleri varsa, onların PT'leri ButtonPassThrough vb. olarak tanımlanacak:

```typescript
export interface SplitButtonPassThroughOptions<I = unknown> {
    root?: PassThroughOption<HTMLDivElement, I>;
    /**
     * Used to pass attributes to the Button component.
     * @see {@link ButtonPassThrough}
     */
    pcButton?: ButtonPassThrough;
    /**
     * Used to pass attributes to the TieredMenu component.
     */
    pcMenu?: any; // TieredMenuPassThrough when available
}
```

Template'de kullanımı:

```html
<button
    pButton
    [pt]="ptm('pcButton')"
></button>

<p-tieredmenu
    [pt]="ptm('pcMenu')"
></p-tieredmenu>
```

#### TEMPLATE'E PBIND EKLEME

Template'deki her önemli DOM elementine [pBind] eklencek:

```html
<!-- Root element -->
<div [pBind]="ptm('root')" [class]="cx('root')">
    <!-- List element -->
    <ul [pBind]="ptm('list')" [class]="cx('list')">
        <!-- Item element -->
        <li [pBind]="ptm('item')" [class]="cx('item')">
        </li>
    </ul>
</div>
```

PrimeNG child componentlerine [pt] ile geçilir:

```html
<button
    pButton
    [pt]="ptm('pcButton')"
></button>
```

#### BIND MODULE IMPORT

Template'de [pBind] kullanılacaksa, component imports'a Bind eklenmeli:

```typescript
@Component({
    imports: [CommonModule, ButtonModule, BindModule],
})
```

#### INTERFACE DOSYALARI TAŞIMA

Bileşen klasöründeki `.interface.ts` dosyaları types klasörüne taşınacak:

1. Interface dosyasındaki tüm içerik `types/[component-name]/[component-name].types.ts` dosyasına eklenir
2. Orijinal `.interface.ts` dosyası silinir
3. Bileşen dosyasındaki import güncellenir:

   ```typescript
   // Eski:
   import { ButtonProps } from './button.interface';

   // Yeni:
   import { ButtonProps } from 'primeng/types/button';
   ```

4. Bileşenin `public_api.ts` dosyası güncellenir:

   ```typescript
   // En tepeye eklenir:
   export * from 'primeng/types/button';
   export * from './button';
   export * from './style/buttonstyle';

   // Silinen satır:
   // export * from './button.interface';
   ```

#### COMPONENT SPESIFIK METODLAR VE SUB BILESENLER

- getPTOptions, getItemPTOptions, getXXXPTOptions gibi primevue implementasyonunda bulunan metodlar port edilmeli.
- primevue component path, tum alakali primevue bilesen/sub bilesen'leri incele => `/Users/cetincakiroglu/Development/primetek/primevue/packages/primevue/src/componentname/`

- Ornek getPTOptions Pattern:

```typescript
    getPTOptions(key, value, index) {
        return this.ptm(key, {
            context: {
                value,
                index
            }
        });
    },
```
