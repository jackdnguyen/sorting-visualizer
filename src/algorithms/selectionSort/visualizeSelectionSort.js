import { selectionSort } from "./selectionSort";
import {
  changeBackgroundColor,
  swapBars,
  disableButton,
} from "../../Helper/Helper";

export function visualizeSelectionSort(
  array,
  animationTime,
  arrFromNodeList,
  pseudoSections
) {
  let sortedArr = selectionSort(array);
  let currElmColor = "#0b3f53";
  let compareElmColor = "#ffe4bb";
  let minElmColor = "#e05656";
  let sortedColor = "#73c2a4";
  let unsortedColor = "#d8aa75";
  pseudoSections[0].classList.add("active");
  for (let i = 0; i < sortedArr.length; i++) {
    disableButton(true);
    setTimeout(() => {
      if (i === sortedArr.length - 1) {
        disableButton(false);
      }
      visualizePseudo(sortedArr[i], pseudoSections);
      checkPseudoAnim(sortedArr[i], arrFromNodeList, arrFromNodeList);
      changeBackgroundColor(
        sortedArr[i].minIndex,
        minElmColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].currElm,
        currElmColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].compareElm,
        compareElmColor,
        arrFromNodeList
      );
      if (sortedArr[i].isSwap === true) {
        // Changing the color-bar of elements which has to be swapped.

        changeBackgroundColor(
          sortedArr[i].minIndex,
          sortedColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].currElm,
          sortedColor,
          arrFromNodeList
        );
        // Actually swapping the elements (heights).
        swapBars(
          sortedArr[i].currElm,
          sortedArr[i].compareElm,
          arrFromNodeList
        );
      }
    }, i * animationTime);

    setTimeout(() => {
      visualizePseudo(sortedArr[i], pseudoSections);
      if (sortedArr[i].isFinalElm === true) {
        // Changing the color-bar of finalElement index which has taken its final sorted position.
        changeBackgroundColor(
          sortedArr[i].finalElm,
          sortedColor,
          arrFromNodeList
        );
      } else {
        // Changing the color-bar of elements which has not taken its final sorted position yet.
        changeBackgroundColor(
          sortedArr[i].compareElm,
          unsortedColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].minIndex,
          unsortedColor,
          arrFromNodeList
        );
      }
      if (i === sortedArr.length - 1) {
        removePreviousActivePseudo();
        const pseudoCheckingElm = document.querySelector(
          ".pseudo-code-container .checking"
        );
        pseudoCheckingElm.textContent = "Pseudo Code";
      }
    }, (i + 1) * animationTime);
  }
}

function removePreviousActivePseudo() {
  let sections = document.querySelectorAll(".active");
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

function visualizePseudo(data, pseudoSections) {
  removePreviousActivePseudo();
  pseudoSections[1].classList.add("active");
  if (data.isOutJLoop) {
    removePreviousActivePseudo();
    pseudoSections[1].classList.add("active");
  } else {
    removePreviousActivePseudo();
    pseudoSections[3].classList.add("active");
  }
  if (data.isChangeMin) {
    removePreviousActivePseudo();
    pseudoSections[4].classList.add("active");
  }
  if (data.isCompareIandMin) {
    removePreviousActivePseudo();
    pseudoSections[5].classList.add("active");
  }
  if (data.isSwap) {
    removePreviousActivePseudo();
    pseudoSections[6].classList.add("active");
  }
  if (data.isFinalElm) {
    removePreviousActivePseudo();
    pseudoSections[1].classList.add("active");
  }
}

function checkPseudoAnim(data, arrFromNodeList) {
  const pseudoCheckingElm = document.querySelector(
    ".pseudo-code-container .checking"
  );
  if (data.isFinalElm) {
    return;
  }
  if (!data.isOutJLoop) {
    pseudoCheckingElm.textContent = `Check whether the value of ${arrFromNodeList[data.compareElm].textContent
      } smaller than minimum (${arrFromNodeList[data.minIndex].textContent})`;
  }
  if (data.isChangeMin || data.isOutJLoop) {
    pseudoCheckingElm.textContent = `Set value ${arrFromNodeList[data.minIndex].textContent
      } as minimum value`;
  }
  if (data.isCompareIandMin) {
    pseudoCheckingElm.textContent = `Check whether the value of ${arrFromNodeList[data.compareElm].textContent
      } and ${arrFromNodeList[data.minIndex].textContent} are different`;
  }
  if (data.isSwap) {
    pseudoCheckingElm.textContent = `Swap ${arrFromNodeList[data.compareElm].textContent
      } and ${arrFromNodeList[data.minIndex].textContent}`;
  }

}