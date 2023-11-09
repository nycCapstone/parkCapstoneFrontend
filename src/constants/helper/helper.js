export const BASE_URL =
  process.env.REACT_APP_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_BACKEND_URL;

export const CHECK_FOR_EMAIL_URL = BASE_URL + "/auth/check-for-email/";
export const REGISTER_URL = "/auth/create-user";
/*must be grouped together */

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

const zipCodePattern = /\b\d{5}(?:-\d{4})?\b/g;

export function removeZipCode(args) {
  const extractedZipCodes = [];
  const modifiedString = args.replace(zipCodePattern, (match) => {
    extractedZipCodes.push(match);
  });
  return [modifiedString, extractedZipCodes];
}

export function checkDates(dateString1, dateString2) {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const timeDifference = Math.abs(date2 - date1);

  const hoursDifference = timeDifference / (1000 * 60 * 60);

  return hoursDifference > 2;
}

function calculateDateDifferenceInDays(dateString1, dateString2) {

  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  const timeDifference = Math.abs(date2 - date1);

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
}

export function checkoutPrice(dateString1, dateString2, type) {
  let daysDiff;
  let hoursDiff;
  if (type === "fixed") {
    daysDiff = calculateDateDifferenceInDays(dateString1, dateString2);
    return daysDiff;
  }
  if (type === "hourly") {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    const timeDifference = Math.abs(date2 - date1);

    hoursDiff = timeDifference / (1000 * 60 * 60);
  
    return hoursDiff;
  }
}
