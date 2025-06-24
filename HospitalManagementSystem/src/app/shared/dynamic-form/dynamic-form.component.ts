import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';

export interface DynamicFormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'time' | 'textarea';
  required?: boolean;
  options?: { value: string | number; label: string }[];
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() formConfig!: DynamicFormField[];
  @Input() formTitle!: string;
  @Input() submitButtonText: string = 'Submit';
  @Input() initialValues: any = {};
  @Input() dateFilter: DateFilterFn<Date | null> = () => true;
  @Input() onFormChange?: (form: FormGroup) => void;

  @Output() formSubmit = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup = new FormGroup({});

  ngOnInit(): void {
    const group: any = {};
    for (const field of this.formConfig) {
      group[field.name] = new FormControl(
        this.initialValues[field.name] || '',
        field.required ? Validators.required : []
      );
    }
    this.form = new FormGroup(group);

    this.form.valueChanges.subscribe(() => {
      if (this.onFormChange) {
        this.onFormChange(this.form);
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
