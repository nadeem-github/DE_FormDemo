import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-active-user',
  templateUrl: './active-user.component.html',
  styleUrls: ['./active-user.component.scss']
})
export class ActiveUserComponent {
  @ViewChild('mapContainer', { static: true }) gmap!: ElementRef;
  @ViewChild('infoWindowModal') infoWindowModal!: ElementRef;

  map!: google.maps.Map;
  assets: any[] = [];
  markers: google.maps.Marker[] = [];
  selectedAsset: any;
  modalTitle: string = 'User Details';

  constructor(
    private assetMapService: FormAPIsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.initMap();
    this.fetchAssets();
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(28.6139, 77.2090), // Delhi default
      zoom: 5
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
  }

  fetchAssets(): void {
    const accessId = localStorage.getItem('userId');

    const payload = {
      accessId: accessId
    };
    this.assetMapService.activeUsers(payload).subscribe({
      next: (data) => {
        this.assets = data.map((item: any) => ({
          lat: +item.l,
          lng: +item.l1,
          firstName: item.fn,
          lastName: item.ln,
          address: item.a,
          solution: item.sol,
          city: item.city
        }));
        this.plotMarkers();
      },
      error: (err) => console.error(err)
    });
  }

  plotMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    const bounds = new google.maps.LatLngBounds();

    this.assets.forEach(asset => {
      const position = new google.maps.LatLng(asset.lat, asset.lng);

      const iconUrl = asset.firstName.toLowerCase() === 'nadeem'
        ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        icon: iconUrl,
        title: `${asset.firstName} ${asset.lastName}`
      });

      marker.addListener('click', () => {
        this.selectedAsset = asset;
        this.modalTitle = `${asset.firstName} ${asset.lastName}`;
        this.modalService.open(this.infoWindowModal, { size: 'sm', centered: true, backdrop: 'static', keyboard: false });
      });

      this.markers.push(marker);
      bounds.extend(position);
    });

    if (this.assets.length > 0) {
      this.map.fitBounds(bounds);
    }
  }

  closeModal(modal: any): void {
    modal.close();
  }

}
