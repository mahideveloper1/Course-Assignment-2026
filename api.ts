import { CourseItem, CountryCode } from "./types"

const BASE_URL = "https://syncsphere-hiv6.onrender.com"
const COUNTRY_CACHE_KEY = "skillpath_country"

export async function fetchCourses(signal?: AbortSignal): Promise<CourseItem[]> {
    const response = await fetch(
        `${BASE_URL}/assignment/course-data`,
        {
            method: "GET",
            signal,
        }
    )

    if (!response.ok) {
        throw new Error(`Courses request failed: ${response.status}`)
    }

    const raw: unknown = await response.json()
    const courses = parseCourses(raw)

    if (!courses) {
        throw new Error("Courses payload is invalid")
    }

    return courses
}

export async function fetchCountry(
    signal?: AbortSignal
): Promise<CountryCode> {
    try {
        const response = await fetch(
            `${BASE_URL}/assignment/country-code`,
            {
                method: "GET",
                signal,
            }
        )

        if (!response.ok) {
            throw new Error(`Country request failed: ${response.status}`)
        }

        const raw: unknown = await response.json()
        const country = parseCountryCode(raw)

        if (country === "IN" || country === "US") {
            // Save the last known country so a temporary API failure
            // doesn't force us to guess which currency to display.
            localStorage.setItem(COUNTRY_CACHE_KEY, country)
        }

        return country
    } catch (error) {
        if (signal?.aborted) throw error

        const cachedCountry = localStorage.getItem(COUNTRY_CACHE_KEY)

        if (cachedCountry === "IN" || cachedCountry === "US") {
            return cachedCountry
        }

        return "OTHER"
    }
}

function parseCourses(raw: unknown): CourseItem[] | null {
    if (!Array.isArray(raw)) return null

    return raw.map((item) => {
        const safe =
            item && typeof item === "object"
                ? (item as Record<string, unknown>)
                : {}

        return {
            courseName:
                typeof safe.courseName === "string" ? safe.courseName : "",
            description:
                typeof safe.description === "string" ? safe.description : "",
            mainCategory:
                typeof safe.mainCategory === "string"
                    ? safe.mainCategory
                    : "",
            pricePaise:
                typeof safe.pricePaise === "number"
                    ? safe.pricePaise
                    : undefined,
            priceUsdCents:
                typeof safe.priceUsdCents === "number"
                    ? safe.priceUsdCents
                    : undefined,
            refundable: safe.refundable === true,
        }
    })
}

function parseCountryCode(raw: unknown): CountryCode {
    if (!raw || typeof raw !== "object") return "OTHER"

    const value = (raw as Record<string, unknown>).country_code

    return value === "IN" || value === "US" ? value : "OTHER"
}
