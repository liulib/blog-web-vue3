/**
 * 对数组进行分组
 * @param {Array} arr - 分组对象
 * @param {Function} f
 * @returns 数组分组后的新数组
 */
export const groupBy = (arr, f) => {
    const groups = {};
    arr.forEach(item => {
        const group = JSON.stringify(f(item));
        groups[group] = groups[group] || [];
        groups[group].push(item);
    });
    return Object.keys(groups).map(group => groups[group]);
};
