import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';

interface WindData {
  STN: string;
  WDSP: number;
  date: Date;
  lat: number;
  lng: number;
  country: string;
  city: string;
  TIME: Time;
}

@Component({
  selector: 'app-wind',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './wind.component.html',
  styleUrl: './wind.component.css'
})
export class WindComponent implements OnInit {
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

  downloadWindData(): void {
    const jsonData = JSON.stringify(this.windData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `wind-data.json`;
    document.body.appendChild(a); 
    a.click();
    document.body.removeChild(a); 
  }

}