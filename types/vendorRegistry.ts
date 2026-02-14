import { panditConfig } from "@/types/panditMenu";
import { ambulanceConfig } from "@/types/ambulanceMenu";
import { VendorConfig } from "@/types/vendor";

export const vendorRegistry: Record<string, VendorConfig> = {
  pandit: panditConfig,
  ambulance: ambulanceConfig,
};
