import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components

import { UsersComponent } from './components/users/users.component';
import { LogoComponent } from './components/logo/logo.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminGuard } from './guards/admin.guards';



const appRoutes: Routes = [
   
    { path: '', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'users', canActivate: [AdminGuard] , component: UsersComponent },
    { path: 'logo', component: LogoComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: NotFoundComponent}
    
];

export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);