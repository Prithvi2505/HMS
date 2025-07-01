import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFilterFn } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { showError } from 'src/app/Store/snackbar/snackbar.actions';

export interface DynamicFormField {
  name: string;
  label: string;
  type:
  | 'text'
  | 'number'
  | 'date'
  | 'select'
  | 'time'
  | 'textarea'
  | 'auto-select';
  required?: boolean;
  filterable?: boolean;
  options?: { value: string | number; label: string }[];
  min?: string;
  max?: string;
}

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
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
  filteredOptions: { [key: string]: any[] } = {};

  constructor(private store:Store){}

  ngOnInit(): void {
    const group: any = {};
    for (const field of this.formConfig) {
      group[field.name] = new FormControl(
        this.initialValues[field.name] || '',
        field.required ? Validators.required : []
      );
    }
    this.form = new FormGroup(group);

    this.form.patchValue(this.initialValues);
    this.formConfig.forEach((field) => {
      if (field.type === 'select' && field.options) {
        this.filteredOptions[field.name] = [...field.options];
      }
    });
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
 onInputKeyup(event: Event, fieldName: string): void {
  const input = (event.target as HTMLInputElement).value.trim().toLowerCase();

  const field = this.formConfig.find(f => f.name === fieldName);
  if (!field || !field.options) return;

  const matches = field.options.filter(option =>
    option.label.toLowerCase().includes(input)
  );

  this.filteredOptions[fieldName] = matches;

  if (matches.length === 0) {
    const errorMsg =
      fieldName === 'doctorId'
        ? 'Doctor not found.'
        : fieldName === 'patientId'
        ? 'Patient not found.'
        : 'No match found.';
    this.store.dispatch(showError({ message: errorMsg }));
  }
}

selectOption(fieldName: string, option: any): void {
  this.form.get(fieldName)?.setValue(option.value); // 👈 Store ID instead of name
  this.filteredOptions[fieldName] = [];
}
getLabel(fieldName: string): string {
  const field = this.formConfig.find(f => f.name === fieldName);
  const value = this.form.get(fieldName)?.value;
  if (!field || !field.options) return '';

  const selected = field.options.find(opt => opt.value === value);
  return selected ? selected.label : '';
}


  onCancel() {
    this.cancel.emit();
  }
}
