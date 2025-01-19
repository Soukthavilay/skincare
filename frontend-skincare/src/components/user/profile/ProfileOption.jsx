import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function ProfileOption() {
  const { t } = useTranslation();
  return (
    <div className="profile-option">
      <div className="profile-option-item">
        <Link to="/myInfo">{t("label-user-info")}</Link>
      </div>
      <div className="profile-option-item">
        <Link to="/profile">{t("label-my-orders")}</Link>
      </div>
    </div>
  );
}

export default ProfileOption