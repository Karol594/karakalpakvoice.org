import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Navigation() {
  const { t } = useTranslation();

  return (
    <header className="nav">
      <nav>
        <ul>
          <li><NavLink to="/">{t("nav.home")}</NavLink></li>
          <li><NavLink to="/news">{t("nav.news")}</NavLink></li>
          <li><NavLink to="/sport">{t("nav.sport")}</NavLink></li>
          <li><NavLink to="/tradition">{t("nav.tradition")}</NavLink></li>
          <li><NavLink to="/religion">{t("nav.religion")}</NavLink></li>
          <li><NavLink to="/history">{t("nav.history")}</NavLink></li>
          <li><NavLink to="/geography">{t("nav.geography")}</NavLink></li>
          <li><NavLink to="/people">{t("nav.people")}</NavLink></li>
          <li><NavLink to="/contact">{t("nav.contact")}</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
