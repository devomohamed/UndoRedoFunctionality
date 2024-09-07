import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StateFormComponent } from "./state-form/state-form.component";

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, StateFormComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'UndoRedoFunctionality';
}
