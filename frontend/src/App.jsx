import Home from "./Pages/Home/Home"
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from "./Pages/Login/Login"
import SignUp from "./Pages/SIgnUp/SignUp"

const routes = (
  <Router>
    <Routes>
      <Route path="/dashboard" exact element = {<Home/>}/>
      <Route path="/login" exact element = {<Login/>}/>
      <Route path="/signup" exact element = {<SignUp/>}/>
    </Routes>
  </Router>
)

function App() {
  return (
    <div>
      {routes}
    </div>
  )
}

export default App
