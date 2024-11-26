import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { Table } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { Tag } from 'primeng/tag';
import { ProgressBar } from 'primeng/progressbar';
import { Checkbox } from 'primeng/checkbox';
import { OverlayBadgeModule } from 'primeng/overlaybadge';

@Component({
    selector: 'inbox-app',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, DividerModule, AvatarModule, IconField, InputIcon, ButtonModule, Table, InputTextModule, MenuModule, Tag, ProgressBar, Checkbox, OverlayBadgeModule],
    template: `
        <div class="w-64 h-full overflow-hidden border border-surface rounded-2xl flex flex-col">
            <div class="flex items-center justify-between gap-2 p-4 border-b border-surface">
                <div class="text-xl font-medium leading-7 text-color">Mails</div>
                <p-button icon="pi pi-plus" styleClass="w-8 h-8" />
            </div>
            <div class="flex-1 flex flex-col overflow-auto justify-between gap-4 pt-4 pb-4 px-4">
                <div class="flex-1 overflow-auto flex flex-col gap-2">
                    <div *ngFor="let navData of inboxNavs" class="flex flex-col gap-2">
                        <div class="text-sm font-medium leading-5 text-surface-400 dark:text-surface-500">
                            {{ navData.title }}
                        </div>
                        <button
                            *ngFor="let nav of navData.navs"
                            (click)="activeInboxNav = nav.name"
                            [ngClass]="{
                                'text-color bg-emphasis': activeInboxNav === nav.name,
                                'text-muted-color bg-transparent': activeInboxNav !== nav.name
                            }"
                            class="px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-emphasis transition-all"
                        >
                            <i [class]="nav.icon"></i>
                            <span class="font-medium">{{ nav.name }}</span>
                        </button>
                    </div>
                </div>
                <div>
                    <div class="border border-surface rounded-border px-4 pb-4 pt-3 mb-4">
                        <div class="font-medium text-color mb-4">Free Version</div>
                        <p-progressbar [value]="75">
                            <ng-template #content let-value>
                                <span class="w-full text-center text-sm font-normal text-surface-0 leading-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">4 days left</span>
                            </ng-template>
                        </p-progressbar>
                    </div>
                    <p-button label="Upgrade to PRO 🚀" outlined styleClass="w-full" />
                </div>
            </div>
        </div>
        <div class="flex-1 h-full overflow-hidden flex border border-surface rounded-2xl">
            <p-table [value]="tableData" [(selection)]="selectedRows" dataKey="id" class="w-full">
                <ng-template #caption>
                    <div class="flex xl:items-center justify-between gap-2 flex-col xl:flex-row">
                        <div class="flex items-center gap-2">
                            <p-checkbox [binary]="true" class="mr-1" />
                            <p-button icon="pi pi-envelope" outlined severity="secondary" />
                            <p-button icon="pi pi-exclamation-circle" outlined severity="secondary" />
                            <p-button icon="pi pi-tag" outlined severity="secondary" />
                            <p-button icon="pi pi-inbox" label="Archive" outlined severity="secondary" />
                            <p-button icon="pi pi-trash" label="Trash" outlined severity="secondary" />
                        </div>
                        <div class="flex items-center gap-2">
                            <p-iconfield iconPosition="left" class="w-6/12 xl:max-w-36">
                                <p-inputicon class="pi pi-search"></p-inputicon>
                                <input type="text" pInputText [(ngModel)]="search" placeholder="Search" class="w-full" />
                            </p-iconfield>
                            <p-button icon="pi pi-filter" outlined severity="secondary" />
                            <p-divider layout="vertical" styleClass="m-0" />
                            <p-button icon="pi pi-refresh" outlined severity="secondary" />
                            <p-button label="1 of 15" class="!whitespace-nowrap" outlined severity="secondary" />
                            <p-button icon="pi pi-chevron-left" outlined severity="secondary" />
                            <p-button icon="pi pi-chevron-right" outlined severity="secondary" />
                        </div>
                    </div>
                </ng-template>
                <ng-template #body let-data>
                    <tr>
                        <td style="width: 1rem">
                            <p-tableCheckbox [value]="data" />
                        </td>

                        <td style="width: 1rem; padding: 0.5rem">
                            <div (click)="$event.stopPropagation(); data.bookmarked = !data.bookmarked">
                                <i [ngClass]="data.bookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"></i>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center">
                                <p-overlayBadge severity="danger" styleClass="w-fit">
                                    <p-avatar
                                        [image]="data.image"
                                        [label]="!data.image ? data.capName : ''"
                                        [ngClass]="{
                                            'bg-violet-100 text-violet-950 text-xs font-medium': !data.image,
                                            'rounded-md overflow-hidden flex': true
                                        }"
                                    />
                                </p-overlayBadge>

                                <div class="ml-4 leading-6 text-color font-medium">{{ data.name }}</div>
                            </div>
                        </td>

                        <td style="min-width: 14rem; max-width: 20rem">
                            <div class="truncate">
                                <span class="text-color leading-6 mr-2">{{ data.title }}</span>
                                <span class="text-muted-color leading-5 text-sm">{{ data.message }}</span>
                            </div>
                        </td>

                        <td style="width: 4rem">
                            <p-tag *ngIf="data.type" severity="secondary" [value]="data.type" class="font-medium"></p-tag>
                        </td>

                        <td style="width: 4rem">
                            <div class="text-right text-sm leading-5 text-muted-color">{{ data.time }}</div>
                        </td>
                    </tr>
                </ng-template>
            </p-table>
        </div>
    `,
    host: {
        class: 'flex gap-4 h-full flex-1 w-full overflow-auto'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxApp {
    search: string | undefined;

    activeInboxNav: string = 'Inbox';

    inboxNavs: any;

    tableData: any;

    selectedRows: any = [];

    ngOnInit() {
        this.inboxNavs = [
            {
                title: 'Navigation',
                navs: [
                    { name: 'Inbox', icon: 'pi pi-inbox' },
                    { name: 'Starry', icon: 'pi pi-star' },
                    { name: 'Drafts', icon: 'pi pi-file-o' },
                    { name: 'Important', icon: 'pi pi-file-import' },
                    { name: 'Sent', icon: 'pi pi-send' },
                    { name: 'Archive', icon: 'pi pi-inbox' },
                    { name: 'Spam', icon: 'pi pi-info-circle' },
                    { name: 'Trash', icon: 'pi pi-trash' }
                ]
            },
            {
                title: 'Other',
                navs: [
                    { name: 'Security', icon: 'pi pi-tag' },
                    { name: 'Update', icon: 'pi pi-tag' },
                    { name: 'Marketing', icon: 'pi pi-tag' },
                    { name: 'HR', icon: 'pi pi-tag' }
                ]
            }
        ];
        this.tableData = [
            {
                id: 1,
                bookmarked: false,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
                active: false,
                name: 'Brook Simmons',
                type: 'Security',
                time: '3:24 PM',
                title: 'Important Account Update',
                message: "Dear customer, we've made updates to enhance your account security. Please log in to review and complete the necessary steps. Thank you for choosing ABC Corporation."
            },
            {
                id: 2,
                bookmarked: false,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
                active: false,
                name: 'Dianne Russell',
                type: 'Update',
                time: '11:24 AM',
                title: 'Weekly Project Update',
                message: 'Hi team, attached is the weekly project update. Kindly review the progress and come prepared for our discussion in the upcoming meeting on [Date and Time].'
            },
            {
                id: 3,
                bookmarked: true,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
                active: false,
                name: 'Amy Elsner',
                type: 'Security',
                time: '9:24 AM',
                title: 'Urgent: Security Alert - Account Compromise',
                message: 'Dear user, we detected unauthorized access to your account. Take immediate action to secure your account. Follow the provided link to reset your password. Thank you.'
            },
            {
                id: 4,
                bookmarked: false,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png',
                active: false,
                name: 'Jacob Jones',
                type: 'Marketing',
                time: 'Jan 21',
                title: 'Exclusive Offer Inside - Limited Time Only',
                message: "Greetings, check out our exclusive offer! Don't miss this limited-time deal. Details enclosed in the attached flyer. Act fast; the offer expires on [Date]."
            },
            {
                id: 5,
                bookmarked: false,
                image: '',
                active: false,
                name: 'Cameron Watson',
                capName: 'CW',
                type: 'HR',
                time: 'Jan 15',
                title: 'Employee Appreciation Event - Save the Date',
                message: 'Hello team, mark your calendars for our upcoming Employee Appreciation Event on [Date]. Stay tuned for more details and get ready for a day of celebration!'
            },
            {
                id: 6,
                bookmarked: true,
                image: '',
                active: false,
                name: 'Wade Warren',
                capName: 'WW',
                type: 'Invoice',
                time: 'Jan 12',
                title: 'Your Recent Purchase - Order Confirmation',
                message: 'Hi Wade Warren, secure your spot at the XYZ Conference 2024 with early bird registration. Enjoy discounted rates until [Date].'
            },
            {
                id: 7,
                bookmarked: false,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
                active: false,
                name: 'Guy Hawkins',
                type: 'Events',
                time: 'Jan 11',
                title: 'Early Bird Registration Open - XYZ Conference 2024',
                message: ' Attention users, we have scheduled system maintenance on Jan 17. Expect minimal service disruption during this period. Thank you for your understanding.'
            },
            {
                id: 8,
                bookmarked: false,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png',
                active: false,
                name: 'Annette Black',
                type: '',
                time: 'Jan 8',
                title: 'Upcoming System Maintenance Notice',
                message: "Dear valued customer, as a token of appreciation, we're offering exclusive discounts for VIP customers. Explore the savings in the attached catalog. Expires [Date]."
            },
            {
                id: 9,
                bookmarked: true,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg',
                active: false,
                name: 'Darrell Steward',
                type: 'Discount',
                time: 'Jan 4',
                title: 'Special Discounts for VIP Customers',
                message: 'Hello Darrell Steward, stay updated with our latest news and highlights in the January edition of our newsletter. Enjoy the read!'
            },
            {
                id: 10,
                bookmarked: true,
                image: '',
                active: false,
                name: 'Jerome Bell',
                capName: 'JB',
                type: 'Newsletter',
                time: 'Jan 2',
                title: 'Monthly Newsletter - January Edition',
                message: "Dear user, we've updated our Terms of Service. Please review the changes to ensure compliance. Your continued use of our services implies acceptance. Thank you."
            },
            {
                id: 11,
                bookmarked: false,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
                active: false,
                name: 'Onyama Limba',
                type: '',
                time: 'Jan 2',
                title: 'Exclusive Travel Packages for You',
                message: 'Greetings traveler, explore our exclusive travel packages tailored just for you. Plan your next adventure with XYZ Travel. Offers valid until [Date].'
            },
            {
                id: 12,
                bookmarked: false,
                image: '',
                active: false,
                name: 'Robert Fox',
                capName: 'RF',
                type: 'Invitation',
                time: '12.12.2023',
                title: 'Invitation to Amsterdam',
                message: "Hello Robert Fox, you're invited to our upcoming webinar on Amsterdam. Join us on [Date and Time] for an insightful session. Reserve your spot now!"
            },
            {
                id: 13,
                bookmarked: true,
                image: '',
                active: false,
                name: 'Courtney Henry',
                capName: 'CH',
                type: '',
                time: '12.09.2023',
                title: 'New Arrivals - Check Out the Latest Books',
                message: 'Book enthusiasts, discover our latest arrivals! Explore the attached catalog and dive into the world of new releases. Available for purchase starting [Date].'
            },
            {
                id: 14,
                bookmarked: true,
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
                active: false,
                name: 'Arlene McCoy',
                type: '',
                time: '12.04.2023',
                title: 'New Product Demo',
                message: 'Exclusive demo of our latest product on Thursday.'
            },
            {
                id: 15,
                bookmarked: false,
                image: '',
                active: false,
                name: 'Jerome Bell',
                capName: 'JB',
                type: 'Newsletter',
                time: '10.01.2023',
                title: 'Monthly Newsletter - January Edition',
                message: "Dear user, we've updated our Terms of Service. Please review the changes to ensure compliance. Your continued use of our services implies acceptance. Thank you."
            }
        ];
    }
}
