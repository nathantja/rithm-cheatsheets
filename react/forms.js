
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






// SHOPPING EXAMPLE
//shopping list - parent
function ShoppingList() {

  /** Add new item object to cart. */
  function addItem(item) {
    let newItem = { ...item, id: uuid() };
    setItems(items => [...items, newItem]);
  }

  //...
}

//form - child
function NewListItemForm({ addItem }) {

  /** Send {name, quantity} to parent
   * & clear form. */
  function handleSubmit(evt) {
    evt.preventDefault();
    addItem(formData);
    setFormData(initialState);
  }

  //...
}