import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
//import { HttpClientModule } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';

interface WeatherData {
  lat: number;
  lng: number;
  rainfall: number;
  temperature: number;
}

@Component({
  selector: 'app-heatmap',
  standalone: true,
  //imports: [HttpClientModule],
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})
export class HeatmapComponent implements OnInit {
  private map: any;
  private heatLayer: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private weatherService: WeatherService
  ) { }

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
        this.map = L.map('map', {
          minZoom: 3,
        }).setView([52.52, 13.4050], 6); // Aangepaste view

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
      import('leaflet').then(L => {
        import('leaflet.heat').then(heat => {
          const heatData = data.map(point => [point.lat, point.lng, point.rainfall] as [number, number, number]);

          const gradient = {
            0.2: 'blue',
            0.4: 'cyan',
            0.6: 'lime',
            0.8: 'yellow',
            1.0: 'red'
          };

          if (!this.heatLayer) {
            this.heatLayer = L.heatLayer(heatData, { radius: 100, gradient }).addTo(this.map);
          } else {
            this.heatLayer.setLatLngs(heatData);
          }
        }).catch(err => {
          console.error('Failed to load Leaflet.heat', err);
        });
      }).catch(err => {
        console.error('Failed to load Leaflet', err);
      });
    }
  }
}
