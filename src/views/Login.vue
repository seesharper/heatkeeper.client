<template>
    <div id="parent">
        <form id="loginForm" @submit.prevent="handleSubmit">
            <div class="form-group">
                <input
                    type="username"
                    v-model="userName"
                    class="form-control"
                    name="username"
                    placeholder="Username"
                    required="required"
                >
            </div>
            <div class="form-group">
                <input
                    type="password"
                    v-model="password"
                    class="form-control"
                    name="password"
                    placeholder="Password"
                    required="required"
                >
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-lg btn-block login-btn">Login</button>
            </div>
            <p class="text-center">Don't have an account?</p>
            <a href="register">Register here</a>
            <div class="alert alert-danger" v-if="loginFailed == true">
                <strong>Login failed!</strong> Invalid user name or password
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { CurrentUser } from "../models/models";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import router from "@/router";

@Component
export default class Login extends Vue {
    public userNamePlaceHolder = "user name / e-mail address";

    public userName: string = "";
    public password: string = "";
    public loginFailed: boolean = false;

    async handleSubmit(): Promise<void> {
        this.loginFailed = false;
        var requestHeaders = new Headers();
        requestHeaders.append("Content-Type", "application/json");
        var baseAddress = "http://localhost:5000";
        var url = `${baseAddress}/api/users/authenticate`;
        var response = await fetch(url, {
            method: "POST",
            headers: requestHeaders,
            body: JSON.stringify({
                userName: this.userName,
                password: this.password
            })
        });
        if (response.status == 200) {
            var authResponse = await response.json();
            var loggedInUser = <CurrentUser>authResponse;
            localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            router.push("/");
        } else {
            this.loginFailed = true;
            localStorage.removeItem("loggedInUser");
        }
    }
}
</script>

<style scoped>
#parent {
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    height: 100vh;
}

#loginForm {
    width: 80%;
}
</style>
