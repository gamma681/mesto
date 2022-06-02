export default class UserInfo {
    constructor({ id, nameSelector, aboutSelector, avatarSelector }) {
        this._id = id;
        this._nameSelector = nameSelector;
        this._aboutSelector = aboutSelector;
        this._avatarSelector = avatarSelector;
    }

    getUserInfo() {
        const userInfo = {
            _id: this._id,
            nameSelector: this._nameSelector.textContent,
            aboutSelector: this._aboutSelector.textContent,
            avatarSelector: this._avatarSelector
        };
        return userInfo;
    }

    setUserInfo(id, nameSelector, aboutSelector, avatarSelector) {
        this._id = id;
        this._nameSelector.textContent = nameSelector;
        this._aboutSelector.textContent = aboutSelector;
        this._avatarSelector.src = avatarSelector;
    }
    
}