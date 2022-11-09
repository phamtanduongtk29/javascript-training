/**
 * - Remove redundant characters
 * @param {String} text
 * @param {String} character
 * @returns String (new data)
 */
export const handleCleanData = (text = '', character) => {
    const words = text.split(character);
    const newData = words.filter((item) => item !== '').join(character);
    return newData;
};
