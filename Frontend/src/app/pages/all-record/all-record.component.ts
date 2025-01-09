import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of } from 'rxjs';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-all-record',
  templateUrl: './all-record.component.html',
  styleUrls: ['./all-record.component.scss']
})
export class AllRecordComponent {

  @ViewChild('confirmModal') confirmModal: any;

  showToast = false;
  toastMessage = '';
  toastType = 'success'; // 'success' or 'danger'
  dataAllUser: any[] = []; // Example data array
  deleteId!: number; // Store ID for deletion
  loading: boolean = false;


  constructor(
    private shortClipService: FormAPIsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    const requestData = {}; // Add any request payload if required
    this.shortClipService.fetchAllData(requestData).subscribe(
      (response) => {
        this.dataAllUser = response.data;
        console.log('Data fetched:', this.dataAllUser);

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  editUser(userId: string): void {
    this.router.navigate(['/TechFormEdit', userId]);
  }

  openDeleteModal(id: number) {
    this.deleteId = id; // Set ID to be deleted
    this.modalService.open(this.confirmModal, { centered: true });
  }

  confirmDelete(modal: any) {
    modal.close(); // Close the modal
    this.shortClipService.deleteUser(this.deleteId)
      .pipe(
        catchError((error) => {
          this.showToastMessage('Failed to delete the record. Please try again.', 'danger');
          console.error('Delete failed', error);
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.showToastMessage('Record deleted successfully!', 'success');
          this.dataAllUser = this.dataAllUser.filter(user => user.id !== this.deleteId);
        }
      });
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
