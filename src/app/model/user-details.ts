import { EarningType } from "./earning-type";

export class UserDetails {
    taxYear: number;
    age: number;
    totalEarnings: number;
    earningType:EarningType;
    medicalAidDependants: number;
}