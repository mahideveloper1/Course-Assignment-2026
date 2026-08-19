import * as React from "react"
import { CourseItem, CountryCode } from "./types"

interface CourseCardProps {
    course: CourseItem
    countryCode: CountryCode
    showPriceUnavailable: boolean
    cardRadius: number
}

export default function CourseCard({
    course,
    countryCode,
    showPriceUnavailable,
    cardRadius,
}: CourseCardProps) {
    const price = formatPrice(course, countryCode)

    return (
        <article
            className="spc-card"
            style={{ borderRadius: `${cardRadius}px` }}
        >
            <div className="spc-badgeRow">
                <div className="spc-badge">
                    {course.mainCategory || "General"}
                </div>

                {course.refundable ? (
                    <div className="spc-badge spc-refundable">
                        Refundable
                    </div>
                ) : null}
            </div>

            <h3 className="spc-title">
                {course.courseName || "Untitled Course"}
            </h3>

            <p className="spc-description">
                {course.description || "No description available."}
            </p>

            <p className="spc-price">
                {showPriceUnavailable ? "Price unavailable" : price}
            </p>
        </article>
    )
}

function formatPrice(
    course: CourseItem,
    countryCode: CountryCode
): string {
    if (countryCode === "IN") {
        if (typeof course.pricePaise !== "number") {
            return "Price unavailable"
        }

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(course.pricePaise / 100)
    }

    if (countryCode === "US") {
        if (typeof course.priceUsdCents !== "number") {
            return "Price unavailable"
        }

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(course.priceUsdCents / 100)
    }

    return "Price unavailable"
}
