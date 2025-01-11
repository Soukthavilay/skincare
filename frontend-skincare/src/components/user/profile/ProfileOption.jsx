import { Link } from "react-router-dom";
import { useTranslation } from '../../../../node_modules/react-i18next';

function ProfileOption() {
  const { t } = useTranslation();
  return (
    <div className="profile-option">
      <div className="profile-option-item">
        <Link target='_parent' to="/myInfo">{t("label-user-info")}</Link>
      </div>
      <div className="profile-option-item">
        <Link target='_parent' to="/profile">{t("label-my-orders")}</Link>
      </div>
    </div>
  );
}

export default ProfileOption