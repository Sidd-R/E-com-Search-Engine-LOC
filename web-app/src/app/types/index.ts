export interface Message {
    type:string,
    position:string,
    text:string,
    title:string
  }
  
  export type Role = "assistant" | "user";