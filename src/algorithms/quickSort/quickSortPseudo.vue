<template>
  <div class="pseudo-code-container">
    <div class="checking">Psuedo Code</div>
    <div class="pseudo-code">
      <p class="indent-0">do</p>
      <p class="indent-1">mark last element in sub-array as pivot</p>
      <p class="indent-1">for each element in the sub-array</p>
      <p class="indent-2">if element &#60; pivot</p>
      <p class="indent-3">swap into left sub-array</p>
      <p class="indent-1">
        swap pivot to the middle, differentiating left and right into sub-arrays
      </p>
      <p class="indent-0">for all sub-arrays</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped src="../../style/pseudoCode.css"></style>
