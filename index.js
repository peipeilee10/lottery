// 規則
// 按下start按鈕，六宮格跑馬燈輪流亮起
// 跑馬燈速度 從快到慢(快要中獎的時候慢)
// 中獎跳出抽重的獎品
// 設一個settimeout 啟動抽獎function
// random 中獎的格子

const start = document.getElementById('start-btn');

// 獎品
let prizes = {
  '0': 'gift 1',
  '1': 'gift 2',
  '2': 'gift 3',
  '3': 'gift 4',
  '4': 'gift 5',
  '5': 'gift 6',
  '6': 'gift 7',
  '7': 'gift 8'
}

let total_prize = 8;      //總共獎品數
let current_index = -1;   //現在的index
let prize = -1;           //獎品序號
let jumps = 0;            //目前的格子數
let speed = 30;           //速度
let min_jumps = 20;       //最低跑的格子數，高於這個數量才能抽獎
let timer                 //計時器

// DOM
start.addEventListener('click', function () {
  init();
})

// 初始化，速度、中獎的號碼、格子數都歸零
function init() {
  jumps = 0;
  speed = 100;
  prize = -1;
  controller();
}


// 跑馬燈(依序亮燈)
function runCircle() {
  // 先移除 is-active

  if (current_index > -1) {
    document.querySelector(`[data-order="${current_index}"]`).classList.remove('is-active');
  }

  // 每次進一格+1
  current_index++;

  // 如果current_index 大於總獎品數量歸0
  // total_prize是8，但data_order 從0開始到7，所以total_prize 要 -1
  if (current_index > total_prize - 1) {
    current_index = 0
  }

  // 加上is-active
  document.querySelector(`[data-order="${current_index}"]`).classList.add('is-active');

}


function controller() {
  jumps++
  runCircle();

  // 抽到獎品
  if (jumps > min_jumps + 10 && prize === current_index) {
    clearTimeout(timer);
    Swal.fire(`您抽到的產品為 ${prizes[current_index]}`)

    // 復原
    prize = -1;
    jumps = 0

    // 尚未抽到獎品
  } else {
    // 還沒跑到最低格數，加速
    if (jumps < min_jumps) {
      speed -= 2
    } else if (jumps === min_jumps) {  // 跑到最低格數，決定獎品是幾號
      prize = Math.floor(Math.random() * total_prize);
    } else if (jumps > min_jumps) {    // 多於最小格數就變慢
      speed += 20;
    }

    // 不要讓速度低於40
    if (speed < 40) {
      speed = 40;
    }

    // 計時器 
    timer = setTimeout(controller, speed)
  }
}




