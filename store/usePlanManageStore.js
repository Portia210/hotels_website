import { create } from 'zustand';

const usePlanManageStore = create(set => ({
  selectedPlan: null,
  action: 'CREATE',
  setAction: action => set(() => ({ action })),
  setSelectedPlan: selectedPlan => set(() => ({ selectedPlan })),
}));
export default usePlanManageStore;
