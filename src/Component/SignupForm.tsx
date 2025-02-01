import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Container, Typography, Box } from "@mui/material";
import FormComponent from "./FormComponent";
import { FormData } from "@/types/form";

const jsonData: FormData = {
  data: [
    {
      id: 1,
      name: "Full Name",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 100,
      defaultValue: "John Doe",
      required: true,
    },
    {
      id: 2,
      name: "Email",
      fieldType: "TEXT",
      minLength: 1,
      maxLength: 50,
      defaultValue: "hello@mail.com",
      required: true,
    },
    {
      id: 6,
      name: "Gender",
      fieldType: "LIST",
      defaultValue: "Male",
      required: true,
      listOfValues1: ["Male", "Female", "Others"],
    },
    {
      id: 7,
      name: "Love React?",
      fieldType: "RADIO",
      defaultValue: "Yes",
      required: true,
      listOfValues1: ["Yes", "No"],
    },
  ],
};

const SignupForm: React.FC = () => {
  const methods = useForm({ mode: "onChange" });
  const { isValid } = methods.formState;
  const [submittedData, setSubmittedData] = useState<any>(null);

  const onSubmit = (data: any) => {
    console.log(data);
    localStorage.setItem("formData", JSON.stringify(data));
    setSubmittedData(data);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Signup Form
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {jsonData.data.map((field) => (
            <FormComponent key={field.id} field={field} />
          ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={!isValid}
          >
            Submit
          </Button>
        </form>
      </FormProvider>
      {submittedData && (
        <Box mt={4}>
          <Typography variant="h6" component="h2">
            Submitted Data:
          </Typography>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Box>
      )}
    </Container>
  );
};

export default SignupForm;
