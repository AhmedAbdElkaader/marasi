import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'unitsearch',
  templateUrl: './unitsearch.component.html',
  styles: [`
  nb-card {
    transform: translate3d(0, 0, 0);
  }
`],
})
export class UnitsearchComponent implements OnInit {
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  [x: string]: any;
  settings = {
    noDataMessage: "No Owners/Units found",
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
        filter: false
      },
      name: {
        title: 'Name',
        type: 'string',
        editable: false,
        filter: false
      },
      unitFullName: {
        title: 'Unit',
        type: 'string',
        editable: false,
        filter: false
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    }
  }
  source: LocalDataSource = new LocalDataSource();
  // source: any = []
  constructor() { 
  }

  ngOnInit() {
    console.log(this.records)
    this.source.load(this.records.owners);

  }
  selectOwner(data) {
    console.log(data);
    this.notify.emit(data.data);
    this.close()
  }
}
