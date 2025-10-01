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
        imports: [CommonModule, Ripple, AutoFocus, SpinnerIcon, BadgeModule, SharedModule, Bind],
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
            imports: [CommonModule, PlusIcon, MinusIcon, ButtonModule, SharedModule, Bind],
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

- Tum bilesenlere instance token inject edilecek:
   $pcButton: Button | undefined = inject(BUTTON_INSTANCE, { optional: true, skipSelf: true }) ?? undefined;

- Tum bilesenlere sectionlarina gore pBind baglanacak:
    cx('root') => [pBind]="ptm('root')"
    cx('header') => [pBind]="ptm('header')"
