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
    charging_stations: 0,
    charging_ports: 0
  };

  constructor(
    private assetMapService: FormAPIsService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.filterForm = this.fb.group({
      stationType: ['charging_stations'] // default = charging_stations stations
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

    // Zoom change pe icon size adjust karenge
    this.map.addListener('zoom_changed', () => {
      this.updateMarkerIcons();
    });
  }

  updateMarkerIcons(): void {
    const zoom = this.map.getZoom() || 5;

    // Zoom ke hisab se size calculate karenge (aap chaho to adjust kar sakte ho)
    let size = 20;
    if (zoom >= 10) {
      size = 40;
    } else if (zoom >= 7) {
      size = 30;
    } else {
      size = 20;
    }

    this.markers.forEach(marker => {
      const isPort = marker.getTitle()?.includes('charging_ports');
      const iconUrl = isPort
        ? 'assets/image/charging-ports.png'
        : 'assets/image/charging-station.png';

      marker.setIcon({
        url: iconUrl,
        scaledSize: new google.maps.Size(size, size)
      });
    });
  }


  fetchAssets(): void {
    const accessId = localStorage.getItem('userId');  // direct localStorage se liya

    const payload = {
      accessId: accessId
    };
    this.assetMapService.getAssets(payload).subscribe({
      next: (data) => {
        this.assets = data;
        this.updateCounts();
        this.applyFilter();
      },
      error: (err) => console.error(err)
    });
  }

  updateCounts(): void {
    this.counts.charging_stations = this.assets.filter(a => a.station_name.trim() === 'charging_stations').length;
    this.counts.charging_ports = this.assets.filter(a => a.station_name.trim() === 'charging_ports').length;
  }


  applyFilter(): void {
    const selectedType = this.filterForm.value.stationType;
    this.filteredAssets = this.assets.filter(a => a.station_name.trim() === selectedType);
    this.plotMarkers();
  }


  // animation: google.maps.Animation.BOUNCE,

  plotMarkers(): void {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
    const bounds = new google.maps.LatLngBounds();
    this.filteredAssets.forEach(asset => {
      const position = new google.maps.LatLng(+asset.lat, +asset.lng);
      // Yahan custom icons set kar rahe hain
      const iconUrl = asset.station_name.trim() === 'charging_ports'
        ? 'assets/image/charging-ports.png'
        : 'assets/image/charging-station.png';

      const marker = new google.maps.Marker({
        position,
        map: this.map,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(35, 35)
        },
        // animation: google.maps.Animation.BOUNCE,
        title: `${asset.station_name} (${asset.port_type})`
      });

      marker.addListener('click', () => {
        this.selectedAsset = asset;
        this.modalTitle = `${asset.station_name} - ${asset.port_type || 'N/A'}`;
        this.modalService.open(this.infoWindowModal, {
          size: 'sm',
          centered: true,
          backdrop: 'static',
          keyboard: false,
        });
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
