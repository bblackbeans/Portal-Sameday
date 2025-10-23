import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DynamicMessageService {

  public verticalPosition: MatSnackBarVerticalPosition = 'top';
  public horizontalPosition: MatSnackBarHorizontalPosition = 'right';

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  /**
  * @param {String} msg - endpoint return message
  * @param {String} color - standard - success - primary - error
  * @param {Number} duration - Example 3000 equals 3sg
  * @param {String} horizontalPosition - start - center - end - left - right
  * @param {String} verticalPosition - top - bottom
  */
  open(msg, color?, duration?, horizontalPosition?, verticalPosition?) {
    this._snackBar.open(msg, null, {
      horizontalPosition: horizontalPosition ? horizontalPosition : this.horizontalPosition,
      verticalPosition: verticalPosition ? verticalPosition : this.verticalPosition,
      panelClass: color ? ['style-' + color] : ['style-success'],
      duration: duration ? duration : 3000,
    });
  }
}