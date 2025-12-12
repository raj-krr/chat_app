import { useEffect, useState, useRef } from "react";
import { TextInput, Textarea, Select, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  getProfileApi,
  updateProfileApi,
  uploadProfilePhotoApi,
} from "../apis/profile.api";

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState<any>({});

  // ---------------------- LOAD PROFILE ------------------------
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfileApi();
      const u = res.data.safeUser;

      // SAFE DEFAULTS (important!)
      setProfile({
        firstName: u.firstName || "",
        lastName: u.lastName || "",
        username: u.username || "",
        email: u.email || "",
        dob: u.dob || "",
        gender: u.gender || "male",
        bio: u.bio || "",
        avatar: u.avatar || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------------- INPUT LIMITERS -----------------------
  const updateFirst = (v: string) =>
    setProfile({ ...profile, firstName: v.slice(0, 20) });

  const updateLast = (v: string) =>
    setProfile({ ...profile, lastName: v.slice(0, 20) });

  const updateBio = (v: string) =>
    setProfile({ ...profile, bio: v.slice(0, 50) });

  // ---------------------- VALIDATION ---------------------------
  const validate = () => {
    const err: any = {};

    const first = profile.firstName || "";
    const last = profile.lastName || "";
    const uname = profile.username || "";
    const bio = profile.bio || "";
    const dobV = profile.dob || "";

    // FIRST NAME
    if (!first.trim()) err.firstName = "Required";
    else if (first.length > 20) err.firstName = "Max 20 characters";

    // LAST NAME
    if (!last.trim()) err.lastName = "Required";
    else if (last.length > 20) err.lastName = "Max 20 characters";

    // USERNAME
    if (!uname.trim()) err.username = "Required";
    else if (uname.length > 30) err.username = "Max 30 characters";
    else if (!/^[a-zA-Z0-9._-]+$/.test(uname))
      err.username = "Only letters, numbers, . _ - allowed";

    // BIO
    if (bio.length > 50) err.bio = "Max 50 characters";

    // DOB VALIDATION (Age 12–100)
    if (!dobV) {
      err.dob = "DOB required";
    } else {
      const today = new Date();
      const dob = new Date(dobV);

      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;

      if (dob > today) err.dob = "DOB cannot be future";
      else if (age < 12) err.dob = "Minimum age 12";
      else if (age > 100) err.dob = "Maximum age 100";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // ---------------------- SAVE PROFILE -------------------------
  const saveChanges = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      await updateProfileApi({
        firstName: profile.firstName,
        lastName: profile.lastName,
        dob: profile.dob,
        gender: profile.gender,
        bio: profile.bio,
      });

      await loadProfile();
    } finally {
      setLoading(false);
    }
  };

  // ---------------------- UPLOAD PHOTO --------------------------
  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      await uploadProfilePhotoApi(file);
      await loadProfile();
    } finally {
      setUploading(false);
    }
  };

  // ---------------------- LOGOUT --------------------------
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-6">

      {/* NAVBAR */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 w-[93%] max-w-6xl
        backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg rounded-2xl
        px-6 py-3 flex justify-between items-center z-50">

        <h1 className="text-white text-xl font-bold">ChitChat</h1>

        <div className="hidden sm:flex gap-6 text-white font-medium">
          <button onClick={() => navigate("/dashboard")}>Home</button>
          <button>Profile</button>
          <button>Notifications</button>
          <button onClick={logout}>Logout</button>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="sm:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[93%]
          bg-white/15 backdrop-blur-xl border border-white/20 rounded-xl
          p-4 text-white sm:hidden z-40">
          <button onClick={() => navigate("/dashboard")} className="block py-2">Home</button>
          <button className="block py-2">Profile</button>
          <button className="block py-2">Notifications</button>
          <button onClick={logout} className="block py-2 text-red-300">Logout</button>
        </div>
      )}

      {/* MAIN CARD */}
      <div className="mt-24 max-w-5xl mx-auto rounded-3xl border border-white/20 shadow-2xl
        bg-white/10 backdrop-blur-2xl p-6 grid grid-cols-1 lg:grid-cols-[35%_65%]">

        {/* LEFT PANEL */}
        <div className="flex flex-col items-center text-white border-r border-white/20 pr-6">

          {/* Avatar */}
          <div className="relative">
            <img
              src={profile.avatar}
              className="w-40 h-40 rounded-full object-cover border-4 border-white/40 shadow-xl"
            />

            <button
  onClick={() => fileRef.current?.click()}
  className="absolute bottom-2 right-2 bg-black/40 p-3 rounded-full text-white text-sm"
>
  {uploading ? "⏳" : "📷"}
</button>


            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>

          {/* Name */}
          <h2 className="mt-4 text-2xl font-semibold">
            {profile.firstName} {profile.lastName}
          </h2>

          <p className="text-white/80 mt-2">@{profile.username}</p>
          <p className="text-white/80">{profile.email}</p>

          <button
            onClick={logout}
            className="hidden sm:block mt-6 px-4 py-3 rounded-xl bg-red-500/30 border border-red-400/40"
          >
            Logout
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div className="pl-6 flex flex-col text-white gap-6 mt-8 lg:mt-0">

          {/* USERNAME (editable) */}
          <TextInput
            label="Username"
            value={profile.username}
            onChange={(e) => {
              const val = e.target.value;
              if (/^[a-zA-Z0-9._-]{0,30}$/.test(val))
                setProfile({ ...profile, username: val });
            }}
            error={errors.username}
          />

          {/* First + Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              value={profile.firstName}
              onChange={(e) => updateFirst(e.target.value)}
              error={errors.firstName}
            />

            <TextInput
              label="Last Name"
              value={profile.lastName}
              onChange={(e) => updateLast(e.target.value)}
              error={errors.lastName}
            />
          </div>

          {/* Gender + DOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Gender"
              data={["male", "female", "other"]}
              value={profile.gender}
              onChange={(v) => setProfile({ ...profile, gender: v })}
            />

            <div>
              <label className="text-sm">Date of Birth</label>
              <input
                type="date"
                value={profile.dob}
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
                className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white"
              />
              {errors.dob && (
                <p className="text-red-400 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <Textarea
              label="Bio"
              value={profile.bio}
              onChange={(e) => updateBio(e.target.value)}
              minRows={3}
              error={errors.bio}
            />
            <p className="text-xs text-white/60">
              {(profile.bio || "").length}/50
            </p>
          </div>

          {/* Save Button */}
          <Button
            loading={loading}
            onClick={saveChanges}
            fullWidth
            radius="lg"
            color="indigo"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
