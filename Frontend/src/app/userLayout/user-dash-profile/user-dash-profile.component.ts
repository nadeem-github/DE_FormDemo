import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dash-profile',
  templateUrl: './user-dash-profile.component.html',
  styleUrls: ['./user-dash-profile.component.scss']
})
export class UserDashProfileComponent {
  dataForm!: FormGroup;
  locationForm!: FormGroup;

  userId: string | null = null;
  isLoading = false;
  errorMessage: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  uploadedFile: File | null = null;

  baseURL = environment.imgBaseURL;

  filePreviews: { [key: string]: string } = {};
  uploadedFiles: { [key: string]: File | null } = {};
  isFileInvalid: { [key: string]: boolean } = {};
  fileOriginalPaths: { [key: string]: string } = {};

  accessId: any;
  mapUrl: string = '';

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

    const storedUserId = localStorage.getItem('userId');
    const storedAccessId = localStorage.getItem('userId');

    if (storedUserId && storedAccessId) {
      this.userId = storedUserId;
      this.accessId = storedAccessId;
      this.fetchUserData(this.userId, this.accessId);
    } else {
      console.error('User ID or Access ID not found in localStorage.');
      this.errorMessage = 'User ID or Access ID not found. Please log in again.';
    }

    this.getLocation();
  }

  fetchUserData(userId: string, accessId: string): void {
    this.isLoading = true;
    const requestData = new FormData();
    requestData.append('id', userId);
    requestData.append('accessId', accessId);
    this.formDataService.editUserData(requestData).subscribe(
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
          this.setPreviewFromApi('profile_pic', response.data.profile_pic);
          this.setPreviewFromApi('undlf', response.data.undlf);
          this.setPreviewFromApi('unp', response.data.unp);
          this.setPreviewFromApi('uncf', response.data.uncf);
          this.setPreviewFromApi('uncf1', response.data.uncf1);
          this.setPreviewFromApi('uncf2', response.data.uncf2);
          this.setPreviewFromApi('unlf', response.data.unlf);
          this.setPreviewFromApi('unlf1', response.data.unlf1);
          this.setPreviewFromApi('unlf2', response.data.unlf2);
          this.setPreviewFromApi('unlf3', response.data.unlf3);
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

  setPreviewFromApi(key: string, path: string | null): void {
    if (path) {
      const fullUrl = this.baseURL + path;
      this.filePreviews[key] = fullUrl;

      // 👇 Convert to File & store in uploadedFiles so it gets sent as binary
      const fileName = path.split('/').pop() || `${key}.png`;
      this.urlToFile(fullUrl, fileName).then((file) => {
        this.uploadedFiles[key] = file;
      });
    }
  }

  onFileChange(event: Event, fileKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedFiles[fileKey] = input.files[0];
      this.isFileInvalid[fileKey] = false;

      // ✅ Update preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.filePreviews[fileKey] = e.target.result;
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      this.uploadedFiles[fileKey] = null;
      this.isFileInvalid[fileKey] = true;
    }
  }


  isInvalid(controlName: string): boolean {
    const control = this.dataForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  async urlToFile(url: string, fileName: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    const contentType = blob.type || 'application/octet-stream';
    return new File([blob], fileName, { type: contentType });
  }

  onSubmit(): void {
    if (this.dataForm.valid && this.userId) {
      const formData = new FormData();
      this.isLoading = true;
      formData.append('id', this.userId);

      const map: { [key: string]: string } = {
        fn: 'firstName',
        ln: 'lastName',
        a: 'address',
        sol: 'stateOfLicense',
        ed: 'ed',
        pn: 'phoneNumber',
        ssn: 'ssn',
        city: 'cityName',
        in: 'identificationNumber',
        ecn: 'emergencyContactName1',
        ecn1: 'emergencyContactName2',
        pn1: 'emergencyContactNumber1',
        pn2: 'emergencyContactNumber2',
        state: 'stateName',
        zc: 'zipCode',
        l: 'latitude',
        l1: 'longitude',
        ttiawo: 'isAcceptingWorkOrders',
        r: 'radius',
        sc: 'securityClearance',
        fvsc: 'fvsc',
        uc: 'uccheckbox',
        cc: 'cccheckbox',
        tpe: 'tpecheckbox',
        vc: 'vccheckbox',
        hvsc: 'hvscRadio',
        rc: 'rccheckbox',
        pv: 'pvcheckbox',
        ev: 'evcheckbox',
        btv: 'btvcheckbox',
        thermal: 'thermalcheckbox',
        options: 'optionscheckbox',
        tae: 'tae',
        toc: 'tocText',
        ed1: 'ed1',
        sr: 'sr',
        in1: 'in1Text',
        unp: 'unp',
        uncf: 'uncf',
        toc1: 'toc1Text',
        ed2: 'ed2',
        toc2: 'toc2Text',
        ed3: 'ed3',
        tol: 'tolText',
        ed4: 'ed4',
        thoth: 'thoth',
        in2: 'in2Text',
        in3: 'in3Text',
        uncf1: 'uncf1',
        uncf2: 'uncf2',
        unlf: 'unlf',
        tol1: 'tol1Text',
        ed5: 'ed5',
        tol2: 'tol2Text',
        ed6: 'ed6',
        tol3: 'tol3Text',
        ed7: 'ed7',
        in4: 'in4Text',
        in5: 'in5Text',
        in6: 'in6Text',
        unlf1: 'unlf1',
        unlf2: 'unlf2',
        unlf3: 'unlf3',
        in7: 'in7',
        ed8: 'ed8',
        in8: 'in8',
        ed9: 'ed9',
        bes: 'bes',
        t: 't',
        t1: 't1',
        s: 's',
        t2: 't2',
        pn3: 'pn3',
        ed10: 'ed10',
        pn4: 'pn4',
        ed11: 'ed11',
        in9: 'in9',
        ed12: 'ed12',
        c: 'c',
        tae1: 'tae1',
        tolcp: 'tolcp',
        p: 'p',
        microtrax_course_name: 'microtraxCourseName',
        microtrax_course_number: 'microtraxCourseNumber'
      };

      for (const [key, file] of Object.entries(this.uploadedFiles)) {
        if (file) {
          formData.append(key, file); // Always binary
        }
      }


      formData.append('accessId', this.accessId);

      this.formDataService.updateUserData(formData).subscribe(
        (response: any) => {
          this.isLoading = false;
          alert('Record updated successfully!');
          this.router.navigate(['/userHome']);
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to update data. Please try again.';
          console.error('Error updating data:', error);
        }
      );
    } else {
      this.dataForm.markAllAsTouched();
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
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.dataForm.patchValue({
          latitude: lat,
          longitude: lng,
        });

        this.mapUrl = `https://www.google.com/maps?q=${lat},${lng}&hl=es;z=14&output=embed`;

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
