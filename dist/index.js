"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_demi_1 = require("vue-demi");
const strapiUrl = vue_demi_1.ref("");
const strapiUser = vue_demi_1.ref(null);
const strapiToken = vue_demi_1.ref(null);
function useStrapi() {
    const init = (url) => {
        strapiUrl.value = url;
    };
    /** Generic Post Method */
    const post = (endpoint, postData) => __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(postData),
        });
        const { data, errors } = yield response.json();
        if (errors) {
            throw new Error(errors);
        }
        return { data, errors };
    });
    /** Set JWT Token Value */
    const setToken = (token) => {
        strapiToken.value = token;
    };
    /** Set Strapi LoggedIn User Valye */
    const setUser = (user) => {
        strapiUser.value = user;
    };
    const register = (data) => __awaiter(this, void 0, void 0, function* () {
        const { user, jwt } = yield post("/auth/local/register", data);
        setToken(jwt);
        return { user, jwt };
    });
    return { init, register };
}
exports.default = useStrapi;
