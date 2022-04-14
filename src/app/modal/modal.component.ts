import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent{
  @Input() timer!:number;
  @Input() allMatches!: number;

  constructor(private host: ElementRef<HTMLElement>) { }

  timerToMinutes() {
    return Math.floor(this.timer / 60) == 0 ? '' : `${Math.floor(this.timer / 60)}min `
  }

  getTime() {
    return `${this.timerToMinutes()}${this.timer % 60}sec`
  }

  onClose() {
    this.host.nativeElement.remove();
  }

  newGame() {
    window.location.reload();
  }
}
