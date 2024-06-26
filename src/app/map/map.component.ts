import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

interface WindData {
  STN: string;
  WDSP: number;
  date: Date;
  lat: number;
  lng: number;
}

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  today: string;
  windData: WindData[] = [];
  uniqueStationsData: WindData[] = [];

  constructor(private apiService: ApiService) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; 
  }

  ngOnInit() {
    this.getTopWindSpeeds();
  }

  getTopWindSpeeds() {
    this.apiService.getWindData().subscribe((data: WindData[]) => {
      const sortedData = data.sort((a: WindData, b: WindData) => b.WDSP - a.WDSP);

      this.uniqueStationsData = sortedData.filter((value: WindData, index: number, self: WindData[]) =>
        index === self.findIndex((t: WindData) => t.STN === value.STN)
      );

      this.windData = this.uniqueStationsData.slice(0, 10);
    });
  }

}