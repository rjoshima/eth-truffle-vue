<template>
  <div class="container">
    <div class="row justify-content-md-center">

      <div class="col-12">
        <h3>{{ welcomeText }}</h3>
      </div>


      <b-card class="col-6">
        <h2 class="float-left">Welcome text controls</h2>

        <b-form @submit="submitWelcomeText" @reset="onResetWelcomeText" v-if="show">
          <b-form-group id="groupWelcomeText"
                        label="New welcome text"
                        label-for="inputWelcomeText"
                        description="Set some new welcome text on this page">
            <b-form-input id="inputWelcomeText"
                          type="text"
                          v-model="form.welcomeText"
                          required
                          placeholder="Enter new welcome text">
            </b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>

      </b-card>


      <b-card class="col-6">
        <!-- Here we will use Vue-bootstrap HTML syntax-->
        <b-row>
          <h2 class="float-left">Animal controls</h2>
        </b-row>

        <b-row>
          <b-list-group>
            <b-list-group-item href="#" class="" v-for="animal in animals" :key="parseInt(animal.id)">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">{{ animal.name}}</h5>
                <small>{{ animal.age}} years old</small>
              </div>
              <small>Owner: {{ animal.owner}}</small>
            </b-list-group-item>
          </b-list-group>
        </b-row>
        <hr>

        <b-form @submit="submitNewAnimal" @reset="onResetNewAnimal" v-if="show">


          <b-form-input id="inputNewAnimalName"
                        type="text"
                        v-model="form2.name"
                        required
                        class="col-8"
                        placeholder="Enter name"
                        >
          </b-form-input>

          <b-form-input id="inputNewAnimalAge"
                        type="number"
                        v-model="form2.age"
                        required
                        class="col-4"
                        placeholder="Enter age">
          </b-form-input>

          <b-button type="submit" variant="primary">Create animal</b-button>

        </b-form>

      </b-card>
    </div>
  </div>

</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: 'signup',
    data() {
      return {
        form: {
          welcomeText: ''
        },
        form2: {
          name: '',
          age: 1
        },
        show: true
      }
    },
    watch: {},
    computed: {
      ...mapGetters('eth', {
        welcomeText: 'welcomeText',
        animals: 'animals'
      })
    },
    methods: {
      ...mapActions('eth', {
        changeWelcomeText: 'changeWelcomeText',
        createNewAnimal: 'createNewAnimal'
      }),
      submitWelcomeText(event) {
        event.preventDefault()
        this.changeWelcomeText({text: this.form.welcomeText})
      },
      submitNewAnimal(event) {
        event.preventDefault()
        this.createNewAnimal({name: this.form2.name, age: this.form2.age})
      },
      onResetWelcomeText(event) {
        event.preventDefault()
        /* Reset our form values */
        this.form.welcomeText = ''
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      onResetNewAnimal(event) {
        event.preventDefault()
        /* Reset our form values */
        this.form.name = ''
        this.form.age = 1
        /* Trick to reset/clear native browser form validation state */
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
