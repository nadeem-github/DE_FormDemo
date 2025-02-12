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
  @ViewChild('confirmAllModal') confirmAllModal: any;

  showToast = false;
  toastMessage = '';
  toastType = 'success'; // 'success' or 'danger'
  dataAllUser: any[] = []; // Example data array
  deleteId!: number; // Store ID for deletion
  loading: boolean = false;
  isLoading = true;

  selectedRecords: { [key: number]: boolean } = {}; // Track selected checkboxes
  deleteIds: number[] = []; // Store selected IDs

  filteredData: any[] = [];
  paginatedData: any[] = []; // Data to show on the current page
  pageSizeOptions = [10, 20, 40, 60, 100]; // Options for page size
  searchTerm = '';
  pageSize = 10; // Default page size
  currentPage = 1; // Default current page


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
    this.isLoading = true;
    const requestData = {};
    this.shortClipService.fetchAllData(requestData).subscribe(
      (response) => {
        console.log('Fetched data:', response); // Debugging - Check if the latest data is received
        this.dataAllUser = response.data;
        this.filteredData = [...this.dataAllUser]; 
        this.updatePaginatedData(); 
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }  

  updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  // Handle page size change
  onPageSizeChange(): void {
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedData();
    this.clearSelectionOnPageChange();
  }

  // Handle page change
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  // Filter data based on the search term
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.dataAllUser.filter((item) =>
      Object.values(item).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(term)
      )
    );
    this.currentPage = 1; // Reset to the first page after filtering
    this.updatePaginatedData();
  }

  editUser(userId: string): void {
    this.router.navigate(['/TechFormEdit', userId]);
  }

  openDeleteModal(id: number) {
    this.deleteId = id; // Set ID to be deleted
    this.modalService.open(this.confirmModal, { centered: true });
  }

  confirmDelete(modal: any): void {
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

          // Remove the record from dataAllUser
          this.dataAllUser = this.dataAllUser.filter(user => user.id !== this.deleteId);

          // Update the filtered data
          this.filteredData = this.dataAllUser.filter((item) =>
            Object.values(item).some(
              (value) =>
                value &&
                value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
            )
          );

          // Update the paginated data
          this.updatePaginatedData();
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

  exportData(): void {
    alert('Export data functionality not implemented yet.');
  }

  // Toggle select all checkboxes (for current page only)
  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.paginatedData.forEach(user => {
      this.selectedRecords[user.id] = checked;
    });
    this.updateSelection();
  }

  // Update selected records list
  updateSelection(): void {
    this.deleteIds = Object.keys(this.selectedRecords)
      .filter(id => this.selectedRecords[+id])
      .map(id => +id);
  }

  // Check if records are selected (Used in *ngIf to show the "Delete Selected" button)
  hasSelectedRecords(): boolean {
    return this.deleteIds.length > 0;
  }

  // Clear selection when page size or page changes
  clearSelectionOnPageChange(): void {
    this.paginatedData.forEach(user => {
      if (this.selectedRecords[user.id]) {
        delete this.selectedRecords[user.id];
      }
    });
    this.updateSelection();
  }

  // Open delete confirmation modal for multiple records
  openDeleteMultipleModal(): void {
    this.modalService.open(this.confirmAllModal, { centered: true });
  }

  // Confirm and delete selected records
  confirmDeleteMultiple(modal: any): void {
    modal.close(); // Close modal
    
    console.log('Deleting IDs:', this.deleteIds); // Debugging - Check the IDs being sent
    
    this.shortClipService.deleteMultipleUser(this.deleteIds)
      .pipe(
        catchError(error => {
          console.error('API Error:', error);
          this.showToastMessage('Failed to delete records. Please try again.', 'danger');
          console.error('Delete failed:', error);
          return of(null);
        })
      )
      .subscribe(response => {
        console.log('Delete response:', response); // Debugging - Check the response from the API
        if (response && response.success) {
          this.showToastMessage('Records deleted successfully!', 'success');
          this.getUserList(); // Refresh data
          // Refresh the data
          this.getUserList();
          this.selectedRecords = {};
          this.deleteIds = [];
        } else {
          this.showToastMessage(response?.message || 'Something went wrong. Please try again.', 'danger');
        }
      });
  }


}
