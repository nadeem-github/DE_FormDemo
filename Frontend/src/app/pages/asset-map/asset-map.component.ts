import { Component, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('mapContainer', { static: true }) gmap!: ElementRef;
  @ViewChild('infoWindowModal') infoWindowModal!: ElementRef;

  map!: google.maps.Map;
  filterForm: FormGroup;
  assets: any[] = [];
  filteredAssets: any[] = [];
  markers: google.maps.Marker[] = [];
  selectedAsset: any;
  modalTitle: string = 'Asset Details';

  counts = {
    all: 0,
    charging_stations: 0,
    charging_ports: 0
  };

  constructor(
    private assetMapService: FormAPIsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.filterForm = this.fb.group({
      stationType: ['all'] // default = all stations
    });
  }

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
    this.assetMapService.getAssets({}).subscribe({
      next: (data) => {
        this.assets = data;
        this.updateCounts();
        this.applyFilter();
      },
      error: (err) => console.error(err)
    });
  }

  updateCounts(): void {
    this.counts.all = this.assets.length;
    this.counts.charging_stations = this.assets.filter(a => a.station_name.trim() === 'charging_stations').length;
    this.counts.charging_ports = this.assets.filter(a => a.station_name.trim() === 'charging_ports').length;
  }

  applyFilter(): void {
    const selectedType = this.filterForm.value.stationType;
    if (selectedType === 'all') {
      this.filteredAssets = this.assets;
    } else {
      this.filteredAssets = this.assets.filter(a => a.station_name.trim() === selectedType);
    }
    this.plotMarkers();
  }

  plotMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    const bounds = new google.maps.LatLngBounds();

    this.filteredAssets.forEach(asset => {
      const position = new google.maps.LatLng(+asset.lat, +asset.lng);

      const iconUrl = asset.station_name.trim() === 'charging_ports'
        ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
        : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        icon: iconUrl,
        title: `${asset.station_name} (${asset.port_type})`
      });

      marker.addListener('click', () => {
        this.selectedAsset = asset; // Save the selected asset details
        this.modalTitle = `${asset.station_name} - ${asset.port_type || 'N/A'}`; // Set the title dynamically
        this.modalService.open(this.infoWindowModal, { size: 'sm', centered: true, backdrop: 'static', keyboard: false, }); // Open modal centered
      });

      this.markers.push(marker);
      bounds.extend(position);
    });

    if (this.filteredAssets.length > 0) {
      this.map.fitBounds(bounds);
    }
  }

  closeModal(modal: any): void {
    modal.close();
  }

  onFilter(): void {
    this.applyFilter();
  }
}
