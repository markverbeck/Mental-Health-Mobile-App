<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Sign In</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <div id="container">
                <form @submit.prevent="submit">
                    <ion-label for="email">Email</ion-label>
                    <ion-input type="email" name="email"  placeholder="Please enter email"/>
                    <ion-label for="password">Password</ion-label>
                    <ion-input type="password" name="password"  placeholder="Enter password"/>
                    <ion-button type="submit">Sign in</ion-button>
                </form>
                <p @click="() => {router.push('/sign-up')}">Need an account?</p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" >
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInput, IonLabel, IonButton } from '@ionic/vue';
import { setupConfig } from '@ionic/core';

export default defineComponent({
  name: 'FolderPage',
  components: {
    // IonButtons,
    IonContent,
    IonHeader,
    IonButton,
    // IonMenuButton,
    IonPage,
    IonInput,
    IonLabel
    // IonGrid, 
    // IonRow, 
    // IonCol
    // IonTitle,
    // IonToolbar
  },
  setup(){
      const submit = () => {
          console.log('Submitted')
      }
      const router = useRouter();
      
      return{
          submit,
          router
      }
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 1em;
}
#container form{
    background: #f3f3f3;
    padding: 2em;
    border-radius: 5px;
}

#container ion-label {
    color: black;
    margin-bottom: 5px;
}

#container ion-input {
    background: white;
    border-radius: 5px;
    border: 1px solid black;
    margin-bottom: 1em;
}

#container ion-button {
    width: 100%;
}
</style>