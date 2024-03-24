import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from './components/search-component/search-component.component'; // Імпортуємо ваш компонент


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie';
}
