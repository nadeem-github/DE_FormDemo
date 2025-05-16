import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormAPIsService } from 'src/app/form-apis.service';
import { Asset } from 'src/app/models/asset/asset.module';
import * as L from 'leaflet';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  offset = 0;
  limit = 10000;

  constructor(
    private assetMapService: FormAPIsService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      stationType: ['charging_stations']
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.initMap();
    this.fetchAssets();
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(37.7749, -122.4194), // valid coordinates
      zoom: 5
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    this.map.addListener('zoom_changed', () => {
      this.updateMarkerIcons();
    });
  }

  fetchAssets(): void {
    this.assets = [];
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
    this.offset = 0;
    this.loadNextBatch();
  }

  loadNextBatch(): void {
    const accessId = localStorage.getItem('userId');
    const selectedType = this.filterForm.value.stationType;

    const payload = {
      accessId,
      offset: this.offset,
      limit: this.limit
    };

    const request$ = selectedType === 'charging_stations'
      ? this.assetMapService.assetsStation(payload)
      : this.assetMapService.assetsPort(payload);

    request$.subscribe({
      next: (data) => {
        if (data.length === 0) return;

        this.assets.push(...data);
        this.plotMarkers();

        this.offset += this.limit;
        setTimeout(() => this.loadNextBatch(), 200); // optional small delay
      },
      error: (err) => console.error(err)
    });
  }

  plotMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    const bounds = new google.maps.LatLngBounds();
    const selectedType = this.filterForm.value.stationType;

    this.assets.forEach(asset => {
      const position = new google.maps.LatLng(+asset.latitude, +asset.longitude);

      const iconUrl = selectedType === 'charging_ports'
        ? 'assets/image/charging-ports.png'
        : 'assets/image/charging-station.png';

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(25, 25)
        },
        title: asset.station_name
      });

      const infoWindow = new google.maps.InfoWindow({
        content: this.generateInfoWindowContent(asset)
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });

      this.markers.push(marker);
      bounds.extend(position);
    });

    if (this.assets.length > 0) {
      this.map.fitBounds(bounds);
    }
  }

  generateInfoWindowContent(asset: any): string {
    return `
    <div class="custom-info-window">
      <p class="station-name font-14 mb-2">
        <strong>Station Name:</strong>
        ${asset.station_name || 'N/A'}
      </p>
      <p class="address mb-2">
        <strong>Address:</strong>
        ${asset.street_address || ''}
        ${asset.city || ''}, ${asset.state || ''} ${asset.zip || ''}
      </p>
      <p class="info-line mb-2"><strong>Phone:</strong> ${asset.station_phone || 'N/A'}</p>
      <p class="info-line mb-2"><strong>Fuel Type:</strong> ${asset.fuel_type_code || 'N/A'}</p>
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

    const selectedType = this.filterForm.value.stationType;

    this.markers.forEach(marker => {
      const iconUrl = selectedType === 'charging_ports'
        ? 'assets/image/charging-ports.png'
        : 'assets/image/charging-station.png';

      marker.setIcon({
        url: iconUrl,
        scaledSize: new google.maps.Size(size, size)
      });
    });
  }

  onFilter(): void {
    this.fetchAssets();
  }

}
