import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { HttpClientModule } from '@angular/common/http';
import { PokeService } from './tile/poke.service';
import { ModalComponent } from './modal/modal.component';
import { DebounceClickDirective } from './debounce-click.directive';

@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    ModalComponent,
    DebounceClickDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
