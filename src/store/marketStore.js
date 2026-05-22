import { create } from "zustand"

export const useMarketStore = create((set)=>({
  price:0,
  setPrice:(p)=>set({price:p})
}))
