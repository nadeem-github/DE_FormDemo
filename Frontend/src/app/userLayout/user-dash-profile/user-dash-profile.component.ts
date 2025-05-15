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

  uploadedFiles: { [key: string]: File | null } = {};
  isFileInvalid: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private userService: FormAPIsService,
    private router: Router
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
      firstName: ['',],
      lastName: ['',],
      address: ['',],
      stateOfLicense: ['',],
      phoneNumber: ['',], //[Validators.required, Validators.pattern(/^\d{10}$/)]
      ssn: ['',],
      emergencyContactName1: [''],
      emergencyContactName2: [''],
      emergencyContactNumber1: [''],
      emergencyContactNumber2: [''],
      isAcceptingWorkOrders: ['yes'], // Default to 'yes'
      stateName: [''],
      cityName: [''],
      zipCode: [''],
      latitude: ['',],
      longitude: ['',],
      radius: ['',],
      ed: ['',],
      identificationNumber: ['',],
      ttiawo: ['',],
      securityClearance: ['',],
      tpecheckbox: ['',],
      vccheckbox: ['',],
      hvscRadio: ['',],
      fvsc: ['',],
      rccheckbox: ['',],
      cccheckbox: ['',],
      uccheckbox: ['',],
      pvcheckbox: ['',],
      evcheckbox: ['',],
      btvcheckbox: ['',],
      thermalcheckbox: ['',],
      optionscheckbox: ['',],
      tocText: ['',],
      ed1: ['',],
      in1Text: ['',],
      toc1Text: ['',],
      ed2: ['',],
      toc2Text: ['',],
      ed3: ['',],
      ed4: ['',],
      tolText: ['',],
      thoth: ['',],
      in2Text: ['',],
      in3Text: ['',],
      tol1Text: ['',],
      ed5: ['',],
      in4Text: ['',],
      tol2Text: ['',],
      ed6: ['',],
      in5Text: ['',],
      tol3Text: ['',],
      ed7: ['',],
      in6Text: ['',],
      uncf1: [''],
      uncf2: [''],
      unlf: [''],
      t: ['',],
      in7: ['',],
      ed8: ['',],
      t1: ['',],
      in8: ['',],
      ed9: ['',],
      s: ['',],
      ev: ['',],
      bes: ['',],
      t2: ['',],
      in9: ['',],
      ed10: ['',],
      pn3: ['',],
      ed11: ['',],
      pn4: ['',],
      ed12: ['',],
      c: ['',],
      p: ['',],
      ed13: ['',],
      tolcp: ['',],
      tae1: ['',],
      profile_pic: ['',],
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
            securityClearance: data.sc,
            tpecheckbox: data.tpe,
            vccheckbox: data.vc,
            hvscRadio: data.hvsc,
            fvsc: data.fvsc,
            rccheckbox: data.rc,
            cccheckbox: data.cc,
            uccheckbox: data.uc,
            pvcheckbox: data.pv,
            evcheckbox: data.ev,
            btvcheckbox: data.btv,
            thermalcheckbox: data.thermal,
            optionscheckbox: data.options,
            tocText: data.toc,
            in1Text: data.in1,
            toc1Text: data.toc1,
            toc2Text: data.toc2,
            tolText: data.tol,
            thoth: data.thoth,
            in2Text: data.in2,
            in3Text: data.in3,
            tol1Text: data.tol1,
            in4Text: data.in4,
            tol2Text: data.tol2,
            in5Text: data.in5,
            tol3Text: data.tol3,
            in6Text: data.in6,
            ed1: this.formatDate(data.ed1),
            ed2: this.formatDate(data.ed2),
            ed3: this.formatDate(data.ed3),
            ed4: this.formatDate(data.ed4),
            ed5: this.formatDate(data.ed5),
            ed6: this.formatDate(data.ed6),
            ed7: this.formatDate(data.ed7),
            ed8: this.formatDate(data.ed8),
            ed9: this.formatDate(data.ed9),
            ed10: this.formatDate(data.ed10),
            ed12: this.formatDate(data.ed12),
            ed13: this.formatDate(data.ed13),
            profile_pic: this.formatDate(data.profile_pic),
            t: data.t,
            in7: data.in7,
            t1: data.t1,
            in8: data.in8,
            s: data.s,
            ev: data.ev,
            bes: data.bes,
            t2: data.t2,
            in9: data.in9,
            pn3: data.pn3,
            ed11: data.ed11,
            pn4: data.pn4,
            c: data.c,
            p: data.p,
            tolcp: data.tolcp,
            tae1: data.tae1,

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

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onFileChange(event: Event, fileKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFiles[fileKey] = input.files[0];
      this.isFileInvalid[fileKey] = false;
    } else {
      this.uploadedFiles[fileKey] = null;
      this.isFileInvalid[fileKey] = true;
    }
  }

  onSubmit() {
    if (this.dataForm.invalid) {
      // this.dataForm.markAllAsTouched();
      // return;

      const formData = new FormData();

      formData.append('fn', this.dataForm.get('firstName')?.value);
      formData.append('ln', this.dataForm.get('lastName')?.value);
      formData.append('a', this.dataForm.get('address')?.value);
      formData.append('sol', this.dataForm.get('stateOfLicense')?.value);
      formData.append('pn', this.dataForm.get('phoneNumber')?.value);
      formData.append('ssn', this.dataForm.get('ssn')?.value);
      formData.append('ecn', this.dataForm.get('emergencyContactName1')?.value);
      formData.append('ecn1', this.dataForm.get('emergencyContactName2')?.value);
      formData.append('pn1', this.dataForm.get('emergencyContactNumber1')?.value);
      formData.append('pn2', this.dataForm.get('emergencyContactNumber2')?.value);
      formData.append('ttiawo', this.dataForm.get('isAcceptingWorkOrders')?.value);
      formData.append('city', this.dataForm.get('cityName')?.value);
      formData.append('zc', this.dataForm.get('zipCode')?.value);
      formData.append('ed', this.dataForm.get('ed')?.value);
      formData.append('state', this.dataForm.get('stateName')?.value);
      formData.append('in', this.dataForm.get('identificationNumber')?.value);
      formData.append('l', this.dataForm.get('latitude')?.value);
      formData.append('l1', this.dataForm.get('longitude')?.value);
      formData.append('r', this.dataForm.get('radius')?.value);
      formData.append('ttiawo', this.dataForm.get('ttiawo')?.value);
      formData.append('sc', this.dataForm.get('securityClearance')?.value);
      formData.append('tpe', this.dataForm.get('tpecheckbox')?.value);
      formData.append('vc', this.dataForm.get('vccheckbox')?.value);
      formData.append('hvsc', this.dataForm.get('hvscRadio')?.value);
      formData.append('fvsc', this.dataForm.get('fvsc')?.value);
      formData.append('rc', this.dataForm.get('rccheckbox')?.value);
      formData.append('cc', this.dataForm.get('cccheckbox')?.value);
      formData.append('uc', this.dataForm.get('uccheckbox')?.value);
      formData.append('pv', this.dataForm.get('pvcheckbox')?.value);
      formData.append('ev', this.dataForm.get('evcheckbox')?.value);
      formData.append('btv', this.dataForm.get('btvcheckbox')?.value);
      formData.append('thermal', this.dataForm.get('thermalcheckbox')?.value);
      formData.append('options', this.dataForm.get('optionscheckbox')?.value);
      formData.append('toc', this.dataForm.get('tocText')?.value);
      formData.append('ed1', this.dataForm.get('ed1')?.value);
      formData.append('in1', this.dataForm.get('in1Text')?.value);
      formData.append('toc1', this.dataForm.get('toc1Text')?.value);
      formData.append('ed2', this.dataForm.get('ed2')?.value);
      formData.append('toc2', this.dataForm.get('toc2Text')?.value);
      formData.append('ed3', this.dataForm.get('ed3')?.value);
      formData.append('ed4', this.dataForm.get('ed4')?.value);
      formData.append('tol', this.dataForm.get('tolText')?.value);
      formData.append('thoth', this.dataForm.get('thoth')?.value);
      formData.append('in2', this.dataForm.get('in2Text')?.value);
      formData.append('in3', this.dataForm.get('in3Text')?.value);
      formData.append('tol1', this.dataForm.get('tol1Text')?.value);
      formData.append('ed5', this.dataForm.get('ed5')?.value);
      formData.append('in4', this.dataForm.get('in4Text')?.value);
      formData.append('tol2', this.dataForm.get('tol2Text')?.value);
      formData.append('ed6', this.dataForm.get('ed6')?.value);
      formData.append('in5', this.dataForm.get('in5Text')?.value);
      formData.append('tol3', this.dataForm.get('tol3Text')?.value);
      formData.append('ed7', this.dataForm.get('ed7')?.value);
      formData.append('in6', this.dataForm.get('in6Text')?.value);
      formData.append('profile_pic', this.dataForm.get('profile_pic')?.value);

      for (const [key, file] of Object.entries(this.uploadedFiles)) {
        if (file) {
          formData.append(key, file);
        }
      }

      // Optionally, append any files if necessary
      for (const [key, file] of Object.entries(this.uploadedFiles)) {
        if (file) {
          formData.append(key, file);
        }
      }

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
          alert('Record updated successfully!');
          this.router.navigate(['/userHome']);
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

  getLocation() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    this.isLoading = true;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.dataForm.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching geolocation:', error);
        alert('Unable to fetch location. Please check your permissions.');
        this.isLoading = false;
      }
    );
  }
}
