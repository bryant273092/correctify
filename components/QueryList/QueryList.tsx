import { FC, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import s from './QueryList.module.css'
interface QueryListProps {
    queries: Array<string>
    updateQueries: Function
}

const QueryList: FC<QueryListProps> = ({ queries, updateQueries }) => {
    
    return (
        <>
            <div className={ s.container}>
                {queries.map((query) => (
                    <div
                        className="m-auto whitespace-nowrap flex flex-row w-full col-auto px-2 py-1 bg-secondary border border-accents-6 text-white rounded-lg">
                        <p>{query}</p>
                        <div
                            onClick={() => updateQueries(queries.filter(word => word != query))}
                            className="pl-2">
                            <FontAwesomeIcon
                                color={'var(--primary'}
                                icon={faTimesCircle} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default QueryList;