import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() timer!:number;
  @Input() allMatches!: number;


  constructor(private host: ElementRef<HTMLElement>, private router: Router) { }

  ngOnInit(): void {

  }

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
    window.location.reload()
  }
}
