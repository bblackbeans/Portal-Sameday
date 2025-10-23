import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs as importedSaveAs } from 'file-saver';

@Component({
  selector: 'app-same-day-view-attachment',
  templateUrl: './view-attachment.component.html',
  styleUrls: ['./view-attachment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ViewAttachmentComponent implements OnInit {

  public zoom = 1;
  public page = 1;
  public rotation = 0;
  public showAll = false;
  public url: string = '';
  public type: string = '';
  public name: string = '';
  public totalPages: number;
  public renderTextMode = 1;
  public renderText = true;
  public autoresize = true;
  public fitToPage = false;
  public showBorders = true;
  public originalSize = false;
  public zoomScale: 'page-height' | 'page-fit' | 'page-width' = 'page-width';

  constructor(
    private dialogRef: MatDialogRef<ViewAttachmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { this.dialogRef.disableClose = true; }

  ngOnInit(): void {
    const attachment = this.data.attachment;
    this.type = attachment.type;
    this.name = attachment.name;
    this.url = attachment.url;
  }

  public afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }

  public scrollTop() {
    const scroll_1 = document.getElementById('scroll_1');
    const scroll_2 = document.getElementById('scroll_2');
    scroll_1.scrollIntoView();
    scroll_2.scrollIntoView();
  }

  public nextPage() {
    this.page++;
    this.scrollTop();
  }

  public prevPage() {
    this.page--;
    this.scrollTop();
  }

  public zoomIn() {
    this.zoom += 0.05;
  }

  public zoomOut() {
    if (this.zoom > 0.05) {
      this.zoom -= 0.05;
    }
  }

  public rotateLeft() {
    this.rotation -= 90;
  }

  public rotateRight() {
    this.rotation += 90;
  }

  public downloadDoc() {
    importedSaveAs(this.url, this.name);
  }

  public close() {
    this.dialogRef.close();
  }

}