import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { TagModule } from 'primeng/tag';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';
import { InputOtpModule } from 'primeng/inputotp';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'cards-app',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        InputNumberModule,
        SelectModule,
        RadioButtonModule,
        ChipModule,
        InputSwitchModule,
        SelectButtonModule,
        SliderModule,
        BadgeModule,
        FormsModule,
        DividerModule,
        AvatarModule,
        TooltipModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        MenuModule,
        TagModule,
        AvatarGroupModule,
        InputOtpModule,
        AutoCompleteModule,
        FileUploadModule,
        OverlayBadgeModule,
        CheckboxModule,
    ],
    template: `
        <div class="text-color text-2xl font-medium leading-8">Cards</div>
        <div class="mt-1 text-muted-color leading-6">You can make cards using Aura like below 👇</div>
        <div class="mt-6 flex flex-wrap items-start gap-6">
            <div class="flex-1 flex flex-col gap-6">
                <div class="border border-surface rounded-3xl p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-3">
                        <p-overlayBadge severity="danger" styleClass="w-fit">
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
                                size="large"
                                styleClass="rounded-lg overflow-hidden flex"
                            />
                        </p-overlayBadge>

                        <div>
                            <div class="font-medium text-color leading-6">Jacob Jones</div>
                            <div class="mt-1 text-muted-color leading-5">hi&#64;jacobjones.co</div>
                        </div>
                    </div>
                    <div class="flex items-center gap-6">
                        <div class="text-sm leading-5 text-color">
                            14.k <span class="text-muted-color">Followers</span>
                        </div>
                        <div class="text-sm leading-5 text-color">
                            359 <span class="text-muted-color">Following</span>
                        </div>
                    </div>
                    <p class="text-sm text-muted-color leading-5 mb-0">
                        Meet Jacob Jones, the whimsical adventurer on a quest for life's quirks. From sock mysteries to
                        subway adventures, join him for a laughter-filled journey!
                    </p>
                    <div class="flex items-center justify-between gap-2">
                        <div class="text-sm leading-5 text-color font-medium">Mutual Friends</div>
                        <p-avatarGroup>
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar1.png"
                                size="small"
                                styleClass="rounded-lg overflow-hidden"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg"
                                size="small"
                                styleClass="rounded-lg overflow-hidden"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg"
                                size="small"
                                styleClass="rounded-lg overflow-hidden"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg"
                                size="small"
                                styleClass="rounded-lg overflow-hidden"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png"
                                size="small"
                                styleClass="rounded-lg overflow-hidden"
                            />
                            <p-avatar label="+99" size="small" styleClass="rounded-lg overflow-hidden text-xs" />
                        </p-avatarGroup>
                    </div>
                    <!-- <SelectButton
                        v-model="selectedUserSelectButtonOption"
                        :options="userSelectButtonOptions"
                        :pt="{
                            root: {
                                class: 'w-full'
                            },
                            pcbutton: {
                                root: {
                                    class: 'flex-1'
                                }
                            }
                        }"
                    /> -->
                    <p-selectButton
                        [(ngModel)]="selectedUserSelectButtonOption"
                        [options]="userSelectButtonOptions"
                        styleClass="w-full"
                    />
                    <div class="flex flex-col gap-4">
                        <div class="p-2 rounded-2xl flex items-center gap-3 bg-emphasis">
                            <p-overlayBadge severity="danger" class="w-fit">
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
                                    styleClass="rounded-lg overflow-hidden w-10 h-10 block"
                                />
                            </p-overlayBadge>

                            <div class="flex-1">
                                <div class="text-color text-sm font-medium leading-5">Jacob Jones</div>
                                <div class="mt-1 text-muted-color text-xs leading-4">hi&#64;jacobjones.co</div>
                            </div>
                            <p-button label="Join" />
                        </div>
                        <div class="p-2 rounded-2xl flex items-center gap-3 bg-emphasis">
                            <p-overlayBadge severity="danger" class="w-fit">
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg"
                                    styleClass="rounded-lg overflow-hidden w-10 h-10 flex"
                                />
                            </p-overlayBadge>

                            <div class="flex-1">
                                <div class="text-color text-sm font-medium leading-5">Courtney Henry</div>
                                <div class="mt-1 text-muted-color text-xs leading-4">cou.henry41&#64;courtney.co</div>
                            </div>
                            <p-button label="Join" />
                        </div>
                    </div>
                </div>
                <div class="border border-surface rounded-3xl p-6">
                    <div
                        class="flex items-center gap-3 p-3 border border-surface rounded-xl shadow-[0px_1px_2px_0px_rgba(18,18,23,0.05)]"
                    >
                        <p-avatar
                            image="https://www.primefaces.org/cdn/primevue/images/landing/apps/main-avatar.png"
                            styleClass="rounded-lg overflow-hidden"
                            class="w-14 h-14 avatar-image-fit-content"
                        />
                        <div class="flex-1">
                            <div class="text-color font-medium leading-7">Jacob Jones</div>
                            <div class="text-muted-color text-sm mt-1">hi&#64;jacobjones.co</div>
                        </div>
                        <p-button icon="pi pi-bell" severity="contrast" text />
                    </div>
                    <div class="mt-4 flex flex-col gap-1">
                        <button
                            class="w-full flex items-center gap-2 text-color p-2 bg-transparent hover:bg-emphasis active:bg-surface-200 dark:active:bg-surface-700 cursor-pointer rounded-lg transition-all select-none"
                        >
                            <i class="pi pi-envelope text-lg w-7 h-7 flex items-center justify-center"></i>
                            <div class="font-medium leading-normal flex-1 text-left">Messages</div>
                        </button>
                        <button
                            class="w-full flex items-center gap-2 text-color p-2 bg-transparent hover:bg-emphasis active:bg-surface-200 dark:active:bg-surface-700 cursor-pointer rounded-lg transition-all select-none"
                        >
                            <i class="pi pi-cog text-lg w-7 h-7 flex items-center justify-center"></i>
                            <div class="font-medium leading-normal flex-1 text-left">Settings</div>
                        </button>
                        <button
                            class="w-full flex items-center gap-2 text-color p-2 bg-transparent hover:bg-emphasis active:bg-surface-200 dark:active:bg-surface-700 cursor-pointer rounded-lg transition-all select-none"
                        >
                            <i class="pi pi-sync text-lg w-7 h-7 flex items-center justify-center"></i>
                            <div class="font-medium leading-normal flex-1 text-left">Switch Accounts</div>
                        </button>
                        <button
                            class="w-full flex items-center gap-2 text-color p-2 bg-transparent hover:bg-emphasis active:bg-surface-200 dark:active:bg-surface-700 cursor-pointer rounded-lg transition-all select-none"
                        >
                            <i class="pi pi-sign-in text-lg w-7 h-7 flex items-center justify-center"></i>
                            <div class="font-medium leading-normal flex-1 text-left">Log out</div>
                        </button>
                    </div>
                    <p-divider />
                    <div
                        class="w-full flex items-center gap-2 text-color p-2 bg-transparent cursor-pointer rounded-lg transition-all select-none"
                    >
                        <i
                            class="pi text-lg w-7 h-7 flex items-center justify-center"
                            [ngClass]="{
                                'pi-moon': !darkMode,
                                'pi-sun': darkMode
                            }"
                        ></i>
                        <div class="font-medium leading-normal flex-1 text-left">
                            Switch to {{ darkMode ? 'Light' : 'Dark' }}
                        </div>
                        <p-inputSwitch [(ngModel)]="darkMode" />
                    </div>
                </div>
                <div class="border border-surface rounded-3xl">
                    <div class="pt-6 px-6 flex flex-col gap-6">
                        <div class="flex items-start gap-2 justify-between">
                            <div>
                                <div class="text-2xl text-color font-medium">Data Analyst</div>
                                <div class="mt-2 text-color">Data Insights Ltd.</div>
                            </div>
                            <p-button
                                (click)="jobApplication = !jobApplication"
                                [icon]="jobApplication ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'"
                                severity="secondary"
                                outlined
                                rounded
                            />
                        </div>
                        <div class="flex flex-wrap gap-1 items-center justify-between">
                            <div class="flex items-center gap-2 whitespace-nowrap text-muted-color">
                                <i class="pi pi-users text-xl"></i>
                                <div class="font-medium leading-none">Senior</div>
                            </div>
                            <div class="flex items-center gap-2 whitespace-nowrap text-muted-color">
                                <i class="pi pi-stopwatch text-xl"></i>
                                <div class="font-medium leading-none">Full-Time</div>
                            </div>
                            <div class="flex items-center gap-2 whitespace-nowrap text-muted-color">
                                <i class="pi pi-money-bill text-xl"></i>
                                <div class="font-medium leading-none">$80,000</div>
                            </div>
                        </div>
                        <p class="leading-6 text-muted-color mb-0">
                            Expert in data analysis? Join Data Insights Ltd. as a senior data analyst. Lead in the world
                            of data with us!
                        </p>
                        <div class="flex flex-wrap gap-2 items-center">
                            <p-tag value="Data Analysis" rounded class="font-normal"></p-tag>
                            <p-tag value="Analytics" rounded class="font-normal"></p-tag>
                            <p-tag value="Big Data" rounded class="font-normal"></p-tag>
                        </div>
                    </div>
                    <div class="p-1 mt-4">
                        <button
                            class="p-4 rounded-3xl w-full bg-emphasis transition-all text-color hover:text-color-emphasis flex items-center gap-2 justify-between cursor-pointer"
                        >
                            <div class="flex items-center [&>*]:-mr-2">
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg"
                                    size="small"
                                    shape="circle"
                                />
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg"
                                    size="small"
                                    shape="circle"
                                />
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg"
                                    size="small"
                                    shape="circle"
                                />
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg"
                                    size="small"
                                    shape="circle"
                                />
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png"
                                    size="small"
                                    shape="circle"
                                />
                            </div>
                            <div class="flex items-center gap-2">
                                <div class="font-medium leading-6">12 Applicants</div>
                                <i class="pi pi-arrow-right"></i>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex flex-col gap-6">
                <div class="border border-surface rounded-3xl p-6 flex flex-col gap-6">
                    <div class="flex items-center gap-2 text-color">
                        <i class="pi pi-cloud-upload text-xl"></i>
                        <div class="flex-1 font-medium leading-6">Upload Files</div>
                        <p-button icon="pi pi-times" text rounded />
                    </div>
                    <div>
                        <label for="document-name" class="text-color font-medium leading-6">Document Name </label>
                        <input
                            type="text"
                            pInputText
                            id="document-name"
                            [(ngModel)]="documentName"
                            class="mt-2 w-full"
                        />
                    </div>
                    <div>
                        <label class="text-color font-medium leading-6">Upload Files</label>
                        <!-- <p-fileUpload
                            name="demo[]"
                            url="/api/upload"
                            (onUpload)="onTemplatedUpload($event)"
                            :pt="{
                                root: {
                                    class: 'bg-transparent border-dashed mt-2'
                                },
                                content: {
                                    class: 'p-0'
                                }
                            }"
                            accept="image/*"
                            :maxFileSize="1000000"
                            @select="onSelectedFiles"
                        > -->
                        <p-fileUpload
                            name="demo[]"
                            url="/api/upload"
                            (onUpload)="onTemplatedUpload($event)"
                            accept="image/*"
                            [maxFileSize]="1000000"
                            (onSelect)="onSelectedFiles($event)"
                        >
                            <ng-template
                                pTemplate="header"
                                let-chooseCallback="chooseCallback"
                                let-clearCallback="clearCallback"
                                let-uploadCallback="uploadCallback"
                            >
                                <div
                                    *ngIf="files.length > 0 || uploadedFiles.length > 0"
                                    class="flex w-full flex-wrap justify-between items-center flex-1 gap-4 border-b border-surface pb-4"
                                >
                                    <div class="flex gap-2">
                                        <p-button
                                            (click)="chooseCallback()"
                                            icon="pi pi-images"
                                            rounded
                                            outlined
                                            severity="secondary"
                                        ></p-button>
                                        <p-button
                                            (click)="uploadEvent(uploadCallback)"
                                            icon="pi pi-cloud-upload"
                                            rounded
                                            outlined
                                            severity="success"
                                            [disabled]="!files || files.length === 0"
                                        ></p-button>
                                        <p-button
                                            (click)="clearCallback()"
                                            icon="pi pi-times"
                                            rounded
                                            outlined
                                            severity="danger"
                                            [disabled]="!files || files.length === 0"
                                        ></p-button>
                                    </div>
                                </div>
                                <div
                                    *ngIf="files.length <= 0 && uploadedFiles.length <= 0"
                                    class="flex flex-col items-center justify-center p-6 cursor-pointer"
                                    (click)="chooseCallback()"
                                >
                                    <i class="pi pi-cloud-upload text-4xl text-color"></i>
                                    <div class="text-sm text-color font-medium mt-2">
                                        Click to upload <span class="text-muted-color">or and drop</span>
                                    </div>
                                    <p class="mt-2 mb-0 text-sm text-muted-color text-center">
                                        PDF, JPG, PNG, JPEG, DOC, CSV, XML, XMLX, XLS, XLSX (max 10MB)
                                    </p>
                                </div>
                            </ng-template>

                            <ng-template
                                pTemplate="content"
                                let-chooseCallback="chooseCallback"
                                let-clearCallback="clearCallback"
                                let-uploadCallback="uploadCallback"
                            >
                                <div *ngIf="files.length > 0" class="px-4 py-0">
                                    <h5 class="m-0 mb-2">Pending</h5>
                                    <div class="flex flex-wrap gap-2 grow overflow-auto max-h-[210px]">
                                        <div
                                            *ngFor="let file of files"
                                            class="card max-w-[120px] !p-2 m-0 flex flex-col border-1 surface-border items-center gap-2 text-center"
                                        >
                                            <div>
                                                <img
                                                    role="presentation"
                                                    [alt]="file.name"
                                                    [src]="file.objectURL"
                                                    width="100"
                                                    height="50"
                                                />
                                            </div>
                                            <span
                                                class="font-semibold max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                                                >{{ file.name }}</span
                                            >
                                            <span class="text-sm text-muted-color">{{ formatSize(file.size) }}</span>
                                            <div class="grow flex flex-col gap-2 justify-end">
                                                <p-badge value="Pending" severity="warning" />
                                                <p-button
                                                    icon="pi pi-times text-sm leading-none"
                                                    (click)="onRemoveTemplatingFile(file, removeFileCallback, index)"
                                                    class="!text-sm !leading-none"
                                                    label="Cancel"
                                                    text
                                                    severity="danger"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div *ngIf="uploadedFiles.length > 0" class="px-4 py-0">
                                    <h5 class="m-0 mb-2">Completed</h5>
                                    <div class="flex flex-wrap gap-2">
                                        <div
                                            *ngFor="let file of uploadedFiles"
                                            :key="file.name + file.type + file.size"
                                            class="card max-w-[120px] !p-2 m-0 flex flex-col border-1 surface-border items-center gap-2 text-center"
                                        >
                                            <div>
                                                <img
                                                    role="presentation"
                                                    [alt]="file.name"
                                                    :src="file.objectURL"
                                                    width="100"
                                                    height="50"
                                                />
                                            </div>
                                            <span
                                                class="font-semibold max-w-[100px] text-ellipsis whitespace-nowrap overflow-hidden"
                                                >{{ file.name }}</span
                                            >
                                            <span class="text-sm text-muted-color">{{ formatSize(file.size) }}</span>
                                            <div class="grow flex flex-col gap-2 justify-end">
                                                <p-badge value="Completed" class="mt-3" severity="success" />
                                                <p-button
                                                    icon="pi pi-times text-sm leading-none"
                                                    (click)="removeUploadedFileCallback(index)"
                                                    class="!text-sm !leading-none"
                                                    label="Cancel"
                                                    text
                                                    severity="danger"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ng-template>
                        </p-fileUpload>
                    </div>
                    <div>
                        <label class="text-color font-medium leading-6">Tag (Optional)</label>
                        <p-autoComplete
                            [(ngModel)]="filesTag"
                            styleClass="w-full mt-2"
                            inputId="multiple-ac-2"
                            multiple
                            (completeMethod)="search($event)"
                            [typeahead]="false"
                        />
                    </div>
                    <div class="flex items-center gap-2">
                        <label
                            *ngFor="let permission of permissions"
                            [key]="permission.key"
                            [for]="permission.key"
                            class="cursor-pointer flex-1 flex items-center gap-1 p-2 rounded-border border border-surface hover:bg-emphasis transition-all select-none"
                        >
                            <i class="text-color" :class="permission.icon"></i>
                            <div class="flex-1 text-sm leading-5 text-color">{{ permission.name }}</div>
                            <p-radioButton
                                [(ngModel)]="selectedPermission"
                                [inputId]="permission.key"
                                variant="filled"
                                name="dynamic"
                                [value]="permission.name"
                            />
                        </label>
                    </div>
                    <div class="flex items-center gap-2">
                        <button pButton label="Cancel" outlined class="flex-1"></button>
                        <button pButton label="Upload" class="flex-1"></button>
                    </div>
                </div>
                <div class="border border-surface rounded-3xl p-6">
                    <div class="flex items-start justify-between gap-1">
                        <div class="flex items-center gap-x-2 gap-y-1 flex-wrap flex-1">
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar1.png"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg"
                                size="small"
                                shape="circle"
                            />
                            <div class="w-full"></div>
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar10.jpg"
                                size="small"
                                shape="circle"
                            />
                            <p-avatar
                                image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg"
                                size="small"
                                shape="circle"
                            />
                        </div>
                        <p-button icon="pi pi-arrow-up-right" rounded text />
                    </div>
                    <div class="text-2xl font-medium text-color mt-6 leading-8">That's your avatar</div>
                    <div class="leading-6 text-muted-color mt-2">Easy to use! place it, watch it.</div>
                </div>
                <div class="border border-surface rounded-3xl p-6 flex flex-col gap-6">
                    <div class="flex items-center justify-between gap-2">
                        <div class="text-2xl font-medium leading-8 flex-1">Add Member</div>
                        <p-button icon="pi pi-times" rounded text severity="secondary" />
                    </div>
                    <div>
                        <div class="text-muted-color leading-6">Email</div>
                        <div class="flex items-start gap-3 mt-2">
                            <p-autoComplete
                                [(ngModel)]="emailChips"
                                inputId="multiple-ac-2"
                                styleClass="w-full"
                                class="flex-1"
                                multiple
                                (onSelect)="search($event)"
                                [typeahead]="false"
                            />
                            <p-button label="Invite" />
                        </div>
                    </div>
                    <div>
                        <div class="font-medium leading-6 text-muted-color">Members</div>
                        <div class="mt-4 flex flex-col gap-4">
                            <div class="flex items-center gap-2 justify-between">
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png"
                                    styleClass="w-9 h-9"
                                    shape="circle"
                                />
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-color leading-5">Brook Simmons</div>
                                    <div class="text-sm text-muted-color leading-5 line-clamp-4">
                                        brook.sim42&#64;primevue.org
                                    </div>
                                </div>
                                <p-select
                                    [(ngModel)]="memberSelectedTypes[0]"
                                    [options]="memberTypes"
                                    optionLabel="name"
                                    placeholder="Select"
                                    styleClass="!w-16"
                                />
                            </div>
                            <div class="flex items-center gap-2 justify-between">
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg"
                                    styleClass="w-9 h-9"
                                    shape="circle"
                                />
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-color leading-5">Dianne Russell</div>
                                    <div class="text-sm text-muted-color leading-5 line-clamp-4">
                                        di.russ23&#64;primevue.org
                                    </div>
                                </div>
                                <p-select
                                    [(ngModel)]="memberSelectedTypes[1]"
                                    [options]="memberTypes"
                                    optionLabel="name"
                                    placeholder="Select"
                                    styleClass="!w-16"
                                />
                            </div>
                            <div class="flex items-center gap-2 justify-between">
                                <p-avatar
                                    image="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg"
                                    styleClass="w-9 h-9"
                                    shape="circle"
                                />
                                <div class="flex-1">
                                    <div class="text-sm font-medium text-color leading-5">Jacob Jones</div>
                                    <div class="text-sm text-muted-color leading-5 line-clamp-4">
                                        jac.jon87&#64;primevue.org
                                    </div>
                                </div>
                                <p-select
                                    [(ngModel)]="memberSelectedTypes[2]"
                                    [options]="memberTypes"
                                    optionLabel="name"
                                    placeholder="Select"
                                    styleClass="!w-16"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="font-medium leading-6 text-muted-color">Copy Link</div>
                        <div class="flex items-center gap-3 mt-2">
                            <input
                                type="text"
                                pInputText
                                [(ngModel)]="copiedText"
                                type="text"
                                class="flex-1"
                                readOnly
                            />
                            <p-button label="Copy" severity="secondary" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 flex flex-wrap gap-6">
                <div class="flex-1 border border-surface rounded-3xl p-6">
                    <div class="text-color font-medium leading-6 mb-4">User Profiles</div>
                    <p-selectButton [(ngModel)]="userProfiles" [options]="userProfilesOptions" class="w-full" />
                    <div class="flex flex-col gap-4 mt-6">
                        <div class="flex items-center gap-3">
                            <i class="pi pi-volume-down text-color text-xl"></i>
                            <div class="leading-6 text-color flex-1">Sound</div>
                            <p-inputSwitch [(ngModel)]="userProfilesValues[0]" />
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="pi pi-wifi text-color text-xl"></i>
                            <div class="leading-6 text-color flex-1">Wi-Fi</div>
                            <p-inputSwitch [(ngModel)]="userProfilesValues[1]" />
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="pi pi-moon text-color text-xl"></i>
                            <div class="leading-6 text-color flex-1">Dark Mode</div>
                            <p-inputSwitch [(ngModel)]="userProfilesValues[2]" />
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="pi pi-map-marker text-color text-xl"></i>
                            <div class="leading-6 text-color flex-1">Location Services</div>
                            <p-inputSwitch [(ngModel)]="userProfilesValues[3]" />
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="pi pi-shield text-color text-xl"></i>
                            <div class="leading-6 text-color flex-1">Privacy Settings</div>
                            <p-inputSwitch [(ngModel)]="userProfilesValues[4]" />
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="pi pi-sync text-color text-xl"></i>
                            <div class="leading-6 text-color flex-1">Auto Update</div>
                            <p-inputSwitch [(ngModel)]="userProfilesValues[5]" />
                        </div>
                    </div>
                </div>
                <div class="flex-1 border border-surface rounded-3xl p-6 flex flex-col gap-6">
                    <div class="font-medium text-color text-2xl text-center">Forgot Password</div>
                    <div>
                        <div class="text-muted-color text-lg text-center leading-snug">
                            Verification code <br />
                            has been sent to email
                        </div>
                        <div
                            class="rounded-full px-4 py-1 bg-surface-200 dark:bg-surface-800 w-fit mx-auto mt-4 text-color text-lg leading-relaxed"
                        >
                            u*******m&#64;gmail.com
                        </div>
                    </div>
                    <div class="flex items-center justify-center">
                        <p-button label="Resend" text />
                    </div>
                    <div class="flex items-center justify-center">
                        <p-inputOtp [(ngModel)]="forgotPasswordOTP" [length]="6" integerOnly class="w-full" />
                    </div>
                    <button pButton label="Change password" class="w-full"></button>
                </div>
                <div class="border border-surface rounded-3xl p-6">
                    <div class="text-color font-medium leading-6 mb-6">Price Range</div>
                    <div>
                        <p-slider [(ngModel)]="priceRange" [min]="0" range [max]="15000" />
                    </div>
                    <div class="mt-4 flex gap-2">
                        <div class="flex-1">
                            <label for="price-min-val" class="leading-6 text-color">Min Value</label>
                            <p-inputNumber
                                [(ngModel)]="priceRange[0]"
                                [min]="0"
                                inputId="price-min-val"
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                styleClass="w-full"
                            />
                        </div>
                        <div class="flex-1">
                            <label for="price-max-val" class="leading-6 text-color">Max Value</label>
                            <p-inputNumber
                                [(ngModel)]="priceRange[1]"
                                inputId="price-max-val"
                                mode="currency"
                                currency="USD"
                                locale="en-US"
                                styleClass="w-full"
                            />
                        </div>
                    </div>
                    <div class="mt-4">
                        <div class="text-color font-medium leading-6 mb-6">Popular specs</div>
                        <div class="flex items-center gap-4 flex-wrap">
                            <div *ngFor="let data of priceRangePopularSpecs" class="flex align-items-center">
                                <p-checkbox
                                    [(ngModel)]="priceRangePopularSpecsChecked"
                                    [inputId]="data.value"
                                    [name]="data.value"
                                    [value]="data.value"
                                />
                                <label [for]="data.value" class="ml-2">{{ data.value }}</label>
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3 flex-wrap [&>*]:flex-1 mt-6">
                        <button pButton label="Undo" outlined class="w-full"></button>
                        <button pButton label="Random" class="w-full"></button>
                    </div>
                </div>
            </div>
        </div>
    `,
    host: {
        class: 'flex-1 h-full overflow-y-auto overflow-x-clip overflow-hidden border border-surface rounded-2xl p-6',
    },
    providers: [MessageService],
    styleUrls: ['./styles/cardsapp.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CardsApp {
    files = [];

    uploadedFiles: any[] = [];

    totalSize: number = 0;

    totalSizePercent: number = 0;

    jobApplication: boolean = false;

    userProfiles: string = 'Chilling';

    userProfilesOptions: string[] = ['Chilling', 'Do Not Disturb'];

    userProfilesValues: boolean[] = [true, true, false, false, true, false];

    forgotPasswordOTP: string = '023';

    priceRange: number[] = [0, 10000];

    priceMinVal: number = 0;

    priceMaxVal: number = 100000;

    priceRangePopularSpecs: any;

    priceRangePopularSpecsChecked: string[] = ['Furnished', 'Detached', 'Balcony', 'Sea view'];

    userSelectButtonOptions: string[] = ['Joined', 'Hosted'];

    selectedUserSelectButtonOption: string = 'Joined';

    darkMode: boolean = false;

    emailChips: any;

    memberSelectedTypes: string[] = ['O', 'E', 'V'];

    memberTypes: any;

    copiedText: string = "https://www.example.com/shared-files/user123/document-collection/file12345';";

    documentName: string = 'Aura Theme';

    filesTag: string[] = ['ui', 'redesign', 'dashboard'];

    selectedPermission: string = 'Everyone';

    permissions: any;

    items: any;

    constructor(private config: PrimeNGConfig, private messageService: MessageService) {}

    ngOnInit() {
        this.priceRangePopularSpecs = [
            { value: 'Furnished', checked: true },
            { value: 'Unfurnished', checked: false },
            { value: 'Detached', checked: true },
            { value: 'Underfloor heating', checked: false },
            { value: 'Balcony', checked: true },
            { value: 'Duplex', checked: false },
            { value: 'Triplex', checked: false },
            { value: 'Garden', checked: false },
            { value: 'Central location', checked: false },
            { value: 'Sea view', checked: true },
        ];
        this.memberTypes = [
            { name: 'Owner', code: 'O' },
            { name: 'Editor', code: 'E' },
            { name: 'Viewer', code: 'V' },
        ];

        this.permissions = [
            { name: 'Everyone', icon: 'pi pi-globe', key: 'E' },
            { name: 'Admins only', icon: 'pi pi-users', key: 'A' },
        ];
    }

    onRemoveTemplatingFile(file, removeFileCallback, index) {
        removeFileCallback(index);
        this.totalSize -= parseInt(this.formatSize(file.size));
        this.totalSizePercent = this.totalSize / 10;
    }

    onClearTemplatingUpload(clear) {
        clear();
        this.totalSize = 0;
        this.totalSizePercent = 0;
    }

    onSelectedFiles(event) {
        this.files = event.files;
        this.files.forEach((file) => {
            this.totalSize += parseInt(this.formatSize(file.size));
        });
    }

    uploadEvent(callback) {
        this.totalSizePercent = this.totalSize / 10;
        callback();
    }

    onTemplatedUpload(event) {
        for (let file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
    }

    formatSize(bytes) {
        const k = 1024;
        const dm = 3;
        const sizes = this.config.translation.fileSizeTypes;

        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }

        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

        return `${formattedSize} ${sizes[i]}`;
    }

    search(event) {
        this.items = [...Array(10).keys()].map((item) => event.query + '-' + item);
    }
}