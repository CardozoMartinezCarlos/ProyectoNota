const { combineReducers } = require("@reduxjs/toolkit");
const { default: userReducer } = require("./userReducer");

const rootReducer = combineReducers({
    user: userReducer
});
export default rootReducer