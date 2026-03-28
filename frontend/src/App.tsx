import { useState } from 'react';
import './App.css'
import BookList from './BookList'
import CategoryFilter from './CategortFilter'

function Welcome() {
  return(
    <>
      <h2>Welcome to the Bookstore</h2>
      <br/>
      <br/>
    </>
  )
}

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <Welcome/>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className="col-md-9">
            <BookList selectedCategories = {selectedCategories}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
