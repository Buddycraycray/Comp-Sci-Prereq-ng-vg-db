import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort!: string; //define here to use there
  public games!: Array<Game>; //game is in games and used multiple times
  private routeSub!: Subscription;
  private gameSub!: Subscription; //subscriptions to prevent memeory leaks

  constructor( //same names for var; to signify whats attached: :
    private httpService: HttpService, //our service
    private router: Router,
    private activatedRoute: ActivatedRoute) { } //angular's service

  ngOnInit(): void { //lifecylce hook that inits first; what gets seen first
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => { //activates search params
      if (params['game-search']) { // the if search in this param with method
        this.searchGames('metacrit', params['game-search']); //arguements
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void { //argument in (); void cuz doesn't return anything; variable to access the api data
    this.gameSub = this.httpService //method called in searchGames in http service; console for testing
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList); //gamesList from service
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }

  }

}
