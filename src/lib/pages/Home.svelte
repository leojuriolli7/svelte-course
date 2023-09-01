<script>
  import Button from "../Button.svelte";
  import Field from "../Form/Field.svelte";
  import Form from "../Form/Form.svelte";
  import {
    validateEmail,
    validateRequiredField,
  } from "../../lib/utils/validation";
</script>

<Form
  on:submit={(e) => {
    console.log(e.detail);
  }}
  initialValues={{ username: "Test", email: "test@test.com" }}
  let:hasErrors
>
  <Field
    label="Username"
    name="username"
    type="text"
    validate={validateRequiredField}
    placeholder="Write a username..."
  />
  <Field
    label="Email"
    name="email"
    type="email"
    placeholder="Write an e-email..."
    validate={(value, label) => {
      return validateRequiredField(value, label) || validateEmail(value, label);
    }}
  />
  <Field
    label="password"
    name="password"
    type="password"
    validate={validateRequiredField}
    placeholder="Write a password..."
  />
  <Button type="submit" disabled={hasErrors}>Submit</Button>
</Form>
