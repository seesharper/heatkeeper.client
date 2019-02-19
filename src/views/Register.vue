<template>
<div id="parent">
<form id="registerForm">
        <div class="form-group input-group">
		<div class="input-group-prepend">
		    <span class="input-group-text"> <font-awesome-icon icon="user"/></span>
		 </div>
        <input name="" class="form-control" placeholder="Full name" type="text">
    </div> <!-- form-group// -->
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		    <span class="input-group-text"> <font-awesome-icon icon="envelope"></font-awesome-icon> </span>
		 </div>
        <input name="" class="form-control" placeholder="Email address" type="email">
    </div> <!-- form-group// -->
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		    <span class="input-group-text"> <font-awesome-icon icon="phone"/> </span>
		</div>

    	<input name="" class="form-control" placeholder="Phone number" type="text">
    </div> <!-- form-group// -->
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		    <span class="input-group-text"> <font-awesome-icon icon="users"/> </span>
		</div>
		<select class="form-control">
			<option selected=""> Select role</option>
			<option>Regular User</option>
			<option>Admin user</option>
		</select>
	</div> <!-- form-group end.// -->
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		    <span class="input-group-text"> <font-awesome-icon icon="lock"/> </span>
		</div>
        <input class="form-control" placeholder="Create password" type="password" autocomplete="on">
    </div> <!-- form-group// -->
    <div class="form-group input-group">
    	<div class="input-group-prepend">
		    <span class="input-group-text"> <font-awesome-icon icon="lock"/> </span>
		</div>
        <input class="form-control" placeholder="Repeat password" type="password" autocomplete="on">
    </div> <!-- form-group// -->
    <div class="form-group">
        <button type="submit" class="btn btn-primary btn-block"> Create Account  </button>
    </div> <!-- form-group// -->
    <p class="text-center">Have an account?</p>
    <a href="login">Log In</a>


</form>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Register extends Vue {
    public userNamePlaceHolder = "user name / e-mail address"


  async mounted() {}
}
</script>

<style scoped>

.input-group>.input-group-prepend {
    flex: 0 0 50px;

}
.input-group .input-group-text {
    width: 100%;
}

#parent{
  display: flex;
  justify-content:center;
  align-items: center;
  vertical-align: middle;
  height: 100vh;
}

.svg{
    text-align: center;
}

#registerForm{
    width: 80%
}

</style>
