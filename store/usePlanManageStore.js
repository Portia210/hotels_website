import { create } from 'zustand';

const usePlanManageStore = create(set => ({
  selectedPlan: null,
  action: 'CREATE',
  setAction: action => set(() => ({ action })),
  setSelectedPlan: selectedPlan =>
    set(state => {
      if (selectedPlan) {
        return { selectedPlan };
      }
      return state
    }),
}));
export default usePlanManageStore;
