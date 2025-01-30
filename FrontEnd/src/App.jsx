
import WorkSpaceFinder from './Component/workSpaceFinder'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ContactForm from './Component/contact'
import HomePage from './Component/homepage'
import RateUsForm from './Component/rateus'
import Seemore from './Component/seemore'
import WorkspaceForm from './Component/addWorkSpace'
import { store } from './Redux/store'
import { Provider } from 'react-redux'
function App() {


  return (
    <>
   <Provider store={store}>
   <BrowserRouter>
    <Routes>

      <Route path='/' element={<WorkSpaceFinder/>}/>
      <Route path='/contactus' element={<ContactForm/>}/>
      <Route path='/rateus' element={<RateUsForm/>}/>
      <Route path='/seemore/:id' element={<Seemore/>}/>
      <Route path='/addWorkSpace' element={<WorkspaceForm/>}/>
    </Routes>
    </BrowserRouter>
   </Provider>
    </>
  )
}

export default App
