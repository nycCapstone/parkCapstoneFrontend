export function getCarTruckPrice(obj, property_id) {
    let c = obj.find(item => item.property_id === property_id && item.sp_type === "car");
    let t = obj.find(item => item.property_id === property_id && item.sp_type === "truck");
    return [(c?.price || t.price), (t?.price || c.price)];
}

