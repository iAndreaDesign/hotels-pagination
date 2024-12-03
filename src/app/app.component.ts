import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HotelsPageComponent } from './hotels/pages/hotels-page/hotels-page.component';
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'apps-angular-technical-test';
}

