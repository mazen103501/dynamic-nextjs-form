import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface FieldProps {
  id: number;
  name: string;
  fieldType: string;
  minLength?: number;
  maxLength?: number;
  defaultValue: string;
  required: boolean;
  listOfValues1?: string[];
}

const FormComponent: React.FC<{ field: FieldProps }> = ({ field }) => {
  const { control } = useFormContext();
  const { listOfValues1 } = field;

  const getErrorMessage = (error: any) => {
    if (error?.type === "required") {
      return `${field.name} is required`;
    }
    if (error?.type === "minLength") {
      return `${field.name} must be at least ${field.minLength} characters`;
    }
    if (error?.type === "maxLength") {
      return `${field.name} must be at most ${field.maxLength} characters`;
    }
    return "";
  };

  switch (field.fieldType) {
    case "TEXT":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue}
          rules={{
            required: field.required,
            minLength: field.minLength,
            maxLength: field.maxLength,
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label={field.name}
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={getErrorMessage(fieldState.error)}
            />
          )}
        />
      );
    case "LIST":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue}
          rules={{ required: field.required }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              select
              label={field.name}
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!fieldState.error}
              helperText={getErrorMessage(fieldState.error)}
            >
              {listOfValues1?.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      );
    case "RADIO":
      return (
        <Controller
          name={field.name}
          control={control}
          defaultValue={field.defaultValue}
          rules={{ required: field.required }}
          render={({ field, fieldState }) => (
            <>
              <RadioGroup {...field}>
                {listOfValues1?.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              {fieldState.error && (
                <p style={{ color: "red" }}>
                  {getErrorMessage(fieldState.error)}
                </p>
              )}
            </>
          )}
        />
      );
    default:
      return null;
  }
};

export default FormComponent;
