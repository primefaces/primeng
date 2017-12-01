import { ObjectUtils } from './objectutils';
import { inject, TestBed } from '@angular/core/testing';

describe('ObjectUtils Suite', () => {
    
    let objectUtils: ObjectUtils = null;
    
    beforeEach(() => TestBed.configureTestingModule({
        providers: [ ObjectUtils ]
    }));
    
    beforeEach(inject([ObjectUtils], s => {
        objectUtils = s;
    }));
    
    let data: any = [
        {brand: "VW", year: 2012, color: {name:"Orange"}, vin: "dsad231ff"},
        {brand: "Audi", year: 2011, color: {name:"Black"}, vin: "gwregre345"},
        {brand: "Renault", year: 2005, color: {name:"Black"}, vin: "h354htr"},
        {brand: "BMW", year: 2003, color: {name:"Blue"}, vin: "j6w54qgh"},
        {brand: "Mercedes", year: 1995, color: {name:"Red"}, vin: "hrtwy34"},
        {brand: "Volvo", year: 2005, color: {name:"Orange"}, vin: "jejtyj"},
        {brand: "Honda", year: 2012, color: {name:"Blue"}, vin: "g43gr"},
        {brand: "Jaguar", year: 2013,color: {name:"Black"}, vin: "greg34"},
        {brand: "Ford", year: 2000, color: {name:"White"}, vin: "h54hw5"},
        {brand: "Fiat", year: 2013, color: {name:"Yellow"}, vin: "245t2s"}
    ];
    
    it('Should resolve field data', () => {
        let obj = {
            firstname: 'Silvio',
            lastname: 'Andolini',
            address: {
                country: {
                    name: 'Italy'
                },
                city: 'Corleone'
            }
        }
        
        expect(objectUtils.resolveFieldData(obj, 'firstname')).toBe('Silvio');
        expect(objectUtils.resolveFieldData(obj, 'lastname')).toBe('Andolini');
        expect(objectUtils.resolveFieldData(obj, 'address.city')).toBe('Corleone');
        expect(objectUtils.resolveFieldData(obj, 'address.country.name')).toBe('Italy');
        expect(objectUtils.resolveFieldData(obj, 'age')).toBeUndefined();
    });
    
    it('Should run single field correctly', () => {
        let result = objectUtils.filter(data, ['brand'], 'b');
        expect(result[0].brand).toBe('BMW');
    });
    
    it('Should run multiple filter correctly', () => {
        let result = objectUtils.filter(data, ['brand','color.name'], 'w');
        expect(result[0].brand).toBe('VW');
        expect(result[1].brand).toBe('BMW');
        expect(result[2].brand).toBe('Ford');
    });
    
    it('Should relocate an item in array', () => {
        let arr: string[] = ['New York', 'Istanbul', 'Paris', 'Barcelona', 'London'];
        objectUtils.reorderArray(arr, 3, 1);
        expect(arr).toEqual(['New York', 'Barcelona', 'Istanbul', 'Paris', 'London']);
    });
    
    it('Should inject an item as indexed', () => {
        let sourceArr: string[] = ['New York', 'Istanbul', 'Paris', 'Barcelona', 'London'];
        let arr: string[] = [];
        
        objectUtils.insertIntoOrderedArray('Istanbul', 1, arr, sourceArr);
        expect(arr).toEqual(['Istanbul']);
        
        objectUtils.insertIntoOrderedArray('Paris', 2, arr, sourceArr);
        objectUtils.insertIntoOrderedArray('New York', 0, arr, sourceArr);
        objectUtils.insertIntoOrderedArray('London', 4, arr, sourceArr);
        objectUtils.insertIntoOrderedArray('Barcelona', 3, arr, sourceArr);
        expect(arr).toEqual(['New York', 'Istanbul', 'Paris', 'Barcelona', 'London']);
    });

});