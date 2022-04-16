import {
  Injectable
} from '@angular/core';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';
import {
  PokeService
} from './poke.service';

@Injectable({
  providedIn: 'root'
})

export class NewGameService {
  pokeArray!: string[];
  matchedArr: string[] = [];
  activePokesArr: string[] = [];
  activePokesArrSubj = new Subject < string[] > ();
  timer: number = 0;
  allMatches: number = 0;
  isTimerGoing: boolean = false;
  myInterval!: ReturnType < typeof setInterval > ;
  pokeArrSubj = new BehaviorSubject < string[] > (this.pokeArray);
  activeIndex = new Subject < number > ();
  timerSubject = new Subject < number > ();
  isModalActive = new BehaviorSubject < boolean > (false);
  allMatchesSubj = new BehaviorSubject < number > (0);
  matchedArrSubj = new Subject < string[] > ();

  lastClickedId = new Subject < number > ();

  constructor(private pokeService: PokeService) {}

  newGame() {
    this.clearVariablesForNewGame();
    this.pokeService.getRandomNumberList();
    this.pokeService.getPokeList();
    this.pokeArray = this.pokeService.newPokeArray;
    return this.pokeArray;
  }

  onTileClick(poke: string) {
    console.log()
    if (this.isTimerGoing == false) {
      this.isTimerGoing = true;
      this.myInterval = setInterval(() => this.timer++, 1000)
    };

    if (this.activePokesArr.length < 2) {
      this.activePokesArr.push(poke);
      this.activePokesArrSubj.next(this.activePokesArr);
    } else if (this.activePokesArr.length === 2) {
      if (this.activePokesArr[0] === this.activePokesArr[1]) {}
      this.activePokesArr = [];
      this.activePokesArr.push(poke);
      this.activePokesArrSubj.next(this.activePokesArr);
    }

    if (this.activePokesArr[0] === this.activePokesArr[1]) {
      this.matchedArr.push(this.activePokesArr[0]);
    }

    if (this.activePokesArr.length === 2) {
      this.allMatches++;
      this.allMatchesSubj.next(this.allMatches);
      setTimeout(() => {
        this.activeIndex.next(-1);
        this.activePokesArr = [];
        this.activePokesArrSubj.next([]);

      }, 500)
    }

    if (this.matchedArr.length === 10) {
      this.timerSubject.next(this.timer);
      clearInterval(this.myInterval);
      this.isModalActive.next(true);
    }
  }

  clearVariablesForNewGame() {
    this.pokeArray = [];
    this.activeIndex.next(-1);
    this.isTimerGoing = false;
    this.timer = 0;
    this.timerSubject.next(0);
    this.isModalActive.next(false);
    this.activePokesArr = [];
    this.activePokesArrSubj.next(this.activePokesArr);
    this.allMatches = 0;
    this.allMatchesSubj.next(this.allMatches);
    this.matchedArr = [];
    this.matchedArrSubj.next(this.matchedArr);
    this.pokeService.clearArr();
  }
}
