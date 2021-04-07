import { ref } from "vue-demi";
import {
  StrapiRegistrationResult,
  StrapiRegistrationData,
  StrapiUser,
} from "./types";

const strapiUrl = ref<string>("");
const strapiUser = ref<StrapiUser | null>(null);
const strapiToken = ref<string | null>(null);

export default function useStrapi() {
  const init = (url: string) => {
    strapiUrl.value = url;
  };

  /** Generic Post Method */
  const post = async (endpoint: string, postData: any): Promise<any> => {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(postData),
    });
    const { data, errors } = await response.json();
    if (errors) {
      throw new Error(errors);
    }
    return { data, errors };
  };

  /** Set JWT Token Value */
  const setToken = (token: string) => {
    strapiToken.value = token;
  };

  /** Set Strapi LoggedIn User Valye */
  const setUser = (user: StrapiUser) => {
    strapiUser.value = user;
  };

  const register = async (
    data: StrapiRegistrationData
  ): Promise<StrapiRegistrationResult> => {
    const { user, jwt } = await post("/auth/local/register", data);
    setToken(jwt);
    return { user, jwt };
  };

  return { init, register };
}
