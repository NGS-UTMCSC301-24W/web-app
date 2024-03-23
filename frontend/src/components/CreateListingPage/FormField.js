const FormField = ({ label, type, name, value, onChange, placeholder, ...args }) => {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {
        type === "textarea" ? (
          <textarea className="form-control" name={name} value={value} onChange={onChange} placeholder={placeholder} {...args} />
        ) : (
          <input className="form-control" type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} {...args} />
        )
      }
    </div>
  );
};

export default FormField;
