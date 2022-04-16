import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent{
  @Input() timer!:number;
  @Input() allMatches!: number;
  @Output() getNewGame = new EventEmitter<string>();
  gameOverTime: string = '';

  constructor(private host: ElementRef<HTMLElement>) { }

  ngOnInit() {
    this.gameOverTime = `${this.timerToMinutes()}${this.timer % 60}sec`
  }

  timerToMinutes() {
    return Math.floor(this.timer / 60) == 0 ? '' : `${Math.floor(this.timer / 60)}min `
  }

  onClose() {
    this.host.nativeElement.remove();
  }

  newGame() {
    this.getNewGame.next('');
  }
}
