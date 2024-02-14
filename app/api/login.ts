// import executeQuery from '../_lib/db';


// const loginHandler = async () => {
//   const sql = "SELECT * FROM TB_USER";
//   const JSONdata = await executeQuery(sql, '');
//   const data = JSON.parse(JSON.stringify(JSONdata));

//   return data;
// }

// export default loginHandler;

const db = require('../_lib/db');
const handler = (req: any, res: any) => {
  db.query('SELECT * FROM mytable', (err: any, results: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(200).json({ data: results });
  });
}
export default handler;