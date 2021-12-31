import React, { useEffect, useState } from 'react';
import './TableKeys.css'
function TableKeys() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/tableKeys/STDNT_CAR_');
        const items = await data.json();

        setItems(items);
    };

    return (

        <section>
            <div className='container'>
                <table className='container'>
                    <thead>
                        <th align="left">RECNAME</th>
                        <th align="left">FIELDNAME</th>
                        <th align="left">FIELDNUM</th>
                    </thead>
                    <tbody>
                        {
                            items.map(item => (
                                <tr>
                                    <th align="left">{item.RECNAME} </th>
                                    <th align="left">{item.FIELDNAME} </th>
                                    <th align="left">{item.FIELDNUM} </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default TableKeys;