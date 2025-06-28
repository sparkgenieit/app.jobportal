import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
  show: boolean;
  city: string;
}

interface GeneralState {
  toaster: any;
  currentJob: any;
  currentAd: any;
  isSidebarOpen: boolean;
  info: any;
  location: LocationState;
}

const initialState: GeneralState = {
  toaster: {},
  currentJob: {},
  currentAd: {},
  isSidebarOpen: false,
  info: {},
  location: {
    show: false,
    city: '',
  },
};

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setToaster: (state, action: PayloadAction<any>) => {
      state.toaster = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationState>) => {
      state.location = action.payload;
    },
    setInfo: (state, action: PayloadAction<any>) => {
      state.info = action.payload;
    },
    setCurrentJob: (state, action: PayloadAction<any>) => {
      state.currentJob = action.payload;
    },
    setCurrentAd: (state, action: PayloadAction<any>) => {
      state.currentAd = action.payload;
    },
    setIsSidebarOpen: (state, action: PayloadAction<boolean | undefined>) => {
      state.isSidebarOpen = action.payload ?? !state.isSidebarOpen;
    },
  },
});

export const {
  setToaster,
  setLocation,
  setInfo,
  setCurrentJob,
  setCurrentAd,
  setIsSidebarOpen,
} = generalSlice.actions;

export default generalSlice.reducer;
