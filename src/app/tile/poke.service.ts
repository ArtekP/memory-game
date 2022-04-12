import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable,
  OnInit
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeService implements OnInit {
  randomNumberArr: number[] = [];
  pokes!: any;
  pokeArray: any = [];
  newPokeArray: any[] = [];

  configUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getRandomNumberList() {
    let arr: number[] = [];
    for (let i = 0; i < 10; i++) {
      let randomNumber: number = Math.floor(Math.random() * (898 - 1 + 1)) + 1;
      if (!arr.includes(randomNumber)) {
        arr.push(randomNumber);
      } else {
        return;
      }
    }
    this.randomNumberArr = [...arr];
    this.pokeArray = this.randomNumberArr.slice().concat(this.randomNumberArr.slice());
    this.shuffleArray(this.pokeArray)
  }

  shuffleArray(a: number[]) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  getRandomNumber() {
    return Math.floor(Math.random() * (898 - 1 + 1)) + 1;
  }

  getPokeList() {
    let arr: any = [];
    for(let i = 0; i < 20; i++) {
      this.http.get<any>(this.configUrl + this.pokeArray[i]).subscribe(value => {
        value = value.sprites.front_default as string;
        this.newPokeArray.push(value);
        // console.log('val2 ' + value)
      });
    }
      setTimeout(() => console.log("this is new poke arr from service " + this.newPokeArray), 1000);
  }

}