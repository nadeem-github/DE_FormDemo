import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
  toastType = 'success'; // 'success' or 'danger'

  constructor(private fb: FormBuilder, private apiService: FormAPIsService, private router: Router,) {
    this.importForm = this.fb.group({
      excelFile: [null], // Form control for file
    });
  }

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

      this.apiService.importData(formData).subscribe({
        next: (response: any) => {
          // console.log('File imported successfully:', response);
          this.router.navigate(['/AllRecord']);
          alert('File imported successfully!');
          this.showToastMessage('File imported successfully!', 'success');
          this.resetForm(); // Reset form after success
        },
        error: (error: any) => {
          console.error('Error importing file:', error);
          alert('Failed to import file!');
          this.showToastMessage('Failed to import file!', 'danger');
        },
      });
    }
  }

  resetForm(): void {
    this.importForm.reset(); // Reset the entire form
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Manually clear the file input field
    }
  }

  showToastMessage(message: string, type: 'success' | 'danger') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Show the toast for 3 seconds
  }

}
