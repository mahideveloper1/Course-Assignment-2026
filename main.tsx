import * as React from "react"
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
    startTransition,
} from "react"
import { addPropertyControls, ControlType } from "framer"

import CourseCard from "./CourseCard"
import { fetchCourses, fetchCountry } from "./api"
import { courseStyles } from "./styles"
import {
    CourseItem,
    CountryCode,
    SortOrder,
    SkillpathCoursesProps,
} from "./types"

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 */
export default function SkillpathCourses(
    props: SkillpathCoursesProps
) {
    const {
        cardRadius = 18,
        cardGap = 18,
        style,
    } = props

    const [courses, setCourses] = useState<CourseItem[] | null>(null)
    const [countryCode, setCountryCode] =
        useState<CountryCode>("OTHER")
    const [isCoursesLoading, setIsCoursesLoading] = useState(true)
    const [isCountryLoading, setIsCountryLoading] = useState(true)
    const [hasCourseError, setHasCourseError] = useState(false)
    const [hasCountryError, setHasCountryError] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] =
        useState<SortOrder>("default")
    const [retryCount, setRetryCount] = useState(0)

    const loadData = useCallback(() => {
        const coursesController = new AbortController()
        const countryController = new AbortController()

        startTransition(() => {
            setIsCoursesLoading(true)
            setIsCountryLoading(true)
            setHasCourseError(false)
            setHasCountryError(false)
        })

        // The APIs are independent: a country failure shouldn't
        // make us throw away course data that loaded successfully.
        void fetchCourses(coursesController.signal)
            .then((data) => {
                startTransition(() => {
                    setCourses(data)
                    setHasCourseError(false)
                })
            })
            .catch(() => {
                if (coursesController.signal.aborted) return

                startTransition(() => {
                    setCourses(null)
                    setHasCourseError(true)
                })
            })
            .finally(() => {
                if (!coursesController.signal.aborted) {
                    startTransition(() => {
                        setIsCoursesLoading(false)
                    })
                }
            })

        void fetchCountry(countryController.signal)
            .then((country) => {
                startTransition(() => {
                    setCountryCode(country)
                    setHasCountryError(country === "OTHER")
                })
            })
            .catch(() => {
                if (countryController.signal.aborted) return

                startTransition(() => {
                    setCountryCode("OTHER")
                    setHasCountryError(true)
                })
            })
            .finally(() => {
                if (!countryController.signal.aborted) {
                    startTransition(() => {
                        setIsCountryLoading(false)
                    })
                }
            })

        return () => {
            coursesController.abort()
            countryController.abort()
        }
    }, [])

    useEffect(() => {
        return loadData()
    }, [loadData, retryCount])

    const safeCourses = courses ?? []

    const showCourseError = hasCourseError

    const showEmpty =
        !showCourseError &&
        !isCoursesLoading &&
        safeCourses.length === 0

    // If the country API fails and there is no cached country,
    // we don't guess a currency.
    const showPriceUnavailableNotice =
        !showCourseError &&
        safeCourses.length > 0 &&
        !isCountryLoading &&
        countryCode === "OTHER"

    const canSortByPrice =
        !hasCountryError &&
        (countryCode === "IN" || countryCode === "US")

    const getPriceMinorUnits = useCallback(
        (course: CourseItem): number | null => {
            if (countryCode === "IN") {
                return typeof course.pricePaise === "number"
                    ? course.pricePaise
                    : null
            }

            if (countryCode === "US") {
                return typeof course.priceUsdCents === "number"
                    ? course.priceUsdCents
                    : null
            }

            return null
        },
        [countryCode]
    )

    const filteredAndSortedCourses = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        const filtered = safeCourses.filter((course) => {
            if (!query) return true

            const name =
                (course.courseName ?? "").toLowerCase()
            const description =
                (course.description ?? "").toLowerCase()
            const category =
                (course.mainCategory ?? "").toLowerCase()

            return (
                name.includes(query) ||
                description.includes(query) ||
                category.includes(query)
            )
        })

        if (sortOrder === "default" || !canSortByPrice) {
            return filtered
        }

        return filtered
            .map((course, index) => ({ course, index }))
            .sort((a, b) => {
                const aPrice = getPriceMinorUnits(a.course)
                const bPrice = getPriceMinorUnits(b.course)

                if (aPrice === null || bPrice === null) {
                    return a.index - b.index
                }

                return sortOrder === "lowToHigh"
                    ? aPrice - bPrice
                    : bPrice - aPrice
            })
            .map((item) => item.course)
    }, [
        canSortByPrice,
        getPriceMinorUnits,
        safeCourses,
        searchQuery,
        sortOrder,
    ])

    const showSearchEmpty =
        !showCourseError &&
        !isCoursesLoading &&
        !showEmpty &&
        filteredAndSortedCourses.length === 0

    const handleRetry = useCallback(() => {
        startTransition(() => {
            setRetryCount((prev) => prev + 1)
        })
    }, [])

    return (
        <section
            style={{
                position: "relative",
                width: "100%",
                ...style,
            }}
            aria-live="polite"
        >
            <style>{courseStyles}</style>

            <div className="spc-controls">
                <input
                    className="spc-input"
                    type="search"
                    value={searchQuery}
                    onChange={(event) => {
                        startTransition(() =>
                            setSearchQuery(event.target.value)
                        )
                    }}
                    placeholder="Search courses"
                    aria-label="Search courses"
                />

                <select
                    className="spc-select"
                    value={sortOrder}
                    onChange={(event) => {
                        startTransition(() =>
                            setSortOrder(
                                event.target.value as SortOrder
                            )
                        )
                    }}
                    aria-label="Sort by price"
                >
                    <option value="default">Sort by price</option>
                    <option value="lowToHigh">
                        Price: Low to High
                    </option>
                    <option value="highToLow">
                        Price: High to Low
                    </option>
                </select>
            </div>

            {isCoursesLoading ? (
                <LoadingState
                    cardRadius={cardRadius}
                    cardGap={cardGap}
                />
            ) : showCourseError ? (
                <ErrorState onRetry={handleRetry} />
            ) : showEmpty ? (
                <div className="spc-state">
                    No courses available right now.
                </div>
            ) : showSearchEmpty ? (
                <div className="spc-state">
                    No courses match your search.
                </div>
            ) : (
                <>
                    {showPriceUnavailableNotice ? (
                        <p className="spc-notice">
                            Course prices are temporarily
                            unavailable.
                        </p>
                    ) : null}

                    <div
                        className="spc-grid"
                        style={{ gap: `${cardGap}px` }}
                    >
                        {filteredAndSortedCourses.map(
                            (course, index) => (
                                <CourseCard
                                    key={`${course.courseName ?? "course"}-${index}`}
                                    course={course}
                                    countryCode={countryCode}
                                    showPriceUnavailable={
                                        showPriceUnavailableNotice
                                    }
                                    cardRadius={cardRadius}
                                />
                            )
                        )}
                    </div>
                </>
            )}
        </section>
    )
}

function LoadingState({
    cardRadius,
    cardGap,
}: {
    cardRadius: number
    cardGap: number
}) {
    return (
        <>
            <span className="spc-srOnly">
                Loading courses...
            </span>

            <div
                className="spc-grid"
                style={{ gap: `${cardGap}px` }}
                aria-hidden="true"
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={`skeleton-${index}`}
                        className="spc-card spc-skeletonCard"
                        style={{
                            borderRadius: `${cardRadius}px`,
                        }}
                    >
                        <div className="spc-skeletonLine spc-skeletonBadge" />
                        <div className="spc-skeletonLine spc-skeletonTitle" />
                        <div className="spc-skeletonLine spc-skeletonText" />
                        <div className="spc-skeletonLine spc-skeletonTextShort" />
                        <div className="spc-skeletonLine spc-skeletonPrice" />
                    </div>
                ))}
            </div>
        </>
    )
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
    return (
        <div className="spc-errorWrap">
            <div className="spc-state">
                Unable to load courses. Please try again later.
            </div>

            <button
                className="spc-retry"
                type="button"
                onClick={onRetry}
            >
                Try again
            </button>
        </div>
    )
}

addPropertyControls(SkillpathCourses, {
    cardRadius: {
        type: ControlType.Number,
        title: "Card Radius",
        defaultValue: 18,
        min: 0,
        max: 40,
        step: 1,
    },
    cardGap: {
        type: ControlType.Number,
        title: "Card Gap",
        defaultValue: 18,
        min: 8,
        max: 40,
        step: 1,
    },
})
