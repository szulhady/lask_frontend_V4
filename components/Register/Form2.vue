<template>
  <section class="section">
    <div class="container2">
      <!-- <div class="columns">
        <div class="column is-4 is-offset-4"> -->
      <h2 class="title has-text-centered" style="color: #eee">Register</h2>

      <Notification :message="error" v-if="error" id="notification" />

      <v-form method="post" @submit.prevent="register">
        <div class="field">
          <!-- <label class="label">Email</label> -->
          <div class="control">
            <v-text-field
              type="text"
              class="input"
              label="Full Name"
              v-model="fullname"
              dark
            >
            </v-text-field>
          </div>
        </div>

        <div class="field">
          <!-- <label class="label">Email</label> -->

          <div class="control">
            <v-text-field
              type="text"
              class="input"
              :label="radios + ' ID'"
              v-model="user_id"
              dark
            >
            </v-text-field>
          </div>
        </div>
        <div class="field">
          <!-- <label class="label">Email</label> -->

          <div class="control">
            <v-text-field
              type="email"
              class="input"
              label="Email"
              v-model="email"
              dark
            >
            </v-text-field>
          </div>
        </div>
        <div class="field">
          <!-- <label class="label">Email</label> -->

          <div v-if="radios == `Student`" class="control">
            <v-text-field
              type="text"
              class="input"
              label="Class"
              v-model="class2"
              dark
            >
            </v-text-field>
          </div>
        </div>

        <div class="field">
          <!-- <label class="label">Password</label> -->

          <div class="control">
            <v-text-field
              type="password"
              class="input"
              label="Password"
              v-model="password"
              dark
            ></v-text-field>
          </div>
        </div>
        <div class="field">
          <!-- <label class="label">Password</label> -->
          <div class="control">
            <v-text-field
              type="password"
              class="input"
              label="Confirm Password"
              v-model="password2"
              dark
            ></v-text-field>
          </div>
        </div>
        <v-radio-group :change="setStudent()" mandatory row v-model="radios">
          <v-radio dark label="Student" value="Student"></v-radio>
          <v-radio dark label="Lecturer" value="Lecturer"></v-radio>
        </v-radio-group>
        <!-- <div class="field">
              <div class="control">
                <v-text-field
                  type="text"
                  class="input"
                  label="Role"
                  v-model="role"
                >
                </v-text-field>
              </div>
            </div> -->

        <div class="control">
          <v-btn block type="submit" outlined class="submit-btn"
            >Register</v-btn
          >
        </div>
        <p class="title has-text-centered register">
          <span style="color: #eee">Already got an account?</span>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </p>
      </v-form>

      <!-- <div class="has-text-centered" style="margin-top: 20px">
            <p>
              Don't have an account? <nuxt-link to="/register">Register</nuxt-link>
            </p>
          </div> -->
      <!-- </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import Notification from "~/components/Notification";
export default {
  layout: "login",
  components: {
    Notification,
  },

  data() {
    return {
      radios: 0,
      fullname: "",
      user_id: "",
      email: "",
      class2: null,
      password: "",
      password2: "",
      role: "",
      // error: null,
      error: null,
      roleSelection: ["Student", "Lecturer"],
    };
  },

  methods: {
    setStudent: function () {
      console.log(this.radios);
    },
    setLecturer: function () {
      console.log("index");
    },
    async register() {
      try {
        await this.$axios
          .post("http://143.198.82.254:8000/api/user/register", {
            // .post("http://104.248.158.194/api/user/register", {
            fullname: this.fullname,
            user_id: this.user_id,
            email: this.email,
            class2: this.class2,
            password: this.password,
            password2: this.password2,
            role: this.radios,
          })
          .then((response) => {
            this.error = response.data;
            if (response.data[0].msg == "Success. You can log in now") {
              this.fullname = "";
              (this.user_id = ""), (this.email = "");
              this.class2 = "";
              this.password = "";
              this.password2 = "";
              // this.role=""
              // console.log("here")
            }
            // console.log(this.error)
            // })
          });
        // .then(response =>{
        //   // console.log('here')
        //     // console.log(response)
        //     this.$auth.loginWith('local', {
        //   data: {
        //     email: this.email,
        //     password: this.password,
        //   },

        //   // this.$router.push('/');
        // });
        // // console.log('here2')
        // // this.$router.push('/');
        // })

        // return this.$axios.get('/api/register', (req,res)=>{
        //   console.log(req)
        // })

        //     await this.$auth.loginWith('local', {
        //   data: {
        //     email: this.email,
        //     password: this.password,
        //   },
        // });

        // this.$router.push('/');
      } catch (e) {
        // console.log('here')
        console.log(e);
        this.error = e.response.data.message;
      }
    },
    track: function () {
      window.onclick = (event) => {
        const modal = document.getElementById("notification");
        if (event.target != modal) {
          this.error = null;
        }
      };
    },
  },
  mounted() {
    this.track();
  },
};
</script>

<style scoped>
.container2 {
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 350px;
  align-items: center;
}

.control {
  outline: 1px;
  width: 300px;
}

.register {
  margin-top: 10px;
  font-size: 15px !important;
}

a {
  color: cadetblue;
  text-decoration: none;
}

.input {
  font-size: 18px;
}
.submit-btn {
  font-family: "Montserrat", sans-serif;
  color: #eee;
}
</style>
