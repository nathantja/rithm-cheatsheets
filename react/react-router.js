
// after create-react-app
// npm install react-router-dom

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home";
import Eat from "./Eat";
import Drink from "./Drink";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/drink" element={<Drink/>} />
          <Route path="/eat" element={<Eat/>} />
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



// LINKS
import { Link } from "react-router-dom";
<>
<Link to="/">Home</Link>

{/* // URL PARAMETERS */}
<Route path="/food/:name" element={<Food/>} />
import { useParams } from "react-router-dom"
</>
const params = useParams();
// returns object of { urlparam: value}



//REDIRECTS
import { useNavigate } from "react-router-dom";
useNavigate()
// you’re now done here, go here instead, if you go back - no worries!
// submitting form
// SAVED in history

function Contact() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setEmail(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    navigate("/");
  }

  //FORM has onSubmit...
}



Navigate()
// you shouldn’t have gotten here, go here instead, do not go back
// NOT saved in history
import { Navigate } from "react-router-dom";
return <Navigate to="/" />;




//404
//catch all at the bottom of all routes
<Route path="*" element={<NotFound />} />







// TESTING

// wrap routes in MemoryRouter
import { MemoryRouter } from 'react-router-dom';

it('mounts without crashing', function () {
  const { getByText } = render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );

  const blogLink = getByText(/Blog/i);
  expect(blogLink).toBeInTheDocument();
});


// initialEntries

it('renders the about page', function () {
  const { debug, getByText } = render(
    <MemoryRouter initialEntries={["/about"]}>
      <RoutesList />
    </MemoryRouter>
  );

  const h1Text = getByText(/This is the about page./i);
  expect(h1Text).toBeInTheDocument();
});

it('renders the blog page', function () {
  const { debug, container } = render(
    <MemoryRouter initialEntries={["/blog"]}>
      <RoutesList />
    </MemoryRouter>
  );

  const links = container.querySelectorAll("li a")
  expect(links).toHaveLength(3)
});

// mock useParams outside of describe block
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ name: "burrito"}),
}))