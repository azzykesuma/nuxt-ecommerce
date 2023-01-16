<template>
    <div class="main">
        <h1>Welcome to Indonesian's Legacy</h1>
        <el-form
        label-position="top" 
        :model="userForm" 
        class="form-container"
        >
            <el-form-item class="form__item" label="Username">
                <el-input  v-model="userForm.name" />
            </el-form-item>
            <el-form-item class="form__item" label="Password">
                <el-input v-model="userForm.password" />
            </el-form-item>
            <el-form-item>
                <el-button class="form__btn" @click="submit">Login</el-button>
            </el-form-item>
        </el-form>
        <p>Don't have an account yet? sign up <NuxtLink to="/signup">here</NuxtLink></p>
    </div>
</template>

<script setup>
import { ElForm,ElInput,ElFormItem,ElButton } from 'element-plus';
import { ID_INJECTION_KEY } from 'element-plus'

    provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
    })

    const userForm = reactive({
        name : '',
        password : ''
    })

    const submit = () => {
        console.log(userForm.name)
    }
</script>

<style lang="scss" scoped>
    .main {
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1 {
            text-align: center;
            @media screen and (min-width:375px) {
                font-size: 18px;
            }
        }
    }
    .form-container {
        display : flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width : 250px;

        .form__item {
            width : 100%;
        }
    }
</style>