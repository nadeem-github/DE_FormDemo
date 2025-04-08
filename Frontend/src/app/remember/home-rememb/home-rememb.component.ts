import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormAPIsService } from 'src/app/form-apis.service';

@Component({
  selector: 'app-home-rememb',
  templateUrl: './home-rememb.component.html',
  styleUrls: ['./home-rememb.component.scss']
})
export class HomeRemembComponent {
  isLoading = true;
  remembrances: any[] = [];
  requestData = {};
  baseURL = 'http://50.6.202.250:8002/storage/images/'; // Base URL
  selectedRemembrance: any = null;

  constructor(
    private virtualFielsService: FormAPIsService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchRemembrances();
  }

  fetchRemembrances(): void {
    this.virtualFielsService.getRemembrances(this.requestData).subscribe(response => {
      if (response.success) {
        this.remembrances = response.data;
        console.log(this.remembrances);
      }
    });
  }

  // Toggle Details on Image Click
  toggleDetails(remembrance: any): void {
    this.selectedRemembrance = this.selectedRemembrance === remembrance ? null : remembrance;
  }
}
