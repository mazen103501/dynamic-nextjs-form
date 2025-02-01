export interface FormField {
  id: number;
  name: string;
  fieldType: 'TEXT' | 'LIST' | 'RADIO';
  minLength?: number;
  maxLength?: number;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
}

export interface FormData {
  data: FormField[];
}