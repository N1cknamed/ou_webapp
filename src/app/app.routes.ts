import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';

export const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Osaka University Weather App'
    },
    {
        path: 'map',
        component: MapComponent,
        title: 'Map'
    }
];
