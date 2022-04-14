import {
  Component,
  HostListener,
  OnInit
} from '@angular/core';
import {
  PlayService
} from './play.service';
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
  pokes!: any;
  activeIndex!: number;
  activePokesArr: any[] = [];
  allMatches: number = 0;
  successfulMatches: number = 0;
  matchedArr: any[] = [];
  isModalActive: boolean = false;
  timer: number = 0;
  myInterval: any;
  isTimerGoing: boolean = false;


  constructor(private pokeService: PokeService) {
    this.pokeService.getRandomNumberList();
    this.pokeService.getPokeList();
    this.pokeArray = this.pokeService.newPokeArray;
  }

  @HostListener('dblclick', ['$event'])
  clickEvent(event: any) {
    event.srcElement.setAttribute('disabled', true);
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

  newGame() {
    window.location.reload()
  }
}
