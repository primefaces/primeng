import {Component} from 'angular2/core';
import {SelectButton} from '../../../components/selectbutton/selectbutton';
import {TabView} from '../../../components/tabview/tabview';
import {TabPanel} from '../../../components/tabview/tabpanel';
import {Button} from '../../../components/button/button';
import {SelectItem} from '../../../components/api/selectitem';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    templateUrl: 'showcase/demo/selectbutton/selectbuttondemo.component.html',
    directives: [SelectButton, TabPanel, TabView, Button, ROUTER_DIRECTIVES]
})
export class SelectbuttonDemoComponent {

    teams: SelectItem[];

    selectedTeam: string;

    selectedTeams: string[];

    cars: SelectItem[];

    selectedCar: string = 'BMW';

    constructor() {
        this.teams = [];
        this.teams.push({label: 'Barcelona', value: 'Barcelona'});
        this.teams.push({label: 'Real Madrid', value: 'Real Madrid'});
        this.teams.push({label: 'Bayern Munich', value: 'Bayern Munich'});

        this.cars = [];
        this.cars.push({ label: 'Audi', value: 'Audi' });
        this.cars.push({ label: 'BMW', value: 'BMW' });
        this.cars.push({ label: 'Fiat', value: 'Fiat' });
        this.cars.push({ label: 'Ford', value: 'Ford' });
        this.cars.push({ label: 'Honda', value: 'Honda' });
        this.cars.push({ label: 'Jaguar', value: 'Jaguar' });
        this.cars.push({ label: 'Mercedes', value: 'Mercedes' });
        this.cars.push({ label: 'Renault', value: 'Renault' });
        this.cars.push({ label: 'Volkswagen', value: 'Volkswagen' });
        this.cars.push({ label: 'Volvo', value: 'Volvo' });
    }
}