// import { useNavigate } from "react-router-dom";

// export default function DashboardNavbar() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     };
    

//   return (
//     <div
//       className="
//         fixed top-3 left-1/2 -translate-x-1/2 w-[93%] max-w-7xl
//         backdrop-blur-xl bg-white/20 border border-white/30
//         shadow-lg rounded-2xl px-6 py-3
//         flex justify-between items-center z-50
//       "
//     >
//       <h1 className="text-white text-xl font-bold">ChitChat</h1>

//       <div className="hidden sm:flex gap-6 text-white font-medium">
//         <button onClick={() => navigate("/dashboard")}>Home</button>
//         <button>Notifications</button>
//         <button onClick={() => navigate("/profile")}>Profile</button>
//         <button onClick={logout}>Logout</button>
//       </div>

//       <button className="sm:hidden text-white text-3xl">☰</button>
//     </div>
//   );
// }
