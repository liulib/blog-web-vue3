/*
 * @Des          : 查找传进来的DOM节点下的h标题，用于生成侧边导航
 * @Author       : liulib
 * @Date         : 2021-10-21 13:51:42
 */
export const generateTitles: (dom: HTMLElement | null) => [] = dom => {
    if (dom === null) return [];

    let resultList;

    const anchors = dom.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6');

    const titles = Array.from(anchors).filter(
        title => !!title.innerText.trim()
    );

    if (!titles.length) {
        resultList = [];
        return resultList;
    }

    const hTags = Array.from(
        new Set(titles.map(title => title.tagName))
    ).sort();

    resultList = titles.map(el => ({
        title: el.innerText,
        lineIndex: el.getAttribute('data-v-md-line'),
        indent: hTags.indexOf(el.tagName)
    }));

    return resultList;
};
