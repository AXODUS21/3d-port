'use client'

import { create } from 'zustand'

interface TransitionStore {
  isTransitioning: boolean
  shouldWaitForContent: boolean
  startTransition: (shouldWait?: boolean) => void
  endTransition: () => void
}

export const useTransitionStore = create<TransitionStore>((set) => ({
  isTransitioning: false,
  shouldWaitForContent: false,
  startTransition: (shouldWait = false) => set({ isTransitioning: true, shouldWaitForContent: shouldWait }),
  endTransition: () => set({ isTransitioning: false, shouldWaitForContent: false }),
}))
