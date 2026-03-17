import { Component, input, computed, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileVerificationStatus } from 'src/app/graphql/generated';
import { UploadStoreService } from '@util/uploader/service/uploadstore.service';
import { AsyncTaskDirective } from '@directive/asyncTask.directive';
import { VerificationService } from '@service';

interface FileProgress {
  percentage: number;
  processedRows: number;
  totalRows: number;
  validCount: number;
  invalidCount: number;
  duplicateCount: number;
}

@Component({
  selector: 'app-progress-download',
  standalone: true,
  imports: [CommonModule, ButtonModule, AsyncTaskDirective],
  template: `
    @if (isCompleted()) {
      <p-button
        [appAsyncTask]="downloadFile"
        icon="pi pi-download"
        iconPos="right"
        size="small"
        severity="success"
        label="Download Now"
        class="p-button-icon-left"
      ></p-button>
    } @else if (isProcessing()) {
      @if (isLoadingInitial()) {
        <p-button
          icon="pi pi-spin pi-spinner"
          iconPos="right"
          size="small"
          severity="secondary"
          label="Fetching Progress..."
          class="p-button-icon-left"
          [disabled]="true"
        ></p-button>
      } @else {
        <div class="progress-info">
          <span class="progress-label">
            <i class="pi pi-spin pi-spinner"></i>
            Processing... {{ progress()?.percentage ?? 0 }}%
          </span>
        </div>
      }
    } @else if (isLoadingInitial()) {
      <p-button
        icon="pi pi-spin pi-spinner"
        iconPos="right"
        size="small"
        severity="secondary"
        label="Loading..."
        class="p-button-icon-left"
        [disabled]="true"
      ></p-button>
    }
  `,
  styles: [`
    .progress-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .progress-label {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.875rem;
      color: var(--text-color);
    }
    small {
      color: var(--text-color-secondary);
      font-size: 0.75rem;
    }
  `]
})
export class ProgressDownloadComponent implements OnInit, OnDestroy {
  public FileVerificationStatus = FileVerificationStatus;

  private uploadStoreService = inject(UploadStoreService);
  private verificationService = inject(VerificationService);

  status = input.required<FileVerificationStatus>();
  verifiedFileId = input<string>();
  fileVerificationId = input.required<string>();
  fileId = input.required<string>();

  isCompleted = computed(() => this.status() === FileVerificationStatus.Completed);
  isProcessing = computed(() => this.status() === FileVerificationStatus.Processing);

  progress = signal<FileProgress | null>(null);
  isLoadingInitial = signal<boolean>(true);
  private pollInterval: ReturnType<typeof setInterval> | null = null;
  static POLL_IN_EVERY_MS = 7000;

  ngOnInit(): void {
    if (this.isCompleted()) {
      this.isLoadingInitial.set(false);
      return;
    }
    this.startPolling();
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  private startPolling(): void {
    this.pollInterval = setInterval(
      () => {
        this.runPollingStep();
      }, ProgressDownloadComponent.POLL_IN_EVERY_MS);
  }


  private stopPolling(): void {
    if (this.pollInterval !== null) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }

  private runPollingStep(): void {
    const status = this.status();
    switch (status) {
      case FileVerificationStatus.Processing:
        this.fetchProgress();
        break;
      default:
        this.checkStatus();
        break;
    }
  }

  private async checkStatus(): Promise<void> {
    try {
      this.verificationService.getFileVerfication(this.fileVerificationId());
    } catch (error) {
      console.error('Progress fetch failed', error);
    }
  }

  private async fetchProgress(): Promise<void> {
    try {
      const { data } = await this.verificationService.getFileVerificationProgress(this.fileId());
      this.progress.set({
        percentage: data.fileProcessingStatus.percentage,
        processedRows: data.fileProcessingStatus.processedRows,
        totalRows: data.fileProcessingStatus.totalRows,
        validCount: data.fileProcessingStatus.validCount,
        invalidCount: data.fileProcessingStatus.invalidCount,
        duplicateCount: data.fileProcessingStatus.duplicateCount,
      });
      if (this.progress()?.percentage === 100) {
        this.checkStatus()
        this.stopPolling();
        return;
      }
    } catch (error) {
      console.error('Progress fetch failed', error);
    } finally {
      this.isLoadingInitial.set(false);
    }
  }

  public downloadFile = async () => {
    try {
      const { data } = await this.uploadStoreService.generatePresignedUrl(this.verifiedFileId()!);
      const url = data.generatePreSignedURL.url;
      const link = document.createElement('a');
      link.href = url;
      link.download = '';
      link.click();
    } catch (error) {
      console.error('Download failed', error);
    }
  };

}