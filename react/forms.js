
// state
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
});

//onChange
function handleChange(evt) {
  const { name, value } = evt.target;
  setFormData(fData => ({
    ...fData,
    [name]: value,
  }));
}

// accessibility label
<form>
  <label htmlFor="fullname-input">Full Name:</label>
  <input id="fullname-input" name="fullname" />
  <button>Add!</button>
</form>