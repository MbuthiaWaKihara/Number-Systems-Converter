//use lower bases than 10
export const decimalToBaseX = (decimalNumber, base) => {
    let baseStorage = [];
    let numerator = decimalNumber;
    let baseString = ``;

    while(numerator > 0){
        baseStorage.push(numerator % base);
        numerator = Math.floor(numerator / base);
    }

    baseStorage = baseStorage.reverse();
    baseStorage.forEach(baseValue => baseString = `${baseString}${baseValue}`);
    return Number(baseString);
}


//for lower bases than 10
//all inputs are ints
export const baseXtoDecimal = (baseValue, base) => {
    let decimalAccumulator = 0;
    let baseAsArray = baseValue.toString(10).replace(/\D/g, '0').split('').map(Number).reverse();
    for(let position = 0; position < baseAsArray.length; position++){
        decimalAccumulator = decimalAccumulator + (baseAsArray[position] * Math.pow(base, position));
    }
    return decimalAccumulator;
}