export const BASE_URL = process.env.REACT_APP_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_BACKEND_URL;

export const REGISTER_URL = "/auth/create-user";

export const EMAIL_REGEX =
/([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/;
export const PWD_REGEX = /^(?=.*[A-Z])(?=.*\d).{7,24}$/;
export const NAME_REGEX = /^[A-Za-z'-]+$/;
export const ADDRESS_REGEX = /^[0-9A-Za-z\s,-./\\#]+$/;
export const CITY_REGEX = /^[A-Za-z\s'-.]+$/;
export const STATE_REGEX = /^[A-Z]{2}$/;

export const SITEROLES = {
    Client: { bckgr: false, pmt: false },
    Renter: { bckgr: false, pmt: false },
  };
