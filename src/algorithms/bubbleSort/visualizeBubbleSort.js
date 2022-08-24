import { bubbleSort } from "./bubbleSort";
import {
    changeBackgroundColor,
    swapBars,
    disableButton,
} from "../../Helper/Helper";

export function visualizeBubbleSort(
    array,
    animationTime,
    arrFromNodeList,
    pseudoSections
) {
    let sortedArr = bubbleSort(array);
    let compareElmColor = "#ffe4bb";
    let sortedColor = "#73c2a4";
    let unsortedColor = "#d8aa75";
    for (let i = 0; i < sortedArr.length; i++) {
        disableButton(true);
        setTimeout(() => {
            if (i === sortedArr.length - 1) {
                disableButton(false);
            }
            visualizePseudo(sortedArr[i], pseudoSections);
            checkPseudoAnim(sortedArr[i], arrFromNodeList);
            changeBackgroundColor(
                sortedArr[i].leftElm,
                compareElmColor,
                arrFromNodeList
            );
            changeBackgroundColor(
                sortedArr[i].rightElm,
                compareElmColor,
                arrFromNodeList
            );
            if (sortedArr[i].isSwap) {
                changeBackgroundColor(
                    sortedArr[i].leftElm,
                    compareElmColor,
                    arrFromNodeList
                );
                changeBackgroundColor(
                    sortedArr[i].rightElm,
                    compareElmColor,
                    arrFromNodeList
                );
                swapBars(sortedArr[i].leftElm, sortedArr[i].rightElm, arrFromNodeList);
            }
        }, i * animationTime);

        setTimeout(() => {
            changeBackgroundColor(
                sortedArr[i].leftElm,
                unsortedColor,
                arrFromNodeList
            );
            changeBackgroundColor(
                sortedArr[i].rightElm,
                unsortedColor,
                arrFromNodeList
            );

            if (i === sortedArr.length - 1) {
                removePreviousActivePseudo();
                const pseudoCheckingElm = document.querySelector(
                    ".pseudo-code-container .checking"
                );
                pseudoCheckingElm.textContent = "Psuedo Code";
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
    if (data.isOutLoop) {
        removePreviousActivePseudo();
        pseudoSections[1].classList.add("active");
        pseudoSections[2].classList.add("active");

        return;
    }
    if (data.isSwap) {
        removePreviousActivePseudo();
        pseudoSections[4].classList.add("active");
        pseudoSections[5].classList.add("active");
    } else {
        removePreviousActivePseudo();
        pseudoSections[3].classList.add("active");
        return;
    }
}

function checkPseudoAnim(data, arrFromNodeList) {
    const pseudoCheckingElm = document.querySelector(
        ".pseudo-code-container .checking"
    );
    if (data.isOutLoop) {
        pseudoCheckingElm.textContent = `Let swapped = false`;
        return;
    }
    if (!data.isSwap) {
        pseudoCheckingElm.textContent = `Check whether the value of ${arrFromNodeList[data.leftElm].textContent
            } > ${arrFromNodeList[data.rightElm].textContent}`;
        return;
    } else {
        pseudoCheckingElm.textContent = `Swap elements ${data.leftElm} and ${data.rightElm} and let swapped = true`;
    }
}
