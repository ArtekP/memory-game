import {
  Component,
  OnInit
} from '@angular/core';
import { NewGameService } from '../new-game.service';
import {
  PokeService
} from './poke.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  pokeArray!: any[];
  activeIndex!: number;
  isTimerGoing: boolean = false;
  timer: number = 0;
  isModalActive: boolean = false;
  activePokesArr: any[] = [];
  successfulMatches: number = 0;
  allMatches: number = 0;
  matchedArr: any[] = [];


  pokes!: any;
  myInterval: any;

  constructor(private pokeService: PokeService, private newGameServ: NewGameService) {
    this.newGame();
  }

  newGame() {
    this.clearVariablesForNewGame();
    this.pokeService.getRandomNumberList();
    this.pokeService.getPokeList();
    this.pokeArray = this.pokeService.newPokeArray;
  }

  ngOnInit() {
    if (this.successfulMatches === 10) {
      this.isModalActive = true;
    }
  }

  getPokemon() {
    this.pokeService.getPokeList();
  }

  onActivate(poke: any) {
    if (this.isTimerGoing == false) {
      this.isTimerGoing = true;
      this.myInterval = setInterval(() => this.timer++, 1000)
    };

    if (this.activePokesArr.length < 2) {
      this.activePokesArr.push(poke);
    } else if (this.activePokesArr.length === 2) {
      if (this.activePokesArr[0] === this.activePokesArr[1]) {}
      this.activePokesArr = [];
      this.activePokesArr.push(poke);
    }

    if (this.activePokesArr[0] === this.activePokesArr[1]) {
      this.successfulMatches++;
      this.matchedArr.push(this.activePokesArr[0]);
    }

    this.activePokesArr.length === 2 ? this.allMatches++ : '';

    if (this.successfulMatches === 10) {
      clearInterval(this.myInterval);
      this.isModalActive = true;
    }
  }

  clearVariablesForNewGame() {
    this.pokeArray = [];
    this.activeIndex = -1;
    this.isTimerGoing = false;
    this.timer = 0;
    this.isModalActive = false;
    this.activePokesArr = [];
    this.successfulMatches = 0;
    this.allMatches = 0;
    this.matchedArr = [];
    this.pokeService.clearArr();
  }
}
