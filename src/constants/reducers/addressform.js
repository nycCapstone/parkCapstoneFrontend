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
        let tempAddr =
        formData.mode === "client"
        ? userData?.address
        : formData.mode === "renter"
        ? userData?.renter_address
        : userData?.space_address
        if (!tempAddr) tempAddr = "missing address use search feature";
        return [formData, tempAddr];
}