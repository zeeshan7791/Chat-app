import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { serverLink } from "../config/config";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${serverLink}/users`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message);
        }
        console.log(data, "value in data");
        setConversations(data.filteredUsers);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};
export default useGetConversations;
