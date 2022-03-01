import { Component,ElementRef,OnInit,ViewChild,OnDestroy, ChangeDetectorRef } from "@angular/core";
import { MenuItem, TreeNode } from "primeng/api";
import { NodeService } from "../../service/nodeservice";
import { CustomerService } from "../../service/customerservice";
import { Table } from "primeng/table";
import { AppConfigService } from "../../service/appconfigservice";
import { Subscription } from "rxjs";
import { AppConfig } from "../../domain/appconfig";
import { AppMainComponent } from "../../app.main.component";
import { Country, Customer, Representative } from "../../domain/customer";
interface City {
    name: string;
    code: string;
}
@Component({
    selector: "landing",
    templateUrl: "./landing.component.html",
    providers: [AppMainComponent],
})
export class LandingComponent implements OnInit, OnDestroy {
	
    @ViewChild("containerElement") containerElement: ElementRef;

    @ViewChild("dt") table: Table;

    @ViewChild("editor") editor: ElementRef;

    menuActive: boolean = false;

    scrollListener: any;

    chartData: any;

    chartOptions: any;

    items: MenuItem[];

    selectButtonOptions: any;

    treeData: TreeNode[];

    val1: number = 240;

    val2: number = 356;

    selectedValue: string = "C";

    checked: boolean = false;

    selectedVal: any;

    rangeValues = [20, 80];

    date1: any;

    date2: any;

    customers: any;

    selectedCustomers: Customer[];

    representatives: Representative[];

    statuses: any[];

    loading: boolean = true;

    fonts: any[];

    selectedFont: any;

    inputStyle: any;

    size: any;

    selectedCity: City;

    cities: City[];

    price: any;

    subscription: Subscription;

    config: AppConfig;

    darkMode: boolean = false;

    setAnimation: boolean = false;

    theme: string = "lara-light-indigo";

    constructor(private nodeService: NodeService, private customerService: CustomerService, private configService: AppConfigService, public appMain: AppMainComponent, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
                this.appMain.changeTheme(config);
                this.changeTableTheme(config);
            }
        );

        this.chartData = {
            labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
            ],
            datasets: [
                {
                    label: "Income",
                    data: [40, 59, 40, 50, 56, 40, 70],
                    fill: true,
                    borderColor: "#03C4E8",
                    tension: 0.4,
                    backgroundColor: "rgba(3, 196, 232, .2)",
                },
            ],
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    display: false,
                },
            },
            scales: {
                y: {
                    ticks: {
                        display: false,
                    },
                    min: 0,
                    max: 100,
                },
                x: {
                    ticks: {
                        display: false,
                    },
                },
            },
        };

        this.selectButtonOptions = [
            { name: "Prime", value: 1 },
            { name: "Angular", value: 2 },
            { name: "Themes", value: 3 },
        ];

        this.items = [
            { label: "Home", icon: "pi pi-fw pi-home" },
            { label: "Calendar", icon: "pi pi-fw pi-calendar" },
            { label: "Settings", icon: "pi pi-fw pi-cog" },
        ];

        this.nodeService.getFiles().then((files) => (this.treeData = files));

        this.customerService.getCustomersLarge().then((customers) => {
            this.customers = customers;
            this.loading = false;
        });

        this.representatives = [
            { name: "Amy Elsner", image: "amyelsner.png" },
            { name: "Anna Fali", image: "annafali.png" },
            { name: "Asiya Javayant", image: "asiyajavayant.png" },
            { name: "Bernardo Dominic", image: "bernardodominic.png" },
            { name: "Elwin Sharvill", image: "elwinsharvill.png" },
            { name: "Ioni Bowcher", image: "ionibowcher.png" },
            { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
            { name: "Onyama Limba", image: "onyamalimba.png" },
            { name: "Stephen Shaw", image: "stephenshaw.png" },
            { name: "XuXue Feng", image: "xuxuefeng.png" },
        ];

        this.statuses = [
            { label: "Unqualified", value: "unqualified" },
            { label: "Qualified", value: "qualified" },
            { label: "New", value: "new" },
            { label: "Negotiation", value: "negotiation" },
            { label: "Renewal", value: "renewal" },
            { label: "Proposal", value: "proposal" },
        ];

        this.fonts = [
            {
                label: "Arial",
                value: "Arial,Helvetica Neue,Helvetica,sans-serif",
            },
            {
                label: "System",
                value: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
            },
            {
                label: "Trebuches MS",
                value: "Trebuchet MS,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Tahoma,sans-serif",
            },
            { label: "Verdana", value: "Verdana,Geneva,sans-serif" },
        ];

        this.cities = [
            { name: "New York", code: "NY" },
            { name: "Rome", code: "RM" },
            { name: "London", code: "LDN" },
            { name: "Paris", code: "PRS" },
        ];

        this.bindScrollListener();
        this.initTheme();
    }

    ngAfterViewInit() {
        this.setAnimation = true;
		this.cd.detectChanges();
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }

        this.unbindScrollListener();
    }

    initTheme() {
        if (this.config.dark)
            this.appMain.changeTheme({
                ...this.config,
                theme: "lara-dark-indigo",
            });
        else
            this.appMain.changeTheme({
                ...this.config,
                theme: "lara-light-indigo",
            });
    }

    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = () => {
                if (window.scrollY > 0) {
                    this.containerElement.nativeElement.classList.add(
                        "landing-header-sticky"
                    );
                } else {
                    this.containerElement.nativeElement.classList.remove(
                        "landing-header-sticky"
                    );
                }
            };
        }

        window.addEventListener("scroll", this.scrollListener);
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            window.removeEventListener("scroll", this.scrollListener);
            this.scrollListener = null;
        }
    }

    handleChange(event) {
        this.checked = event.checked;
    }

    toggleDarkMode() {
        this.config.dark = !this.config.dark;
        let theme = this.config.dark
            ? this.theme.replace("light", "dark")
            : this.theme.replace("dark", "light");
        this.config = { ...this.config, dark: this.config.dark, theme: theme };

        this.configService.updateConfig(this.config);
    }

    changeTableTheme(value) {
        value.theme = this.config.dark
            ? value.theme.replace("light", "dark")
            : value.theme.replace("dark", "light");

        this.theme = value.theme;

        let href =
            "assets/showcase/styles/app/landing/themes/" +
            value.theme +
            "/theme.css";
        document.getElementById("home-table-link").setAttribute("href", href);
    }

    changeFont() {
        this.editor.nativeElement.style.setProperty(
            "--dd-font",
            this.selectedFont
        );
    }

    changeDesignerTheme(color, darker) {
        this.editor.nativeElement.style.setProperty("--dd-primary", color);
        this.editor.nativeElement.style.setProperty(
            "--dd-primary-darker",
            darker
        );
    }

    onActivityChange(event) {
        const value = event.target.value;
        if (value && value.trim().length) {
            const activity = parseInt(value);

            if (!isNaN(activity)) {
                this.table.filter(activity, "activity", "gte");
            }
        }
    }

    onDateSelect(value) {
        this.table.filter(this.formatDate(value), "date", "equals");
    }

    formatDate(date) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = "0" + month;
        }

        if (day < 10) {
            day = "0" + day;
        }

        return date.getFullYear() + "-" + month + "-" + day;
    }

    onRepresentativeChange(event) {
        this.table.filter(event.value, "representative", "in");
    }
}
