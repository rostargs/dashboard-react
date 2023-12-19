import React from "react";
import "./AccountSettings.scss";
import ProfilePicture from "../../ui/ProfilePicture/ProfilePicture";
import { useForm, SubmitHandler } from "react-hook-form";
import { accountInputs } from "./inputs";
import Input from "../../ui/Input/Input";
import { Inputs } from "../LoginForm/LoginForm";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { changeAccountInfo } from "../../redux/slices/userSlice";

const AccountSettings: React.FC = () => {
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);
  const { name, email, password, avatar } = useAppSelector(
    (state: RootState) => state.user.userData
  );

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    let files = event.target.files;
    if (files) {
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setSelectedFile(e.target.result as string);
        }
      };
    }
  };

  const resetFile = () => {
    setSelectedFile(null);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const formData = {
      avatar: selectedFile ? selectedFile : avatar,
      email: data.email,
      name: data.name,
      password: data.password,
    };
    dispatch(changeAccountInfo(formData));
  };

  const resetFormInputs = () => {
    reset({
      email: email,
      name: name,
      password: password,
    });
    resetFile();
  };

  React.useEffect(() => {
    resetFormInputs();
  }, []);

  return (
    <div className="account-settings">
      <ProfilePicture
        selectedFile={selectedFile}
        handleFileChange={handleFileChange}
      />
      <hr className="account-settings__dash" />
      <form
        className="account-settings__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        {accountInputs["settings"].map((inputs, i) => {
          return (
            <Input
              key={i}
              error={errors[inputs.label]?.message}
              register={register}
              {...inputs}
              className="account-settings-inputs"
            />
          );
        })}
        <div className="account-settings__buttons">
          <button className="account-settings__submit">Update Profile</button>
          <button
            className="account-settings__reset"
            onClick={() => resetFormInputs()}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSettings;
