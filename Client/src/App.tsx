import { HelmetProvider } from "react-helmet-async";
import { Page } from "./pages/page"
function App() {
 

  return (
    <HelmetProvider>
      <Page/>
    </HelmetProvider>
  )
}

export default App
