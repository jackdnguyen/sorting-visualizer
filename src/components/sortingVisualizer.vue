<template>
  <div class="container">
    <algo-info />
    <div class="visualization">
      <selection-sort-pseudo v-if="selectedAlgorithm == 'selection'" />
      <bubble-sort-pseudo v-if="selectedAlgorithm == 'bubble'" />
      <insertion-sort-pseudo v-if="selectedAlgorithm == 'insertion'" />
      <div class="array-list">
        <div class="bars-container" ref="barContainer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { visualizeSelectionSort } from "../algorithms/selectionSort/visualizeSelectionSort";
import SelectionSortPseudo from "../algorithms/selectionSort/selectionSortPseudo";
import { visualizeBubbleSort } from "../algorithms/bubbleSort/visualizeBubbleSort";
import BubbleSortPseudo from "../algorithms/bubbleSort/bubbleSortPseudo"
import { visualizeInsertionSort } from "../algorithms/insertionSort/visualizeInsertionSort";
import InsertionSortPseudo from "../algorithms/insertionSort/insertionSortPseudo";

export default {
  components: {
    SelectionSortPseudo,
    BubbleSortPseudo,
    InsertionSortPseudo,
  },
  mounted() {
    this.getRandomArray();
    let bars = document.querySelectorAll(".bar");
    this.arrFromNodeList = Array.from(bars);
    this.emitter.on("visualize", (data) => {
      this.isShowAlgoInfo = true;
      this.checkSelectedAlgoAndSpeed(data);
      this.visualizeSortingAlgo();
    });
    this.emitter.on("randomize", (data) => {
      console.log(data);
      this.getRandomArray();
    });
    this.emitter.on("changeAlgo", (data) => {
      this.selectedAlgorithm = data;
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );
    });
    this.pseudoSections = document.querySelectorAll(".pseudo-code-container p");
  },
  data() {
    return {
      array: [],
      arrFromNodeList: [],
      animationTime: 150,
      pseudoSections: null,
      selectedAlgorithm: "selection",
      isShowAlgoInfo: false,
    };
  },
  methods: {
    getRandomArray() {
      this.array = [];
      this.$refs.barContainer.innerHTML = "";
      const maxLength = 12;
      const minLength = 8;
      const maxValue = 40;
      const minValue = 2;
      const length = Math.floor(
        Math.random() * (maxLength - minLength + 1) + minLength
      );
      for (let i = 0; i < length; i++) {
        let value = Math.floor(
          Math.random() * (maxValue - minValue) + minValue
        );
        this.array.push(value);
        let div = document.createElement("div");
        div.className = "bar";
        div.textContent = value;
        div.style.height = value * 10 + "px";
        this.$refs.barContainer.appendChild(div);
      }
      this.transformAllBars();
    },
    transformAllBars() {
      let bars = document.querySelectorAll(".bar");
      this.arrFromNodeList = Array.from(bars);
      for (let i = 0; i < this.array.length; i++) {
        bars[i].style.transform = `translate( ${i * 130}%, 0%)`;
        this.$refs.barContainer.style.transform = `translateX( -${i * 35}px )`;
      }
    },
    visualizeSortingAlgo() {
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );
      if (this.selectedAlgorithm.toLowerCase() == "selection") {
        this.runSelectionSort();
      } else if(this.selectedAlgorithm.toLowerCase() == "bubble") {
        this.runBubbleSort();
      } else if(this.selectedAlgorithm.toLowerCase() == "insertion") {
        this.runInsertionSort();
      }
    },
    runSelectionSort() {
      visualizeSelectionSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList,
        this.pseudoSections
      );
    },
    runBubbleSort() {
      visualizeBubbleSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList,
        this.pseudoSections
      );
    },
    runInsertionSort() {
      this.pseudoSections = document.querySelectorAll(
        ".pseudo-code-container p"
      );

      visualizeInsertionSort(
        this.array,
        this.animationTime,
        this.arrFromNodeList,
        this.pseudoSections
      );
    },

    checkSelectedAlgoAndSpeed(data) {
      if (data.selectedAlgorithm.toLowerCase() == "selection") {
        this.selectedAlgorithm = "selection";
      }

      if (data.selectedSpeed == "Slow") {
        this.animationTime = 800;
      } else if (data.selectedSpeed == "Medium") {
        this.animationTime = 400;
      } else if (data.selectedSpeed == "Fast") {
        this.animationTime = 150;
      }
    },
  },
};
</script>

<style scoped src="../style/sortingVisualizer.css"></style>
