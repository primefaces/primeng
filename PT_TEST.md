### ADIMLAR:
1. Bilesen kodunu oku, inputlari ve outputlari analiz et.
2. Bilesendeki template icinde pt sectionlarini tespit et: ptm('xxx') olanlar section belirtir. Ornegin: ptm('title') => pt={title: {}} seklinde kullanilir.
3. Asagidaki durumlara gore testler yaz.
    
    // Case 1: duz string classlar
    pt_1 = {
        host: 'HOST CLASS',
        root: 'ROOT CLASS'
        // tum sectionlar icin dene
    };

    // Case 2: objects
    pt_2 = {
        root: {
            class: 'collapsed',
            style: 'background-color: "red"',
            'data-p-TEST': true,
            'aria-label': 'TEST ARIA LABEL'
        }
        // tum sectionlar icin dene
    };

    // Case 3: object ve string karisik degerler
    pt_3 = {
        root: {
            class: 'ROOT CLASS'
            // diger sectionlar icin ekle
        },
        title: 'HEADER CLASS'
    };

    // Case 4: instance'dan degisken kullan
    pt_4 = {
        root: ({ instance }) => {
            return {
                class: {
                    COLLAPSED: instance?.collapsed
                }
            };
        },
        title: ({ instance }) => {
            return {
                style: {
                    'background-color': instance?.collapsed ? 'yellow' : 'red'
                }
            };
        }
        // tum sectionlari instance'daki random inputlarla dene
    };

    // Case 5: Event binding
    pt_5 = {
        title: ({ instance }) => {
            return {
                onclick: () => {
                    instance._header = 'TEST';
                }
            };
        }
        // diger sectionlarda da dene
    };

    // Case 5: Emitterlari dene
    // pt_6 = {
    //     root: ({instance}) => {
    //         console.log(instance.onBeforeToggle())
    //     }
    // };

    // Case 6: inline dene
    // <p-panel [pt]="{root: 'TEST CLASS'}"/>
    // <p-panel [pt]="{root: {class: 'TEST CLASS'}"/>

    // Case 7: PrimeNGConfig'den dene
    // config'i test ortamina inject et
    // ayni bilesenden birkac tane olustur
    // providePrimeNG({
    //   pt: {
    //        {
    //             panel: {host: {'aria-label': 'TEST_GLOBAL_ARIA_LABEL'}}
    //        }
    //   }
    // }),
    // bilesenlere attribute, class, style ve onclick set et hepsinde ayni sonuc alinmali
    // Testlerde PT ile verilen class, style, attribute'lar DOM uzerinden kontrol edilmeli