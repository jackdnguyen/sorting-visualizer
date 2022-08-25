<script>
export default {
  data() {
    return {
      sortingAlgo: null,
      timer: null,
      currentIndex: 0,
      info: "",
      pauseInterval: false,
      sortingInfo: {
        quick: [
          '"Quick Sort" comes from the fact that, quick sort is capable of sorting a list of data elements significantly faster (twice or thrice faster) than any of the common sorting algorithms.',
          "The average time complexity of quick sort is O(N log(N)).",
          "The worst case of quicksort O(n²), it can be easily avoided with a high probability by choosing the right pivot.",
        ],
        selection: [
          "Selection Sort has O(n²) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort.",
          "The Selection Sort algorithm sorts an array by repeatedly finding the minimum element (considering ascending order) from unsorted part and putting it at the beginning.",
          "The main advantage of the selection sort is that it performs well on a small list.",
        ],
        bubble: [
          "Bubble Sort is a very memory-efficient because all of the ordering occurs within the array or list itself",
          "Bubble sort has average time complexity of O(n²)",
          "O(N) is the Best Case Time Complexity of Bubble Sort. This case occurs when the given array is already sorted.",
        ],
        insertion: [
          "Insertion Sort is an easy-to-implement, stable sorting algorithm with time complexity of O(n²) in the average and worst case, and O(n) in the best case.",
          "Insertion sort was mentioned by John Mauchly as early as 1946, in the first published discussion on computer sorting.",
          "In Insertion Sort the array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.",
        ],
      },
    };
  },
  mounted() {
    this.info = this.sortingInfo.quick;
    setTimeout(() => {
      setInterval(() => {
        if (!this.pauseInterval) {
          if (this.currentIndex == 2) {
            this.currentIndex = 0;
            return;
          }
          this.currentIndex += 1;
        }
      }, 8000);
    }, 8000);
    this.emitter.on("changeAlgo", (data) => {
      this.currentIndex = 0;
      let selectedAlgo = data.toLowerCase();
      if (selectedAlgo == "quick") {
        this.info = this.sortingInfo.quick;
      } else if (selectedAlgo == "selection") {
        this.info = this.sortingInfo.selection;
      } else if (selectedAlgo == "bubble") {
        this.info = this.sortingInfo.bubble;
      } else if (selectedAlgo == "insertion") {
        this.info = this.sortingInfo.insertion;
      }
    });
  },
};
</script>

<template>
  <div
    class="container"
    @mouseover="pauseInterval = true"
    @mouseleave="pauseInterval = false"
  >
    <h3 font-weight="bold"><em>Did you Know?</em></h3>
    <p class="info" :key="this.currentIndex">{{ info[currentIndex] }}</p>
  </div>
</template>

<style scoped>
.container {
  color: white;
  font-size: 1.6rem;
  width: 20rem;
}
.info {
  padding: 2rem 0;
}
</style>