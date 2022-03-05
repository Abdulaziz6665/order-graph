import { Route, Routes } from 'react-router-dom'
import { Home, Send, View } from './components'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/send' element={<Send />} />
      <Route path='/view' element={<View />} />
    </Routes>
  );
}

export default App;
