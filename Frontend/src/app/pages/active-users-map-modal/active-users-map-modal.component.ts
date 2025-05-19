import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-active-users-map-modal',
  templateUrl: './active-users-map-modal.component.html',
  styleUrls: ['./active-users-map-modal.component.scss']
})
export class ActiveUsersMapModalComponent {
  @ViewChild('userMapContainer') userMapContainer!: ElementRef;
  @Input() state: string = '';
  @Input() city: string = '';

  map!: google.maps.Map;
  markers: google.maps.Marker[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: FormAPIsService
  ) { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    const options: google.maps.MapOptions = {
      center: new google.maps.LatLng(37.7749, -122.4194), // Default India center
      zoom: 5
    };

    this.map = new google.maps.Map(this.userMapContainer.nativeElement, options);
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getActiveUsers(this.state, this.city).subscribe({
      next: (res) => {
        res.data.forEach((user: any) => {
          const position = new google.maps.LatLng(user.lat, user.long);
          const marker = new google.maps.Marker({
            map: this.map,
            position,
            title: user.name
          });

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div class="custom-info-window">
                <p><strong>Name:</strong> ${user.name || 'N/A'}</p>
                <p><strong>Address:</strong> ${user.address || 'N/A'}, ${user.city || ''}</p>
                <p><strong>Phone:</strong> ${user.phone || 'N/A'}</p>
              </div>
            `
          });

          marker.addListener('click', () => infoWindow.open(this.map, marker));
          this.markers.push(marker);
        });


        if (this.markers.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          this.markers.forEach(marker => bounds.extend(marker.getPosition()!));
          this.map.fitBounds(bounds);
        }
      },
      error: err => console.error('Active users fetch error:', err)
    });
  }
}
