import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBStorageService {

    DBname = "PoleEFilesDB"
    db : IDBDatabase | null = null

    constructor(){ }

    /**
     * Opens the IndexedDB database (creates it if it doesn't exist).
     * Ensures the "files" object store exists.
     * @returns Promise that resolves with the opened IDBDatabase instance.
     */
    openDatabase(): Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            // Open (or create) the database with version
            const request = indexedDB.open(this.DBname, 1)

            // This event is triggered if the database is new or a higher version is needed
            request.onupgradeneeded = (event) => {
                // Get the database instance from the request
                this.db = (event.target as IDBOpenDBRequest).result
                // Create the "files" object store if it doesn't already exist
                if (!this.db.objectStoreNames.contains("files")) {
                    this.db.createObjectStore("files", { keyPath: "id" })
                }
            }

            // resolve the promise with the database instance
            request.onsuccess = () => resolve(request.result)

            request.onerror = () => reject(request.error)
        })
    }
    
    /**
     * Stores a file (Blob) in the "files" object store with a given ID.
     * @param id - The unique identifier for the file.
     * @param fileBlob - The file data as a Blob.
     * @returns Promise that resolves when the file is stored.
     */
    async storeFile(key: string, data: ArrayBuffer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const request = indexedDB.open('onnx-model-db', 1)
            request.onupgradeneeded = () => {
              request.result.createObjectStore('models')
            }
            request.onsuccess = () => {
              const db = request.result
              const tx = db.transaction('models', 'readwrite')
              tx.objectStore('models').put(data, key)
              tx.oncomplete = () => resolve()
              tx.onerror = () => reject(tx.error)
            }
            request.onerror = () => reject(request.error)
        })
    }

    async getFile(key : string) : Promise<IDBRequest<Blob>>{
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('onnx-model-db', 1)
            request.onsuccess = () => {
              const db = request.result
              const tx = db.transaction('models', 'readonly')
              const getReq = tx.objectStore('models').get(key)
              getReq.onsuccess = () => resolve(getReq.result)
              getReq.onerror = () => reject(getReq.error)
            }
            request.onerror = () => reject(request.error)
        })
    }

}
