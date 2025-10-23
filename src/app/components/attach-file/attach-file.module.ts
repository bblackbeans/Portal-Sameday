import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AttachFileComponent } from './attach-file.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewAttachmentComponent } from '../view-attachment/view-attachment.component';

@NgModule({
  declarations: [
    AttachFileComponent,
    ViewAttachmentComponent
  ],
  exports: [
    AttachFileComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    PdfViewerModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule
  ]
})
export class AttachFileModule { }