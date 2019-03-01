import { Component } from '@angular/core';
import { TreeNode, LazyLoadEvent } from '../../../components/common/api';
import { NodeService } from '../../service/nodeservice';

@Component({
    templateUrl: './treetablescrolldemo.html'
})
export class TreeTableScrollDemo {
    
    files1: TreeNode[];

    files2: TreeNode[];

    files3: TreeNode[];

    files4: TreeNode[];

    files5: TreeNode[];

    cols: any[];

    frozenCols: any[];

    scrollableCols: any[];

    loading: Boolean = false;

    totalRecords:any;

    constructor(private nodeService: NodeService) { }

    ngOnInit() {
        this.nodeService.getFilesystem().then(files => this.files1 = files);
        this.nodeService.getFilesystem().then(files => this.files2 = files);
        this.nodeService.getFilesystem().then(files => this.files3 = files);
        this.nodeService.getFilesystem().then(files => this.files4 = files);

        this.cols = [
            { field: 'name', header: 'Name' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.scrollableCols = [
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' },
            { field: 'size', header: 'Size' },
            { field: 'type', header: 'Type' }
        ];

        this.frozenCols = [
            { field: 'name', header: 'Name' }
        ];

        this.totalRecords = 250000;
        this.loading = true;
    }

    loadDataOnScroll(event: LazyLoadEvent) {      
        this.loading = true;   

        //for demo purposes keep loading the same dataset 
        //in a real production application, this data should come from server by building the query with LazyLoadEvent options 
        setTimeout(() => {
            this.files5 = [
                {  
                    "data":{  
                        "name": event.first + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+1 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+2 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+3 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+4 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+5 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+6 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+7 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+8 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            }
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+9 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+10 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+11 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+12 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+13 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+14 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+15 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+16 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            }
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+17 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name": event.first+18 + " Applications",
                        "size":"200mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"Angular",
                                "size":"25mb",
                                "type":"Folder"
                            },
                        },
                        {  
                            "data":{  
                                "name":"editor.app",
                                "size":"25mb",
                                "type":"Application"
                            }
                        },
                        {  
                            "data":{  
                                "name":"settings.app",
                                "size":"50mb",
                                "type":"Application"
                            }
                        }
                    ]
                },
                {  
                    "data":{  
                        "name":event.first+19 + " Cloud",
                        "size":"20mb",
                        "type":"Folder"
                    },
                    "children":[  
                        {  
                            "data":{  
                                "name":"backup-1.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        },
                        {  
                            "data":{  
                                "name":"backup-2.zip",
                                "size":"10mb",
                                "type":"Zip"
                            }
                        }
                    ]
                },
            ];
            
            this.loading = false;  
        }, 250);   
    }
}