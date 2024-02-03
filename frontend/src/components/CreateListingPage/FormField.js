const FormField = ({ label, type, name, value, onChange, ...args }) => {

  let inputField;
  if (type === "textarea") {
    inputField = <textarea name={name} value={value} onChange={onChange} {...args} />;
  } else {
    inputField = <input type={type} name={name} value={value} onChange={onChange} {...args} />;
  }

  return (
    <>
      <label>
        {label}
        {inputField}
      </label>
      <br />
    </>
  );
}

export default FormField;