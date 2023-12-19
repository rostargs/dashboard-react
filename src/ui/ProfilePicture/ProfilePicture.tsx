import React from "react";
import "./ProfilePicture.scss";
import Upload from "../../../public/uploadImage.svg";
import { RootState, useAppSelector } from "../../redux/store";

type TProfilePicture = {
  selectedFile: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ProfilePicture: React.FC<TProfilePicture> = ({
  selectedFile,
  handleFileChange,
}) => {
  const { avatar } = useAppSelector((state: RootState) => state.user.userData);
  const picture = selectedFile ? selectedFile :  avatar ? avatar : ''
  return (
    <div className="profile-picture">
      <h5 className="profile-picture__title">Your Profile Picture</h5>
      <label
        htmlFor="choose-img"
        className="profile-picture__handle"
        style={selectedFile ? { padding: 0 } : {}}
      >
        {selectedFile || avatar ? (
          <img src={picture} alt="Selected image" className="selected-image" />
        ) : (
          <>
            <img src={Upload} alt="Upload image" />
            <p className="profile-picture__text">Upload your photo</p>
          </>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        id="choose-img"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePicture;
