import * as express from "express";
import * as mysql from 'mysql';
// ------------------------------------------------------------------------------------------------
// 設定
/**
 * DBの接続設定を書く。
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'mysql_user_name',
  password: 'mysql_password',
  database: 'mysql_database_name',
  debug: false,
});
connection.connect();
const app = express();

// アプリケーションのポート番号を指定
const port = 3000;

// ------------------------------------------------------------------------------------------------
// api

// api 1
app.get('/', (req, res) => {
  res.send('Hello World!')
});

// api 2
app.get('/test', (req, res) => {
  const sql = `SELECT * FROM PARTS WHERE PARTS_NO = ?`
  const params = ['336-00067']

  connection.query(sql, params, (error, rows, fields) => {
    console.log(`sqlを実行完了`)
    if (error != null) {
      console.error(error)
      return
    }
    console.log(rows)
    res.send(rows);
  })
});

// ------------------------------------------------------------------------------------------------
// サーバ起動
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
