import { CardModal, ImageViewAndInputGroup } from "@/components/generic";
import { useProfileData } from "@/lib/hooks";

const Profile = () => {
  const {
    user,
    handleUpdate,
    deleteAccount,
    imageUrl,
    image,
    handleImageChange,
  } = useProfileData();

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
      <div className="grid grid-cols-2 content-start min-h-48">
        <div className="flex flex-col  gap-2">
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn btn-sm w-max btn-error" onClick={deleteAccount}>
          Delete Account
        </button>
      </div>
    </CardModal>
  );
};

export default Profile;

{
  /* <button className="btn btn-sm w-max btn-primary">
Change Username/Email
</button>
<button className="btn btn-sm w-max btn-primary">
Change Password
</button> */
}
