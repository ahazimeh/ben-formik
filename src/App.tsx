import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Radio,
  Select,
  TextField,
} from "@material-ui/core";
import {
  Field,
  FieldArray,
  FieldAttributes,
  FieldHookConfig,
  Form,
  Formik,
  useField,
} from "formik";
import React from "react";
import * as yup from "yup";

type MyRadioProps = {
  label: string;
} & FieldHookConfig<{}>;

const MyRadio: React.FC<MyRadioProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControlLabel
      {...field}
      // value={field.value}
      // onChange={field.onChange}
      control={<Radio />}
      label={label}
    />
  );
};

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
});

const App: React.FC = () => {
  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          isTall: false,
          cookies: [],
          yogurt: "",
          pets: [{ type: "cat", name: "jarvis", id: "" + Math.random() }],
        }}
        validationSchema={validationSchema}
        // validate={(values) => {
        //   const errors: Record<string, string> = {};
        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "no bob";
        //   }
        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          resetForm();
          setSubmitting(true);
          setSubmitting(false);
          console.log(data);
        }}
      >
        {({
          values,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form>
            {/* <form onSubmit={handleSubmit}> */}
            <MyTextField
              placeholder="first name"
              name="firstName"
              type="input"
            />
            {/* <Field
              placeholder="first name"
              name="firstName"
              type="input"
              as={TextField}
            /> */}
            <div>
              <Field
                placeholder="last name"
                name="lastName"
                type="input"
                as={TextField}
              />
            </div>
            <Field name="isTall" type="checkbox" as={Checkbox} />
            <div>cookies:</div>
            <Field
              name="cookies"
              type="checkbox"
              value="chocolate chip"
              as={Checkbox}
            />
            <Field
              name="cookies"
              type="checkbox"
              value="snickerdoodle"
              as={Checkbox}
            />
            <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />
            <div>yogurt</div>
            <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
            <MyRadio
              name="yogurt"
              type="radio"
              value="blueberry"
              label="blueberry"
            />
            <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
            {/* <Field name="yogurt" type="radio" value="peach" as={MyRadio} />
            <Field name="yogurt" type="radio" value="blueberry" as={MyRadio} />
            <Field name="yogurt" type="radio" value="apple" as={MyRadio} /> */}
            {/* <TextField
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
            {/* <TextField
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            /> */}
            <FieldArray name="pets">
              {(arrayHelper) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelper.push({
                        type: "frog",
                        name: "",
                        id: "" + Math.random(),
                      })
                    }
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={pet.id}>
                        <MyTextField
                          placeholder="name"
                          name={`pets.${index}.name`}
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type="select"
                          as={Select}
                        >
                          <MenuItem value="cat">cat</MenuItem>
                          <MenuItem value="dog">dog</MenuItem>
                          <MenuItem value="frog">frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelper.remove(index)}>
                          x
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </FieldArray>
            <div>
              <Button disabled={isSubmitting} type="submit">
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            {/* </form> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default App;
