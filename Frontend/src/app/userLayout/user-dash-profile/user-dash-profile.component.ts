import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-user-dash-profile',
  templateUrl: './user-dash-profile.component.html',
  styleUrls: ['./user-dash-profile.component.scss']
})
export class UserDashProfileComponent {
  dataForm!: FormGroup;
  isLoading: boolean = false;
  userId: string | null = null;

  // Toast state
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(
    private fb: FormBuilder,
    private userService: FormAPIsService,
  ) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.initializeForm();

    if (this.userId) {
      this.fetchUserData();
    }
  }

  initializeForm() {
    this.dataForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      ssn: ['', Validators.required],
      emergencyContactName1: [''],
      emergencyContactNumber1: ['', Validators.required],
      emergencyContactName2: [''],
      emergencyContactNumber2: [''],
      address: ['', Validators.required],
      cityName: ['', Validators.required],
      stateName: ['', Validators.required],
      zipCode: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      radius: ['', Validators.required],
      stateOfLicense: ['', Validators.required],
      ed: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      ttiawo: [false],
      isAcceptingWorkOrders: [''],
    });
  }

  fetchUserData() {
    const payload = {
      id: this.userId,
      accessId: this.userId
    };

    this.userService.editUserData(payload).subscribe({
      next: (res) => {
        if (res.success) {
          const data = res.data;

          // Patch form fields based on API keys
          this.dataForm.patchValue({
            firstName: data.fn,
            lastName: data.ln,
            phoneNumber: data.pn,
            ssn: data.ssn,
            emergencyContactName1: data.ecn,
            emergencyContactNumber1: data.pn1,
            emergencyContactName2: data.ecn1,
            emergencyContactNumber2: data.pn2,
            address: data.a,
            cityName: data.city,
            stateName: data.state,
            zipCode: data.zc,
            latitude: data.l,
            longitude: data.l1,
            radius: data.r,
            stateOfLicense: data.sol,
            ed: data.ed ? data.ed.substring(0, 10) : '', // YYYY-MM-DD
            identificationNumber: data.in,
            ttiawo: data.ttiawo,
            isAcceptingWorkOrders: data.bc || '',
          });
        }
      },
      error: () => {
        // this.toastr.error('Failed to fetch user data');
      }
    });
  }

  showCustomToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Auto-hide after 3 seconds
    setTimeout(() => this.showToast = false, 3000);
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      this.dataForm.markAllAsTouched();
      return;
    }

    const formValues = this.dataForm.value;

    const payload = {
      ...formValues,
      id: this.userId,
      accessId: this.userId
    };

    this.isLoading = true;

    this.userService.updateUserData(payload).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.success) {
          // this.toastr.success('User data updated successfully');
        } else {
          // this.toastr.error('Failed to update user data');
        }
      },
      error: () => {
        this.isLoading = false;
        // this.toastr.error('Something went wrong while updating');
      }
    });
  }

  // Helper for validation in template
  isInvalid(controlName: string) {
    const control = this.dataForm.get(controlName);
    return control?.touched && control?.invalid;
  }
}
