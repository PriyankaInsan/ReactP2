import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import CardListReducer from "../features/home/CardListSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { postApi } from "../services/apiConfig";
import { postApiUser } from "../services/apiConfigUserProfile";
import { authStore } from "../services/apiConfigSSO";
import LeftPanelReducer from "../features/menu/SideMenuSlice";
import FolderviewReducer from "../features/home/ViewAllFolderSlice";
import FolderProjectLeftpanelReducer from "../features/menu/FolderProjectSlice";
import FeedsetupdetailsdatapanelReducer from "../features/feedwater/feedsetup/FeedsetupSlice";
import IXStoreReducer from "../features/feedwater/ix/IXDSlice";
import OpenProjectStoreReducer from "../features/feedwater/modals/OpenProjectSlice";
import UFStoreReducer from "../features/feedwater/uf/UFSlice";
import processDiagramSlice from "../features/feedwater/systemdesign/processDiagramSlice";
import AuthReducer from "../features/login/AuthSlice";
import UserInfoReducer from "../common/UserInfoSlice";
import ProjectInfoReducer from "../common/ProjectInfoSlice";
import ReportIXDSliceReducer from "../common/ReportIXDSlice";
import activityMonitorSlice from "../features/feedwater/activitymonitor/activityMonitorSlice";
import rootReducer from "../features/feedwater/activitymonitor/reducer";
import tabChangeSlice from "../features/feedwater/activitymonitor/tabChangeSlice";
import GUnitConversionReducer from "../common/utils/GlobalUnitConversionSlice";
import ReportUFReducer from "../common/ReportUFSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cardlist: CardListReducer,
    leftpanel: LeftPanelReducer,
    Folderview: FolderviewReducer,
    Auth: AuthReducer,
    FolderProjectleftpanel: FolderProjectLeftpanelReducer,
    Feedsetupdetailsdatapanel: FeedsetupdetailsdatapanelReducer,
    IXStore: IXStoreReducer,
    OpenProjectStore: OpenProjectStoreReducer,
    GUnitConversion:GUnitConversionReducer,
    UFStore: UFStoreReducer,
    userInfo: UserInfoReducer,
    projectInfo: ProjectInfoReducer,
    ReportIXD: ReportIXDSliceReducer,
    [postApi.reducerPath]: postApi.reducer,
    [postApiUser.reducerPath]: postApiUser.reducer,
    [authStore.reducerPath]: authStore.reducer,
    processDiagramSlice: processDiagramSlice,
    scrollData: activityMonitorSlice,
    tabData: tabChangeSlice,
    ReportUF: ReportUFReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(authStore.middleware)
      .concat(postApiUser.middleware),
});
setupListeners(store.dispatch);
