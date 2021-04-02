import { AuthenticationStore } from "./stores/authenticationStore";
import { RestockReportStore } from "./stores/restockReportStore";
import { ItemStore } from "./stores/itemStore";

export class RootStore {
    authenticationStore: AuthenticationStore;
    restockReportStore: RestockReportStore;
    itemStore: ItemStore;
    constructor() {
        this.authenticationStore = new AuthenticationStore(this);
        this.restockReportStore = new RestockReportStore(this);
        this.itemStore = new ItemStore(this)
    }
}