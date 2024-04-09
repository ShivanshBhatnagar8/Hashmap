class HashMap {
  #storeKeys = [];
  constructor() {
    this.buckets = new Array(16).fill(null);
    this.size = this.buckets.length;
    this.loadFactor = 0.75;
    this.capacity = 0;
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.size;
  }

  #storingKeys(index, value) {
    let found;
    this.#storeKeys.forEach((el, i) => {
      if (el.index === index) {
        this.#storeKeys[i].value = value; // Update the existing entry
        found = true;
      }
    });

    if (!found) {
      this.#storeKeys.push({ index: index, value: value });
    }
  }

  set(key, value) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.capacity / this.size > this.loadFactor) {
      let arr = [];
      for (let i = 0; i < this.buckets.length * 2; i++) {
        arr.push(this.buckets[i]);
      }
      this.buckets = arr;
      return this.buckets;
    }

    this.buckets[index] = value;

    this.#storingKeys(index, key);

    this.capacity++;
  }

  get(key) {
    let index = this.hash(key);
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
    if (this.buckets[index] && this.keys().includes(key)) {
      return this.buckets[index];
    }
    return null;
  }

  has(key) {
    if (this.get(key) !== null) {
      return true;
    }
    return false;
  }
  remove(key) {
    this.#storeKeys = this.#storeKeys.filter((el) => el.value !== key);
    let index = this.hash(key);
    if (this.buckets[index] !== null) {
      this.buckets[index] = null;
      return true;
    }
    return false;
  }
  length() {
    return this.#storeKeys.length;
  }
  clear() {
    this.buckets = this.buckets.fill(null);
    return this.buckets;
  }
  keys() {
    let keysArr = [];
    this.#storeKeys.forEach((el) => {
      keysArr.push(el.value);
    });
    return keysArr;
  }
  values() {
    let storeValues = [];

    this.buckets.forEach((el) => {
      if (el) {
        storeValues.push(el);
      }
    });
    return storeValues;
  }
  entries() {
    let arr = [];
    let reduceArray = this.buckets.reduce((accumulator, currentValue, i) => {
      if (currentValue !== null) {
        accumulator.push([i, currentValue]);
        return accumulator;
      } else {
        return accumulator;
      }
    }, []);

    arr.push(reduceArray);
    return arr;
  }
}

const hashMap = new HashMap();
hashMap.set("Cash", "Crash");
hashMap.set("Victor", "Victory");
hashMap.set("Alex", "Alexandra");
hashMap.get("Cash");
hashMap.get("Victor");
hashMap.get("Alex");
hashMap.get("Test");
hashMap.has("Cash");
hashMap.has("Crash");
hashMap.has("Victor");
hashMap.has("Alex");
hashMap.has("Test");
hashMap.length();
hashMap.keys();
hashMap.values();
hashMap.remove("Alex");
hashMap.entries();
hashMap.clear();
