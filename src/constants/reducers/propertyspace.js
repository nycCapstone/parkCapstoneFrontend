export default function makeFormData(renterData, spacesData, propsId) {
  if (!renterData || !propsId) return null;
  const formArr = [];
  const sp_noArr = [];
  const f = renterData.find((item) => item.property_id === propsId);
  let arr = [];
  const billing = f.billing_type === "fixed" ? "day" : "hour";
  if (f.number_spaces - spacesData.length > 0) {
    arr.length = f.number_spaces - spacesData.length;
    arr.fill(propsId);
  }

  spacesData.forEach((item, idx) => {
    formArr.push({
      space_no: item.space_no,
      space_id: item.space_id,
      sp_type: item.sp_type,
      occupied: item.occupied,
      billing,
      price: item.min_price_overtype,
    });
    sp_noArr.push(item.space_no);
  });
  for (let i = 1; i <= f.number_spaces; i++) {
    if (!sp_noArr.includes(i)) {
      sp_noArr.push(i);
    }
  }

  arr.forEach((_, idx) => {
    formArr.push({
      space_no: sp_noArr[spacesData.length + idx],
      sp_type: "car",
      billing,
      price: 15,
      checkbox: false,
    });
  });

  if (arr.length > 0) {
    formArr.sort((a, b) => a.space_no - b.space_no);
    formArr.push({ submit_details: true });
  }

  return formArr;
}
