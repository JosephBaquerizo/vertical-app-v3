export const reduceAddress = (address) => {
    const firstChar = address.slice(0, 4);
    const lastChar = address.slice(address.length - 3, address.length);
    return ( firstChar + "..." + lastChar );
}

export const handleCollectionName = (name) => {
    if (name.length > 30) {
        const slicedName = name.slice(0, 20);
        const newName = slicedName + "...";
        return newName.toUpperCase();
    }
    return name.toUpperCase();
}

export const epochToDate = (epoch) => {
    let d = new Date(0);
    d.setUTCSeconds(epoch.toString());
    const date = `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    return date;
}

export const purityToNumber = (purity) => {
    let newPurity = purity.toNumber();
    newPurity = newPurity / 100;
    return newPurity;
}

export const threeDecimalFormat = (number) => {
    const index = number.indexOf(".");
    return number.slice(0, index + 4);
}