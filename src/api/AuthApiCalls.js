import axios from "axios";
import { handleErrorMessages } from "@/utils/helpers";
import { setUserDetail } from "@/store/reducers/userSlice";
import { dispatch, getState } from "@/store/store";

const formatAndSetUserDetail = (data) => {
  const formatted = {
    id: data.subID,
    name: data.name,
    companyName: data.tenant.company_name,
    email: data.email,
    isDataRoomSetup: data.is_data_room_setup,
    isTenantCreated: data.is_tenant_created,
    role: data.role,
    isStorageUser: data.isStorageUser,
    tenantId: data.TenantID,
    multiTenants: data.tenants?.length > 1,
    tenantListing: data.tenants,
    subscriptionId:
      data?.tenant?.subscription?.metadata?.subscription_type === "free"
        ? null
        : data?.tenant?.subscription?.subscription_id
        ? data?.tenant?.subscription?.subscription_id
        : null,
  };
  dispatch(setUserDetail(formatted));
  return formatted;
};

export const getUserByAuthToken = async (isforced) => {
  try {
    if (getState().User.userDetail && !isforced) return true;
    const response = await axios.get(`cognito/user/me`);

    if (response.data) {
      await formatAndSetUserDetail(response.data);
      return true;
    }
    handleErrorMessages(response?.errors);
  } catch (error) {
    console.log("error", error);
  }
};
