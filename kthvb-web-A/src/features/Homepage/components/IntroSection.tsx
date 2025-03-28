import teamPicture1 from "@/assets/images/teamPicture1.jpg"
import teamPicture2 from "@/assets/images/teamPicture2.jpg"
import teamPicture3 from "@/assets/images/teamPicture3.jpg"
import teamPicture4 from "@/assets/images/teamPicture4.jpg"
import teamPicture5 from "@/assets/images/teamPicture5.jpg"
import teamPicture6 from "@/assets/images/teamPicture6.jpg"
import React, { useState, useEffect, CSSProperties, useRef } from "react"

import { useTranslation } from "react-i18next"
import { useWindowWidth } from "@/hooks/useWindowWidth"
import { Carousel } from "react-bootstrap"

export function IntroSection(): JSX.Element {
    const { t, i18n } = useTranslation()
    const windowWidth = useWindowWidth()
    const bottomRef = useRef<HTMLDivElement>(null)

    const titleWrap = windowWidth < 992 ? "normal" : "pre-line"

    const titleStyle: CSSProperties = {
        fontWeight: 600,
        whiteSpace: titleWrap,
    }

    const [index, setIndex] = useState(0)

    function handleSelect(selectedIndex: number, e: any) {
        setIndex(selectedIndex)
    }

    const items = [
        {
            src: teamPicture6,
            altText:
                "The team of KTH Volleyball pose for a picture after playing a tournament in Gothenburg.",
            captionLabel: t("homepage.teamPicture6.label"),
            captionText: t("homepage.teamPicture6.text"),
        },
        {
            src: teamPicture5,
            altText:
                "The team of KTH Volleyball pose for a picture after playing an internal tournament in Stockholm.",
            captionLabel: t("homepage.teamPicture5.label"),
            captionText: t("homepage.teamPicture5.text"),
        },
        {
            src: teamPicture4,
            altText:
                "The team of KTH Volleyball pose for a picture in a park after playing a tournament in Gothenburg.",
            captionLabel: t("homepage.teamPicture4.label"),
            captionText: t("homepage.teamPicture4.text"),
        },
        {
            src: teamPicture3,
            altText:
                "The team of KTH Volleyball pose for a picture after playing an internal tournament in Stockholm.",
            captionLabel: t("homepage.teamPicture3.label"),
            captionText: t("homepage.teamPicture3.text"),
        },
        {
            src: teamPicture2,
            altText:
                "The team of KTH Volleyball pose for a picture in a park after playing a tournament in Amsterdam.",
            captionLabel: t("homepage.teamPicture2.label"),
            captionText: t("homepage.teamPicture2.text"),
        },
        {
            src: teamPicture1,
            altText:
                "The team of KTH Volleyball pose for a picture in their training hall with their new team shirts.",
            captionLabel: t("homepage.teamPicture1.label"),
            captionText: t("homepage.teamPicture1.text"),
        },
    ]

    return (
        <div
            ref={bottomRef}
            className="row row-cols-1 g-0 bg-dark pb-5 d-flex justify-content-center"
            style={{ position: "relative" }}
        >
            <div
                className="col-11 col-lg-9 col-xxl-7 position-relative"
                style={{ minHeight: "200px" }}
            >
                <div
                    className="d-flex fs-1 text-white text-center justify-content-center mb-2 mt-2"
                    style={titleStyle}
                >
                    {t("homepage.title")}
                </div>
                <div className="d-flex fs-4 text-white text-center mb-4">
                    {t("homepage.intro")}
                </div>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {items.map((item, idx) => {
                        return (
                            <Carousel.Item key={idx}>
                                <img
                                    className="d-block w-100"
                                    src={item.src}
                                    alt={item.altText}
                                    style={{ borderRadius: "20px" }}
                                />
                                <Carousel.Caption className="d-none d-sm-block">
                                    <div className="d-flex justify-content-center">
                                        <div
                                            className="w-auto px-3 py-1"
                                            style={{
                                                backgroundColor:
                                                    "rgba(0, 0, 0, 0.8)",
                                            }}
                                        >
                                            <div className="fs-4 fw-bold">
                                                {item.captionLabel}
                                            </div>
                                            <div className="fs-5">
                                                {item.captionText}
                                            </div>
                                        </div>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </div>
            <div className="col-12 bg-dark">&nbsp;</div>
        </div>
    )
}
