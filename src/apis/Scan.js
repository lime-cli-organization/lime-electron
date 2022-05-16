import service from '@/utils/request';

export const GetPaperBySideAsync = (params) => {
  return service.request({
    url: '/api/Scan/GetPaperBySideAsync',
    method: 'get',
    params,
  });
};
