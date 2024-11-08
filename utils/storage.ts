import AsyncStorage from "@react-native-async-storage/async-storage";

abstract class BaseStore {
  key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): Promise<string | null> {
    return AsyncStorage.getItem(this.key);
  }
  set(value: string): void {
    AsyncStorage.setItem(this.key, value);
  }
  remove() {
    AsyncStorage.removeItem(this.key);
  }
}

export class UserStore extends BaseStore {
  constructor() {
    super("authUser");
  }
}
