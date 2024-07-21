import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setToken, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch("/api/auth/protected", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            dispatch(setUser({ username: data.username }));
            dispatch(setToken(token));
          } else {
            dispatch(clearAuth());
          }
        } catch (error) {
          dispatch(clearAuth());
        }
      }
    };

    fetchUser();
  }, [dispatch]);

  return user;
};

export default useAuthSession;
