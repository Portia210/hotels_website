import { create } from 'zustand';

const usePlanManageStore = create(set => ({
  selectedPlan: null,
  action: null,
  setAction: action => set(() => ({ action })),
  setSelectedPlan: selectedPlan => set(() => ({ selectedPlan })),
}));
export default usePlanManageStore;
