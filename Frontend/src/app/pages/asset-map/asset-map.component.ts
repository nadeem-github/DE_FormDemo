import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormAPIsService } from 'src/app/form-apis.service';
import { Asset } from 'src/app/models/asset/asset.module';

@Component({
  selector: 'app-asset-map',
  templateUrl: './asset-map.component.html',
  styleUrls: ['./asset-map.component.scss']
})
export class AssetMapComponent {
  assets: Asset[] = [];
  filters = { stations: [] as string[], portTypes: [] as string[] };
  filterForm!: FormGroup;

  // Google Maps settings
  center = { lat: 20.5937, lng: 78.9629 };
  zoom = 5;
  apiKey = 'AIzaSyAY7vqVB3ZQM6_M17lVrxeRUydqi_f_eQs';

  constructor(private assetService: FormAPIsService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.fetchFilters();
    this.fetchAssets();

    this.filterForm.valueChanges.subscribe(() => {
      this.fetchAssets();
    });
  }

  initForm() {
    this.filterForm = this.fb.group({
      station: [''],
      portType: [''],
    });
  }

  fetchAssets() {
    const { station, portType } = this.filterForm.value;
    this.assetService.getAssets(station, portType).subscribe((data) => {
      this.assets = data;
    });
  }

  fetchFilters() {
    this.assetService.getFilters().subscribe((data) => {
      this.filters.stations = [...new Set(data.map((a) => a.station_name))];
      this.filters.portTypes = [...new Set(data.map((a) => a.port_type))];
    });
  }
}
