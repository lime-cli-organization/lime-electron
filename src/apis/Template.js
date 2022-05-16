import service from '@/utils/request';

export const GetTemplateList = (params) => {
  return service.request({
    url: '/api/Template/GetTemplates',
    method: 'get',
    params,
  });
};

export const GetTemplateReadAsync = (params) => {
  return service.request({
    url: '/api/Template/TemplateReadAsync',
    method: 'get',
    params,
  });
};

export const GetPaperImage = (params) => {
  return service.request({
    url: '/api/Template/GetPaperImage',
    method: 'get',
    params,
  });
};
