import { FC } from 'react'
import { Button } from '@components/ui'


interface SearchBarProps{
    setQuery: Function
    query: string
    setQueries: Function
    queries: string[]
}
const SearchBar: FC<SearchBarProps> = ({setQueries, setQuery, queries, query}) => {
    return (
        <>
            <div className='flex flex-col w-full'>
                <label className="text-accents-6 px-4 text-lg font-bold pb-2">Enter a word</label>
                <div className="flex w-full px-3 pb-2 flex-row justify-between items-center">

                    <input
                        id="query-term"
                        onChange={(event) => setQuery(event.target.value)}
                        className="w-full px-2 py-1 text-white bg-secondary border-2  rounded-lg border-accents-6  focus:border-white"
                        type={'text'}
                        autoComplete={'off'}
                        value={query}>
                    </input>
                    <Button
                        style={{ padding: '5px 20px' }}
                        //create new array with new query term and join with existing list. then set new list with state hook
                        onClick={() => {
                            setQueries([query].concat(queries))
                            setQuery('')
                        }}
                        className="ml-2 w-1/4"
                        type="submit">Add
                                </Button>
                </div>
            </div>
        </>
    )
}

export default SearchBar;