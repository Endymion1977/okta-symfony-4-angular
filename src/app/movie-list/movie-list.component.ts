import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { OktaAuthService } from '@okta/okta-angular';
import 'rxjs/Rx';

interface Movie {
    id: Number,
    title: String,
    count: Number
}

@Component({
    selector: 'app-movie-list',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.css']
})

export class MovieListComponent implements OnInit {
    movies: Array<Movie> [];

    constructor(private oktaAuth: OktaAuthService, private http: Http) {
        this.movies = [];
    }

    async ngOnInit() {
        const accessToken = await this.oktaAuth.getAccessToken();
        const headers = new Headers({
            Authorization: 'Bearer ' + accessToken
        });
        // Make request
        this.http.get(
            'http://localhost:8000/movies',
            new RequestOptions({ headers: headers })
        )
        .map(res => res.json())
        .subscribe((movies: Array<Movie>) => console.log(movies));
    }

}
