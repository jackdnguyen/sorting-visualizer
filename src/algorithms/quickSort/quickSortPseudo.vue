<template>
  <div class="pseudo-code-container">
    <div class="checking">Psuedo Code</div>
    <div class="pseudo-code">
      <p class="indent-0">mark first element as pivot</p>
      <p class="indent-0">for each element in the array starting at (i=1)</p>
      <p class="indent-1">if element is less than pivot </p>
      <p class="indent-1">
        for each element (j = i – 1) until j = 0 AND if current &#60; j
      </p>
      <p class="indent-2">swap elements (j and j + 1)</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="../../style/pseudoCode.css"></style>
