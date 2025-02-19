import { FormEvent, useRef } from "react";

interface Props {
  onSearch: (search: string) => void;
}

const SearchBox = ({ onSearch }: Props) => {
  const searchBoxRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (searchBoxRef.current?.value) {
      onSearch(searchBoxRef.current.value);
    }
  };

  return (
    <form className="" onSubmit={(event: any) => handleSubmit(event)}>
      <input
        type="text"
        ref={searchBoxRef}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        name=""
        className="rounded-xl text-lg   text-black w-[200px] lg:w-[400px] h-10 px-4 outline-none bg-gray-200 placeholder:text-slate-800 "
        id=""
        placeholder="Search by Name"
      />
    </form>
  );
};

export default SearchBox;
