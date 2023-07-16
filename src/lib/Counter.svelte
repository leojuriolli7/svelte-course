<script>
  export let initialCount = undefined;
  export let maxCount = undefined;

  console.log($$props, $$restProps)  

  let count = initialCount ?? 0;
  
  function increment() {
    if(count === maxCount) return
    
    count+=1
  }


</script>

<button on:click={increment}>Clicks: {count}</button>

<style>
  button {
    background: greenyellow;
    padding: 6px;
    outline: 0;
    border: 1px solid green;
    border-radius: 6px;
  }
</style>