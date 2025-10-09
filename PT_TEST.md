### STEPS:
1. Read the component code, analyze its inputs and outputs.
2. Identify pt sections in the component template: ```ptm('xxx')``` indicates a section. For example: ```ptm('title') => pt={title: {}}``` is how it's used.
3. pt input test usage: ```fixture.componentRef.setInput('pt', { host: 'HOST_CLASS' });```
4. Write tests according to the following cases.

    ### Case 1: Simple string classes
    ```
        pt_1 = {
            host: 'HOST CLASS',
            root: 'ROOT CLASS'
            // try for all pt sections
        };
    ```

    ### Case 2: Objects
    ```
        pt_2 = {
            root: {
                class: 'collapsed',
                style: {'background-color': 'red'},
                'data-p-TEST': true,
                'aria-label': 'TEST ARIA LABEL'
            // try for all pt sections
            }
        };
    ```

    ### Case 3: Mixed object and string values
    ```
        pt_3 = {
            root: {
                class: 'ROOT CLASS'
                // add for other sections
            },
            title: 'HEADER CLASS'
        };
    ```

    ### Case 4: Use variables from instance
    ```
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
            // try all sections with random inputs from instance
        };
    ```

    ### Case 5: Event binding
    ```
        pt_5 = {
            title: ({ instance }) => {
                return {
                    onclick: () => {
                        instance._header = 'TEST';
                    }
                };
            }
            // try in other sections as well
        };
    ```

    ### Case 5: Test emitters
    ```
        pt_6 = {
            root: ({instance}) => {
                console.log(instance.onBeforeToggle())
            }
        };
    ```

    ### Case 6: Inline test
    ```
        <p-panel [pt]="{root: 'TEST CLASS'}"/>
        <p-panel [pt]="{root: {class: 'TEST CLASS'}"/>
    ```

    ### Case 7: Test from PrimeNGConfig
    - Inject config into test environment
    - Create multiple instances of the same component
    - Test global.css as well
    ```
        providePrimeNG({
            pt: {

                panel: {
                        host: {'aria-label': 'TEST_GLOBAL_ARIA_LABEL'},
                            global: {
                                css: `.p-button {
                                        border: 1px solid red !important;
                                        }`
                            }
                        }

            }
        }),
    ```
    - Set attribute, class, style and onclick on components, all should have the same result
    - In tests, class, style, attributes given via PT should be verified through DOM

    ### Case 8: Test hooks
    ```
        pt = {
            root: 'MY-Panel',
            hooks: {
                onAfterViewInit: () => {
                    // do something
                },
                // try other Angular life cycles
            }
        }
    ```


#### FINAL STEP: 
- RUN `pnpm --filter primeng test:unit --include='**/componentname/*.spec.ts'`
- Debug if any test error found.
