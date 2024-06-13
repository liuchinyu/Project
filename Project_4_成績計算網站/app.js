let hero = document.querySelector(".hero");
let slider = document.querySelector(".slider");
let animation = document.querySelector("section.animation-wrapper");

// 因在html有使用外在套件TimelineMax
const time_line = new TimelineMax();

// parameter1 是要控制的對象
// parameter2 是duration
// parameter3 是控制對象的原始狀態
// parameter4 是控制對象的動畫結束後的狀態
// parameter5 是控制對象先執行的時間 -=1.2 表早1.2秒開始執行
time_line //是一個接一個執行
  .fromTo(
    hero,
    1,
    { height: "0" },
    //該函示要使用ease需使用內部Power2
    //對hero來說他的父元素是section.animation，100%及占滿整個animation
    { height: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    hero,
    1.2,
    // 寬度先從80%再擴展至100%
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  //從視窗邊界外滑近來
  .fromTo(slider, 1, { x: "-100%" }, { x: "0%" }, "-=1.2")
  //將開場動畫隱藏起來
  .fromTo(animation, 0.3, { opacity: "1" }, { opacity: "0" });

setTimeout(() => {
  //表使動畫圖片關閉，使可以點選網頁內容
  animation.style.pointerEvents = "none";
}, 2500); //動畫總共執行時間，約為2.5秒

//為避免資料還沒輸入完整按到ENTER後離開，讓整個網站的enter key都無法使用
window.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    e.preventDefault();
  }
});

//選取所有的button，且querySelectorAll返回型別為nodelist，可用foreach去帶出每個元素(element object)
let allButtons = document.querySelectorAll("button");
//點選按鈕不傳送表單
allButtons.forEach((button) =>
  button.addEventListener("click", (e) => e.preventDefault())
);

//每個學分值都是select，調整成績要變顏色及計算平均
let allSelects = document.querySelectorAll("select");
allSelects.forEach((select) => {
  select.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target); //e.target就是Select這個動作
  });
});

//調整學分要計算平均
let credits = document.querySelectorAll(".class-credit");
credits.forEach((credit) => {
  credit.addEventListener("change", () => {
    setGPA();
  });
});

//點擊button新增form
let addButton = document.querySelector(".plus-btn");
addButton.addEventListener("click", () => {
  //建立變數的意義 : 讓他一階階的去新增子元素
  let newForm = document.createElement("form");
  let newDiv = document.createElement("div");
  //classList來新增標籤的class
  newDiv.classList.add("grader");

  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("list", "opt");
  newInput1.classList.add("class-type");

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.classList.add("class-number");

  let newInput3 = document.createElement("input");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("min", "0");
  newInput3.setAttribute("max", "6");
  newInput3.classList.add("class-credit");

  let newSelect = document.createElement("select");
  newSelect.classList.add("select");

  //option標籤
  var opt1 = document.createElement("option");
  //標籤屬性
  opt1.setAttribute("value", "");
  //標籤顯示的文字
  let textNode1 = document.createTextNode("");
  //標籤顯示的文字也算child
  opt1.appendChild(textNode1);
  var opt2 = document.createElement("option");
  opt2.setAttribute("value", "A");
  let textNode2 = document.createTextNode("A");
  opt2.appendChild(textNode2);
  var opt3 = document.createElement("option");
  opt3.setAttribute("value", "A-");
  let textNode3 = document.createTextNode("A-");
  opt3.appendChild(textNode3);
  var opt4 = document.createElement("option");
  opt4.setAttribute("value", "B+");
  let textNode4 = document.createTextNode("B+");
  opt4.appendChild(textNode4);
  var opt5 = document.createElement("option");
  opt5.setAttribute("value", "B");
  let textNode5 = document.createTextNode("B");
  opt5.appendChild(textNode5);
  var opt6 = document.createElement("option");
  opt6.setAttribute("value", "B-");
  let textNode6 = document.createTextNode("B-");
  opt6.appendChild(textNode6);
  var opt7 = document.createElement("option");
  opt7.setAttribute("value", "C+");
  let textNode7 = document.createTextNode("C+");
  opt7.appendChild(textNode7);
  var opt8 = document.createElement("option");
  opt8.setAttribute("value", "C");
  let textNode8 = document.createTextNode("C");
  opt8.appendChild(textNode8);
  var opt9 = document.createElement("option");
  opt9.setAttribute("value", "C-");
  let textNode9 = document.createTextNode("C-");
  opt9.appendChild(textNode9);
  var opt10 = document.createElement("option");
  opt10.setAttribute("value", "D+");
  let textNode10 = document.createTextNode("D+");
  opt10.appendChild(textNode10);
  var opt11 = document.createElement("option");
  opt11.setAttribute("value", "D");
  let textNode11 = document.createTextNode("D");
  opt11.appendChild(textNode11);
  var opt12 = document.createElement("option");
  opt12.setAttribute("value", "D-");
  let textNode12 = document.createTextNode("D-");
  opt12.appendChild(textNode12);
  var opt13 = document.createElement("option");
  opt13.setAttribute("value", "F");
  let textNode13 = document.createTextNode("F");
  opt13.appendChild(textNode13);

  newSelect.appendChild(opt1);
  newSelect.appendChild(opt2);
  newSelect.appendChild(opt3);
  newSelect.appendChild(opt4);
  newSelect.appendChild(opt5);
  newSelect.appendChild(opt6);
  newSelect.appendChild(opt7);
  newSelect.appendChild(opt8);
  newSelect.appendChild(opt9);
  newSelect.appendChild(opt10);
  newSelect.appendChild(opt11);
  newSelect.appendChild(opt12);
  newSelect.appendChild(opt13);

  //原先三個form套用的是querySelectorAll --> NodeList，為靜態，不會自動更新，所以要再新增addEventListner
  newSelect.addEventListener("change", (e) => {
    setGPA();
    changeColor(e.target);
  });

  newInput3.addEventListener("change", () => {
    setGPA();
  });

  //製作垃圾桶
  let newButton = document.createElement("button");
  newButton.classList.add("trash-button");
  let newItag = document.createElement("i");
  //設定i標籤的class
  newItag.classList.add("fas");
  newItag.classList.add("fa-trash");
  newButton.appendChild(newItag);

  newButton.addEventListener("click", (e) => {
    //防止繳出表單
    e.preventDefault();
    e.target.parentElement.parentElement.style.animation =
      "scaleDown 0.5s ease forwards";
    e.target.parentElement.parentElement.addEventListener(
      "animationend",
      (e) => {
        e.target.remove();
        setGPA();
      }
    );
  });

  newDiv.appendChild(newInput1);
  newDiv.appendChild(newInput2);
  newDiv.appendChild(newInput3);
  newDiv.appendChild(newSelect);
  newDiv.appendChild(newButton);

  newForm.appendChild(newDiv);
  document.querySelector(".all-inputs").appendChild(newForm);
  //設定新增按鈕的動畫
  newForm.style.animation = "scaleUp 0.5s ease forwards";
});

let allTresh = document.querySelectorAll(".trash-button");
allTresh.forEach((tresh) => {
  tresh.addEventListener("click", (e) => {
    //抓取垃圾桶的上上層 - form
    e.target.parentElement.parentElement.classList.add("remove"); //新增漸漸消失的動畫
    // e.target.parentElement.parentElement.remove(); JS讀取太快，會直接清除，沒有漸進動畫
  });
});
allTresh.forEach((tresh) => {
  //因為新增的class: remove是將資料新增到form
  let form = tresh.parentElement.parentElement;
  form.addEventListener("transitionend", (e) => {
    e.target.remove();
    setGPA();
  });
});

//依照所選擇的學分，給定顏色
function changeColor(target) {
  if (target.value == "A" || target.value == "A-") {
    target.style.backgroundColor = "lightgreen";
    target.style.color = "black";
  } else if (
    target.value == "B" ||
    target.value == "B-" ||
    target.value == "B+"
  ) {
    target.style.backgroundColor = "yellow";
    target.style.color = "black";
  } else if (
    target.value == "C" ||
    target.value == "C-" ||
    target.value == "C+"
  ) {
    target.style.backgroundColor = "orange";
    target.style.color = "black";
  } else if (
    target.value == "D" ||
    target.value == "D-" ||
    target.value == "D+"
  ) {
    target.style.backgroundColor = "red";
    target.style.color = "black";
  } else if (target.value == "F") {
    target.style.backgroundColor = "gray";
    target.style.color = "white";
  } else {
    target.style.backgroundColor = "white";
  }
}

function convertor(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.7;
    case "B+":
      return 3.4;
    case "B":
      return 3.0;
    case "B-":
      return 2.7;
    case "C+":
      return 2.4;
    case "C":
      return 2.0;
    case "C-":
      return 1.7;
    case "D+":
      return 1.4;
    case "D":
      return 1.0;
    case "D-":
      return 0.7;
    case "F":
      return 0.0;
    default:
      return 0;
  }
}

function setGPA() {
  //querySelectorAll會回傳NodeList，有Length屬性
  let formLength = document.querySelectorAll("form").length;
  //學分數
  let credits = document.querySelectorAll(".class-credit");
  //得到的成績
  let selects = document.querySelectorAll("select");
  let sum = 0; //GPA分子
  let creditSum = 0; //GPA分母

  //計算分母
  for (let i = 0; i < credits.length; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      creditSum += credits[i].valueAsNumber;
    }
  }
  //計算分子
  for (let i = 0; i < formLength; i++) {
    if (!isNaN(credits[i].valueAsNumber)) {
      sum += credits[i].valueAsNumber * convertor(selects[i].value);
    }
  }

  let result;

  if (creditSum == 0) {
    result = (0.0).toFixed(2);
  } else {
    //小數取到第二位
    result = (sum / creditSum).toFixed(2);
  }
  //let result = sum / creditSum;

  //getElementById會return element，其屬性innerText
  document.getElementById("result-gpa").innerText = result;
}

let btn1 = document.querySelector(".sort-descending");
let btn2 = document.querySelector(".sort-ascending");

btn1.addEventListener("click", () => {
  handleSorting("descending"); //大到小
});
btn2.addEventListener("click", () => {
  handleSorting("ascending"); //小到大
});

function handleSorting(direction) {
  //因需要逐一抓個別的input、select，要抓他們的上層，div.grader
  let graders = document.querySelectorAll("div.grader");
  //設定funcion裡的通用變數，以便資料存取
  let objectArray = [];

  //將form資料塞入object
  for (let i = 0; i < graders.length; i++) {
    let class_name = graders[i].children[0].value; //class category
    let class_number = graders[i].children[1].value; //class number
    let class_credit = graders[i].children[2].value;
    let class_grade = graders[i].children[3].value;

    if (
      !(
        class_name == "" &&
        class_number == "" &&
        class_credit == "" &&
        class_grade == ""
      )
    ) {
      let class_object = {
        class_name,
        class_number,
        class_credit,
        class_grade,
      };
      objectArray.push(class_object);
      //將上述資料設為object，並直接帶入
    }
  }

  for (let i = 0; i < objectArray.length; i++) {
    //不用建立此變數? : 物件不需要使用let宣告，直接新增即可
    // 取得object array後，我們可以把成績String換成數字
    objectArray[i].class_grade_number = convertor(objectArray[i].class_grade);
  }

  objectArray = mergeSort(objectArray);

  if (direction == "descending") {
    objectArray = objectArray.reverse();
  }

  //根據object array的內容，來更新網頁，因為form都是在dic.all-inputs裡
  let allInputs = document.querySelector(".all-inputs");
  //先清空內容，後續再插入經過調整順序的內容
  allInputs.innerHTML = "";

  for (let i = 0; i < objectArray.length; i++) {
    allInputs.innerHTML += `<form>
    <div class="grader">
      <input
        type="text"
        placeholder="class catrgory"
        class="class-type"
        list="opt"
        value=${objectArray[i].class_name}
      /><!--
    --><input
        type="text"
        placeholder="class number"
        class="class-number"
        value=${objectArray[i].class_number}
      /><!--
      --><input
        type="number"
        placeholder="credits"
        min="0"
        max="6"
        class="class-credit"
        value=${objectArray[i].class_credit}
      /><!--
      --><select name="select" class="select">
        <option value=""></option>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
        <option value="F">F</option></select
      ><!--
      --><button class="trash-button">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    </form>`;
  }

  //下拉選單無法直接用backtick，所以直接用JS更改
  //因為已經改過html.innertext，所以要重新抓取
  graders = document.querySelectorAll("div.grader");
  for (let i = 0; i < graders.length; i++) {
    graders[i].children[3].value = objectArray[i].class_grade;
  }

  //select事件監聽 : 因透過384行的innerHTML新增，會導致新增的內容沒有事件監聽器
  let allSelects = document.querySelectorAll("select");
  allSelects.forEach((select) => {
    //選取即換顏色
    changeColor(select);
    select.addEventListener("change", (e) => {
      setGPA();
      changeColor(e.target);
    });
  });

  //Credit事件監聽
  let allCredits = document.querySelectorAll(".class-credit");
  allCredits.forEach((credit) => {
    credit.addEventListener("change", () => {
      setGPA();
    });
  });

  //垃圾桶
  let allTresh = document.querySelectorAll(".trash-button");
  allTresh.forEach((tresh) => {
    tresh.addEventListener("click", (e) => {
      //防止繳出表單
      e.preventDefault();
      e.target.parentElement.parentElement.style.animation =
        "scaleDown 0.5s ease forwards";
      e.target.parentElement.parentElement.addEventListener(
        "animationend",
        (e) => {
          e.target.remove();
          setGPA();
        }
      );
    });
  });

  function merge(a1, a2) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < a1.length && j < a2.length) {
      if (a1[i].class_grade_number > a2[j].class_grade_number) {
        result.push(a2[j]);
        j++;
      } else {
        result.push(a1[i]);
        i++;
      }
    }
    //表a2較小已經先塞入
    while (i < a1.length) {
      result.push(a1[i]);
      i++;
    }
    //表a1較小已經先塞入
    while (j < a2.length) {
      result.push(a2[j]);
      j++;
    }
    return result;
  }

  function mergeSort(arr) {
    if (arr.length == 0) {
      return;
    }
    if (arr.length == 1) {
      return arr;
    } else {
      let middle = Math.floor(arr.length / 2);
      let left = arr.slice(0, middle);
      let right = arr.slice(middle, arr.length);
      return merge(mergeSort(left), mergeSort(right));
    }
  }
}
