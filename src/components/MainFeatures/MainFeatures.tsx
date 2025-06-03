import "./MainFeatures.css";
import { FadeInSection } from "../../elements/FadeInSection.tsx";

export function MainFeatures() {
  return (
    <div className="container main-features">
        <FadeInSection direction="left" additionalClass="feature">
          <div className="feature-image"></div>
          <div className="feature-description"></div>
        </FadeInSection>
        <FadeInSection direction="right" additionalClass="feature">
          <div>
            Появляюсь справа с задержкой!
          </div>
        </FadeInSection>
    </div>
  );
}
