// pages/profile/ProfilePage.tsx
import AppNavbar from "../../components/layout/AppNavbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import TopLoader from "../../components/TopLoader";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useScrollDirection } from "../../utils/useScrollDirection";
import { useProfile } from "./useProfile";
import { ProfileView } from "./ProfileView";

export default function ProfilePage() {
  const navigate = useNavigate();
  const navVisible = useScrollDirection();
  const profileState = useProfile();

  if (profileState.initializing && !profileState.profile) {
    return (
      <>
        <TopLoader />
        <div className="min-h-screen flex items-center justify-center text-white
          bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400">
          Loading profile…
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-400 via-purple-400 to-pink-400
      md:bg-gradient-to-br md:from-indigo-500 md:via-purple-500 md:to-pink-500">

      <div className="hidden md:block">
        <AppNavbar active="profile" />
      </div>

      <div className="md:hidden flex items-center gap-3 px-4 py-4 text-white">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="text-lg font-semibold">Profile</h1>
      </div>

      <div className="relative z-10 px-4 md:mt-24">
        <ProfileView {...profileState} />
      </div>

      <div className="md:hidden">
        <MobileBottomNav active="profile" visible={navVisible} />
      </div>
    </div>
  );
}
