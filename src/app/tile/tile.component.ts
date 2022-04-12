import { Component, OnInit } from '@angular/core';
import { PokeService } from './poke.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  pokeArray!: any[];
  pokes!: any;

  constructor(private pokeService: PokeService) {
    this.pokeService.getRandomNumberList();
    this.pokeService.getPokeList();
    this.pokeArray = this.pokeService.newPokeArray;
    console.log(this.pokeArray)
    // this.pokeService.getPokeList().subscribe((data: any) => {
    //   this.pokes = data;
    //   console.log(this.pokes)
    // })
  }

  ngOnInit(): void {
  }

  getRandomPokemon() {
    this.pokeService.getRandomNumberList();
  }

  getPokemon() {
    this.pokeService.getPokeList();
  }
}
