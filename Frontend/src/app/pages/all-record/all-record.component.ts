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
  toastType: 'success' | 'danger' = 'success';

  dataAllUser: any[] = [];
  filteredData: any[] = [];
  paginatedData: any[] = [];

  selectedRecords: { [key: number]: boolean } = {};
  deleteIds: number[] = [];

  deleteId!: number;

  loading = false;
  isLoading = true;

  searchTerm = '';
  pageSize = 10;
  currentPage = 1;
  pageSizeOptions = [10, 20, 40, 60, 100];

  constructor(
    private shortClipService: FormAPIsService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  // Access ID from localStorage
  get accessId(): string | null {
    return localStorage.getItem('token');
  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.isLoading = true;
    this.shortClipService.fetchAllData({ accessId: this.accessId }).subscribe(
      res => {
        this.dataAllUser = res.data;
        this.applyFilter();
        this.isLoading = false;
      },
      err => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      }
    );
  }

  updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedData = this.filteredData.slice(start, start + this.pageSize);
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.updatePaginatedData();
    this.clearSelectionOnPageChange();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  onSearch(): void {
    this.applyFilter();
  }

  private applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredData = this.dataAllUser.filter(item =>
      Object.values(item).some(val => val?.toString().toLowerCase().includes(term))
    );
    this.currentPage = 1;
    this.updatePaginatedData();
  }

  editUser(userId: string): void {
    this.router.navigate(['/TechFormEdit', userId]);
  }

  openDeleteModal(id: number) {
    this.deleteId = id;
    this.modalService.open(this.confirmModal, { centered: true });
  }

  confirmDelete(modal: any): void {
    modal.close();
    this.shortClipService.deleteUser(this.deleteId, this.accessId)
      .pipe(catchError(err => {
        console.error('Delete failed', err);
        this.showToastMessage('Failed to delete the record. Please try again.', 'danger');
        return of(null);
      }))
      .subscribe(res => {
        if (res) {
          this.showToastMessage('Record deleted successfully!', 'success');
          this.dataAllUser = this.dataAllUser.filter(user => user.id !== this.deleteId);
          this.applyFilter();
        }
      });
  }

  showToastMessage(message: string, type: 'success' | 'danger'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  exportData(): void {
    const payload = { filter: 'all', accessId: this.accessId };
    this.shortClipService.exportExcelData(payload).subscribe(
      (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      err => console.error('Download failed:', err)
    );
  }

  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.paginatedData.forEach(user => this.selectedRecords[user.id] = checked);
    this.updateSelection();
  }

  updateSelection(): void {
    this.deleteIds = Object.keys(this.selectedRecords)
      .filter(id => this.selectedRecords[+id])
      .map(Number);
  }

  hasSelectedRecords(): boolean {
    return this.deleteIds.length > 0;
  }

  clearSelectionOnPageChange(): void {
    this.paginatedData.forEach(user => delete this.selectedRecords[user.id]);
    this.updateSelection();
  }

  openDeleteMultipleModal(): void {
    this.modalService.open(this.confirmAllModal, { centered: true });
  }

  confirmDeleteMultiple(modal: any): void {
    modal.close();
    if (!this.deleteIds.length) {
      this.showToastMessage('No records selected for deletion.', 'danger');
      return;
    }

    const payload = { deleteMultiple: this.deleteIds, accessId: this.accessId };

    this.shortClipService.deleteMultipleUser(payload)
      .pipe(catchError(err => {
        console.error('API Error:', err);
        this.showToastMessage('Failed to delete records. Please try again.', 'danger');
        return of(null);
      }))
      .subscribe(res => {
        if (res?.message === 'User has been deleted successfully.') {
          this.showToastMessage('Records deleted successfully!', 'success');
          this.getUserList();
          this.clearSelection();
        } else {
          this.showToastMessage(res?.message || 'Something went wrong. Please try again.', 'danger');
        }
      });
  }

  clearSelection(): void {
    this.selectedRecords = {};
    this.deleteIds = [];
  }


}
