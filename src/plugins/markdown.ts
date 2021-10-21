import type { App } from 'vue';

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';

VMdEditor.use(vuepressTheme, {
    Prism
});

VMdPreview.use(vuepressTheme, {
    Prism
});

export const setupMarkDown = (app: App<Element>) => {
    app.use(VMdEditor);
    app.use(VMdPreview);
};
