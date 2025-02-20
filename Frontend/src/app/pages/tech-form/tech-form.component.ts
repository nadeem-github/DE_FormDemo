import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-tech-form',
  templateUrl: './tech-form.component.html',
  styleUrls: ['./tech-form.component.scss']
})
export class TechFormComponent {
  dataForm!: FormGroup;
  locationForm!: FormGroup;

  isFocused: boolean = false;

  toasts: { message: string; type: string }[] = [];

  isLoading = false;
  errorMessage: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  uploadedFile: File | null = null;

  uploadedFiles: { [key: string]: File | null } = {};
  isFileInvalid: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private formDataService: FormAPIsService, private router: Router,) { }

  ngOnInit(): void {
    this.dataForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['',],
      stateOfLicense: ['',],
      phoneNumber: ['', Validators.required, Validators.pattern(/^\d{10}$/)], //[Validators.required, Validators.pattern(/^\d{10}$/)]
      ssn: ['',Validators.required],
      emergencyContactName1: [''],
      emergencyContactName2: [''],
      emergencyContactNumber1: ['', Validators.required, Validators.pattern(/^\d{10}$/)],
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
    if (this.dataForm.valid) {
      const formData = new FormData();
      const formValues: Record<string, any> = {};

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
      formData.append('t', this.dataForm.get('t')?.value);
      formData.append('in7', this.dataForm.get('in7')?.value);
      formData.append('ed8', this.dataForm.get('ed8')?.value);
      formData.append('t1', this.dataForm.get('t1')?.value);
      formData.append('in8', this.dataForm.get('in8')?.value);
      formData.append('ed9', this.dataForm.get('ed9')?.value);
      formData.append('s', this.dataForm.get('s')?.value);
      formData.append('ev', this.dataForm.get('ev')?.value);
      formData.append('bes', this.dataForm.get('bes')?.value);
      formData.append('t2', this.dataForm.get('t2')?.value);
      formData.append('in9', this.dataForm.get('in9')?.value);
      formData.append('ed10', this.dataForm.get('ed10')?.value);
      formData.append('pn3', this.dataForm.get('pn3')?.value);
      formData.append('ed11', this.dataForm.get('ed11')?.value);
      formData.append('pn4', this.dataForm.get('pn4')?.value);
      formData.append('ed12', this.dataForm.get('ed12')?.value);
      formData.append('c', this.dataForm.get('c')?.value);
      formData.append('p', this.dataForm.get('p')?.value);
      formData.append('ed13', this.dataForm.get('ed13')?.value);
      formData.append('tolcp', this.dataForm.get('tolcp')?.value);
      formData.append('tae1', this.dataForm.get('tae1')?.value);

      for (const controlName in this.dataForm.controls) {
        if (this.dataForm.controls.hasOwnProperty(controlName)) {
          formValues[controlName] = this.dataForm.get(controlName)?.value || '';
        }
      }

      // Append files
      for (const [key, file] of Object.entries(this.uploadedFiles)) {
        if (file) {
          formData.append(key, file);
        }
      }

      this.formDataService.submitFormData(formData).subscribe(
        (response) => {
          // console.log('Form submitted successfully', response);
          this.showToast('Form submitted successfully!', 'success');
          alert('Record inserted successfully!');
          this.router.navigate(['/AllRecord']);
        },
        (error) => {
          const errorMessage =
            error?.message || 'Something went wrong. Please try again.';
          this.showToast(errorMessage, 'danger');
        }
      );
    } else {
      this.dataForm.markAllAsTouched();
      this.showToast('Please fill out the form correctly.', 'warning');
    }
  }

  showToast(message: string, type: string): void {
    this.toasts.push({ message, type });

    // Automatically remove toast after 3 seconds
    setTimeout(() => {
      this.toasts.shift();
    }, 3000);
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
