import { CardModal, Modal, ImageViewAndInputGroup } from "@/components/generic";
import { useProfileData } from "@/lib/hooks";
import { useState } from "react";
import { ChangePwForm } from "@/components/Profile";

const Profile = () => {
  const {
    user,
    handleUpdate,
    deleteAccount,
    imageUrl,
    image,
    handleImageChange,
  } = useProfileData();

  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const handleSetPasswordModal = (value) => {
    setOpenPasswordModal(value);
  };

  return (
    <CardModal>
      <h2 className="card-title text-xl">Profile </h2>
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-sm btn-success ml-2"
          onClick={handleUpdate}
        >
          Save
        </button>
      </div>
      <div className="flex flex-col">
        <ImageViewAndInputGroup
          image={image}
          imageUrl={imageUrl}
          handleImageChange={handleImageChange}
        />
      </div>
      <div className="content-start min-h-48">
        <div className="flex flex-col  gap-4">
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
        </div>

        <div className="mt-20">
          <button
            className="btn btn-sm w-max btn-primary"
            onClick={() => setOpenPasswordModal(true)}
          >
            Change Password
          </button>
        </div>
      </div>
      <Modal isOpen={openPasswordModal} setOpen={handleSetPasswordModal}>
        <h2 className="card-title text-xl">Change Password</h2>
        <ChangePwForm />
      </Modal>
      <div className="flex justify-end">
        <button className="btn btn-sm w-max btn-error" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </CardModal>
  );
};

export default Profile;
