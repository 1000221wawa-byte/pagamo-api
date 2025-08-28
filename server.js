const express = require("express");
const app = express();

// 測試 API 是否運作
app.get("/", (req, res) => {
  res.send("PaGamO API 正常運作 🚀");
});

// 回傳寶物價格
app.get("/price", (req, res) => {
  res.json({ item: "火焰寶珠", price: 1500 });
});

// 啟動伺服器
app.listen(3000, () => console.log("API 啟動中..."));
