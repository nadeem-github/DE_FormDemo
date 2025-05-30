import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormAPIsService } from 'src/app/form-apis.service';
import { Asset } from 'src/app/models/asset/asset.module';
import * as L from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActiveUsersMapModalComponent } from '../active-users-map-modal/active-users-map-modal.component';

@Component({
  selector: 'app-asset-map',
  templateUrl: './asset-map.component.html',
  styleUrls: ['./asset-map.component.scss']
})
export class AssetMapComponent {

  @ViewChild('mapContainer', { static: false }) gmap!: ElementRef;

  map!: google.maps.Map;
  filterForm: FormGroup;
  assets: any[] = [];
  markers: google.maps.Marker[] = [];

  states: { state: string }[] = [];
  cities: { city: string }[] = [];

  constructor(
    private chargingService: FormAPIsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.filterForm = this.fb.group({
      state: [''],
      city: ['']
    });
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      stationType: ['charging_stations'],
      state: [''],
      city: ['']
    });

    this.filterForm.get('stationType')?.valueChanges.subscribe(type => {
      this.resetLocation();
      this.loadStates(); // switch states as per type
    });

    this.loadStates(); // load default (charging_stations) on load
  }


  ngAfterViewInit(): void {
    this.initMap();
    window.addEventListener('open-active-users', (e: any) => {
      const { state, city } = e.detail;
      this.openActiveUsersModal(state, city);
    });

  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(37.7749, -122.4194), // Default center
      zoom: 5
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.map.addListener('zoom_changed', () => this.updateMarkerIcons());
  }

  onFilter(): void {
    const { state, city } = this.filterForm.value;

    if (!state || !city) return;

    this.chargingService.getAssets(state, city).subscribe({
      next: (data) => {
        this.assets = data;
        this.plotMarkers();
      },
      error: (err) => console.error('Asset fetch error:', err)
    });
  }

  plotMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    const bounds = new google.maps.LatLngBounds();
    const zoom = this.map.getZoom() || 5;
    let size = 25;

    if (zoom >= 10) {
      size = 40;
    } else if (zoom >= 7) {
      size = 30;
    }
    this.assets.forEach(asset => {
      const position = new google.maps.LatLng(+asset.latitude, +asset.longitude);

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        icon: {
          url: 'assets/image/charging-station.png',
          scaledSize: new google.maps.Size(size, size)
        },
        title: asset.station_name
      });

      const infoWindow = new google.maps.InfoWindow({
        content: this.generateInfoWindowContent(asset)
      });

      marker.addListener('click', () => infoWindow.open(this.map, marker));

      this.markers.push(marker);
      bounds.extend(position);
    });

    if (this.assets.length > 0) {
      this.map.fitBounds(bounds);
      const listener = google.maps.event.addListenerOnce(this.map, 'bounds_changed', () => {
        const currentZoom = this.map.getZoom() ?? 5;
        const maxZoom = 14; // Customize max zoom (14 is usually a good detailed city-level zoom)
        if (this.assets.length <= 2 && currentZoom > maxZoom) {
          this.map.setZoom(maxZoom);
        }
      });
    }
  }

  generateInfoWindowContent(asset: any): string {
    return `
    <div class="custom-info-window">
      <p><strong>Station:</strong> ${asset.station_name || 'N/A'}</p>
      <p><strong>Address:</strong> ${asset.street_address || ''}, ${asset.city || ''}, ${asset.state || ''} ${asset.zip || ''}</p>
      <p><strong>Phone:</strong> ${asset.station_phone || 'N/A'}</p>
      <p><strong>Fuel Type:</strong> ${asset.fuel_type_code || 'N/A'}</p>
      <button class="btn btn-sm btn-primary mt-0" onclick="window.dispatchEvent(new CustomEvent('open-active-users', { detail: { state: '${asset.state}', city: '${asset.city}' } }))">
        Active Users
      </button>
    </div>
  `;
  }


  updateMarkerIcons(): void {
    const zoom = this.map.getZoom() || 5;
    let size = 25;

    if (zoom >= 10) {
      size = 40;
    } else if (zoom >= 7) {
      size = 30;
    }

    this.markers.forEach(marker => {
      marker.setIcon({
        url: 'assets/image/charging-station.png',
        scaledSize: new google.maps.Size(size, size)
      });
    });
  }

  onStateChange(): void {
    const selectedState = this.filterForm.value.state;
    this.filterForm.patchValue({ city: '' });
    this.assets = [];
    this.clearMarkers();

    if (!selectedState) {
      this.cities = [];
      return;
    }

    const selectedType = this.filterForm.value.stationType;

    if (selectedType === 'charging_ports') {
      this.chargingService.getCitiesPort(selectedState).subscribe({
        next: res => this.cities = res.cities,
        error: err => console.error('Port cities error:', err)
      });
    } else {
      this.chargingService.getCities(selectedState).subscribe({
        next: res => this.cities = res.cities,
        error: err => console.error('Station cities error:', err)
      });
    }
  }


  onCityChange(): void {
    const { state, city, stationType } = this.filterForm.value;

    if (!state || !city) return;

    const request$ = stationType === 'charging_ports'
      ? this.chargingService.getAssetsPort(state, city)
      : this.chargingService.getAssets(state, city);

    request$.subscribe({
      next: data => {
        this.assets = data || [];
        this.plotMarkers();
      },
      error: err => console.error('Assets fetch error:', err)
    });
  }

  clearMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }

  loadStates(): void {
    const selectedType = this.filterForm.value.stationType;

    if (selectedType === 'charging_ports') {
      this.chargingService.getStatesPort().subscribe({
        next: res => this.states = res.states,
        error: err => console.error('Port states error:', err)
      });
    } else {
      this.chargingService.getStates().subscribe({
        next: res => this.states = res.states,
        error: err => console.error('Station states error:', err)
      });
    }
  }

  resetLocation(): void {
    this.states = [];
    this.cities = [];
    this.assets = [];
    this.clearMarkers();
    this.filterForm.patchValue({ state: '', city: '' });
  }

  openActiveUsersModal(state: string, city: string): void {
    const modalRef = this.modalService.open(ActiveUsersMapModalComponent, { size: 'xl', backdrop: 'static', keyboard: false, centered: true });
    modalRef.componentInstance.state = state;
    modalRef.componentInstance.city = city;
  }

}
