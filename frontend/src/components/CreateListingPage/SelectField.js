const SelectField = ({ label, options, name, value, onChange, ...args }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select className="form-select" name={name} value={value} onChange={onChange} {...args}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;