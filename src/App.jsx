
import WorkSpaceFinder from './Component/workSpaceFinder'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import ContactForm from './Component/contact'
import HomePage from './Component/homepage'
import RateUsForm from './Component/rateus'
import Seemore from './Component/seemore'

function App() {


  return (
    <>

    {/* <div className='app'>
      <ContactForm/>
    </div> */}
    {/* <WorkspaceForm/> */}
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<HomePage />} />

      <Route path='/home' element={<WorkSpaceFinder/>}/>
      <Route path='/contactus' element={<ContactForm/>}/>
      <Route path='/rateus' element={<RateUsForm/>}/>
      <Route path='/seemore/:id' element={<Seemore/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
