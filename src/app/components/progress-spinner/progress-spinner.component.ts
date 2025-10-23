import { Component, Input, OnInit, ViewChild, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { Subscription } from 'rxjs';
import { ProgressSpinnerService, ProgressSpinnerConfig } from './progress-spinner.service';
import { AppOverlayConfig, OverlayService } from './overlay/overlay.service';

@Component({
  selector: 'app-sameday-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrls: ['./progress-spinner.component.scss']
})
export class ProgressSpinnerComponent implements OnInit, OnDestroy {
  @Input() color?: ThemePalette;
  @Input() diameter = 100;
  @Input() mode?: ProgressSpinnerMode;
  @Input() strokeWidth?: number;
  @Input() value?: number;
  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressSpinner: boolean;
  @Input() displayText = 'Carregando...';

  @ViewChild(TemplateRef)
  private progressSpinnerRef: TemplateRef<any>;
  private progressSpinnerOverlayConfig: AppOverlayConfig;
  private overlayRef: OverlayRef;
  private statusSubscription: Subscription;

  constructor(
    private vcRef: ViewContainerRef, private overlayService: OverlayService,
    private spinnerService: ProgressSpinnerService
  ) {
    this.statusSubscription = this.spinnerService.status().subscribe(result => {
      if (typeof result == 'boolean') {
        this.displayProgressSpinner = result;
      } else if (typeof result == 'object') {
        result = result as ProgressSpinnerConfig;
        Object.keys(result).forEach(key => {
          if (result[key] !== 'undefined') {
            this[key] = result[key];
          }
        });

        this.displayProgressSpinner = true;
      }
    });
  }

  ngOnInit() {
    // Config for Overlay Service
    this.progressSpinnerOverlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.progressSpinnerOverlayConfig.positionStrategy = this.overlayService.positionGloballyCenter();
    }
    // Create Overlay for progress spinner
    this.overlayRef = this.overlayService.createOverlay(this.progressSpinnerOverlayConfig);
  }

  ngOnDestroy() {
    this.statusSubscription.unsubscribe();
  }

  ngDoCheck() {
    // Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
    if (this.displayProgressSpinner && !this.overlayRef.hasAttached() && this.progressSpinnerRef) {
      this.overlayService.attachTemplatePortal(this.overlayRef, this.progressSpinnerRef, this.vcRef);
    } else if (!this.displayProgressSpinner && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }
}