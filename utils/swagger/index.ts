import { IRequest, IRequestBody, IRequestHeaders } from "@/schema/common";

const version = "v1";
const fullVersion = "1.0.0";

const toOperationId = (route: IRequest) => {
  return route.description;
};

const toSwagger = () => {
  return true;
};

const toSwaggerParams = (params: IRequestHeaders | IRequestBody) => {
  const swaggerParams = [];
  Object.keys(params).forEach((paramKey) => {
    const param = params[paramKey];
    swaggerParams.push({
      name: paramKey,
      in: param.in,
      required: param.required,
      description: param.description,
      type: param.type,
      schema: {
        type: param.type,
      },
    });
  });
  return swaggerParams;
};

const toSwaggerOperation = (route: IRequest, parentRoute?: string) => {
  return {
    operationId: toOperationId(route),
    summary: route.description,
    tags: route.tags || [parentRoute],
    ...route,
    path: `/${version}${parentRoute}${route?.path}`,
    parentPath: parentRoute,
    parameters: [
      ...toSwaggerParams(route.request.headers || {}),
      ...toSwaggerParams(route.request.body || {}),
    ],
  };
};

export default toSwagger;
export { version, fullVersion, toSwaggerOperation };
