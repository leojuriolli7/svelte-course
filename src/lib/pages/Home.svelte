<script>
  import Button from "../Button.svelte";
  import isEmail from "validator/lib/isEmail";

  let values = { username: "", email: "", password: "" };
  let isSubmitting = false;
  let errors = { username: null, email: null, password: null };

  function validateForm() {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    if (values.email && !isEmail(values.email)) {
      errors.email = "Invalid email";
    }

    return errors;
  }
</script>

<form
  on:submit|preventDefault={() => {
    errors = validateForm();
    const validForm = Object.values(errors).every((e) => e === null);

    if (validForm) {
      console.log(values);
      isSubmitting = true;

      setTimeout(() => {
        isSubmitting = false;
      }, 1000);
    }
  }}
>
  <label for="username">Username</label>
  {#if errors.username}
    <p class="error-message">{errors.username}</p>
  {/if}
  <input
    type="text"
    id="username"
    name="username"
    bind:value={values.username}
  />

  <br />

  <label for="email">Email</label>
  {#if errors.email}
    <p class="error-message">{errors.email}</p>
  {/if}
  <input type="text" id="email" name="email" bind:value={values.email} />

  <br />

  <label for="password">Password</label>
  {#if errors.password}
    <p class="error-message">{errors.password}</p>
  {/if}
  <input
    type="text"
    id="password"
    name="password"
    bind:value={values.password}
  />

  <Button type="submit" disabled={isSubmitting}>Submit</Button>
</form>

<style>
  label {
    display: block;
  }
  .error-message {
    margin: 0;
    color: red;
  }
</style>
