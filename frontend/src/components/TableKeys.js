import React, { useEffect, useState } from 'react';
// import {Link} from 'react-router-dom';

function TableKeys() {
    useEffect(() => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/tableKeys');
        const items = await data.json();

        setItems(items);
    };

    return (
        <section>
            {
                items.map(item => (
                    <div class="container-fluid p-3 w-50">
                        <div class="card-deck">
                            <div class="card">
                                <div class="card-body p-1">
                                    <h6 class="card-title">{item.RECNAME} </h6>
                                    <h6 class="card-title">{item.FIELDNAME} </h6>
                                    <h6 class="card-title">{item.FIELDNUM} </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </section>
    );
}

export default TableKeys;