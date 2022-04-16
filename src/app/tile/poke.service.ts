import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokeService {
  randomNumberArr: number[] = [];
  pokes!: string[];
  pokeArray: number[] = [];
  newPokeArray: string[] = [];

  configUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

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
    this.shuffleArray(this.pokeArray);
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
    for (let i = 0; i < 20; i++) {
      try {
        this.http.get < any > (this.configUrl + this.pokeArray[i]).subscribe(value => {
          value = value.sprites.front_default;
          this.newPokeArray.push(value);
        });
      } catch (error) {
        alert('There was a problem with PokeAPI. Reload page please or try again later.')
      }
    }
  }

  clearArr() {
    this.newPokeArray = [];
  }
}
