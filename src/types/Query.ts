import { DataSource } from "typeorm"

interface IQueryItem {
  [key: string]: (parent: any, payload: any, { database }: { database: DataSource }) => Promise<any>
}

export default interface IQuery {
  Query: IQueryItem
}