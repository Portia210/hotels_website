import { create } from "zustand";

const useUserPlanStore = create((set) => ({
  plans: [],
  setPlans: (plans) => set({ plans }),
}));

export default useUserPlanStore;
