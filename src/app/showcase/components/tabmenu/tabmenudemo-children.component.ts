import { Component } from "@angular/core";

@Component({
    template: `
        Home
    `
})
export class TabMenuDemoHome {

}

@Component({
    template: `
        Calendar <br>
        <a routerLink="/tabmenu/home">Go to Home</a>
    `
})
export class TabMenuDemoCalendar {

}

@Component({
    template: `
        Edit <br>
        <a routerLink="/tabmenu/home">Go to Home</a>
    `
})
export class TabMenuDemoEdit {

}

@Component({
    template: `
        Documentation <br>
        <a routerLink="/tabmenu/home">Go to Home</a>
    `
})
export class TabMenuDemoDocumentation {

}

@Component({
    template: `
        Settings <br>
        <a routerLink="/tabmenu/home">Go to Home</a>
    `
})
export class TabMenuDemoSettings {

}

