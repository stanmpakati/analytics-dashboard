import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

export enum ActionType {
  LINK = "LINK",
  BUTTON = "BUTTON"
}

export interface TableAction {
  value: string,
  idFieldVal: string,
  type: ActionType
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any[];
  @Input() displayedColumns: string[];
  @Input() dataSource: MatTableDataSource<any>;
  @Input() actions: TableAction[];
  @Input() hasPages: boolean = false;
  @Input() length: number;
  @Output() onParentCall = new EventEmitter<any>();
  @Output() tellParentToReload = new EventEmitter<{ pageIndex: number, pageSize: number }>();
  allColumns: string[];
  actionType = ActionType;

  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 20];
  isLoading = false;

  constructor(private _liveAnnouncer: LiveAnnouncer, private cdr: ChangeDetectorRef) { }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    if (this.data && this.data.length > 0)
      this.allColumns = Object.keys(this.data[0]);

//       this.dataSource.data = [
//     {
//         id: 202,
//         username: "admin",
//         password: "admin",
//         role: "ADMIN",
//         createdAt: 1686458296552,
//         updated: 1686458296552
//     }
// ]

    if (this.dataSource?.data) this.allColumns = Object.keys(this.dataSource?.data[0]);

    if (this.actions?.length > 0 && this.displayedColumns.indexOf("actions") === -1)
      this.displayedColumns.push("actions")
  }

  ngAfterViewInit() {
    if (!this.dataSource) this.dataSource = new MatTableDataSource(this.data)

    this.dataSource.sort = this.sort;
    this.cdr.detectChanges()
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  callParentFunction(element: any, action: TableAction) {
    this.onParentCall.emit([element, action]);
  }

  onPageChange(event: PageEvent) {
    this.isLoading = true;

    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;

    this.tellParentToReload.emit({ pageIndex: this.pageIndex + 1, pageSize: this.pageSize })
  }
}
