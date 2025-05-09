import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAPIsService } from 'src/app/form-apis.service';
import { User } from 'src/app/submit.model';

@Component({
  selector: 'app-user-dash-home',
  templateUrl: './user-dash-home.component.html',
  styleUrls: ['./user-dash-home.component.scss']
})
export class UserDashHomeComponent {

  userData: User | null = null;
  isLoading = true;
  imgBaseURL = 'http://localhost:8003/api/admin/';

  // Keys for documents
  docKeys = [
    { key: 'undlf', title: 'User National Document Left Front' },
    { key: 'unp', title: 'User National Passport' },
    { key: 'uncf', title: 'User National Card Front' },
    { key: 'uncf1', title: 'User National Card Front Side 1' },
    { key: 'uncf2', title: 'User National Card Front Side 2' },
    { key: 'unlf', title: 'User National License Front' },
    { key: 'unlf1', title: 'User National License Front Side 1' },
    { key: 'unlf2', title: 'User National License Front Side 2' },
    { key: 'unlf3', title: 'User National License Front Side 3' },
  ];

  allDocsMissing = false;

  constructor(
    private shortClipService: FormAPIsService,
    private modalService: NgbModal
  ) { }

  get userId(): string | null {
    return localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    if (!this.userId) {
      console.error('User ID not found in localStorage!');
      this.isLoading = false;
      return;
    }

    this.isLoading = true;

    const payload = {
      id: Number(this.userId),
      accessId: Number(this.userId)
    };

    this.shortClipService.userDashData(payload).subscribe(
      res => {
        this.userData = res.data;
        this.checkIfDocsMissing();
        this.isLoading = false;
      },
      err => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      }
    );
  }

  // Check if all document fields are missing
  checkIfDocsMissing(): void {
    this.allDocsMissing = this.docKeys.every(doc => !this.userData?.[doc.key]);
  }


}
