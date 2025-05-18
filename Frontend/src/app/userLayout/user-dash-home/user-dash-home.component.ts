import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAPIsService } from 'src/app/form-apis.service';
import { User } from 'src/app/submit.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-dash-home',
  templateUrl: './user-dash-home.component.html',
  styleUrls: ['./user-dash-home.component.scss']
})
export class UserDashHomeComponent {

  userData: User | null = null;
  isLoading = true;
  
  imgBaseURL = environment.imgBaseURL;

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
  allDocsAvailable = false;


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
        console.log('User data:', this.userData);

        this.checkDocumentStatus();
        this.isLoading = false;
      },
      err => {
        console.error('Error fetching data:', err);
        this.isLoading = false;
      }
    );
  }

  // Check if all document fields are missing
  checkDocumentStatus(): void {
    this.allDocsMissing = this.docKeys.every(doc => !this.userData?.[doc.key]);
    this.allDocsAvailable = this.docKeys.every(doc => !!this.userData?.[doc.key]);
  }


  currentImageIndex = 0;
  currentImage: { title: string; src: string } | null = null;
  availableImages: { title: string; src: string }[] = [];

  imageVisible = false; // For fade animation

  @ViewChild('content', { static: true }) contentRef!: TemplateRef<any>;

  openModal(content: TemplateRef<any>, doc: any): void {
    this.availableImages = this.docKeys
      .filter(d => this.userData?.[d.key])
      .map(d => ({
        title: d.title,
        src: this.imgBaseURL + this.userData?.[d.key]
      }));

    this.currentImageIndex = this.availableImages.findIndex(d => d.title === doc.title);
    this.setCurrentImage();

    const modalRef = this.modalService.open(content, {
      size: 'lg',
      centered: true,
      backdrop: 'static',
      keyboard: true,
    });

    setTimeout(() => {
      const modalEl = document.querySelector('.modal-body');
      if (modalEl) (modalEl as HTMLElement).focus();
    }, 200);
  }

  setCurrentImage(): void {
    this.imageVisible = false; // start fade out
    setTimeout(() => {
      this.currentImage = this.availableImages[this.currentImageIndex];
      this.imageVisible = true; // trigger fade in
    }, 50);
  }

  onImageLoad(): void {
    this.imageVisible = true;
  }

  prevImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
      this.setCurrentImage();
    }
  }

  nextImage(): void {
    if (this.currentImageIndex < this.availableImages.length - 1) {
      this.currentImageIndex++;
      this.setCurrentImage();
    }
  }

  // Keyboard navigation
  onArrow(direction: 'prev' | 'next'): void {
    direction === 'prev' ? this.prevImage() : this.nextImage();
  }

  // Swipe gesture handlers
  onSwipe(direction: 'prev' | 'next'): void {
    direction === 'prev' ? this.prevImage() : this.nextImage();
  }



}
