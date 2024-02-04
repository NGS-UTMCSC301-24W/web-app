const SelectField = ({ label, options, value, onChange, ...args }) => {

  return (
    <>
      <label>
        {label}
        <select value={value} onChange={onChange} {...args}>
          {
            options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))
          }
        </select>
      </label>
      <br />
    </>
  );
}

export default SelectField;