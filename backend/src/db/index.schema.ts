export {
  highlightEnum,
  amenitiesEnum,
  propertyTypesEnum,
  applicationStatusEnum,
  paymentStatusEnum,
} from "./enums.schema.js";

export { tenant, manager } from "./users.schema.js";

export {
  location,
  application,
  lease,
  payment,
  likedProperty,
  leasedProperty,
} from "./dependents.schema.js";
export { property } from "./property.schema.js";

export { tenantRelation, managerRelation } from "./users.schema.js";
export { propertyRelation } from "./property.schema.js";
export {
  locationRelation,
  applicationRelation,
  leaseRelation,
  paymentRelation,
  likedPropertyRelation,
  leasedPropertyRelation,
} from "./dependents.schema.js";
