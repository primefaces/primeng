import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import APIDoc from 'src/app/showcase/doc/apidoc/index.json';
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
            let module = APIDoc[moduleName] ? APIDoc[moduleName] : APIDoc[this.docs[0].toLowerCase()].components[docName];

            let newDoc = {
                id:`api.${moduleName}`,
                label: docName, 
                description: APIDoc[moduleName]?.description || 'No description available.',
                children: [],
                docName: docName
            };

            if(module) {
                let props = module.components && module.components[docName] ? module.components[docName].props : module.props ? module.props : undefined;
                let emits = module.components && module.components[docName] ? module.components[docName].emits : module.emits ? module.emits : undefined;
                let templates = module.interfaces ? module.interfaces.templates : undefined;
                let events = module.interfaces ? module.interfaces.events : undefined;
                let methods = module.components && module.components[docName] ? module.components[docName].methods : module.methods ? module.methods : undefined;
                let interfaces = module.interfaces ? module.interfaces : undefined;

                if (props && props.values.length) {
                    newDoc.children.push({
                        id: `api.${docName}.props`,
                        label: 'Properties',
                        component: AppDocApiTable,
                        description: `Properties of ${docName} component.`,
                        data: this.setPropsData(props.values)
                    });
                }

                if (emits && emits.values.length) {
                    newDoc.children.push({
                        id: `api.${docName}.emitters`,
                        label: 'Emitters',
                        description: `Event emitters of ${docName} component.`,
                        component: AppDocApiTable,
                        data: this.setEmitData(emits.values)
                    });
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

                if(templates && templates.values.length && templates.values[0].parent === moduleName) {
                    newDoc.children.push({
                        id: `api.${docName}.templates`,
                        label: 'Methods',
                        description: `Methods of ${docName} component.`,
                        component: AppDocApiTable,
                        data: this.setEmitData(templates.values)
                    })
                }

                if(interfaces && interfaces.values && interfaces.values.length) {
                    interfaces.values.forEach(value => {
                        newDoc.children.push({
                            id: `api.${moduleName}.interfaces.${value.name}`,
                            label: value.name,
                            component: AppDocApiTable,
                            description: value.description,
                            data: value.props && this.setInterfacesData(value)
                        })
                    })
                }

                if(events && events.values.length) {
                    newDoc.children.push({
                        id: `api.${moduleName}.events`,
                        label: 'Events',
                        component: AppDocApiTable,
                        data: this.setEventsData(moduleName, events.values),
                        description: `Events used in ${docName} component.`
                    });
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
            deprecated: prop.deprecated,
            optional: prop.optional
        }));
    }

    setInterfacesData(value) {
        return value.props.map(prop => ({
            name: prop.name,
            type: prop.type,
            default: prop.default,
            optional: prop.optional,
            description: prop.description
        }))
    }

    ngOnDestroy() {
        this.location.go(this.location.path().split('#')[0]);
    }
}
