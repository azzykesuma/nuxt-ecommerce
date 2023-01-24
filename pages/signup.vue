<template>
    <div class="main__signup">
        <h1>Register your account</h1>
        <el-container class="signup__container">
            <el-form 
                :model="userDataForm" label-width="180px" 
                :label-position="labelPosition"
                class="form__signup"
                >
                <el-form-item label="Name *">
                    <el-input required v-model="userDataForm.name" />
                    <span>{{ error.name ? errorMessage.name : ""}}</span>
                </el-form-item>
                <el-form-item label="Date of Birth *">
                    <client-only>
                        <el-date-picker
                        v-model="userDataForm.dateOfBirth"
                        type="date"
                        placeholder="Date of birth"
                        />
                    </client-only>
                    <span>{{ error.dob ? errorMessage.dob : ""}}</span>
                </el-form-item>
                <el-form-item label="Email *">
                    <el-input 
                    type="email" 
                    v-model="userDataForm.email"
                    @input="checkEmail"
                    />
                    <span>{{ error.email ? errorMessage.email : ""}}</span>
                </el-form-item>
                <el-form-item label="Password *">
                    <el-input
                        v-model="userDataForm.password"
                        type="password"
                        placeholder="Please input password"
                        show-password
                        @input="checkPassword"
                    >
                        <template #append>
                            <el-tooltip>
                                <template #content>
                                     1. Password must be 6 character or more<br />
                                     2. Password must contain 1 number value
                                </template>
                                <el-button :icon="InfoFilled"/>
                            </el-tooltip>
                        </template>
                    </el-input>
                    <span>{{ error.password ? errorMessage.password : ""}}</span>
                </el-form-item>
                <el-form-item label="Repeat your Password *">
                    <el-input
                        v-model="userDataForm.repPassword"
                        type="password"
                        placeholder="Please repeat your password"
                        show-password
                        @input="checkRepPassword"
                    />
                    <span>{{ error.repPassword ? errorMessage.repPassword : ""}}</span>
                </el-form-item>
                <el-button class="form__submitBtn" @click.prevent="handleSubmit" type="primary">Signup</el-button>
                <el-divider />
                <h2>Or signup using Account</h2>
                <div class="form_logoSignup">
                    <img src="../assets/images/facebook.png" />
                    <img src="../assets/images/search.png" />
                    <img src="../assets/images/shopify.png" />
                </div>
            </el-form>
            <p>Already have an account ? Login <NuxtLink to="/login">here</NuxtLink></p>
        </el-container>
    </div>
</template>

<script setup>
import { 
    ElForm,
    ElInput,
    ElFormItem,
    ElButton,
    ElDatePicker,
    ElContainer,
    ElTooltip,
    ElDivider
 } from 'element-plus';
import { ID_INJECTION_KEY } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'

    provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
    })
    // variables
    let labelPosition = ref('top')
    let windowWidth = ref(0)
    const userDataForm = reactive({
        name : '',
        dateOfBirth: '',
        email: '',
        password: '',
        repPassword: ''
    })
    const error = reactive({
        name : false,
        dob : false,
        email : false,
        password : false,
        repPassword : false
    })
    let errorMessage = reactive({
        name : '',
        dob : '',
        email : '',
        password : '',
        repPassword : ''
    })
    const validateName = () => {
        if(!userDataForm.name) {
            error.name = true
            errorMessage.name = 'name is required'
        } else if (userDataForm.name && userDataForm.name.length < 3) {
            error.name = true
            errorMessage.name = 'Please input at least 3 characters'
        } else {
            error.name = false
            errorMessage.name = ''
        }
    }
    const validateEmail = () => {
        if(!userDataForm.email) {
            error.email = true
            errorMessage.email = 'Please input your email'
        }
    }
    const validatePassword = () => {
        if(!userDataForm.password) {
            error.password = true
            errorMessage.password = 'Password is required'
        } else if (!userDataForm.repPassword) {
            error.repPassword = true
            errorMessage.repPassword = 'Please repeat your password'
        } 
    }
    const checkEmail = (value) => {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
        if(value) {
            error.email = false
            if(!regexEmail.test(value)) {
                error.email = true
                errorMessage.email = 'Please input a correct email format!'
            }
        }
    }
    const checkPassword = (value) => {
        const regexDigit = /\d/
        if(value) {
            error.password = false
            error.repPassword = false
            if(value.length < 6) {
                error.password = true
                errorMessage.password = 'Password must contain at least 6 characters'
            } else if (!regexDigit.test(value)) {
                error.password = true
                errorMessage.password = 'Password must contain at least 1 number'
            } else {
                error.password = false
                errorMessage.password = ''
            }
        }
    }
    const checkRepPassword = (value) => {
        if(value) {
            if(value !== userDataForm.password) {
                error.repPassword = true
                errorMessage.repPassword = "Password doesn't match!"
            } else {
                error.repPassword = false
                errorMessage.repPassword = ""
            }
        }
    }
    const handleSubmit = () => {
        // checking all error are false
        const readySubmit = Object.values(error).every(value => value === false)
        // validating
        validateName()
        if(!userDataForm.dateOfBirth) {
            error.dob = true
            errorMessage.dob = 'Please insert your date of birth'
        } else {
            error.dob = false
            errorMessage.dob = ''
        }
        validateEmail()
        validatePassword()
        if(readySubmit) {
            setTimeout(async () => {
                await navigateTo('/login')
            }, 2000);
        }
    }
    const handleResize = () => {
        windowWidth = window.innerWidth
        if(windowWidth >= 500) {
            labelPosition.value = 'left'
        } else {
            labelPosition.value = 'top'
        }
    }
    onMounted(() => {
        window.addEventListener('resize', handleResize);
        handleResize()
        console.log(error)
    })
</script>

<style lang="scss" scoped>

.main__signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height:90vh;

    @media screen and (max-width: 500px) {
        height : unset;
    }
    .signup__container {
        margin-top : 5em;
        display: block;
        max-width : 400px;

            @media screen and (min-width: 375px) {
            margin-top : 2em;
            height : unset;
        }

        .form__signup {
            display: flex;
            flex-direction: column;

            h2 {
                font-size : 16px;
            }
            .form_logoSignup {
                margin-top : 1em;
                display : flex;
                gap : 10px;
                justify-content: space-between;
                padding-inline : 10px;
                img {
                    width : 30px;
                    height : 30px;
                    cursor : pointer;
                }
            }
        }
    }
}
</style>