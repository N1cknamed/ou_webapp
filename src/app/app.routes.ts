import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { AuthGuard } from './services/auth.guard';

export const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Osaka University Weather App',
        canActivate: [AuthGuard]
    },
    {
        path: 'heatmap',
        component: HeatmapComponent,
        title: 'Heatmap',
        canActivate: [AuthGuard]
    },
    {
        path: 'map',
        component: MapComponent,
        title: 'Map',
        canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        title: 'Admin',
        canActivate: [AuthGuard]
    }
];
