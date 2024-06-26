import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

interface WeatherData {
  date: string;
  lat: number;
  lng: number;
  rainfall: number;
}

@Component({
  selector: 'app-heatmap',
  standalone: true,
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css'],
  imports: [ReactiveFormsModule]
})
export class HeatmapComponent implements OnInit {
  private map: any;
  private heatLayer: any;
  private markers: any[] = [];
  weatherData: WeatherData[] = [];
  form: FormGroup;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private weatherService: WeatherService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      date: ['', Validators.required],
      lat: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      lng: ['', [Validators.required, Validators.min(-180), Validators.max(180)]]
    });
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initMap();
      this.loadWeatherData();

      this.map.on('zoomend', () => {
        if (this.map.getZoom() > 8) {
          this.showRainfallMarkers();
        } else {
          this.removeRainfallMarkers();
        }
      });
    }
  }

  private loadWeatherData(selectedDate?: string): void {
    this.weatherService.getWeatherData().subscribe((data: any[]) => {
      const formattedData = this.formatWeatherData(data);
      const filteredData = this.filterWeatherDataByDate(formattedData, selectedDate);
      this.weatherData = filteredData;  
      this.addHeatLayer(filteredData);
    });
  }

  private formatWeatherData(data: any[]): WeatherData[] {
    return data.map(item => ({
      date: item.DATE,
      lat: item.latitude,
      lng: item.longitude,
      rainfall: item.PRCP,
    }));
  }

  private filterWeatherDataByDate(data: WeatherData[], selectedDate?: string): WeatherData[] {
    const endDate = selectedDate ? new Date(selectedDate) : new Date();
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 3);

    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  private async initMap(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await import('leaflet').then(L => {
        this.map = L.map('map', {
          minZoom: 3,
        }).setView([52.52, 13.4050], 6);

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
            0.3: 'blue',
            0.4: 'cyan',
            0.5: 'yellow',
            0.8: 'red'
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

  private async showRainfallMarkers(): Promise<void> {
    const L = await import('leaflet');
    this.removeRainfallMarkers();
    this.weatherData.forEach(point => {
      const marker = L.marker([point.lat, point.lng])
        .bindPopup(`Rainfall: ${point.rainfall} mm`)
        .addTo(this.map);
      this.markers.push(marker);
    });
  }

  private async removeRainfallMarkers(): Promise<void> {
    this.markers.forEach(marker => this.map.removeLayer(marker));
    this.markers = [];
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { date, lat, lng } = this.form.value;
      this.loadWeatherData(date);
      this.map.setView([lat, lng], 6);
    }
  }
}
