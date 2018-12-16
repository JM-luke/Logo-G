import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// componentes

import { UsersComponent } from './components/users/users.component';
import { LogoComponent } from './components/logo/logo.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'users', component: UsersComponent },
    { path: 'logo', component: LogoComponent },
    { path: '**', component: NotFoundComponent}
];

export const AppRoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);