function FilterCheckbox(props) {
  return (
    <div className="filter-checkbox">
      <input
        className="filter-checkbox__input"
        type="checkbox"
        onChange={props.handleShortMovies}
        checked={props.isShortMovies}
      ></input>
    </div>
  );
}

export default FilterCheckbox;
