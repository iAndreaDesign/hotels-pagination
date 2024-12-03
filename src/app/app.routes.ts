import { Routes } from '@angular/router';
import { Error404PageComponent } from './shared/error404-page/error404-page.component';
import { HOTELS_ROUTES } from './hotels/hotels.routes';

export const  APP_ROUTES: Routes = [
    {
        path: 'hotels',
        loadChildren: () => import('./hotels/hotels.routes').then( m => m.HOTELS_ROUTES),
      },
      {
        path: '404',
        component: Error404PageComponent,
      },
      {
        path: '**',
        redirectTo: 'hotels'
      }
];
