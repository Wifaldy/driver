import ConstStatus from "@/const/cost-status";
import { VALID_ENUM_VALUE } from "./valid-value";

type TConstStatus = (typeof ConstStatus)[keyof typeof ConstStatus];

export { TConstStatus, VALID_ENUM_VALUE };
