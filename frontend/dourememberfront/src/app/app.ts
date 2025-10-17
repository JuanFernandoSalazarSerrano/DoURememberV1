import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar],
  templateUrl: './app.html'
})

export class App {
  protected readonly title = signal('dourememberfront');
}
