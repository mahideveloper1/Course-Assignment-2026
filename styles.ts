export const courseStyles = `
.spc-controls {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px;
    margin-bottom: 14px;
}

.spc-input,
.spc-select {
    width: 100%;
    min-width: 0;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.06);
    color: #E2E8F0;
    border-radius: 12px;
    padding: 0 12px;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 14px;
    outline: none;
}

.spc-select {
    min-width: 184px;
    cursor: pointer;
}

.spc-input::placeholder {
    color: #94A3B8;
}

.spc-input:focus-visible,
.spc-select:focus-visible,
.spc-retry:focus-visible {
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.65);
    border-color: rgba(129, 140, 248, 0.9);
}

.spc-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: stretch;
}

.spc-card {
    background: #FFFFFF;
    border: 1px solid #EEEEEE;
    box-shadow: 0 4px 12px rgba(7, 15, 43, 0.05);
    padding: 24px;
    min-height: 220px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.spc-badge {
    width: max-content;
    max-width: 100%;
    padding: 6px 10px;
    border-radius: 999px;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 12px;
    line-height: 1;
    letter-spacing: 0.01em;
    font-weight: 600;
    color: #3730A3;
    background: rgba(79, 70, 229, 0.12);
}

.spc-badgeRow {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 14px;
}

.spc-refundable {
    color: #065F46;
    background: rgba(16, 185, 129, 0.14);
}

.spc-title {
    margin: 0;
    color: #0B1220;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 20px;
    line-height: 1.25;
    letter-spacing: -0.01em;
    font-weight: 700;
}

.spc-description {
    margin: 12px 0 0;
    color: #475569;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 15px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.spc-price {
    margin: auto 0 0;
    color: #0B1220;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: -0.01em;
    font-weight: 700;
    padding-top: 16px;
}

.spc-state {
    width: 100%;
    min-height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #E2E8F0;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.4;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 20px;
}

.spc-notice {
    margin: 0 0 12px;
    color: #CBD5E1;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.4;
}

.spc-errorWrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
}

.spc-retry {
    appearance: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.08);
    color: #E2E8F0;
    border-radius: 10px;
    padding: 10px 14px;
    font-family: Inter, "Plus Jakarta Sans", system-ui, sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
}

.spc-srOnly {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}

.spc-skeletonCard {
    position: relative;
    overflow: hidden;
}

.spc-skeletonCard::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgba(255,255,255,0) 0%,
        rgba(255,255,255,0.35) 50%,
        rgba(255,255,255,0) 100%
    );
    transform: translateX(-100%);
    animation: spcShimmer 1.5s infinite;
}

.spc-skeletonLine {
    border-radius: 8px;
    background: #E5E7EB;
}

.spc-skeletonBadge {
    width: 92px;
    height: 24px;
    margin-bottom: 14px;
}

.spc-skeletonTitle {
    width: 76%;
    height: 24px;
    margin-bottom: 12px;
}

.spc-skeletonText {
    width: 100%;
    height: 14px;
    margin-bottom: 8px;
}

.spc-skeletonTextShort {
    width: 84%;
    height: 14px;
}

.spc-skeletonPrice {
    width: 40%;
    height: 22px;
    margin-top: auto;
}

@keyframes spcShimmer {
    100% {
        transform: translateX(100%);
    }
}

@media (max-width: 1024px) {
    .spc-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 767px) {
    .spc-controls {
        grid-template-columns: minmax(0, 1fr);
    }

    .spc-select {
        min-width: 0;
    }

    .spc-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}
`
