import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent {
  
  importForm: FormGroup;
  successMessage: string = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'danger' = 'success';

  duplicateRecords: any[] = [];
  accessId: any;

  @ViewChild('duplicateModal') duplicateModal: any;

  constructor(
    private fb: FormBuilder,
    private apiService: FormAPIsService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.importForm = this.fb.group({
      excelFile: [null, Validators.required], // Form control for file
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.importForm.patchValue({ excelFile: file });
    }
  }

  onSubmit(): void {
    if (this.importForm.valid) {
      const formData = new FormData();
      formData.append('excelFile', this.importForm.get('excelFile')?.value);

      const token = localStorage.getItem('userId');
      const requestData1 = { accessId: token };
      this.accessId = requestData1.accessId;
      formData.append('accessId', this.accessId);

      this.apiService.importData(formData).subscribe({
        next: (response: any) => {
          this.router.navigate(['/AllRecord']);
          this.showToastMessage('File imported successfully!', 'success');
          this.successMessage = 'File imported successfully!';
          console.log('File imported successfully:', response);
          this.resetForm();

          if (response.duplicates && response.duplicates.length > 0) {
            this.openDuplicateModal(response.duplicates);
          }
        },
        error: (error: any) => {
          console.error('Error importing file:', error);
          this.showToastMessage('Failed to import file!', 'danger');
          this.successMessage = 'Failed to import file!';
        },
      });
    }
  }

  resetForm(): void {
    this.importForm.reset();
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  showToastMessage(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
  
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  

  openDuplicateModal(duplicates: any[]) {
    this.duplicateRecords = duplicates || [];
    this.modalService.open(this.duplicateModal, { centered: true, size: 'xl' });
  }

  downloadDuplicatesAsExcel() {
    const headers = ['First Name', 'Last Name', 'Email', 'Phone 1', 'Company', 'Reason'];

    const rows = this.duplicateRecords.map(record => [
      record.row?.fn || '',
      record.row?.ln || '',
      record.row?.in || '',
      record.row?.sol || '',
      record.row?.undlf || '',
      record.reason || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(e => e.map(a => `"${String(a).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/xlsx;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Duplicate_Records_${new Date().toISOString().slice(0, 10)}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}
