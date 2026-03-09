import { Component, inject, OnInit } from "@angular/core";
import { CardComponent } from "@components/card.component";
import { VerificationService } from "@service";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DatePipe } from "@angular/common";
import { CursorPaginationFacade } from "@util/pagination/pagination.facade";
import { FileVerificationFieldsFragment, FileVerificationStatus } from "src/app/graphql/generated";
import { Tag } from "primeng/tag";
import { FileformatPipe } from "@pipes/index";
import { AsyncTaskDirective } from "@directive/asyncTask.directive";
import { UploadStoreService } from "@util/uploader/service/uploadstore.service";

@Component({
  selector: 'app-verification-list',
  imports: [CardComponent, TableModule, DatePipe, ButtonModule, Tag, FileformatPipe, AsyncTaskDirective],
  styles: `
     .active {
        color: #ffffff;
        background-color: #22c55e; /* bright green */
     }

     .utilized {
        color: #ffffff;
        background-color: #3b82f6; /* blue */
     }
    `,
  template: `
    <app-card icon="pi pi-history" label="Verification List">
           <p-table
            [loading]="isLoading()"
            [paginator]="true"
            [rows]="10"
            [scrollable]="true"
            [tableStyle]="{ 'min-width': '50rem' }"
            [value]="items()"
          >
            <ng-template pTemplate="header">
              <tr>
                @for(header of headers; track header){
                  <th class="table-header">
                    <span class="header-text">{{ header }}</span>
                  </th>
                }
              </tr>
            </ng-template>

            <ng-template  let-data pTemplate="body">
              <tr class="table-row">
                    <td class="table-cell">
                      <span class="cell-content">{{ data.originalFile.filename }}</span>
                    </td>

                    <td class="table-cell">
                      <span class="cell-content">
                        {{ data.totalRows }} emails , {{ data.originalFile.size | fileformat }} 
                      </span>
                    </td>

                  <td class="table-cell">
                  <span class="cell-content">
                      {{ data.createdAt | date:'d MMM, EEE, y, h:mm a' }}
                  </span>
                  </td>

                  <td class="table-cell">
                  <span class="cell-content">
                      {{ data.completedAt ? (data.completedAt | date:'d MMM, EEE, y, h:mm a') : 'Not Yet Completed' }}
                  </span>
                  </td>

                    <td class="table-cell">
                      <span class="cell-content">
                      <p-tag
                          [value]="data.status"
                          [severity]="FileVerificationStatusColor[data.status]">
                        </p-tag>
                      </span>
                    </td>
                    <td class="table-cell">
                      <span class="cell-content">
                        <p-button [appAsyncTask]="downloadFile(data.verifiedFileId)" icon="pi pi-download" iconPos="right" size="small" severity="success" label="Download Now" class="p-button-icon-left"></p-button>
                      </span>
                    </td>
              </tr>
            </ng-template>
          </p-table>

          @if(!items().length){
            <div class="flex text-gray-600 flex-col items-center justify-center py-8">
            <i class="pi pi-credit-card text-5xl  mb-3"></i>
            <h3 class="pl-4 mb-2 font-meduim">No Verifications Yet</h3>
            <p class=" text-center mb-4">
              <span>You haven't verified any email yet.</span> <br>
              <span class="font-bold">Choose a plan to verify emails.</span>
            </p>
            <p-button
              label="View Plans"
              icon="pi pi-shopping-cart"
              severity="success"
              routerLink="/dashboard/buy-credits"
            ></p-button>
          </div>
          }
    </app-card>
  `,
})
export class VerificationListComponent extends CursorPaginationFacade<FileVerificationFieldsFragment> implements OnInit {

  private verificationService = inject(VerificationService)
  private fileService = inject(UploadStoreService)

  public headers = ['File Name', 'Info', 'Started At', 'Completed At', 'Status', ' '];

  ngOnInit(): void {
    this.loadPage();
  }

  protected async fetchPage(cursor?: string) {
    const { data } = await this.verificationService.getFileVerifications(cursor);

    return {
      nodes: data.getFileVerifications.edges.map(e => e.node),
      endCursor: data.getFileVerifications.pageInfo.endCursor || undefined
    };
  }

  public FileVerificationStatusColor: Record<string, string> = {
    [FileVerificationStatus.Completed]: 'success',
    [FileVerificationStatus.Failed]: 'danger',
    [FileVerificationStatus.Imported]: 'info',
    [FileVerificationStatus.Processing]: 'warning',
    [FileVerificationStatus.Queued]: 'secondary'
  };

  public downloadFile(id: string) {
    return async () => {
      try {
        const { data } = await this.fileService.generatePresignedUrl(id);
        const url = data.generatePreSignedURL.url;
        const link = document.createElement('a');
        link.href = url;
        link.download = '';
        link.click();
      } catch (error) {
        console.error('Download failed', error);
      }
    }
  }
}