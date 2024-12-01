import { TestModel } from "../../DataModel/Objects/TestModel";
import { baseSafeSoundRequest, SAFE_SOUND_METHODS } from "../Requests";
import { BaseRequestParams } from "../Types/BaseRequestParams";

type GetProductRequestParams = {
  productId: string;
} & BaseRequestParams;

export const getSample = async (params: GetProductRequestParams) => {
  const { token } = params;

  return baseSafeSoundRequest<TestModel>({
    method: SAFE_SOUND_METHODS.GET,
    path: `/test`,
    token: token,
  });
};
