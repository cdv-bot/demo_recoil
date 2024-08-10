"use client"
import { useEffect } from 'react';

const IndexedDBComponent = () => {
    useEffect(() => {
        // Mở cơ sở dữ liệu IndexedDB
        const request = indexedDB.open('myDatabase', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('myObjectStore', { keyPath: 'id' });
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            console.log('Database opened successfully');

            // Thêm dữ liệu vào cơ sở dữ liệu
            const transaction = db.transaction('myObjectStore', 'readwrite');
            const objectStore = transaction.objectStore('myObjectStore');
            objectStore.add({ id: 1, name: 'Example Item' });

            transaction.oncomplete = () => {
                console.log('Data added to the store.');
            };

            // Lấy dữ liệu từ cơ sở dữ liệu
            const getRequest = objectStore.get(1);
            getRequest.onsuccess = () => {
                console.log('Data retrieved from the store:', getRequest.result);
            };
        };

        request.onerror = (event) => {
            console.error('Database error:', event.target.errorCode);
        };
    }, []);

    return (
        <div>
            <h1>IndexedDB Component</h1>
        </div>
    );
};

export default IndexedDBComponent;
