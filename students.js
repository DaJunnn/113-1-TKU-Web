const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

// MongoDB 連接設定
const uri = "mongodb://localhost:27017/";
const dbName = "411631178";
const collectionName = "studentslist";

(async () => {
  const client = new MongoClient(uri);

  try {
    // 連接到 MongoDB
    await client.connect();
    console.log("成功連接到 MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // 讀取 CSV 檔案
    const results = [];
    fs.createReadStream('studentslist.csv') // 確保檔案名稱無多餘空白
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('error', (err) => {
        console.error("讀取 CSV 檔案時發生錯誤：", err);
        client.close(); // 發生錯誤時關閉 MongoDB 連線
      })
      .on('end', async () => {
        try {
          // 插入資料到 MongoDB
          const insertResult = await collection.insertMany(results);
          console.log(`成功插入 ${insertResult.insertedCount} 筆資料！`);
        } catch (dbError) {
          console.error("插入資料到 MongoDB 時發生錯誤：", dbError);
        } finally {
          // 確保 MongoDB 連線會被關閉
          await client.close();
        }
      });
  } catch (error) {
    console.error("發生錯誤：", error);
    // 確保發生錯誤時關閉 MongoDB 連線
    await client.close();
  }
})();
