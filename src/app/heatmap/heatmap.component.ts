import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WeatherService } from '../services/weather.service';

interface WeatherData {
  lat: number;
  lng: number;
  rainfall: number;
  temperature: number;
}

@Component({
  selector: 'app-heatmap',
  standalone:true,
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  private map!: any; // Type any omdat L.Map niet beschikbaar is tijdens SSR
  private heatLayer: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
      this.weatherService.getWeatherData().subscribe((data: WeatherData[]) => {
        this.addHeatLayer(data);
      });
    }
  }

  private initMap(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        this.map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
      }).catch(err => {
        console.error('Failed to load Leaflet', err);
      });
    }
  }

  private addHeatLayer(data: WeatherData[]): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet.heat').then(heat => {
        const heatData = data
          .filter(point => point.temperature < 13.9)
          .map(point => [point.lat, point.lng, point.rainfall]);

        this.heatLayer = (heat as any).default(heatData, { radius: 25 }).addTo(this.map);
      }).catch(err => {
        console.error('Failed to load Leaflet.heat', err);
      });
    }
  }
}
