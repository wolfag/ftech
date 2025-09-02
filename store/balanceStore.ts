import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { BalanceState, Transaction } from './type';
import { zustandStorage } from './mmkkv-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      runTransaction: (trx: Transaction) => {
        set((state) => {
          return { transactions: [...state.transactions, trx] };
        });
      },
      balance: () => {
        return get().transactions.reduce((acc, cur) => acc + cur.amount, 0);
      },
      clearTransactions: () => {
        set({ transactions: [] });
      },
    }),
    {
      name: 'balance',
      // storage: createJSONStorage(() => AsyncStorage),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
