export interface TenantAppFormModel {

    _id: string,
    employer: string, 
    employmentPosition: string,
    employmentStartDate: string,
    employmentEndDate: string,
    contactFirstName: string,
    contactLastName: string,
    contactEmail: string,
    contactPhone: number,

    incomeSource: string,
    monthlyAmount: number,
    addIncomeInfo: string,

    residenceCity: string,
    residenceState: string,
    residenceZipCode: number,
    residenceMoveInDate: string,
    residenceMoveOutDate: string,

    refFirstName: string,
    refLastName: string,
    refPhone: number,
    refEmail: string,
    refRelation: string,
    refYearsKnown: number 

} 