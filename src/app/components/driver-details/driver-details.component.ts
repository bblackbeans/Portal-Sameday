import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogDataProps {
  driverDocument: string;
  driverId: number;
  driverMail: string;
  driverName: string;
  driverPhone: string;
  idOrder: number;
  qtdOrders: number;
  totalKms: string;
  totalOrdersTime: number;
  totalTimeDelivery: number;
}

@Component({
  selector: 'driver-details',
  templateUrl: 'driver-details.component.html'  
})
export class DriverDetailsComponent {

  constructor(
    public dialogRef: MatDialogRef<DriverDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataProps,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}