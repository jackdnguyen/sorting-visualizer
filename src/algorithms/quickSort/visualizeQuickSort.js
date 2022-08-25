import { quickSort } from "./quickSort2";
import {
  changeBackgroundColor,
  swapBars,
  disableButton,
} from "../../Helper/Helper";

export function visualizeQuickSort(
  array,
  animationTime,
  arrFromNodeList,
  pseudoSections
) {
  let sortedArr = quickSort(array);
  let currElmColor = "#0b3f53";
  let compareElmColor = "#ffe4bb";
  let unsortedColor = "#d8aa75";
  let sortedColor = "#73c2a4";

  for (let i = 0; i < sortedArr.length; i++) {
    disableButton(true);
    setTimeout(() => {
      if (i === sortedArr.length - 1) {
        disableButton(false);
      }
      visualizePseudo(sortedArr[i], pseudoSections);
      checkPseudoAnim(sortedArr[i], arrFromNodeList);
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

      if (sortedArr[i].isSwap) {
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
        swapBars(
          sortedArr[i].currElm,
          sortedArr[i].compareElm,
          arrFromNodeList
        );
      }
    }, i * animationTime);

    setTimeout(() => {
      changeBackgroundColor(
        sortedArr[i].compareElm,
        unsortedColor,
        arrFromNodeList
      );
      changeBackgroundColor(
        sortedArr[i].currElm,
        unsortedColor,
        arrFromNodeList
      );

      if (i === sortedArr.length - 1) {
        removePreviousActivePseudo();
        const pseudoCheckingElm = document.querySelector(
          ".pseudo-code-container .checking"
        );
        pseudoCheckingElm.textContent = "Pseudo Code";
        setTimeout(() => {
          for (let j = 0; j < arrFromNodeList.length; j++) {
            setTimeout(() => {
              changeBackgroundColor(j, sortedColor, arrFromNodeList);
            }, j * 100);
          }
        }, 300);
      }
    }, (i + 1) * animationTime);
    console.log(`Index ${i} and ${sortedArr[i]}`);
  }
}

function removePreviousActivePseudo() {
  let sections = document.querySelectorAll(".active");
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

function visualizePseudo(data, pseudoSections) {
  if (data.isSetCurr) {
    removePreviousActivePseudo();
    pseudoSections[2].classList.add("active");
  }
  if (data.isCompare) {
    removePreviousActivePseudo();
    pseudoSections[3].classList.add("active");
  }
  if (data.isSwap) {
    removePreviousActivePseudo();
    pseudoSections[4].classList.add("active");
  }
  if (data.currElm == 0 && data.compareElm == 0) {
    removePreviousActivePseudo();
    pseudoSections[0].classList.add("active");
  }
}

function checkPseudoAnim(data, arrFromNodeList) {
  const pseudoCheckingElm = document.querySelector(
    ".pseudo-code-container .checking"
  );
  if (data.currElm == 0 && data.compareElm == 0) {
    pseudoCheckingElm.textContent = ` first value as sorted`;
  }

  if (data.isSetCurr) {
    pseudoCheckingElm.textContent = `Set value ${arrFromNodeList[data.currElm].textContent
      } as current`;
  }
  if (data.isCompare) {
    pseudoCheckingElm.textContent = `Check whether the value of ${arrFromNodeList[data.compareElm].textContent
      } < ${arrFromNodeList[data.currElm].textContent
      },  if true, iterate until element smaller than current`;
  }
  if (data.isSwap) {
    pseudoCheckingElm.textContent = `Swap ${arrFromNodeList[data.compareElm].textContent
      } and ${arrFromNodeList[data.currElm].textContent}`;
  }
}
