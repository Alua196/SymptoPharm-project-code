
import { configureStore} from "@reduxjs/toolkit";

import favSlice from "./slices/favSlice";

const store = configureStore({
    reducer:{
        favourites: favSlice,
    },
});

export default store;