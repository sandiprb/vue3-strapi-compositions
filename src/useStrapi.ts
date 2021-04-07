import { ref } from "vue-demi";
import {
  StrapiRegistrationResult,
  StrapiRegistrationData,
  StrapiUser,
  StrapiLoginData,
  StrapiLoginResult,
} from "./types";

const strapiUrl = ref<string>("");
const strapiUser = ref<StrapiUser | null>(null);
const strapiToken = ref<string | null>(null);

export const strapiInit = ({
  url,
  collectionTypes,
  singleTypes,
}: {
  url: string;
  collectionTypes?: string[];
  singleTypes?: string[];
}) => {
  if (strapiUrl.value) {
    throw new Error(
      `Strapi Init already initialised with URL: ${strapiUrl.value}`
    );
    return;
  }
  strapiUrl.value = url;
};

/** Generic Post Method */
const post = async (endpoint: string, postData: any): Promise<any> => {
  const response = await fetch(`${strapiUrl.value}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const parsedResponse = await response.json();
  return parsedResponse;
};

/** Set JWT Token Value */
const setToken = (token: string) => {
  strapiToken.value = token;
};

/** Set Strapi LoggedIn User Value */
const setUser = (user: StrapiUser) => {
  strapiUser.value = user;
};

export default function useStrapi() {
  const register = async (
    data: StrapiRegistrationData
  ): Promise<StrapiRegistrationResult> => {
    const response = await post("auth/local/register", data);
    if (response.statusCode === 400) {
      return Promise.reject({ errors: response.data?.message });
    } else {
      const { user, jwt } = response;
      setToken(jwt);
      setUser(user);
      return { user, jwt };
    }
  };

  const login = async(data:StrapiLoginData): Promise<StrapiLoginResult> => {
    const response = await post("auth/local", data);
    if (response.statusCode === 400) {
      return Promise.reject({ errors: response.data[0]?.messages });
    } else {
      const { user, jwt } = response;
      setToken(jwt);
      setUser(user);
      return { user, jwt };
    }
  }

  return { login, register };
}
