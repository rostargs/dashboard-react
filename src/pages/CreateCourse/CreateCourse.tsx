import React from "react";
import "./CreateCourse.scss";
import FormInput from "../../ui/FormInput/FormInput";
import DropDown from "../../ui/DropDown/DropDown";
import CourseCard from "../../components/CourseCard/CourseCard";
import Tower from "../../../public/Tower.svg";
import Pisa from "../../../public/Pisa.svg";
import Wall from "../../../public/Wall.svg";
import Train from "../../../public/Train.svg";
import Upload from "../../../public/upload.svg";
import { addCourse } from "../../redux/slices/userSlice";
import { converToHEX, convertToRGB } from '../../utils/colorConvert';
import ModalWindow from "../../ui/ModalWindow/ModalWindow";
import Overlay from "../../ui/Overlay/Overlay";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { setModalStatus } from "../../redux/slices/toggleSlice";
import { useNavigate } from "react-router-dom";
import useValidateInput from "../../hooks/useValidateInput";
import useValidateDropDown from "../../hooks/useValidateDropDown";

const dropDownItems = [
  { name: "Eiffel tower", img: Tower },
  { name: "Tower of Pisa", img: Pisa },
  { name: "Train", img: Train },
  { name: "Wall", img: Wall },
];

type TFormInputs = {
  language: string;
  goal: string;
};

type TValidateInputs = {
  language: boolean | null;
  goal: boolean | null;
};

const CreateCourse: React.FC = () => {
  const { modalCourse } = useAppSelector((state: RootState) => state.toggle);
  const { courses } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formInputs = useValidateInput<TFormInputs, TValidateInputs>(
    { language: "", goal: "" },
    { language: null, goal: null }
  );
  const dropDownInfo = useValidateDropDown(
    { name: "", img: "" },
    { name: null, img: null }
  );

  // Form
  const [background, setBackground] = React.useState({ r: 0, g: 0, b: 0 });

  const [showMenu, setShowMenu] = React.useState(false);

  const onToggleMenu = React.useCallback(() => {
    setShowMenu((prev) => !prev);
  }, [showMenu]);

  const handleColorInput = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const color = e.target.value;

      const rgb = convertToRGB(color);

      setBackground((prev) => {
        return {
          ...prev,

          ...rgb,
        };
      });
    },
    [background]
  );

  // Adding course ----------

  const handleAddCourse = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    const validateInputs = { ...formInputs.validate, ...dropDownInfo.validate };

    if (
      !JSON.stringify(validateInputs).includes("false") &&
      !JSON.stringify(validateInputs).includes("null")
    ) {
      if (courses.length === 0) {
        setShowMenu(false);
        dispatch(setModalStatus({ status: "success" }));
      } else {
        if (
          !courses.filter(
            (course) =>
              course.language.toLowerCase() ===
              formInputs.value.language.toLowerCase()
          ).length
        ) {
          setShowMenu(false);
          dispatch(setModalStatus({ status: "success" }));
        } else {
          dispatch(setModalStatus({ status: "error" }));
          formInputs.errorOnCertainInput("language");
        }
      }
    } else {
      dispatch(setModalStatus({ status: "error" }));
    }
  };

  const onSuccessfulConfirm = () => {
    const courseInformation = {
      ...formInputs.value,
      imageStyle: {
        ...dropDownInfo.value,
      },
      backgroundColor: {
        ...background,
      },
    };
    if (modalCourse?.status === "success") {
      dispatch(addCourse(courseInformation));
      navigate("/");
      setBackground((prev) => {
        return {
          ...prev,
          r: 0,
          g: 0,
          b: 0,
        };
      });
      formInputs.resetToDefault();
      dropDownInfo.resetToDefault();

      dispatch(setModalStatus(null));
    }
    if (modalCourse?.status === "error") {
      dispatch(setModalStatus(null));
      formInputs.onError();
      dropDownInfo.onError();
    }
  };

  return (
    <>
      <div className="create-course">
        <h1 className="create-course__title">Create your own course / tasks</h1>

        <div className="create-course__wrapper">
          <form className="create-course__form">
            <h3 className="create-course__section">Course main information</h3>
            <FormInput
              value={formInputs.value.language}
              name="language"
              title="Name of the language"
              status={formInputs.validate.language}
              placeholder="Type here"
              handleChangeInput={formInputs.handleChangeInput}
              minLength={2}
              maxLength={16}
            />
            <FormInput
              value={formInputs.value.goal}
              name="goal"
              title="Goal"
              status={formInputs.validate.goal}
              placeholder="Write your goal here"
              handleChangeInput={formInputs.handleChangeInput}
              minLength={8}
              maxLength={32}
            />

            <h3 className="create-course__section">
              Styling the previous look
            </h3>

            <DropDown
              onToggleMenu={onToggleMenu}
              isActive={showMenu}
              title="Choose an image"
              placeholder={
                dropDownInfo.value.name
                  ? dropDownInfo.value.name
                  : "Click to choose an image"
              }
              selectedOption={dropDownInfo.value}
              onChooseMenuImage={dropDownInfo.onChooseMenuImage}
              items={dropDownItems}
              isValidate={{
                name: dropDownInfo.validate.name,
                img: dropDownInfo.validate.img,
              }}
            />

            <h3 className="create-course__section">Previous look</h3>

            <div className="create-course__color">
              <CourseCard
                title={
                  formInputs.value.language
                    ? formInputs.value.language
                    : "Language"
                }
                progress={100}
                image={dropDownInfo.value.img ? dropDownInfo.value.img : Upload}
                color={background}
                tasks={0}
              />
              <div className="create-course__color-wrapper">
                <input
                  value={converToHEX(background)}
                  type="color"
                  onChange={handleColorInput}
                />
              </div>
            </div>
            <button
              type="submit"
              className="create-course__submit"
              onClick={handleAddCourse}
            >
              Create
            </button>
          </form>
        </div>
      </div>
      {modalCourse?.status ? (
        <ModalWindow
          status={modalCourse.status}
          onConfirm={onSuccessfulConfirm}
        />
      ) : null}
      {modalCourse ? <Overlay /> : null}
    </>
  );
};

export default CreateCourse;
