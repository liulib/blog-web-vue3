import createPersistedState from 'vuex-persistedstate';
import { NO_CACHE_DATA } from '@/configs/base-config';

export default createPersistedState({
    key: 'cacheData',
    storage: window.localStorage,
    reducer: data => {
        const CopyData = JSON.parse(JSON.stringify(data));
        for (const key in NO_CACHE_DATA) {
            delete CopyData[NO_CACHE_DATA[key]];
        }
        return CopyData;
    }
});
