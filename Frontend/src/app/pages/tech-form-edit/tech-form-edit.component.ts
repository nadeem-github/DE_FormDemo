import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-tech-form-edit',
  templateUrl: './tech-form-edit.component.html',
  styleUrls: ['./tech-form-edit.component.scss']
})
export class TechFormEditComponent {
  dataForm!: FormGroup;
  locationForm!: FormGroup;

  userId: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  uploadedFile: File | null = null;

  uploadedFiles: { [key: string]: File | null } = {};
  isFileInvalid: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private formDataService: FormAPIsService, private route: ActivatedRoute, private router: Router,) { }

  ngOnInit(): void {
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
    });

    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.fetchUserData(this.userId);
    }
  }

  fetchUserData(userId: string): void {
    this.isLoading = true;
    const requestData = new FormData();
    requestData.append('id', userId);

    this.formDataService.editFormData(requestData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response.data) {
          // console.log('Received data:', response.data);
          this.dataForm.patchValue({
            firstName: response.data.fn,
            lastName: response.data.ln,
            address: response.data.a,
            stateOfLicense: response.data.sol,
            phoneNumber: response.data.pn,
            ssn: response.data.ssn,
            emergencyContactName1: response.data.ecn,
            emergencyContactName2: response.data.ecn1,
            emergencyContactNumber1: response.data.pn1,
            emergencyContactNumber2: response.data.pn2,
            isAcceptingWorkOrders: response.data.ttiawo,
            stateName: response.data.state,
            cityName: response.data.city,
            zipCode: response.data.zc,
            latitude: response.data.l,
            longitude: response.data.l1,
            radius: response.data.r,
            identificationNumber: response.data.in,
            ttiawo: response.data.ttiawo,
            securityClearance: response.data.sc,
            tpecheckbox: response.data.tpe,
            vccheckbox: response.data.vc,
            hvscRadio: response.data.hvsc,
            fvsc: response.data.fvsc,
            rccheckbox: response.data.rc,
            cccheckbox: response.data.cc,
            uccheckbox: response.data.uc,
            pvcheckbox: response.data.pv,
            evcheckbox: response.data.ev,
            btvcheckbox: response.data.btv,
            thermalcheckbox: response.data.thermal,
            optionscheckbox: response.data.options,
            tocText: response.data.toc,
            in1Text: response.data.in1,
            toc1Text: response.data.toc1,
            toc2Text: response.data.toc2,
            tolText: response.data.tol,
            thoth: response.data.thoth,
            in2Text: response.data.in2,
            in3Text: response.data.in3,
            tol1Text: response.data.tol1,
            in4Text: response.data.in4,
            tol2Text: response.data.tol2,
            in5Text: response.data.in5,
            tol3Text: response.data.tol3,
            in6Text: response.data.in6,
            ed: this.formatDate(response.data.ed),
            ed1: this.formatDate(response.data.ed1),
            ed2: this.formatDate(response.data.ed2),
            ed3: this.formatDate(response.data.ed3),
            ed4: this.formatDate(response.data.ed4),
            ed5: this.formatDate(response.data.ed5),
            ed6: this.formatDate(response.data.ed6),
            ed7: this.formatDate(response.data.ed7),
            ed8: this.formatDate(response.data.ed8),
            ed9: this.formatDate(response.data.ed9),
            ed10: this.formatDate(response.data.ed10),
            ed12: this.formatDate(response.data.ed12),
            ed13: this.formatDate(response.data.ed13),
            t: response.data.t,
            in7: response.data.in7,
            t1: response.data.t1,
            in8: response.data.in8,
            s: response.data.s,
            ev: response.data.ev,
            bes: response.data.bes,
            t2: response.data.t2,
            in9: response.data.in9,
            pn3: response.data.pn3,
            ed11: response.data.ed11,
            pn4: response.data.pn4,
            c: response.data.c,
            p: response.data.p,
            tolcp: response.data.tolcp,
            tae1: response.data.tae1,
          });
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to fetch user data. Please try again.';
        console.error('Error fetching user data:', error);
      }
    );
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

  isInvalid(controlName: string): boolean {
    const control = this.dataForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  onSubmit(): void {
    if (this.dataForm.valid && this.userId) {  // Ensure the form is valid and userId is defined
      const formData = new FormData();
      this.isLoading = true;
      formData.append('id', this.userId);  // Include the userId to identify which record to update

      // Loop through the form controls and append each value to the FormData
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

      // Call the API to update the data
      this.formDataService.updateFormData(formData).subscribe(
        (response: any) => {
          this.isLoading = false;
          // console.log('Update successful:', response);
          alert('Record updated successfully!');
          this.router.navigate(['/AllRecord']); // Redirect after success
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to update data. Please try again.';
          console.error('Error updating data:', error);
        }
      );
    } else {
      this.dataForm.markAllAsTouched();  // Mark all fields as touched to show validation errors
    }
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
