"use client";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";
import { t, auth as ac } from "@/data/contents";

export default function useLogout() {
  const handleLogout = async (lang, isDark) => {
    const result = await Swal.fire({
      title:              t(ac.logoutConfirm, lang),
      text:               t(ac.logoutSure, lang),
      icon:               "question",
      showCancelButton:   true,
      confirmButtonText:  t(ac.logoutYes, lang),
      cancelButtonText:   t(ac.logoutCancel, lang),
      confirmButtonColor: "#059669",
      cancelButtonColor:  "#64748b",
      background:         isDark ? "#0f172a" : "#ffffff",
      color:              isDark ? "#f1f5f9" : "#1e293b",
    });

    if (result.isConfirmed) {
      await Swal.fire({
        icon:              "success",
        title:             t(ac.loggedOut, lang),
        text:              t(ac.seeYou, lang),
        background:        isDark ? "#0f172a" : "#ffffff",
        color:             isDark ? "#f1f5f9" : "#1e293b",
        timer:             1500,
        timerProgressBar:  true,
        showConfirmButton: false,
      });
      signOut({ callbackUrl: "/" });
    }
  };

  return { handleLogout };
}