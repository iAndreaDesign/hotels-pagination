import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsPageComponent } from './pages/hotels-page/hotels-page.component';

export const HOTELS_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', component: HotelsPageComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
