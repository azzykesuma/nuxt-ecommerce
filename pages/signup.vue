<template>
    <div>
        <h1>Signup here</h1>
        <el-form>
            <el-form-item label="Name">
                <el-input  v-model="userDataForm.name" />
            </el-form-item>
            <el-form-item label="Date of Birth">
                <el-date-picker
                    v-model="userDataForm.dateOfBirth"
                    type="date"
                    placeholder="Date of Birth"
                />
            </el-form-item>
            <el-form-item label="Email">
                <el-input type="email" v-model="userDataForm.email" />
            </el-form-item>
            <el-form-item label="Password">
                <el-input v-model="userDataForm.email">
                    <template #suffix>
                        <el-icon><view /></el-icon>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item label="Repeat your Password">
                <el-input
                type="password"
                v-model="userDataForm.repPassword"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ElForm,ElInput,ElFormItem,ElButton,ElDatePicker, ElIcon } from 'element-plus';
import { View } from '@element-plus/icons-vue'
import { ID_INJECTION_KEY } from 'element-plus'

    provide(ID_INJECTION_KEY, {
    prefix: Math.floor(Math.random() * 10000),
    current: 0,
    })


const userDataForm = reactive({
    name : '',
    dateOfBirth: '',
    email: '',
    password: '',
    repPassword: ''
})
const showPass = ref(false)
</script>

<style lang="scss" scoped>

</style>