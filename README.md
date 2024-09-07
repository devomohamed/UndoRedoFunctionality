
# UndoRedoFunctionality

## Overview

The **UndoRedoFunctionality** project is an Angular-based form with undo/redo functionality. It allows users to input and edit multiple fields and revert or redo changes as needed. The form uses Angular's reactive forms module for efficient state management and PrimeNG components for UI elements and notifications.

## Technical Task

### Requirements:

1. **Form Setup**:
   - A form with text inputs, checkboxes, and dropdowns.
   - Bound to Angular’s reactive forms module for state management.

2. **Undo/Redo Buttons**:
   - Buttons for Undo and Redo actions.
   - Undo reverts the most recent change, and Redo re-applies the last undone change.

3. **State Management**:
   - Track form state changes.
   - Use stacks to maintain a history of changes for undo/redo actions.

4. **User Experience**:
   - Visual feedback using PrimeNG’s toast notifications.
   - Disable Undo/Redo buttons when not applicable.

## Implementation Details

### Code Explanation

```typescript
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule, ButtonModule, DropdownModule, CheckboxModule, CardModule, OverlayPanelModule, ToastModule } from 'primeng';
import { CommonModule } from '@angular/common';
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
  providers: [MessageService],
  templateUrl: './state-form.component.html',
  styleUrls: ['./state-form.component.scss']
})
export class StateFormComponent {
  formGroup: FormGroup;
  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];
  undoStack: any[] = [];
  redoStack: any[] = [];
  isProgrammaticChange = false;

  constructor(private fb: FormBuilder, private toast: MessageService) {
    this.formGroup = this.fb.group({
      name: [''],
      age: [''],
      email: ['', [Validators.email]],
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

  formSubmit() {
    console.log(this.formGroup.value);
  }
}
```

### Key Features
- **Reactive Form**: Built using Angular's reactive forms.
- **Undo/Redo Functionality**: Implements stacks to track form states and revert/redo changes.
- **Toast Notifications**: Displays success messages for undo/redo actions.
- **Validation**: Email field validation with `Validators.email`.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/UndoRedoFunctionality.git
   cd UndoRedoFunctionality
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

4. Open the browser at `http://localhost:4200` to access the application.

## How to Test the Undo/Redo Functionality

1. **Form Input**: Fill in the form fields (name, age, email).
2. **Undo Action**: Click the Undo button to revert the most recent change.
3. **Redo Action**: Click the Redo button to restore the last undone change.
4. **Submit**: Click the Submit button to log the current form values in the console.

## License

This project is licensed under the MIT License.
