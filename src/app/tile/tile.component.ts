import {
  Component,
  OnInit
} from '@angular/core';
import { NewGameService } from './new-game.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  pokeArray!: string[];
  activeIndex!:number;
  timer!:number;
  isModalActive!:boolean;
  matchedArr!:string[];
  allMatches!:number;
  activePokesArr: string[] = [];
  lastClickedArr: number[] = [-2, -1];

  constructor(private newGameServ: NewGameService) {}

  ngOnInit() {
    this.newGame();
    this.newGameServ.allMatchesSubj.asObservable().subscribe(
      value => this.allMatches = value
    );
    this.newGameServ.activePokesArrSubj.asObservable().subscribe(value =>
      this.activePokesArr = value)
  }

  newGame() {
    this.newGameServ.matchedArrSubj.asObservable().subscribe(value =>
    this.matchedArr = value);
    this.newGameServ.newGame();
    this.pokeArray =this.newGameServ.pokeArray;
    this.newGameServ.activeIndex.asObservable().subscribe(
      value => this.activeIndex = value
    );
    this.newGameServ.timerSubject.asObservable().subscribe(
      value => this.timer = value
    );
    this.newGameServ.isModalActive.asObservable().subscribe(value => {
      this.isModalActive = value;
    });
  }

  onActivate(poke: string, lastClickedIndex: number) {
    this.newGameServ.onTileClick(poke);
    this.lastClickedArr.push(lastClickedIndex);
    this.lastClickedArr.shift();

    // if(this.activePokesArr.length == 2) {
    //   this.lastClickedArr = [-2, -1];
    //   this.lastClickedArr.push(lastClickedIndex)
    // }
  }
}
