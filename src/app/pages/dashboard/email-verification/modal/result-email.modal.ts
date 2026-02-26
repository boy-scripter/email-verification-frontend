import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, inject, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { SingleEmailMutationData } from 'src/app/graphql/generated';

@Component({
  selector: 'app-email-result-card',
  standalone: true,
  imports: [CommonModule, CardModule, TagModule],
  template: `

    <p-card class="w-full p-6 mt-6 border rounded-lg shadow-lg bg-white">

      <div class="mb-4">
        <h1 class="text-2xl font-bold">{{ result().email }}</h1>
        <p class="text-gray-500">{{ result().username }} @ {{ result().domain }}</p>
      </div>

      <div class="flex flex-col gap-3 text-sm">
        <div class="flex justify-between">
          <span class="font-semibold">Status</span>
          <p-tag [value]="result().status" [severity]="statusSeverity(result().status)"></p-tag>
        </div>

        <div class="flex justify-between">
          <span class="font-semibold">MX Record</span>
          <span>{{ result().mx_record }}</span>
        </div>

        <hr />

        <div class="flex justify-between">
          <span>Syntax Valid</span>
          <p-tag [value]="result().checks.syntax_valid ? 'Yes' : 'No'" 
                 [severity]="result().checks.syntax_valid ? 'success' : 'danger'"></p-tag>
        </div>

        <div class="flex justify-between">
          <span>SMTP Connect</span>
          <p-tag [value]="result().checks.smtp_connect ? 'Yes' : 'No'" 
                 [severity]="result().checks.smtp_connect ? 'success' : 'danger'"></p-tag>
        </div>

        <div class="flex justify-between">
          <span>SMTP Block</span>
          <p-tag [value]="!result().checks.smtp_block ? 'Yes' : 'No'" 
                 [severity]="!result().checks.smtp_block ? 'danger' : 'success'"></p-tag>
        </div>

        <div class="flex justify-between">
          <span>Role Email</span>
          <p-tag [value]="!result().checks.is_role ? 'Yes' : 'No'" 
                 [severity]="!result().checks.is_role ? 'danger' : 'success'"></p-tag>
        </div>

        <div class="flex justify-between">
          <span>Catchall</span>
          <p-tag [value]="!result().checks.is_catchall ? 'Yes' : 'No'" 
                 [severity]="!result().checks.is_catchall ? 'danger' : 'success'"></p-tag>
        </div>
      </div>

    </p-card>

  `,
})
export class EmailResultCardComponent {
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly config = inject(DynamicDialogConfig);

  protected result: Signal<SingleEmailMutationData['checkEmail']>;

  constructor() {
    if (!this.config.data?.result) {
      throw new Error('Result is required');
    }
    this.result = signal(this.config.data.result);
  }

  statusSeverity(status: string) {
    if (status === 'valid') return 'success';
    if (status === 'risky') return 'warning';
    return 'danger';
  }

  close() {
    this.dialogRef.close();
  }
}
