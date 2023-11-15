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

  return hoursDifference >= 3;
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
    return Math.ceil(daysDiff);
  }
  if (type === "hourly") {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    const timeDifference = Math.abs(date2 - date1);

    hoursDiff = timeDifference / (1000 * 60 * 60);

    return hoursDiff;
  }
}

export function formData(checkoutData) {
  if (!checkoutData?.length) return null;
  for (let s of checkoutData) {
    if (
      s.sp_type === "car"
    ) {
      return s;
    }
  }
  for (let g of checkoutData) {
    if (
      g.sp_type === "truck"
    ) {
      return g;
    }
  }
  return null;
}

export function reservationData(checkoutData, checkoutObj) {
  if (checkoutData?.length === 0 || !checkoutObj?.query) return null;
  let start = checkoutObj.query[checkoutObj.query.length-1][2];
  let end = checkoutObj.query[checkoutObj.query.length-1][3];
  //getting the unique types of spaces
  let f = checkoutData.filter(item => +item.row_num === 1);
  f = f.map((item, _) => {
    return { ...item, final_price: (checkoutPrice(start, end, item.billing_type) * +item.price).toFixed(2)}
  })
  if (f.length > 1) {
    f.push({ options: 1 });
  }
  return f;
}
