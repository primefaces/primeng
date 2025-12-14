# Angular Steps Component

Steps also known as Stepper, is an indicator for the steps in a workflow. Layout of steps component is optimized for responsive design.

## Accessibility

Screen Reader Steps component uses the nav element and since any attribute is passed to the root implicitly aria-labelledby or aria-label can be used to describe the component. Inside an ordered list is used where the current step item defines aria-current as "step". Keyboard Support Key Function tab Adds focus to the active step when focus moves in to the component, if there is already a focused tab header then moves the focus out of the component based on the page tab sequence. enter Activates the focused step if readonly is not enabled. space Activates the focused step if readonly is not enabled. right arrow Moves focus to the next step if readonly is not enabled. left arrow Moves focus to the previous step if readonly is not enabled. home Moves focus to the first step if readonly is not enabled. end Moves focus to the last step if readonly is not enabled.

## Basic

Steps requires a collection of menuitems as its model .

```html
<p-steps [model]="items" [readonly]="true" />
```

## Controlled

Steps can be controlled programmatically using activeIndex property.

```html
<div class="flex mb-8 gap-2 justify-end">
    <p-button (click)="active = 0" [rounded]="true" label="1" styleClass="w-8 h-8 p-0" [outlined]="active !== 0" />
    <p-button (click)="active = 1" [rounded]="true" label="2" styleClass="w-8 h-8 p-0" [outlined]="active !== 1" />
    <p-button (click)="active = 2" [rounded]="true" label="3" styleClass="w-8 h-8 p-0" [outlined]="active !== 2" />
</div>
<p-steps [activeIndex]="active" [model]="items" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'steps-controlled-demo',
    templateUrl: './steps-controlled-demo.html',
    standalone: true,
    imports: [StepsModule, ButtonModule]
})
export class StepsControlledDemo implements OnInit {
    items: MenuItem[] | undefined;

    active: number = 0;

    ngOnInit() {
        this.items = [
            {
                label: 'Personal Info'
            },
            {
                label: 'Reservation'
            },
            {
                label: 'Review'
            }
        ];
    }
}
```
</details>

## Interactive

In order to add interactivity to the component, disable readonly and use a binding to activeIndex along with activeIndexChange to control the Steps.

```html
<p-toast />
<p-steps [model]="items" [readonly]="false" [activeIndex]="activeIndex" (activeIndexChange)="onActiveIndexChange($event)" />
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'steps-interactive-demo',
    templateUrl: './steps-interactive-demo.html',
    standalone: true,
    imports: [StepsModule, ToastModule],
    providers: [MessageService]
})
export class StepsInteractiveDemo implements OnInit {
    items: MenuItem[] | undefined;

    activeIndex: number = 0;

    constructor(public messageService: MessageService) {}

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                command: (event: any) => this.messageService.add({severity:'info', summary:'First Step', detail: event.item.label})
            },
            {
                label: 'Seat',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Second Step', detail: event.item.label})
            },
            {
                label: 'Payment',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Third Step', detail: event.item.label})
            },
            {
                label: 'Confirmation',
                command: (event: any) => this.messageService.add({severity:'info', summary:'Last Step', detail: event.item.label})
            }
        ];
    }
}
```
</details>

## Routing

Example below uses nested routes with Steps.

```html
<div class="card">
    <p-toast />
    <p-steps [model]="items" [readonly]="false" />
</div>
<router-outlet></router-outlet>
```

<details>
<summary>TypeScript Example</summary>

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TicketService } from '@/service/ticketservice';
import { Subscription } from 'rxjs';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'steps-routing-demo',
    templateUrl: './steps-routing-demo.html',
    standalone: true,
    imports: [StepsModule, ToastModule],
    providers: [MessageService, TicketService]
})
export class StepsRoutingDemo implements OnInit {
    items: MenuItem[];

    subscription: Subscription;

    constructor(public messageService: MessageService, public ticketService: TicketService) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Personal',
                routerLink: 'personal'
            },
            {
                label: 'Seat',
                routerLink: 'seat'
            },
            {
                label: 'Payment',
                routerLink: 'payment'
            },
            {
                label: 'Confirmation',
                routerLink: 'confirmation'
            }
        ];

        this.subscription = this.ticketService.paymentComplete$.subscribe((personalInformation) => {
            this.messageService.add({ severity: 'success', summary: 'Order submitted', detail: 'Dear, ' + personalInformation.firstname + ' ' + personalInformation.lastname + ' your order completed.' });
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
```
</details>

## styledoc

Following is the list of structural style classes, for theming classes visit theming page.

## Theming

### Design Tokens

| Token | CSS Variable | Description |
|-------|--------------|-------------|
| steps.transition.duration | --p-steps-transition-duration | Transition duration of root |
| steps.separator.background | --p-steps-separator-background | Background of separator |
| steps.item.link.border.radius | --p-steps-item-link-border-radius | Border radius of item link |
| steps.item.link.focus.ring.width | --p-steps-item-link-focus-ring-width | Focus ring width of item link |
| steps.item.link.focus.ring.style | --p-steps-item-link-focus-ring-style | Focus ring style of item link |
| steps.item.link.focus.ring.color | --p-steps-item-link-focus-ring-color | Focus ring color of item link |
| steps.item.link.focus.ring.offset | --p-steps-item-link-focus-ring-offset | Focus ring offset of item link |
| steps.item.link.focus.ring.shadow | --p-steps-item-link-focus-ring-shadow | Focus ring shadow of item link |
| steps.item.link.gap | --p-steps-item-link-gap | Gap of item link |
| steps.item.label.color | --p-steps-item-label-color | Color of item label |
| steps.item.label.active.color | --p-steps-item-label-active-color | Active color of item label |
| steps.item.label.font.weight | --p-steps-item-label-font-weight | Font weight of item label |
| steps.item.number.background | --p-steps-item-number-background | Background of item number |
| steps.item.number.active.background | --p-steps-item-number-active-background | Active background of item number |
| steps.item.number.border.color | --p-steps-item-number-border-color | Border color of item number |
| steps.item.number.active.border.color | --p-steps-item-number-active-border-color | Active border color of item number |
| steps.item.number.color | --p-steps-item-number-color | Color of item number |
| steps.item.number.active.color | --p-steps-item-number-active-color | Active color of item number |
| steps.item.number.size | --p-steps-item-number-size | Size of item number |
| steps.item.number.font.size | --p-steps-item-number-font-size | Font size of item number |
| steps.item.number.font.weight | --p-steps-item-number-font-weight | Font weight of item number |
| steps.item.number.border.radius | --p-steps-item-number-border-radius | Border radius of item number |
| steps.item.number.shadow | --p-steps-item-number-shadow | Shadow of item number |

