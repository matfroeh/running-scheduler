import { useState, useEffect } from "react";

import { getUserProfilePicture } from "../data/image";

export function useFetchUserProfile(user) {
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.profilePicture) {
      // check for profile picture
      return;
    }
    const fetchImage = async () => {
      setLoading(true);
      try {
        const data = await getUserProfilePicture(user);
        setImage(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImage();
  }, [user]);

  return { image, loading };
}
