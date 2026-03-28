import { useEffect, useState } from "react"
import "./App.css"

function CategoryFilter ({
    selectedCategories, setSelectedCategories
}: {
    selectedCategories: (string[])
    setSelectedCategories: (categories: string[]) => void;

})
{

    const [categories, setCategories] = useState<string[]>([]);

    function handleCheckboxChange ({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value]
        setSelectedCategories(updatedCategories)
    }

    useEffect(() => {
            const fetchCategories = async () => {
                try{
                const response = await fetch(`https://localhost:5000/Bookstore/GetBookCategories`);
                const data = await response.json();
                console.log('Fetched categories', data)
                setCategories(data);
                }
                catch(error) {
                    console.error('Error fetching categories', error)
                }
            }
    
            fetchCategories();
        }, []);

    return (
        <>
            <div className="category-filter">
                <h5>Project Types</h5>
                <div className="category-list">
                    {categories.map((c) => (
                    <div key={c} className="category-item">
                        <input type="checkbox" id={c} value={c} className="category-checkbox" onChange={handleCheckboxChange}/>
                        <label htmlFor={c}>{c}</label>
                    </div>
                    ))}
                </div>
            </div>
        </>
)
}

export default CategoryFilter;