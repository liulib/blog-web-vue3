/**
 * @description: 递归对树形数据进行排序
 * @param { Array } source 需要排序的数据源
 * @param { String } key 排序属性名
 * @param { String } type 升序asc 降序des
 * @param { String } childrenName 子级属性名
 */
export const sortTree = <T>(
    source: T[],
    key = 'order',
    type = 'des',
    childrenName = 'children'
) => {
    let sortFuc;

    if (Array.isArray(source)) {
        switch (type) {
            case 'des':
                sortFuc = (a, b) => {
                    return b[key] - a[key];
                };
                break;
            case 'asc':
                sortFuc = (a, b) => {
                    return a[key] - b[key];
                };
                break;
        }

        source.sort(sortFuc);

        source.forEach(item => {
            if (
                Array.isArray(item[childrenName]) &&
                item[childrenName].length > 0
            ) {
                sortTree(item[childrenName], key, type, childrenName);
            }
        });
    } else {
        throw new Error('sortTree: source is not Array');
    }
};
