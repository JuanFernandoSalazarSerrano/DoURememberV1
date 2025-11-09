import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'individual-session',
  imports: [RouterModule],
  templateUrl: './individual-session.html'})

export class IndividualSession {

  @Input() index!: number;

}
