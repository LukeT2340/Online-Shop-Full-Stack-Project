import { useParams } from 'react-router-dom';
import { useSearch } from '../hooks/useSearch.js';
import ProductCard from '../sharedComponents/ProductCard.js';

const Search = () => {
    const { text } = useParams();  // Get product ID from URL params
    const { results, isLoading, error } = useSearch(text);

    return (
        <div className='container mt-3'>
            {results && results.length > 0 ? 
                <h3>Search results for '{text}'</h3>
            :
                <h3>No search results for '{text}'</h3>
            }
            <div className='row'>
                {results && results.map((product) => (
                    <ProductCard product={product}/>
                ))}
            </div>
        </div>
    )
}

export default Search;