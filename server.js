<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>PaGamO 交易網 MVP</title>
</head>
<body>
<h1>PaGamO 交易網 MVP</h1>

<h2>查寶物價格</h2>
<input id="itemName" placeholder="輸入寶物名稱">
<button onclick="getPrice()">查詢</button>
<p id="priceResult"></p>

<h2>上架寶物</h2>
<input id="newName" placeholder="寶物名稱">
<input id="newPrice" placeholder="價格" type="number">
<input id="newDesc" placeholder="描述">
<button onclick="addItem()">上架</button>
<p id="addResult"></p>

<h2>交易紀錄</h2>
<button onclick="loadTransactions()">刷新交易紀錄</button>
<ul id="transactionList"></ul>

<script>
const API_URL = "https://你的RenderAPI網址";

async function getPrice() {
  const item = document.getElementById("itemName").value;
  const res = await fetch(`${API_URL}/price?item=${item}`);
  const data = await res.json();
  document.getElementById("priceResult").innerText =
    data.error ? data.error : `${data.item} 目前價格：${data.price}`;
}

async function addItem() {
  const name = document.getElementById("newName").value;
  const price = parseInt(document.getElementById("newPrice").value);
  const description = document.getElementById("newDesc").value;

  const res = await fetch(`${API_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, price, description })
  });
  const data = await res.json();
  document.getElementById("addResult").innerText =
    data.error ? data.error : `成功上架 ${data.name}`;
}

async function loadTransactions() {
  const res = await fetch(`${API_URL}/transactions`);
  const data = await res.json();
  const list = document.getElementById("transactionList");
  list.innerHTML = "";
  data.forEach(tx => {
    const li = document.createElement("li");
    li.innerText = `寶物ID:${tx.item_id} 價格:${tx.price} 購買者:${tx.buyer} 時間:${tx.created_at}`;
    list.appendChild(li);
  });
}
</script>
</body>
</html>
