import { Component } from '@angular/core';
import { RequestService } from '../../services/request.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponent {
    movieName: string='';
    year: string = '';
    plotType: string = 'short'
    movies: any[] = []; // массив для хранения списка фильмов
    moviesDetails: any[]=[]; 
    selectedMovie: any; // выбранный фильм для отображения информации

    constructor(private requestService:RequestService){}
    
    search():void{
      if (this.year.trim() === '' && this.movieName.trim() !== '') {
        this.searchByTitle();
      } else if (this.year.trim() !== '' && this.movieName.trim() !== '') {
        this.searchByTitleAndYear();
      } else {
        console.warn('Please enter a movie title');
      }
    }

    searchByTitle(): void {
      this.requestService.searchMovieByName(this.movieName).subscribe(
        (data) => {
          console.log('Movie data:', data);
          this.movies = data.Search; // сохраняем массив фильмов
          if (this.movies && this.movies.length > 0) {
            // если есть фильмы, выбираем первый для отображения информации
            this.selectedMovie = this.movies[0];
            console.log('Movie IDs:', this.movies.map(movie => movie.imdbID));
            this.searchDetails();
          } else {
            // если фильмов не найдено, сбрасываем выбранный фильм
            this.selectedMovie = null;
          }
        },
        (error) => {
          console.error('Error fetching movie data:', error);
        }
      );
    }
    searchDetails(): void {
      this.moviesDetails = []; // очищаем массив деталей фильмов перед новыми запросами
      for (let i = 0; i < this.movies.length; i++) {
        const imdbID = this.movies[i].imdbID;
        console.log(imdbID);
        this.requestService.getMovieById(imdbID).subscribe(
          (data) => {
            console.log('Movie details:', data);
            this.moviesDetails.push(data); // сохраняем данные о фильме
          },
          (error) => {
            console.error('Error fetching movie details:', error);
          }
        );
      }
    } 

    searchByTitleAndYear(): void {
      this.requestService.searchMovieByTitleAndYear(this.movieName, this.year).subscribe(
        (data) => {
          console.log('Movie data:', data);
          this.movies = data.Search; // сохраняем массив фильмов
          console.log(this.movies);
          // debugger;
          if (this.movies && this.movies.length > 0) {
            // если есть фильмы, выбираем первый для отображения информации
            this.selectedMovie = this.movies[0];
            console.log('Movie IDs:', this.movies.map(movie => movie.imdbID));
            this.searchDetails();
          } else {
            // если фильмов не найдено, сбрасываем выбранный фильм
            this.selectedMovie = null;
          }
        },
        (error) => {
          console.error('Error fetching movie data:', error);
        }
      );
    }
    changePlotType(): void {
      // Змінюємо значення plotType на протилежне значення ('short' стає 'full' і навпаки)
      this.plotType = this.plotType === 'short' ? 'full' : 'short';
    }
    
  }

