import http from '@/utils/http/axios';

enum Api {
    test = '/test'
}

export function test(params: any) {
    return http.request<any>({
        url: Api.test,
        method: 'POST',
        params
    });
}
