import React from "react";
import Search from "../../../public/search.svg";
import "./SearchInput.scss";
import { useSearchParams } from "react-router-dom";

const SearchInput: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputValue(event.target.value);
  };

  React.useEffect(() => {
    if(inputValue.length){
      setSearchParams(`search-course=${inputValue}`)
    }else{
      setSearchParams('')
    }
  }, [inputValue]);

  return (
    <div className="search">
      <label htmlFor="search">
        <img src={Search} alt="Search" />
      </label>
      <input
        id="search"
        value={inputValue}
        onChange={handleChangeSearchInput}
        type="text"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchInput;
