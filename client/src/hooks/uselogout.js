import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { serverLink } from "../config/config";

const useLogout = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		setLoading(true);
		try {
			const res = await fetch(`${serverLink}/auth/logout`, {
				method: "GET",
			
			});
			const data = await res.json();
			if (data.success===false) {
                toast.error(data.message);
			}

			localStorage.removeItem("chat-user");
			setAuthUser(null);
            toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;