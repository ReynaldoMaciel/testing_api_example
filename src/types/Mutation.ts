import { DataSource } from "typeorm"

interface IMutationItem {
  [key: string]: (parent: any, payload: any, { database }: { database: DataSource }) => Promise<any>
}

export default interface IMutation {
  Mutation: IMutationItem
}