<script>
  import settings from "./stores/settings";
</script>

<svelte:head>
  <!-- 
    we are subscribing to settings in the head of the page, 
    so we never unsub.
  -->
  {#if $settings.colorScheme === "dark"}
    <style>
      :root {
        --backgroundColor: #1d1d1d;
        --textColor: #fff;
      }
    </style>
  {:else}
    <style>
      :root {
        --backgroundColor: #fff;
        --textColor: #000;
      }
    </style>
  {/if}

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>
