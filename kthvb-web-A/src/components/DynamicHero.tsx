import { useWindowWidth } from "@/hooks/useWindowWidth";
import { getButtonSize, getDescriptionSize } from "@/utils/fontSizing";
import { Button } from "react-bootstrap";

interface DynamicHeroProps {
  bgImg: string;
  bottomElement?: React.ReactNode;
  title: string;
  description: JSX.Element | string | null;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  handleClickPrimary?: () => void;
  handleClickSecondary?: () => void;
  align?: 'left' | 'right';
}

export default function DynamicHero({ bgImg, bottomElement, title, description, primaryButtonText, secondaryButtonText, handleClickPrimary, handleClickSecondary, align, }: DynamicHeroProps): JSX.Element {
  return (
    <div className="row flex-lg-row-reverse d-flex justify-content-center align-items-center g-3">
      <div className="col-11 col-xxl-8 d-flex mx-auto">
        <div className="row row-cols-2 d-flex justify-content-center align-items-center py-0 py-lg-4">
          <div className={`col-12 col-lg-6 d-flex order-2 px-0 px-lg-4 ${align === "left" ? "order-lg-1" : "order-lg-2"}`} >
            <img src={bgImg} className="d-block rounded mx-lg-auto img-fluid" width="100%" height="auto" loading="eager" style={{ maxHeight: '100%', width: 'auto' }} />
          </div>
          {/* <div className={`fs-1 pt-5 col-11 col-lg-10 col-xl-9 col-xxl-8 d-flex justify-content-center align-items-center order-2 ${align === "left" ? "order-lg-1" : "order-lg-2"}`}>
            <img src={bgImg} className="img-fluid rounded" alt="KTH Volleyball" style={{ maxHeight: '100%', width: 'auto' }} />
          </div> */}
          <div className={`col-12 col-sm-11 col-lg-6 text-center text-lg-start px-1 px-sm-4  pb-5 pb-lg-1 ${align === "left" ? "order-lg-2" : "order-lg-1"}`} >
            <div className="fs-1 fw-bold">{title}</div>
            <div className={`fs-5`}>{description}</div>
            {(primaryButtonText || secondaryButtonText) &&
              <div className="gap-2 mt-3 d-flex justify-content-center justify-content-lg-start">
                {primaryButtonText && handleClickPrimary && (
                  <Button variant="primary" size='lg' className="px-4 kth-bg" onClick={() => handleClickPrimary()}>
                    {primaryButtonText}
                  </Button>
                )}
                {secondaryButtonText && handleClickSecondary && (
                  <Button variant="outline-secondary" size='lg' className="px-4" onClick={() => handleClickSecondary()}>
                    {secondaryButtonText}
                  </Button>
                )}
              </div>
            }
            <div className="d-flex justify-content-center justify-content-lg-start">
              {bottomElement && bottomElement}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
