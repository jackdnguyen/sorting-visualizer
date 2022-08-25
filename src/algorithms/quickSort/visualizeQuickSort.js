import { quickSort } from "./quickSort";
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
  let currElmColor = "#e05656";
  let compareElmColor = "#0b3f53";
  let unsortedColor = "#d8aa75";
  let sortedColor = "#73c2a4";
  let swapColor = "#ffe4bb";
  for (let i = 0; i < sortedArr.length; i++) {
    disableButton(true);
    setTimeout(() => {
      if (i === sortedArr.length - 1) {
        disableButton(false);
      }
      visualizePseudo(sortedArr[i], pseudoSections);
      checkPseudoAnim(sortedArr[i], arrFromNodeList);
      
      if (sortedArr[i].isSetCurr) {
        changeBackgroundColor(
          sortedArr[i].currElm,
          currElmColor,
          arrFromNodeList
        );
      }
      if (sortedArr[i].isCompare) {
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
      }
      if (sortedArr[i].isSwap && sortedArr[i].isSwapMiddle == false) {
        changeBackgroundColor(
          sortedArr[i].currElm,
          swapColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].compareElm,
          swapColor,
          arrFromNodeList
        );
        swapBars(
          sortedArr[i].currElm,
          sortedArr[i].compareElm,
          arrFromNodeList,
          true
        );
      }
      if (sortedArr[i].isSwapMiddle){
        changeBackgroundColor(
          sortedArr[i].currElm,
          currElmColor,
          arrFromNodeList
        );
        changeBackgroundColor(
          sortedArr[i].compareElm,
          swapColor,
          arrFromNodeList
        );
        swapBars(
          sortedArr[i].currElm,
          sortedArr[i].compareElm,
          arrFromNodeList,
          true
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
  }
}

function removePreviousActivePseudo() {
  let sections = document.querySelectorAll(".active");
  sections.forEach((section) => {
    section.classList.remove("active");
  });
}

function visualizePseudo(data, pseudoSections) {
  if (data.firstElm) {
    removePreviousActivePseudo();
    pseudoSections[0].classList.add("active");
  }
  if (data.isSetCurr) {
    removePreviousActivePseudo();
    pseudoSections[1].classList.add("active");
  }
  if (data.isCompare) {
    removePreviousActivePseudo();
    pseudoSections[3].classList.add("active");
  }
  if (data.isSwap && data.isSwapMiddle == false) {
    removePreviousActivePseudo();
    pseudoSections[4].classList.add("active");
  }
  if (data.isSwapMiddle) {
    removePreviousActivePseudo();
    pseudoSections[5].classList.add("active");
  }
}

function checkPseudoAnim(data, arrFromNodeList) {
  const pseudoCheckingElm = document.querySelector(
    ".pseudo-code-container .checking"
  );
  if (data.isSetCurr) {
    pseudoCheckingElm.textContent = `Set value ${arrFromNodeList[data.currElm].textContent
      } as pivot`;
  }
  if (data.isCompare) {
    pseudoCheckingElm.textContent = `Check whether the value of ${arrFromNodeList[data.compareElm].textContent
      } < Pivot: ${arrFromNodeList[data.currElm].textContent}`;
  }
  if (data.isSwap && data.isSwapMiddle == false) {
    pseudoCheckingElm.textContent = `Swap ${arrFromNodeList[data.compareElm].textContent
      } into left sub-array`;
  }
  if (data.isSwapMiddle) {
    pseudoCheckingElm.textContent = `Swap ${arrFromNodeList[data.currElm].textContent
    } to middle`;
  }
}
