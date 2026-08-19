export interface CourseItem {
    courseName?: string
    description?: string
    pricePaise?: number
    priceUsdCents?: number
    mainCategory?: string
    refundable?: boolean
}

export type CountryCode = "IN" | "US" | "OTHER"
export type SortOrder = "default" | "lowToHigh" | "highToLow"

export interface SkillpathCoursesProps {
    cardRadius: number
    cardGap: number
    style?: React.CSSProperties
}
