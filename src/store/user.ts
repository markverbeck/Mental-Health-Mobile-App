import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
    state: () => ({
        authenticated: false,
        friends: [],
        locationPrivate: false,
        user: [],
        firebaseConfig: {
            apiKey: "AIzaSyC1nXiDWxvz3pET-FsplAf3Ba1uh4POWhM",
            authDomain: "mental-health-app-e0414.firebaseapp.com",
            projectId: "mental-health-app-e0414",
            storageBucket: "mental-health-app-e0414.appspot.com",
            messagingSenderId: "72831794115",
            appId: "1:72831794115:web:edbdb803f9078e81021b76"
        },
        auth: null,
        db: null
    }),
    // getters:{
    //     getLocation(){
    //         if(this.locationPrivate){
    //             return `Your current location is Private`
    //         } else {
    //             return `Your current location is ${this.user?.location}`
    //         }
    //     }
    // },
    // actions:{
    //     authenticate(){
    //         this.authenticated = true
    //     },
    //     un_authenticate(){
    //         this.authenticated = false
    //     },
    //     updateStatus(status){
    //         this.user.status = status
    //     },
    //     searchFriendByID(id){
    //         const friend = this.testSearch.find(friend => friend.id === id)
    //         this.searchResults = friend
    //     },
    //     addFriend(searchResults){
    //         this.user.contacts.push(searchResults)
    //     },
    //     updateLocation(location){
    //         this.user.location = location
    //     },
    //     updateLocationPrivacy(){
    //         this.locationPrivate = !this.locationPrivate
    //     },
    //     setUser(user){
    //         this.user = user
    //     },
    //     addCheckIn(user){
    //         this.user.checkIn
    //     },
    //     addContactRequest(user){
    //         this.user.contactRequests.push(user)
    //     },
    //     removeContactRequest(req){
    //         this.user.contactRequests.forEach((cont, index) => {
    //             if(req.uid === cont.uid){
    //                 this.user.contactRequests.splice(index, 1);
    //             }
    //         })
    //     },
    //     removeContact(cont){
    //         this.user.contacts.forEach((contact, index) => {
    //             if(cont.uid === contact.uid){
    //                 this.user.contacts.splice(index, 1)
    //             }
    //         })
    //     }
    // }
})