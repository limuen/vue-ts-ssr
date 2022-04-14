export default class DB {
  /**
   * 数据库名称
   */
  private dbName: string;
  /**
   * 数据库对象
   */
  private db: any;
  constructor(dbName: string) {
    this.dbName = dbName;
  }
  /**
   * 打开数据库
   */
  public openStore(storeName: string, keyPath: string, indexs?: Array<string>) {
    const request = window.indexedDB.open(this.dbName, 1);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log(event, '数据库打开成功');
        this.db = event.target.result;
        resolve(true);
      };
      request.onerror = (event) => {
        console.log(event, '数据库打开失败');
        reject(event);
      };
      request.onupgradeneeded = (event) => {
        /**
         * 1.创建仓库
         */
        console.log(event, '数据库升级成功');
        const { result }: any = event.target;
        const store = result.createObjectStore(storeName, {
          autoIncrement: true,
          keyPath,
        });
        if (indexs && indexs.length) {
          indexs?.map((item: string) => {
            store.createIndex(item, item, { uniqe: true });
          });
        }
        store.transaction.oncomplete = (evevt: any) => {
          console.log('创建对象仓库成功');
        };
      };
    });
  }

  /**
   * 新增/修改数据库数据
   */
  updateItem(storeName: string, data: any) {
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName);
    const request = store.put({ ...data, updateTime: new Date().getTime() });
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log(event, '数据写入成功');
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        console.log(event, '数据写入失败');
        reject(event);
      };
    });
  }

  /**
   * 删除数据
   */
  deleteItem(storeName: string, keyPath: number | string) {
    const store = this.db
      .transaction([storeName], 'readwrite')
      .objectStore(storeName);
    const request = store.delete(keyPath);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log(event, '数据删除成功');
        resolve(event);
      };
      request.onerror = (event: any) => {
        console.log(event, '数据删除失败');
        reject(event);
      };
    });
  }

  /**
   * 查询所有数据
   */
  getList(storeName: string) {
    const store = this.db.transaction([storeName]).objectStore(storeName);
    const request = store.getAll();
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log(event.target.result, '查询所有数据成功');
        resolve(event.target.result);
      };
      request.onerror = (event: any) => {
        console.log(event.target.result, '查询所有数据失败');
        reject(event);
      };
    });
  }

  /**
   * 查询某一条数据
   */
  getItem(storeName: string, keyPath: number | string) {
    const store = this.db.transaction([storeName]).objectStore(storeName);
    const request = store.get(keyPath);
    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        console.log(event.target.result, '查询某一条成功');
        resolve(event);
      };
      request.onerror = (event: any) => {
        console.log(event.target.result, '查询某一条失败');
        reject(event);
      };
    });
  }
}
