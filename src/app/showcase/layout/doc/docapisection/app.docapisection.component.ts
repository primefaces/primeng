import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Doc } from 'src/app/showcase/domain/doc';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import APIDocs from 'src/app/showcase/doc/apidoc/index.json';
import { AppDocApiTable } from '../docapitable/app.docapitable.component';

@Component({
    selector: 'app-docapisection',
    templateUrl: './app.docapisection.component.html'
})
export class AppDocApiSection {
    @Input() header!: string;

    @Input() docs!: any[];

    _docs!: any[];

    constructor(private location: Location, private router: Router, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        if (!this.router.url.includes('#api')) {
            this.location.go(this.location.path().split('#')[0]);
        }
        if(this.docs) {
            this._docs = this.createDocs();
        }
    }

    createDocs() {
        const newDocs = [];

        for(const docName of this.docs){
            const moduleName = docName.toLowerCase();

            let newDoc = {
                id:`api.${moduleName}`,
                label: docName, 
                description: APIDocs[moduleName]?.description || 'No description available.',
                children: [],
                docName: docName
            };

            const interfaceModule = APIDocs[moduleName + '.interface'] ?? undefined;
            const components = APIDocs[this.docs[0].toLowerCase()]?.components;

            let props = null;
            let emits = null;
            let templates = null;
            let events = null;
            let methods = null;

            if(components) {
                props = components[docName].props;
                emits = components[docName].emits;
                methods = components[docName].methods;

                if(props && props.values.length) {
                    newDoc.children.push({
                        id: `api.${docName}.props`,
                        label: 'Properties',
                        component: AppDocApiTable,
                        description: `Properties of ${docName} component.`,
                        data: this.setPropsData(props.values)
                    })
                }

                if(emits && emits.values.length) {
                    newDoc.children.push({
                        id: `api.${docName}.emitters`,
                        label: 'Emitters',
                        description: `Event emitters of ${docName} component.`,
                        component: AppDocApiTable,
                        data: this.setEmitData(emits.values)
                    })
                }

                if(methods && methods.values.length) {
                    newDoc.children.push({
                        id: `api.${docName}.methods`,
                        label: 'Methods',
                        description: `Methods of ${docName} component.`,
                        component: AppDocApiTable,
                        data: this.setEmitData(methods.values)
                    })
                }
            }

            if(interfaceModule) {
                templates = interfaceModule.templates ?? undefined;
                events = interfaceModule.events ?? undefined;
                
                if(templates && templates.values && templates.values.length){
                    newDoc.children.push({
                        id:`api.${docName}.templates`,
                        label: 'Templates',
                        description: templates.description,
                        component: AppDocApiTable,
                        data: this.setEmitData(templates.values)
                    })
                }

                if(events && events.values && events.values.length){
                    newDoc.children.push({
                        id:`api.${docName}.events`,
                        label: 'Events',
                        description: events.description,
                        component: AppDocApiTable,
                        data: this.setEventsData(moduleName, events.values)
                    })
                }
            }
            newDocs.push(newDoc);
        }
        return newDocs;
    }

    setEventsData(moduleName, events) {
        const data = [];

        for(const event of events){
            const eventData = {
                id: `api.${moduleName}.events.${event.name}`,
                label: event.name,
                component: AppDocApiTable,
                description: event.description,
                relatedProp: event.relatedProp ?? 'Related Prop',
                data: []
            }

            if(event.props && event.props.length) {
                event.props.forEach((prop) => {
                    eventData.data.push({
                        name: prop.name,
                        type: prop.type,
                        description: prop.description
                    })
                })
            }
            
            data.push(eventData);
        }

        return data;
    }

    setEmitData(emitters){
        return emitters.map(emitter => ({
            name: emitter.name,
            parameters: {name: emitter.parameters[0]?.name, type: emitter.parameters[0]?.type},
            returnType: emitter.returnType, 
            description: emitter.description, 
            deprecated: emitter.deprecated
        }));
    }

    setPropsData(props) {
        return props.map(prop => ({
            name: prop.name,
            type: prop.type,
            default: prop.default,
            description: prop.description,
            deprecated: prop.deprecated
        }));
    }

    // generateDocs() {
    //     if (this.docs) {
    //         for (let i = 0; i < this.docs.length; i++) {
    //             const doc = this.docs[i];
    //             const _doc = {
    //                 ...doc,
    //                 id: `api.${doc.id}`
    //             };
    //             this._docs.push(_doc);
    //         }
    //     }
    // }

    ngOnDestroy() {
        this.location.go(this.location.path().split('#')[0]);
    }
}
