<template>
    <div class="main__signup">
        <h1>Signup here</h1>
        <el-container class="signup__container">
            <el-form 
                :model="userDataForm" label-width="180px" 
                :label-position="labelPosition"
                >
                <el-form-item label="Name *">
                    <el-input required v-model="userDataForm.name" />
                    <span>{{ error ? errorMessage : ""}}</span>
                </el-form-item>
                <el-form-item label="Date of Birth *">
                    <el-date-picker
                        v-model="userDataForm.dateOfBirth"
                        type="date"
                        placeholder="Date of Birth"
                    />
                </el-form-item>
                <el-form-item label="Email *">
                    <el-input type="email" v-model="userDataForm.email" />
                </el-form-item>
                <el-form-item label="Password *">
                    <el-input
                        v-model="userDataForm.password"
                        type="password"
                        placeholder="Please input password"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="Repeat your Password *">
                    <el-input
                        v-model="userDataForm.repPassword"
                        type="password"
                        placeholder="Please repeat your password"
                        show-password
                    />
                </el-form-item>
                <el-button @click="handleSubmit" type="primary">Signup</el-button>
            </el-form>
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
 } from 'element-plus';
import { ID_INJECTION_KEY } from 'element-plus'

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
    let error = ref(false)
    let errorName = ref(false)
    let errorNameLength = ref(false)
    let errorMessage = ref('')
    const validateName = () => {
        if(!userDataForm.name) {
            error.value = true
            errorMessage.value = 'name is required'
        } else if (userDataForm.name && userDataForm.name.length < 3) {
            error.value = true
            errorMessage.value = '3 characters'
        }
    }
    const handleSubmit = () => {
        // validating 
        validateName()
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
    }
}
</style>