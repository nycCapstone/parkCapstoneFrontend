export function makeFormData(userData, err) {
    const roles = userData.roles;
    const co = roles?.ClientOnly && !userData?.client_background_verified && "client";
    const ro = roles?.Renter && !userData?.client_background_verified && "client";
    const ra = roles?.Renter && userData?.client_background_verified && !userData?.background_verified && "renter";
    let stack = [co, ro, ra];
    let next = stack.find(item => typeof item === 'string');
    let formData = {
            mode: next || null,
            data: {
                URL: next === "client" ? '/user/update-address' : next === "renter" ? '/renters/update-address' : null,
                ClientOnly: roles?.hasOwnProperty('ClientOnly'),
                isFormEnabled: false
            }
        }
        let tempArr =
        formData.mode === "client"
        ? userData?.address?.split(" ")
        : formData.mode === "renter"
        ? userData?.renter_address?.split(" ")
        : userData?.space_address?.split(" ");
        if (!tempArr) tempArr = ["missing", "address", "fill"];
        const dataArr = {
          0: tempArr[0],
          1: tempArr[1],
          2: tempArr.slice(2).join(" "),
        };
        return [formData, dataArr];
}