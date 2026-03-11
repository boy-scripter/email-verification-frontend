import { Component, input, computed, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FileVerificationStatus } from 'src/app/graphql/generated';
import { UploadStoreService } from '@util/uploader/service/uploadstore.service';
import { AsyncTaskDirective } from '@directive/asyncTask.directive';
import { VerificationService } from '@service';
import { WithLoaderDirective } from "@directive/withLoader.directive";

@Component({
  selector: 'app-progress-download',
  standalone: true,
  imports: [CommonModule, ButtonModule, AsyncTaskDirective, WithLoaderDirective],
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
    } @else {
      <p-button
        *appWithLoader="onFileProgress"
        icon="pi pi-download"
        iconPos="right"
        size="small"
        severity="success"
        label="Download Now"
        class="p-button-icon-left"
      ></p-button>
    }
  `,
})
export class ProgressDownloadComponent {
  //enums
  public FileVerificationStatus = FileVerificationStatus;

  private uploadStoreService = inject(UploadStoreService)
  private verificationService = inject(VerificationService)


  // --- Signal Inputs (replaces @Input decorator) ---
  status = input.required<FileVerificationStatus>();
  verifiedFileId = input<string>();
  fileId = input.required<string>();

  // --- Computed: auto-updates when status() changes ---
  isCompleted = computed(
    () => this.status() === FileVerificationStatus.Completed
  );

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

  }

  public onFileProgress = new Promise((resolve) => {
    this.verificationService.getFileVerificationProgress(this.fileId()).then(({ data }) => {
      resolve({
        percentage: data.fileProcessingStatus.percentage,
        processedRows: data.fileProcessingStatus.processedRows,
        totalRows: data.fileProcessingStatus.totalRows,
        validCount: data.fileProcessingStatus.validCount,
        invalidCount: data.fileProcessingStatus.invalidCount,
        duplicateCount: data.fileProcessingStatus.duplicateCount,
      })
    })
  })
}


