  import { Component } from '@angular/core';
  import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

  import { InputTextModule } from 'primeng/inputtext';
  import { ButtonModule } from 'primeng/button';
  import { DropdownModule } from 'primeng/dropdown';
  import { CheckboxModule } from 'primeng/checkbox';
  import { CardModule } from 'primeng/card';
  import { OverlayPanelModule } from 'primeng/overlaypanel';
  import { CommonModule } from '@angular/common';
  import { ToastModule } from 'primeng/toast';
  import { MessageService } from 'primeng/api';


  @Component({
    selector: 'app-state-form',
    standalone: true,
    imports: [
      CommonModule,
      ReactiveFormsModule,
      InputTextModule,
      ButtonModule,
      DropdownModule,
      CheckboxModule,
      CardModule,
      OverlayPanelModule,
      ToastModule
    ],
    providers:[MessageService],
    templateUrl: './state-form.component.html',
    styleUrl: './state-form.component.scss'
  })
  export class StateFormComponent {
    formGroup: FormGroup;
    genderOptions = [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];
    undoStack: any[] = [];
    redoStack: any[] = [];

    constructor(private fb: FormBuilder,private toast: MessageService) {
      this.formGroup = this.fb.group({
        name: [''],
        age: [''],
        email: ['',[Validators.required,Validators.email]],
      });

      this.trackFormChanges();
    }

    trackFormChanges() {
      this.formGroup.valueChanges.subscribe((value) => {
        if (!this.isProgrammaticChange) {
          this.undoStack.push({ ...value });
          this.redoStack = [];
        }
      });
    }

    isProgrammaticChange:any
    undo() {
      if (this.undoStack.length > 0) {
        this.isProgrammaticChange = true;
        const previousState = this.undoStack.pop();
        this.redoStack.push({ ...this.formGroup.value });
        this.formGroup.setValue(previousState);
        this.isProgrammaticChange = false;
        this.toast.add({ severity: 'success', summary: 'Undo', detail: 'Last change has been reverted.' });
      }
    }
    
    redo() {
      if (this.redoStack.length > 0) {
        this.isProgrammaticChange = true;
        const nextState = this.redoStack.pop();
        this.undoStack.push({ ...this.formGroup.value });
        this.formGroup.setValue(nextState);
        this.isProgrammaticChange = false;
        this.toast.add({ severity: 'success', summary: 'Redo', detail: 'Redo change has been recovered.' });
      }
    }

    formSubmit(){
      console.log(this.formGroup.value);
      
    }
  }
