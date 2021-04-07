import { StrapiRegistrationResult, StrapiRegistrationData } from "./types";
export default function useStrapi(): {
    init: (url: string) => void;
    register: (data: StrapiRegistrationData) => Promise<StrapiRegistrationResult>;
};
