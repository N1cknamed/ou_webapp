import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { HeatmapComponent } from './heatmap/heatmap.component';

export const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Osaka University Weather App'
    },
    {
        path: 'heatmap',
        component: HeatmapComponent,
        title: 'Heatmap'
    },
    {
        path: 'map',
        component: MapComponent,
        title: 'Map'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin'
    }
];
