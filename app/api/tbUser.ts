import { selectSQL } from "../_lib/db";

export interface TbUserInterface {
  seq: string;
  id: string;
  pw: string;
  role: string;
  regDt: string;
}

export const getUserData = () => {
  const sql = 'SELECT * FROM TB_USER';

  return selectSQL(sql);
}