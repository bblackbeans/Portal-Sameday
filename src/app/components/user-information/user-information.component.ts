import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-same-day-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserInformationComponent implements OnInit {

  displayedColumns = ['name', 'cpfcnpj', 'phone', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(
    private dialogRef: MatDialogRef<UserInformationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.dialogRef.disableClose = true; }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data.historic);

    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 200);
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    this.dataSource.filter = filterValue;
  }

  public close(record?) {
    this.dialogRef.close(record ? record : false);
  }

}